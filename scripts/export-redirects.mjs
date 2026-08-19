import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { isDeepStrictEqual } from "node:util";

const root = process.cwd();
const redirectsPath = resolve(root, "redirects.json");
const edgeonePath = resolve(root, "edgeone.json");
const checkOnly = process.argv.includes("--check");

function fail(message) {
	throw new Error(`重定向配置无效：${message}`);
}

function validateRedirects(redirects) {
	if (!Array.isArray(redirects)) {
		fail("redirects.json 必须是规则数组。");
	}

	const sources = new Set();
	for (const [index, redirect] of redirects.entries()) {
		if (!redirect || typeof redirect !== "object") {
			fail(`第 ${index + 1} 条必须是对象。`);
		}
		if (typeof redirect.source !== "string" || !redirect.source.trim()) {
			fail(`第 ${index + 1} 条缺少 source。`);
		}
		if (typeof redirect.destination !== "string" || !redirect.destination.trim()) {
			fail(`第 ${index + 1} 条缺少 destination。`);
		}
		if (!Number.isInteger(redirect.statusCode) || redirect.statusCode < 300 || redirect.statusCode > 399) {
			fail(`第 ${index + 1} 条的 statusCode 必须为 3xx。`);
		}
		if (redirect.statusCode !== 301) {
			fail(`第 ${index + 1} 条当前必须使用 301。`);
		}
		if (redirect.source === redirect.destination) {
			fail(`第 ${index + 1} 条不能重定向到自身。`);
		}
		if (sources.has(redirect.source)) {
			fail(`source 重复：${redirect.source}`);
		}
		sources.add(redirect.source);
	}
}

const [redirectsText, edgeoneText] = await Promise.all([
	readFile(redirectsPath, "utf8"),
	readFile(edgeonePath, "utf8"),
]);
const redirects = JSON.parse(redirectsText);
const edgeone = JSON.parse(edgeoneText);

validateRedirects(redirects);

if (!Array.isArray(edgeone.rewrites)) {
	fail("edgeone.json 必须保留 rewrites 数组。");
}

if (checkOnly) {
	if (!isDeepStrictEqual(edgeone.redirects, redirects)) {
		fail("edgeone.json.redirects 与 redirects.json 不一致，请运行 pnpm redirects:export。");
	}
	console.log(`重定向校验通过：${redirects.length} 条 301 规则。`);
} else {
	edgeone.redirects = redirects;
	await writeFile(edgeonePath, `${JSON.stringify(edgeone, null, "\t")}\n`);
	console.log(`已导出 ${redirects.length} 条 301 重定向到 edgeone.json。`);
}
