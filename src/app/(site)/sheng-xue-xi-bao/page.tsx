import type { Metadata } from "next";
import { Suspense } from "react";
import { PaginatedImageGallery } from "@/components/gallery/PaginatedImageGallery";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { getAdmissionCelebrationYears } from "@/lib/admission-celebrations";
import { SITE_FULL_NAME } from "@/lib/constants/site";
import { getSiteOrigin } from "@/lib/site-routes";
import { createPageMetadata } from "@/lib/seo";
import { AdmissionCelebrationGallery } from "./AdmissionCelebrationGallery";

export const metadata: Metadata = createPageMetadata({
	description: `查看${SITE_FULL_NAME}历年大学录取案例图片展示，支持按年份查看与分页浏览，方便家长快速了解升学成果。`,
	path: "/sheng-xue-xi-bao",
	title: "升学案例",
});

export default async function ShengXueXiBaoPage() {
	const celebrationYears = await getAdmissionCelebrationYears();
	const pageUrl = new URL("/sheng-xue-xi-bao", getSiteOrigin()).toString();
	const defaultYear = celebrationYears[0];

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
			<PageHeader
				badge={`${SITE_FULL_NAME} · 升学案例`}
				description="集中展示戴氏教育学生考入大学的历年喜报图片，并按年份整理，方便查看各年度升学成果。"
				items={[
					{ label: "首页", href: "/" },
					{ label: "升学案例", href: "/sheng-xue-xi-bao" },
				]}
				title="历年大学录取案例"
			/>

			<JsonLd data={jsonLd} />

			<Suspense
				fallback={
					<PaginatedImageGallery
						activeFilter={defaultYear?.year}
						activePage={1}
						basePath="/sheng-xue-xi-bao"
						emptyMessage="暂未上传升学案例图片"
						filterAriaLabel="升学案例年份"
						filterParam="year"
						filters={celebrationYears.map((year) => ({
							count: year.images.length,
							label: `${year.year}年`,
							value: year.year,
						}))}
						images={defaultYear?.images ?? []}
						paginationAriaLabel="升学案例图片分页"
					/>
				}
			>
				<AdmissionCelebrationGallery years={celebrationYears} />
			</Suspense>
		</div>
	);
}
