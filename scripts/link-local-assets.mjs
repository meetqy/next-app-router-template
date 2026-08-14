import { lstat, mkdir, symlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);
const sourceDirectory = path.join(projectRoot, "cos-assets");
const targetDirectory = path.join(projectRoot, "public", "local-assets");

try {
	const target = await lstat(targetDirectory);
	if (!target.isSymbolicLink()) {
		throw new Error(`${targetDirectory} 必须是软链接，无法自动覆盖。`);
	}
} catch (error) {
	if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
		await mkdir(path.dirname(targetDirectory), { recursive: true });
		await symlink(sourceDirectory, targetDirectory, "junction");
	} else if (error instanceof Error) {
		throw error;
	}
}
