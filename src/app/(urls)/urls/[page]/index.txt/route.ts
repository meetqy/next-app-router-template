import {
	createUrlsTextResponse,
	getSiteUrls,
	URLS_PER_PAGE,
} from "@/lib/site-urls";

type RouteContext = {
	params: Promise<{ page: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
	const { page } = await context.params;
	const pageNumber = Number(page);

	if (
		!/^\d+$/.test(page) ||
		!Number.isSafeInteger(pageNumber) ||
		pageNumber < 1
	) {
		return new Response(null, { status: 404 });
	}

	const urls = getSiteUrls();
	const pageStart = (pageNumber - 1) * URLS_PER_PAGE;

	if (pageStart >= urls.length) {
		return new Response(null, { status: 404 });
	}

	return createUrlsTextResponse(
		urls.slice(pageStart, pageStart + URLS_PER_PAGE),
	);
}

export const dynamicParams = false;

export function generateStaticParams() {
	const totalPages = Math.ceil(getSiteUrls().length / URLS_PER_PAGE);

	return Array.from({ length: totalPages }, (_, index) => ({
		page: String(index + 1),
	}));
}
