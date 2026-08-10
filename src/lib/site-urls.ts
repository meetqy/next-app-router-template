import { getSiteOrigin, getSiteRoutes } from "@/lib/site-routes";

export const URLS_PER_PAGE = 500;

export function getSiteUrls() {
	const siteOrigin = getSiteOrigin();

	return Array.from(
		new Set(
			getSiteRoutes().map((route) =>
				new URL(route.path, siteOrigin).toString(),
			),
		),
	);
}

export function buildUrlsText(urls: string[]) {
	return `${urls.join("\n")}\n`;
}

export function createUrlsTextResponse(urls: string[]) {
	return new Response(buildUrlsText(urls), {
		headers: {
			"Cache-Control": "public, max-age=0, s-maxage=86400",
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}
