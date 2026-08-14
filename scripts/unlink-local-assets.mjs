import { lstat, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);
const targetDirectory = path.join(projectRoot, "public", "local-assets");

try {
	const target = await lstat(targetDirectory);
	if (!target.isSymbolicLink()) {
		throw new Error(`${targetDirectory} 必须是软链接，无法自动删除。`);
	}
	await unlink(targetDirectory);
} catch (error) {
	if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
		process.exit(0);
	}

	throw error;
}
