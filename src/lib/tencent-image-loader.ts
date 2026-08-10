import type { ImageLoaderProps } from "next/image";

const TENCENT_COS_HOSTNAME = "cdn.dai-shi.cn";
const TENCENT_COS_PATH_PREFIX = "/site-assets/";
const DEFAULT_QUALITY = 75;
const TRANSFORMABLE_IMAGE_PATTERN = /\.(?:jpe?g|png|webp)$/i;

function getTencentCosUrl(src: string) {
	try {
		const url = new URL(src);

		if (
			url.protocol !== "https:" ||
			url.hostname !== TENCENT_COS_HOSTNAME ||
			!url.pathname.startsWith(TENCENT_COS_PATH_PREFIX) ||
			!TRANSFORMABLE_IMAGE_PATTERN.test(url.pathname) ||
			url.search.includes("imageMogr2")
		) {
			return undefined;
		}

		return url;
	} catch {
		return undefined;
	}
}

function normalizeQuality(quality: number | undefined) {
	const value =
		typeof quality === "number" && Number.isFinite(quality)
			? Math.round(quality)
			: DEFAULT_QUALITY;
	return Math.min(100, Math.max(1, value));
}

function normalizeWidth(width: number) {
	return Math.max(1, Math.round(width));
}

export default function tencentImageLoader({
	src,
	width,
	quality,
}: ImageLoaderProps) {
	const cosUrl = getTencentCosUrl(src);

	if (!cosUrl) {
		return src;
	}

	const querySeparator = cosUrl.search ? "&" : "?";
	const imageQuality = normalizeQuality(quality);
	const imageWidth = normalizeWidth(width);

	return `${src}${querySeparator}imageMogr2/thumbnail/${imageWidth}x>/quality/${imageQuality}/format/webp`;
}
