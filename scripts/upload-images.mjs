import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import COS from "cos-nodejs-sdk-v5";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultSourceDirectory = path.join(projectRoot, "cos-assets");
const imageAssetPrefix = "site-assets/v1";
const cacheControl = "public,max-age=31536000,immutable";
const uploadConcurrency = 8;
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
  --force            跳过远端比对，强制重传全部图片
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
	let force = false;
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

		if (argument === "--force") {
			force = true;
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

	return { dryRun, force, sourceDirectory, sourceWasProvided };
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

// 取远端对象的 ETag；对象不存在时返回 undefined。
// COS 对单次 putObject 上传的对象，ETag 就是内容的 MD5（带引号），
// 因此可以直接和本地文件的 MD5 比对来判断是否需要重传。
function headObjectETag(cosClient, options) {
	return new Promise((resolve, reject) => {
		cosClient.headObject(options, (error, data) => {
			if (error) {
				if (error.statusCode === 404) {
					resolve(undefined);
					return;
				}

				reject(error);
				return;
			}

			resolve(data.ETag?.replace(/"/g, ""));
		});
	});
}

async function computeFileMd5(filePath) {
	const hash = createHash("md5");
	await pipeline(createReadStream(filePath), hash);
	return hash.digest("hex");
}

// 以固定并发跑完整个任务列表，结果顺序与输入一致。
async function runWithConcurrency(items, limit, worker) {
	const results = new Array(items.length);
	let nextIndex = 0;

	async function runNext() {
		while (nextIndex < items.length) {
			const index = nextIndex;
			nextIndex += 1;
			results[index] = await worker(items[index], index);
		}
	}

	await Promise.all(
		Array.from({ length: Math.min(limit, items.length) }, () => runNext()),
	);

	return results;
}

async function main() {
	await loadLocalEnvironment();

	const {
		dryRun,
		force,
		sourceDirectory: requestedSourceDirectory,
		sourceWasProvided,
	} = parseArguments();
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
	const uploaded = [];
	let skipped = 0;

	await runWithConcurrency(imageFiles, uploadConcurrency, async (filePath) => {
		const objectKey = toObjectKey(sourceDirectory, filePath, imageAssetPrefix);

		if (!force) {
			const [remoteETag, localMd5] = await Promise.all([
				headObjectETag(cosClient, { Bucket: bucket, Region: region, Key: objectKey }),
				computeFileMd5(filePath),
			]);

			if (remoteETag === localMd5) {
				skipped += 1;
				return;
			}
		}

		await putObject(cosClient, {
			Bucket: bucket,
			Region: region,
			Key: objectKey,
			Body: createReadStream(filePath),
			ContentType: getContentType(filePath),
			CacheControl: cacheControl,
		});

		uploaded.push(objectKey);
		console.log(`已上传 ${objectKey}`);
	});

	console.log(
		`\nCOS 图片上传完成：新增或更新 ${uploaded.length} 个，跳过 ${skipped} 个未变化。未执行远程删除。`,
	);

	// 对象键不含内容哈希，且 Cache-Control 为 immutable，
	// 因此内容变化的图片需要手动刷新 CDN 缓存才能生效。
	if (uploaded.length > 0) {
		const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL?.trim().replace(/\/+$/, "");

		console.log("\n以下图片内容已变化，需要刷新 CDN 缓存：");

		for (const objectKey of uploaded) {
			const encodedKey = objectKey
				.split("/")
				.map((segment) => encodeURIComponent(segment))
				.join("/");
			console.log(imageBaseUrl ? `${imageBaseUrl}/${encodedKey}` : `/${encodedKey}`);
		}
	}
}

main().catch((error) => {
	console.error(`图片上传失败：${error instanceof Error ? error.message : String(error)}`);
	process.exitCode = 1;
});
