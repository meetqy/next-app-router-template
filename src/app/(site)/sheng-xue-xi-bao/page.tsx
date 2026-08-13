import type { Metadata } from "next";
import { PaginatedImageGallery } from "@/components/gallery/PaginatedImageGallery";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PageTopNav } from "@/components/PageTopNav";
import { getAdmissionCelebrationYears } from "@/lib/admission-celebrations";
import { SITE_FULL_NAME } from "@/lib/constants/site";
import { getSiteOrigin } from "@/lib/site-routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	description: `查看${SITE_FULL_NAME}历年大学录取案例图片展示，支持按年份查看与分页浏览，方便家长快速了解升学成果。`,
	path: "/sheng-xue-xi-bao",
	title: "升学案例",
});

type PageProps = {
	searchParams?: Promise<{
		page?: string;
		year?: string;
	}>;
};

export default async function ShengXueXiBaoPage({ searchParams }: PageProps) {
	const resolvedSearchParams = await searchParams;
	const celebrationYears = await getAdmissionCelebrationYears();
	const activeYear = celebrationYears.some(
		(item) => item.year === resolvedSearchParams?.year,
	)
		? resolvedSearchParams?.year
		: celebrationYears[0]?.year;
	const activeGroup = celebrationYears.find((item) => item.year === activeYear);
	const parsedPage = Number.parseInt(resolvedSearchParams?.page ?? "1", 10);
	const activePage = Number.isFinite(parsedPage) ? parsedPage : 1;
	const pageUrl = new URL("/sheng-xue-xi-bao", getSiteOrigin()).toString();

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		description: `查看${SITE_FULL_NAME}历年大学录取案例图片展示，支持按年份查看与分页浏览。`,
		image: celebrationYears[0]?.images[0]?.src,
		mainEntity: {
			"@type": "ItemList",
			itemListElement: celebrationYears.map((year, index) => ({
				"@type": "ListItem",
				name: `${year.year}年大学录取案例`,
				position: index + 1,
				url: pageUrl,
			})),
			numberOfItems: celebrationYears.length,
		},
		name: `${SITE_FULL_NAME}升学案例`,
		url: pageUrl,
	};

	return (
		<div className="min-h-screen bg-white">
			<PageTopNav
				items={[
					{ label: "首页", href: "/" },
					{ label: "升学案例", href: "/sheng-xue-xi-bao" },
				]}
			/>

			<JsonLd data={jsonLd} />

			<PageHero
				badge={`${SITE_FULL_NAME} · 升学案例`}
				description="集中展示戴氏教育学生考入大学的历年喜报图片，并按年份整理，方便查看各年度升学成果。"
				title="历年大学录取案例"
			/>

			<PaginatedImageGallery
				activeFilter={activeYear}
				activePage={activePage}
				basePath="/sheng-xue-xi-bao"
				emptyMessage="暂未上传升学案例图片"
				filterAriaLabel="升学案例年份"
				filterParam="year"
				filters={celebrationYears.map((year) => ({
					count: year.images.length,
					label: `${year.year}年`,
					value: year.year,
				}))}
				images={activeGroup?.images ?? []}
				paginationAriaLabel="升学案例图片分页"
			/>
		</div>
	);
}
