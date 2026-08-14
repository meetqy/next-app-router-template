import { readFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_TYPES: Record<string, string> = {
	".avif": "image/avif",
	".gif": "image/gif",
	".jpeg": "image/jpeg",
	".jpg": "image/jpeg",
	".png": "image/png",
	".svg": "image/svg+xml",
	".webp": "image/webp",
};

type RouteContext = {
	params: Promise<{ segments: string[] }>;
};

function isSafeSegment(segment: string) {
	return (
		segment.length > 0 &&
		segment !== "." &&
		segment !== ".." &&
		!segment.includes("/") &&
		!segment.includes("\\")
	);
}

export async function GET(request: Request, { params }: RouteContext) {
	if (process.env.NODE_ENV !== "development") {
		return new Response(null, { status: 404 });
	}

	const { segments } = await params;

	if (segments.length === 0 || !segments.every(isSafeSegment)) {
		return new Response(null, { status: 404 });
	}

	const assetRoot = path.resolve(process.cwd(), "cos-assets");
	const assetPath = path.resolve(assetRoot, ...segments);
	const relativePath = path.relative(assetRoot, assetPath);

	if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
		return new Response(null, { status: 404 });
	}

	const contentType = CONTENT_TYPES[path.extname(assetPath).toLowerCase()];

	if (!contentType) {
		return new Response(null, { status: 404 });
	}

	try {
		const file = await readFile(assetPath);

		return new Response(new Uint8Array(file), {
			headers: {
				"Cache-Control": "no-store",
				"Content-Type": contentType,
			},
		});
	} catch (error) {
		if (error instanceof Error && "code" in error && error.code === "ENOENT") {
			const publicPath = `/${segments.map(encodeURIComponent).join("/")}`;
			return Response.redirect(new URL(publicPath, request.url));
		}

		throw error;
	}
}
