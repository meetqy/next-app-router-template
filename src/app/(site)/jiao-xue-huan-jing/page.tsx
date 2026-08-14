import type { Metadata } from "next";
import { PaginatedImageGallery } from "@/components/gallery/PaginatedImageGallery";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE_FULL_NAME } from "@/lib/constants/site";
import {
	TEACHING_ENVIRONMENT_CATEGORIES,
	getTeachingEnvironmentCategory,
	getTeachingEnvironmentCategoryImages,
	getTeachingEnvironmentImages,
} from "@/lib/teaching-environment";
import { getSiteOrigin } from "@/lib/site-routes";
import { createPageMetadata, getPublicImageUrl } from "@/lib/seo";

const PAGE_DESCRIPTION = `查看${SITE_FULL_NAME}课堂教学、学习日常、考试测评和空间环境实景照片，了解学生真实学习场景。`;

export const metadata: Metadata = createPageMetadata({
	description: PAGE_DESCRIPTION,
	path: "/jiao-xue-huan-jing",
	title: "戴氏教学环境实景",
});

type PageProps = {
	searchParams?: Promise<{
		category?: string;
		page?: string;
	}>;
};

export default async function TeachingEnvironmentPage({
	searchParams,
}: PageProps) {
	const resolvedSearchParams = await searchParams;
	const activeCategory = getTeachingEnvironmentCategory(
		resolvedSearchParams?.category,
	);
	const images = getTeachingEnvironmentImages();
	const categoryImages = activeCategory
		? getTeachingEnvironmentCategoryImages(activeCategory)
		: images;
	const parsedPage = Number.parseInt(resolvedSearchParams?.page ?? "1", 10);
	const activePage = Number.isFinite(parsedPage) ? parsedPage : 1;
	const pageUrl = new URL("/jiao-xue-huan-jing", getSiteOrigin()).toString();

	return (
		<div className="min-h-screen bg-white">
			<PageHeader
				badge={`${SITE_FULL_NAME} · 教学环境`}
				description="从课堂教学、学习日常、考试测评和空间环境四个方面，查看戴氏教育公开的教学环境实景照片。照片用于展示学习场景，具体课程、校区和到访安排请以咨询确认信息为准。"
				items={[
					{ label: "首页", href: "/" },
					{ label: "教学环境", href: "/jiao-xue-huan-jing" },
				]}
				title="戴氏教学环境实景"
			/>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "CollectionPage",
					description: PAGE_DESCRIPTION,
					mainEntity: {
						"@type": "ItemList",
						itemListElement: images.slice(0, 24).map((image, index) => ({
							"@type": "ListItem",
							name: image.alt,
							position: index + 1,
							url: getPublicImageUrl(image.src),
						})),
						numberOfItems: images.length,
					},
					name: "戴氏教学环境实景",
					url: pageUrl,
				}}
			/>
			<PaginatedImageGallery
				activeFilter={activeCategory}
				activePage={activePage}
				allFilter={{ count: images.length, label: "全部" }}
				basePath="/jiao-xue-huan-jing"
				emptyMessage="该分类暂未上传照片"
				filterAriaLabel="教学环境分类"
				filterParam="category"
				filters={TEACHING_ENVIRONMENT_CATEGORIES.map((category) => ({
					count: images.filter((image) => image.category === category.id).length,
					label: category.label,
					value: category.id,
				}))}
				images={categoryImages}
				paginationAriaLabel="教学环境图片分页"
			/>
		</div>
	);
}
