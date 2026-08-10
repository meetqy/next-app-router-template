import { createReadStream } from "node:fs";
import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import COS from "cos-nodejs-sdk-v5";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultSourceDirectory = path.join(projectRoot, "cos-assets");
const imageAssetPrefix = "site-assets/v1";
const cacheControl = "public,max-age=31536000,immutable";
const supportedExtensions = new Set([
	".avif",
	".gif",
	".ico",
	".jpeg",
	".jpg",
	".png",
	".svg",
	".webp",
]);
const contentTypes = {
	".avif": "image/avif",
	".gif": "image/gif",
	".ico": "image/x-icon",
	".jpeg": "image/jpeg",
	".jpg": "image/jpeg",
	".png": "image/png",
	".svg": "image/svg+xml",
	".webp": "image/webp",
};

function printUsage() {
	console.log(`用法：node scripts/upload-images.mjs [选项]

选项：
  --dry-run          只列出待上传对象，不访问腾讯云
  --source <目录>    指定本地图片目录，默认 cos-assets
  --help             显示帮助`);
}

async function loadLocalEnvironment() {
	const environmentFilePath = path.join(projectRoot, ".env.local");
	let environmentFile;

	try {
		environmentFile = await readFile(environmentFilePath, "utf8");
	} catch (error) {
		if (error?.code === "ENOENT") {
			return;
		}

		throw error;
	}

	for (const rawLine of environmentFile.split(/\r?\n/)) {
		const line = rawLine.trim();

		if (!line || line.startsWith("#")) {
			continue;
		}

		const separatorIndex = line.indexOf("=");

		if (separatorIndex <= 0) {
			continue;
		}

		const key = line.slice(0, separatorIndex).trim();
		let value = line.slice(separatorIndex + 1).trim();

		if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) {
			continue;
		}

		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}

		if (process.env[key] === undefined) {
			process.env[key] = value;
		}
	}
}

function parseArguments() {
	const argumentsList = process.argv.slice(2);
	let dryRun = false;
	let sourceDirectory = defaultSourceDirectory;
	let sourceWasProvided = false;

	for (let index = 0; index < argumentsList.length; index += 1) {
		const argument = argumentsList[index];

		if (argument === "--") {
			continue;
		}

		if (argument === "--dry-run") {
			dryRun = true;
			continue;
		}

		if (argument === "--source") {
			const sourceArgument = argumentsList[index + 1];

			if (!sourceArgument || sourceArgument.startsWith("--")) {
				throw new Error("--source 后需要提供目录路径");
			}

			sourceDirectory = path.resolve(process.cwd(), sourceArgument);
			sourceWasProvided = true;
			index += 1;
			continue;
		}

		if (argument === "--help" || argument === "-h") {
			printUsage();
			process.exit(0);
		}

		throw new Error(`未知选项：${argument}`);
	}

	return { dryRun, sourceDirectory, sourceWasProvided };
}

async function collectImageFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];

	for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
		const entryPath = path.join(directory, entry.name);

		if (entry.isDirectory()) {
			files.push(...(await collectImageFiles(entryPath)));
			continue;
		}

		if (entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase())) {
			files.push(entryPath);
		}
	}

	return files;
}

function toObjectKey(sourceDirectory, filePath, assetPrefix) {
	const relativePath = path.relative(sourceDirectory, filePath).split(path.sep).join("/");
	return `${assetPrefix}/${relativePath}`;
}

function getContentType(filePath) {
	return contentTypes[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
}

function putObject(cosClient, options) {
	return new Promise((resolve, reject) => {
		cosClient.putObject(options, (error, data) => {
			if (error) {
				reject(error);
				return;
			}

			resolve(data);
		});
	});
}

async function main() {
	await loadLocalEnvironment();

	const { dryRun, sourceDirectory: requestedSourceDirectory, sourceWasProvided } =
		parseArguments();
	let sourceDirectory = requestedSourceDirectory;

	try {
		await access(sourceDirectory);
	} catch (error) {
		if (sourceWasProvided) {
			throw error;
		}

		const publicDirectory = path.join(projectRoot, "public");
		await access(publicDirectory);
		sourceDirectory = publicDirectory;
		console.warn("未找到 cos-assets，回退使用 public/ 作为图片源目录。");
	}

	const sourceStats = await stat(sourceDirectory);

	if (!sourceStats.isDirectory()) {
		throw new Error(`图片源目录不是文件夹：${sourceDirectory}`);
	}

	const imageFiles = await collectImageFiles(sourceDirectory);

	if (imageFiles.length === 0) {
		throw new Error(`图片源目录中没有可上传的图片：${sourceDirectory}`);
	}

	const bucket = process.env.COS_BUCKET?.trim();
	const region = process.env.COS_REGION?.trim() || "ap-chengdu";

	console.log(`图片源目录：${sourceDirectory}`);
	console.log(`待处理图片：${imageFiles.length} 个`);
	console.log(`对象前缀：${imageAssetPrefix}/`);

	if (dryRun) {
		for (const filePath of imageFiles) {
			const objectKey = toObjectKey(sourceDirectory, filePath, imageAssetPrefix);
			console.log(`[dry-run] ${objectKey}`);
		}
		return;
	}

	const secretId = process.env.TENCENTCLOUD_SECRET_ID?.trim();
	const secretKey = process.env.TENCENTCLOUD_SECRET_KEY?.trim();

	if (!bucket || !secretId || !secretKey) {
		throw new Error(
			"缺少 COS_BUCKET、TENCENTCLOUD_SECRET_ID 或 TENCENTCLOUD_SECRET_KEY；请先配置 .env.local。",
		);
	}

	const cosClient = new COS({ SecretId: secretId, SecretKey: secretKey });

	for (const [index, filePath] of imageFiles.entries()) {
		const objectKey = toObjectKey(sourceDirectory, filePath, imageAssetPrefix);

		await putObject(cosClient, {
			Bucket: bucket,
			Region: region,
			Key: objectKey,
			Body: createReadStream(filePath),
			ContentType: getContentType(filePath),
			CacheControl: cacheControl,
		});

		console.log(`[${index + 1}/${imageFiles.length}] 已上传 ${objectKey}`);
	}

	console.log("COS 图片上传完成。未执行远程删除。");
}

main().catch((error) => {
	console.error(`图片上传失败：${error instanceof Error ? error.message : String(error)}`);
	process.exitCode = 1;
});
