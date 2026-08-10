import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const sourceDir = path.join(projectRoot, "content");
const targetDir = path.join(projectRoot, ".next", "content");

if (!fs.existsSync(sourceDir)) {
	throw new Error(`资料库源目录不存在：${sourceDir}`);
}

if (!fs.existsSync(path.join(projectRoot, ".next"))) {
	throw new Error("未找到 .next，请先执行 Next.js 构建。");
}

fs.rmSync(targetDir, { force: true, recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true });

const copiedFiles = fs
	.readdirSync(targetDir, { recursive: true, withFileTypes: true })
	.filter((entry) => entry.isFile()).length;

console.log(`已复制 ${copiedFiles} 个资料库文件到 .next/content。`);
