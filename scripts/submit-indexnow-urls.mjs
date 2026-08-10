import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_SITE = "https://www.dai-shi.cn";
const DEFAULT_KEY = "3c30063d78c64f2484825ad8eb726a7e";
const DEFAULT_ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH_SIZE = 10000;

function normalizeHost(site) {
	try {
		return new URL(site).host;
	} catch {
		return site.replace(/^https?:\/\//, "").replace(/\/+$/, "");
	}
}

function normalizeOrigin(site) {
	const host = normalizeHost(site);
	return `https://${host}`;
}

function parseArgs(argv) {
	const options = {
		dryRun: false,
		endpoint: process.env.INDEXNOW_ENDPOINT || DEFAULT_ENDPOINT,
		file: "",
		key: process.env.INDEXNOW_KEY || DEFAULT_KEY,
		site: process.env.INDEXNOW_SITE || DEFAULT_SITE,
	};

	const flags = ["--file", "--site", "--key", "--endpoint"];

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

async function readUrlsFromSitemap(origin) {
	const sitemapUrl = new URL("/sitemap.xml", origin).toString();
	const response = await fetch(sitemapUrl);

	if (!response.ok) {
		throw new Error(
			`读取 sitemap 失败，HTTP ${response.status}: ${sitemapUrl}`,
		);
	}

	const xml = await response.text();
	const urls = dedupe(
		[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
	);

	if (urls.length === 0) {
		throw new Error(`sitemap 中没有解析到 URL: ${sitemapUrl}`);
	}

	console.log(`URL 来源: ${sitemapUrl}`);

	return urls;
}

const RESPONSE_HINTS = {
	200: "推送成功",
	202: "已接收，IndexNow key 正在校验中",
	400: "请求格式不正确",
	403: "key 无效，请检查 key 文件是否可访问",
	422: "URL 不属于该站点，或 key 与协议不匹配",
	429: "请求过于频繁，请稍后再试",
};

async function submitBatch({ batch, endpoint, host, key, keyLocation }) {
	const response = await fetch(endpoint, {
		body: JSON.stringify({
			host,
			key,
			keyLocation,
			urlList: batch,
		}),
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		method: "POST",
	});

	const hint = RESPONSE_HINTS[response.status] ?? "未知返回状态";
	const responseText = (await response.text()).trim();

	console.log(`HTTP ${response.status} - ${hint}`);

	if (responseText) {
		console.log(`接口返回: ${responseText}`);
	}

	return response.ok || response.status === 202;
}

async function main() {
	const options = parseArgs(process.argv.slice(2));
	const host = normalizeHost(options.site);
	const origin = normalizeOrigin(options.site);
	const keyLocation = `${origin}/${options.key}.txt`;

	const urls = options.file
		? await readUrlsFromFile(options.file)
		: await readUrlsFromSitemap(origin);

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
	console.log(`站点: ${host}`);
	console.log(`key 文件: ${keyLocation}`);

	if (options.dryRun) {
		console.log(`接口: ${options.endpoint}`);
		console.log(`将分 ${Math.ceil(validUrls.length / BATCH_SIZE)} 批推送`);
		console.log("URL 示例:");

		for (const url of validUrls.slice(0, 5)) {
			console.log(`- ${url}`);
		}

		console.log("\n试运行结束，未向搜索引擎推送任何内容");
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
			host,
			key: options.key,
			keyLocation,
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
