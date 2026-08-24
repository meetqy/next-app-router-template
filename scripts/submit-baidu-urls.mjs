import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_SITE = "www.dai-shi.cn";
const DEFAULT_TOKEN = "jNBbubFJcBVfXfCx";
const DEFAULT_ENDPOINT = "http://data.zz.baidu.com/urls";
const BATCH_SIZE = 2000;

function normalizeSite(site) {
  // 站点标识按搜索资源平台验证时的写法原样提交，只去掉尾部多余的斜杠。
  return site.trim().replace(/\/+$/, "");
}

function normalizeHost(site) {
  try {
    return new URL(site).host;
  } catch {
    return site.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  }
}

function normalizeOrigin(site) {
  return `https://${normalizeHost(site)}`;
}

function parseArgs(argv) {
  const options = {
    dryRun: false,
    endpoint: process.env.BAIDU_PUSH_ENDPOINT || DEFAULT_ENDPOINT,
    file: "",
    site: process.env.BAIDU_PUSH_SITE || DEFAULT_SITE,
    sitemap: process.env.BAIDU_PUSH_SITEMAP || "",
    token: process.env.BAIDU_PUSH_TOKEN || DEFAULT_TOKEN,
  };

  const flags = ["--file", "--site", "--token", "--endpoint", "--sitemap"];

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    const next = argv[index + 1];

    if (current === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (flags.includes(current) && next) {
      options[current.slice(2)] = next;
      index += 1;
      continue;
    }

    if (!current.startsWith("--")) {
      options.file = current;
    }
  }

  return options;
}

function dedupe(urls) {
  return [...new Set(urls.map((url) => url.trim()).filter(Boolean))];
}

async function readUrlsFromFile(file) {
  const filePath = path.resolve(process.cwd(), file);
  const raw = await readFile(filePath, "utf8");
  const urls = dedupe(raw.split(/\r?\n/));

  if (urls.length === 0) {
    throw new Error(`未在文件中读取到可推送 URL: ${filePath}`);
  }

  console.log(`URL 来源: 文件 ${filePath}`);

  return urls;
}

async function readUrlsFromSitemap(sitemapUrl) {
  const response = await fetch(sitemapUrl);

  if (!response.ok) {
    throw new Error(`读取 sitemap 失败，HTTP ${response.status}: ${sitemapUrl}`);
  }

  const xml = await response.text();
  const urls = dedupe([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));

  if (urls.length === 0) {
    throw new Error(`sitemap 中没有解析到 URL: ${sitemapUrl}`);
  }

  console.log(`URL 来源: ${sitemapUrl}`);

  return urls;
}

function formatList(label, items) {
  if (!Array.isArray(items) || items.length === 0) {
    return;
  }

  console.log(`${label} (${items.length})`);

  for (const item of items.slice(0, 10)) {
    console.log(`- ${item}`);
  }
}

async function submitBatch({ batch, endpoint, site, token }) {
  const requestUrl = new URL(endpoint);
  requestUrl.searchParams.set("site", site);
  requestUrl.searchParams.set("token", token);

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: batch.join("\n"),
  });

  const responseText = (await response.text()).trim();
  let payload;

  try {
    payload = JSON.parse(responseText);
  } catch {
    throw new Error(`接口返回的不是 JSON（HTTP ${response.status}）:\n${responseText}`);
  }

  if (!response.ok) {
    console.error(`推送失败，HTTP ${response.status}:\n${JSON.stringify(payload, null, 2)}`);
    return false;
  }

  if (typeof payload.success === "number") {
    console.log(`成功推送: ${payload.success}`);
  }

  if (typeof payload.remain === "number") {
    console.log(`今日剩余: ${payload.remain}`);
  }

  formatList("不是本站的 URL", payload.not_same_site);
  formatList("不合法的 URL", payload.not_valid);

  return true;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const site = normalizeSite(options.site);
  const host = normalizeHost(options.site);
  const origin = normalizeOrigin(options.site);
  const sitemapUrl = options.sitemap || new URL("/sitemap.xml", origin).toString();

  const urls = options.file
    ? await readUrlsFromFile(options.file)
    : await readUrlsFromSitemap(sitemapUrl);

  const isSameHost = (url) => {
    try {
      return new URL(url).host === host;
    } catch {
      return false;
    }
  };

  const validUrls = urls.filter(isSameHost);
  const foreignUrls = urls.filter((url) => !isSameHost(url));

  if (foreignUrls.length > 0) {
    console.log(`已跳过 ${foreignUrls.length} 条不属于 ${host} 的 URL`);

    for (const url of foreignUrls.slice(0, 10)) {
      console.log(`- ${url}`);
    }
  }

  if (validUrls.length === 0) {
    throw new Error(`没有属于 ${host} 的可推送 URL`);
  }

  console.log(
    options.dryRun
      ? `试运行，仅检查不实际推送，共 ${validUrls.length} 条 URL`
      : `开始推送 ${validUrls.length} 条 URL`,
  );
  console.log(`站点: ${site}`);

  if (options.dryRun) {
    console.log(`接口: ${options.endpoint}`);
    console.log(`将分 ${Math.ceil(validUrls.length / BATCH_SIZE)} 批推送`);
    console.log("URL 示例:");

    for (const url of validUrls.slice(0, 5)) {
      console.log(`- ${url}`);
    }

    console.log("\n试运行结束，未向百度推送任何内容");
    return;
  }

  let failed = 0;

  for (let start = 0; start < validUrls.length; start += BATCH_SIZE) {
    const batch = validUrls.slice(start, start + BATCH_SIZE);
    const batchNo = Math.floor(start / BATCH_SIZE) + 1;

    console.log(`\n第 ${batchNo} 批，共 ${batch.length} 条`);

    const ok = await submitBatch({
      batch,
      endpoint: options.endpoint,
      site,
      token: options.token,
    });

    if (!ok) {
      failed += 1;
    }
  }

  if (failed > 0) {
    throw new Error(`有 ${failed} 批推送失败，请检查上面的返回信息`);
  }

  console.log("\n推送完成");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
