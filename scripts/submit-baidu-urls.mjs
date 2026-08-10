import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_SITE = "https://www.dai-shi.cn";
const DEFAULT_TOKEN = "pByG1PMpLilooDTX";
const DEFAULT_INPUT = "1.txt";
const DEFAULT_ENDPOINT = "http://data.zz.baidu.com/urls";

function normalizeSite(site) {
  try {
    return new URL(site).host;
  } catch {
    return site.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  }
}

function parseArgs(argv) {
  const options = {
    file: DEFAULT_INPUT,
    site: process.env.BAIDU_PUSH_SITE || DEFAULT_SITE,
    token: process.env.BAIDU_PUSH_TOKEN || DEFAULT_TOKEN,
    endpoint: process.env.BAIDU_PUSH_ENDPOINT || DEFAULT_ENDPOINT,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];

    if (current === "--file" && argv[index + 1]) {
      options.file = argv[index + 1];
      index += 1;
      continue;
    }

    if (current === "--site" && argv[index + 1]) {
      options.site = argv[index + 1];
      index += 1;
      continue;
    }

    if (current === "--token" && argv[index + 1]) {
      options.token = argv[index + 1];
      index += 1;
      continue;
    }

    if (current === "--endpoint" && argv[index + 1]) {
      options.endpoint = argv[index + 1];
      index += 1;
      continue;
    }

    if (!current.startsWith("--")) {
      options.file = current;
    }
  }

  return options;
}

function formatList(label, items) {
  if (!Array.isArray(items) || items.length === 0) {
    return;
  }

  console.log(`${label} (${items.length})`);

  for (const item of items) {
    console.log(`- ${item}`);
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const filePath = path.resolve(process.cwd(), options.file);
  const raw = await readFile(filePath, "utf8");
  const normalizedSite = normalizeSite(options.site);

  const urls = [
    ...new Set(
      raw
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean),
    ),
  ];

  if (urls.length === 0) {
    throw new Error(`未在文件中读取到可推送 URL: ${filePath}`);
  }

  const requestUrl = new URL(options.endpoint);
  requestUrl.searchParams.set("site", normalizedSite);
  requestUrl.searchParams.set("token", options.token);

  console.log(`开始推送 ${urls.length} 条 URL`);
  console.log(`文件: ${filePath}`);
  console.log(`站点: ${normalizedSite}`);

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: urls.join("\n"),
  });

  const responseText = await response.text();
  let payload;

  try {
    payload = JSON.parse(responseText);
  } catch {
    throw new Error(`接口返回的不是 JSON:\n${responseText}`);
  }

  if (!response.ok) {
    throw new Error(`推送失败，HTTP ${response.status}:\n${JSON.stringify(payload, null, 2)}`);
  }

  console.log("推送完成");
  console.log(JSON.stringify(payload, null, 2));

  if (typeof payload.success === "number") {
    console.log(`成功推送: ${payload.success}`);
  }

  if (typeof payload.remain === "number") {
    console.log(`今日剩余: ${payload.remain}`);
  }

  formatList("不是本站的 URL", payload.not_same_site);
  formatList("不合法的 URL", payload.not_valid);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
