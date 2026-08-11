import type { Metadata } from "next";
import { env } from "@/env";
import { imageUrl } from "@/lib/image-url";
import { SITE_BRAND_NAME } from "@/lib/constants/site";

export type PageMetadataOptions = {
	authors?: string[];
	description: string;
	image?: string;
	noIndex?: boolean;
	openGraphType?: "article" | "website";
	path: string;
	publishedTime?: string;
	title: string;
};

const DEFAULT_SOCIAL_IMAGE = "/assets/高考提分解决方案-(4).png";

export function getSiteUrl(path = "/") {
	return new URL(path, `https://${env.NEXT_PUBLIC_SITE_DOMAIN}`);
}

export function getPublicImageUrl(path: string) {
	return getSiteUrl(imageUrl(path)).toString();
}

export function normalizeSeoDate(value?: string) {
	const normalizedValue = value?.trim();
	if (!normalizedValue || !/^\d{4}-\d{2}-\d{2}(?:$|[T\s])/.test(normalizedValue)) {
		return undefined;
	}

	const date = new Date(normalizedValue);
	return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function createPageMetadata({
	authors,
	description,
	image = DEFAULT_SOCIAL_IMAGE,
	noIndex = false,
	openGraphType = "website",
	path,
	publishedTime,
	title,
}: PageMetadataOptions): Metadata {
	const imageUrl = getPublicImageUrl(image);
	const sharedOpenGraph = {
		description,
		images: [{ alt: title, url: imageUrl }],
		locale: "zh_CN",
		siteName: SITE_BRAND_NAME,
		title,
		url: path,
	};
	const openGraph =
		openGraphType === "article"
			? {
					...sharedOpenGraph,
					authors,
					publishedTime,
					type: "article" as const,
				}
			: {
					...sharedOpenGraph,
					type: "website" as const,
				};

	return {
		description,
		alternates: {
			canonical: path,
		},
		openGraph,
		robots: noIndex ? { follow: true, index: false } : undefined,
		title,
		twitter: {
			card: "summary_large_image",
			description,
			images: [imageUrl],
			title,
		},
	};
}

export function createNoIndexMetadata(title = "未找到页面"): Metadata {
	return {
		robots: { follow: true, index: false },
		title,
	};
}
