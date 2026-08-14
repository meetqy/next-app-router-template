"use client";

import { useSearchParams } from "next/navigation";
import { PaginatedImageGallery } from "@/components/gallery/PaginatedImageGallery";
import type { AdmissionCelebrationYear } from "@/lib/admission-celebrations";

export function AdmissionCelebrationGallery({
	years,
}: {
	years: AdmissionCelebrationYear[];
}) {
	const searchParams = useSearchParams();
	const requestedYear = searchParams.get("year");
	const activeGroup =
		years.find((item) => item.year === requestedYear) ?? years[0];
	const parsedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
	const activePage = Number.isFinite(parsedPage) ? parsedPage : 1;

	return (
		<PaginatedImageGallery
			activeFilter={activeGroup?.year}
			activePage={activePage}
			basePath="/sheng-xue-xi-bao"
			emptyMessage="暂未上传升学案例图片"
			filterAriaLabel="升学案例年份"
			filterParam="year"
			filters={years.map((year) => ({
				count: year.images.length,
				label: `${year.year}年`,
				value: year.year,
			}))}
			images={activeGroup?.images ?? []}
			paginationAriaLabel="升学案例图片分页"
		/>
	);
}
