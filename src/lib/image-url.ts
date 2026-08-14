const IMAGE_ASSET_PREFIX = "site-assets/v1";

function normalizeBaseUrl(value: string | undefined) {
	return value?.trim().replace(/\/+$/, "") ?? "";
}

function encodeAssetPath(path: string) {
	return path
		.split("/")
		.map((segment) => encodeURIComponent(segment))
		.join("/");
}

export function imageUrl(path: string) {
	if (/^(?:https?:|data:|blob:)/i.test(path)) {
		return path;
	}

	const normalizedPath = path.replace(/^\/+/, "");

	if (process.env.NODE_ENV === "development") {
		return `/local-assets/${encodeAssetPath(normalizedPath)}`;
	}

	const imageBaseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_IMAGE_BASE_URL);

	if (!imageBaseUrl) {
		return `/${normalizedPath}`;
	}

	return `${imageBaseUrl}/${IMAGE_ASSET_PREFIX}/${encodeAssetPath(normalizedPath)}`;
}
