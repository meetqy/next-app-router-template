import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

const collected = await Promise.all(
	sourceDirectories.map((directory) => collectImagePaths(directory)),
);
const imagePaths = [...new Set(collected.flat())].sort((left, right) =>
	left.localeCompare(right, "zh-Hans-CN", { numeric: true }),
);

await mkdir(path.dirname(manifestPath), { recursive: true });
await writeFile(manifestPath, `${JSON.stringify(imagePaths, null, "\t")}\n`);

console.log(`已生成图片清单：${imagePaths.length} 个路径。`);
