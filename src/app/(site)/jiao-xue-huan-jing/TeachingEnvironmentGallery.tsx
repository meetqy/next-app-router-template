"use client";

import { useSearchParams } from "next/navigation";
import { PaginatedImageGallery } from "@/components/gallery/PaginatedImageGallery";
import {
	TEACHING_ENVIRONMENT_CATEGORIES,
	getTeachingEnvironmentCategory,
	type TeachingEnvironmentImage,
} from "@/lib/teaching-environment";

export function TeachingEnvironmentGallery({
	images,
}: {
	images: TeachingEnvironmentImage[];
}) {
	const searchParams = useSearchParams();
	const activeCategory = getTeachingEnvironmentCategory(
		searchParams.get("category") ?? undefined,
	);
	const categoryImages = activeCategory
		? images.filter((image) => image.category === activeCategory)
		: images;
	const requestedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
	const activePage = Number.isFinite(requestedPage) ? requestedPage : 1;

	return (
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
	);
}
