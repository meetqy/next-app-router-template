import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);
const sourceDirectories = [
	path.join(projectRoot, "cos-assets"),
	path.join(projectRoot, "public"),
];
const manifestPath = path.join(
	projectRoot,
	"src",
	"lib",
	"generated",
	"image-manifest.json",
);
const teachingEnvironmentManifestPath = path.join(
	projectRoot,
	"src",
	"lib",
	"generated",
	"teaching-environment-manifest.json",
);
const admissionCelebrationManifestPath = path.join(
	projectRoot,
	"src",
	"lib",
	"generated",
	"admission-celebration-manifest.json",
);
const imageExtensions = new Set([
	".avif",
	".gif",
	".jpeg",
	".jpg",
	".png",
	".webp",
]);

async function collectImagePaths(rootDirectory, currentDirectory = rootDirectory) {
	let entries;

	try {
		entries = await readdir(currentDirectory, { withFileTypes: true });
	} catch (error) {
		if (error?.code === "ENOENT") {
			return [];
		}

		throw error;
	}

	const paths = [];

	for (const entry of entries) {
		const entryPath = path.join(currentDirectory, entry.name);

		if (entry.isDirectory()) {
			paths.push(...(await collectImagePaths(rootDirectory, entryPath)));
			continue;
		}

		if (
			entry.isFile() &&
			imageExtensions.has(path.extname(entry.name).toLowerCase())
		) {
			const relativePath = path
				.relative(rootDirectory, entryPath)
				.split(path.sep)
				.join("/");
			paths.push(`/${relativePath}`);
		}
	}

	return paths;
}

async function computeFileHash(filePath) {
	const hash = createHash("sha256");
	await pipeline(createReadStream(filePath), hash);
	return hash.digest("hex");
}

async function readImageDimensions(filePath) {
	const metadata = await sharp(filePath, { animated: false }).metadata();
	const { height, width } = metadata.autoOrient;

	if (!width || !height) {
		throw new Error(`无法读取图片尺寸：${filePath}`);
	}

	return { height, width };
}

async function collectTeachingEnvironmentImages() {
	const sourceDirectory = path.join(projectRoot, "cos-assets");
	const teachingEnvironmentDirectory = path.join(sourceDirectory, "教学环境");
	const entries = [];

	async function collect(directory) {
		let directoryEntries;
		try {
			directoryEntries = await readdir(directory, { withFileTypes: true });
		} catch (error) {
			if (error?.code === "ENOENT") return;
			throw error;
		}

		for (const entry of directoryEntries) {
			const entryPath = path.join(directory, entry.name);
			if (entry.isDirectory()) {
				await collect(entryPath);
				continue;
			}
			if (
				entry.isFile() &&
				imageExtensions.has(path.extname(entry.name).toLowerCase())
			) {
				const relativePath = path
					.relative(sourceDirectory, entryPath)
					.split(path.sep)
					.join("/");
				const [, category] = relativePath.split("/");
				entries.push({
					category,
					...(await readImageDimensions(entryPath)),
					path: `/${relativePath}`,
					hash: await computeFileHash(entryPath),
				});
			}
		}
	}

	await collect(teachingEnvironmentDirectory);
	entries.sort((left, right) =>
		left.path.localeCompare(right.path, "zh-Hans-CN", { numeric: true }),
	);

	const seenHashes = new Set();
	return entries.map((entry) => {
		const duplicate = seenHashes.has(entry.hash);
		seenHashes.add(entry.hash);
		return { ...entry, duplicate };
	});
}

async function collectAdmissionCelebrationImages() {
	const sourceDirectory = path.join(projectRoot, "cos-assets");
	const celebrationDirectory = path.join(sourceDirectory, "喜报");
	const entries = [];

	async function collect(directory) {
		let directoryEntries;
		try {
			directoryEntries = await readdir(directory, { withFileTypes: true });
		} catch (error) {
			if (error?.code === "ENOENT") return;
			throw error;
		}

		for (const entry of directoryEntries) {
			const entryPath = path.join(directory, entry.name);
			if (entry.isDirectory()) {
				await collect(entryPath);
				continue;
			}
			if (
				entry.isFile() &&
				imageExtensions.has(path.extname(entry.name).toLowerCase())
			) {
				const relativePath = path
					.relative(sourceDirectory, entryPath)
					.split(path.sep)
					.join("/");
				entries.push({
					...(await readImageDimensions(entryPath)),
					path: `/${relativePath}`,
				});
			}
		}
	}

	await collect(celebrationDirectory);
	return entries.sort((left, right) =>
		left.path.localeCompare(right.path, "zh-Hans-CN", { numeric: true }),
	);
}

const collected = await Promise.all(
	sourceDirectories.map((directory) => collectImagePaths(directory)),
);
const imagePaths = [...new Set(collected.flat())].sort((left, right) =>
	left.localeCompare(right, "zh-Hans-CN", { numeric: true }),
);

await mkdir(path.dirname(manifestPath), { recursive: true });
await writeFile(manifestPath, `${JSON.stringify(imagePaths, null, "\t")}\n`);

const teachingEnvironmentImages = await collectTeachingEnvironmentImages();
await writeFile(
	teachingEnvironmentManifestPath,
	`${JSON.stringify(teachingEnvironmentImages, null, "\t")}\n`,
);

const admissionCelebrationImages = await collectAdmissionCelebrationImages();
await writeFile(
	admissionCelebrationManifestPath,
	`${JSON.stringify(admissionCelebrationImages, null, "\t")}\n`,
);

console.log(
	`已生成图片清单：${imagePaths.length} 个路径；教学环境图片：${teachingEnvironmentImages.length} 个路径；升学喜报：${admissionCelebrationImages.length} 个路径。`,
);
