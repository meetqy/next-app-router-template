"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import { Button } from "@/components/ui/button";
import { imageUrl } from "@/lib/image-url";

export type GalleryImage = {
	alt: string;
	height: number;
	src: string;
	width: number;
};

export type GalleryFilter = {
	count: number;
	label: string;
	value: string;
};

type PaginatedImageGalleryProps = {
	activeFilter?: string;
	activePage: number;
	allFilter?: {
		count: number;
		label: string;
	};
	basePath: string;
	emptyMessage: string;
	filterAriaLabel: string;
	filterParam: string;
	filters: GalleryFilter[];
	images: GalleryImage[];
	itemsPerPage?: number;
	paginationAriaLabel: string;
};

function buildGalleryHref(
	basePath: string,
	filterParam: string,
	filter: string | undefined,
	page: number,
) {
	const params = new URLSearchParams();
	if (filter) params.set(filterParam, filter);
	if (page > 1) params.set("page", String(page));
	const query = params.toString();
	return query ? `${basePath}?${query}` : basePath;
}

export function PaginatedImageGallery({
	activeFilter,
	activePage,
	allFilter,
	basePath,
	emptyMessage,
	filterAriaLabel,
	filterParam,
	filters,
	images,
	itemsPerPage = 24,
	paginationAriaLabel,
}: PaginatedImageGalleryProps) {
	const [activeImageIndex, setActiveImageIndex] = useState<number>();
	const totalPages = Math.max(1, Math.ceil(images.length / itemsPerPage));
	const currentPage = Math.min(Math.max(activePage, 1), totalPages);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const pageImages = images.slice(startIndex, startIndex + itemsPerPage);
	const photos = pageImages.map((image) => ({
		...image,
		label: `查看${image.alt}大图`,
		src: imageUrl(image.src),
	}));

	return (
		<section className="mx-auto w-full max-w-7xl bg-white px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
			{allFilter || filters.length > 0 ? (
				<nav aria-label={filterAriaLabel} className="flex flex-wrap gap-2">
					{allFilter ? (
						<Link
							aria-current={!activeFilter ? "page" : undefined}
							className={`rounded-full border px-4 py-2 font-medium text-sm transition-colors ${
								!activeFilter
									? "border-primary bg-primary text-white"
									: "border-slate-200 bg-white text-slate-700 hover:border-primary/40 hover:text-primary"
							}`}
							href={buildGalleryHref(basePath, filterParam, undefined, 1)}
						>
							{allFilter.label}{" "}
							<span className="text-xs opacity-75">{allFilter.count}</span>
						</Link>
					) : null}
					{filters.map((filter) => {
						const isActive = filter.value === activeFilter;
						return (
							<Link
								aria-current={isActive ? "page" : undefined}
								className={`rounded-full border px-4 py-2 font-medium text-sm transition-colors ${
									isActive
										? "border-primary bg-primary text-white"
										: "border-slate-200 bg-white text-slate-700 hover:border-primary/40 hover:text-primary"
								}`}
								href={buildGalleryHref(basePath, filterParam, filter.value, 1)}
								key={filter.value}
							>
								{filter.label}{" "}
								<span className="text-xs opacity-75">{filter.count}</span>
							</Link>
						);
					})}
				</nav>
			) : null}

			{photos.length > 0 ? (
				<RowsPhotoAlbum
					breakpoints={[1200, 768, 480, 0]}
					componentsProps={{ container: { className: "mt-8" } }}
					onClick={({ index }) => setActiveImageIndex(index)}
					photos={photos}
					render={{
						image: ({ className, sizes, title }, { photo }) => (
							<Image
								alt={photo.alt ?? ""}
								className={className}
								height={photo.height}
								{...(sizes ? { sizes } : {})}
								src={photo.src}
								title={title}
								width={photo.width}
							/>
						),
					}}
					rowConstraints={{ minPhotos: 1, singleRowMaxHeight: 360 }}
					spacing={8}
					targetRowHeight={(containerWidth) =>
						containerWidth < 480 ? 130 : containerWidth < 768 ? 170 : 220
					}
				/>
			) : (
				<div className="mt-8 border-slate-200 border-y py-12 text-center text-slate-500">
					{emptyMessage}
				</div>
			)}

			{totalPages > 1 ? (
				<nav
					aria-label={paginationAriaLabel}
					className="mt-8 flex flex-col gap-4 border-slate-200 border-t pt-6 sm:flex-row sm:items-center sm:justify-between"
				>
					<p className="text-slate-500 text-sm">共 {images.length} 张图片，按页浏览</p>
					<div className="flex items-center gap-2">
						{currentPage === 1 ? (
							<Button disabled size="sm" variant="outline">
								<ChevronLeftIcon className="size-4" />
								上一页
							</Button>
						) : (
							<Button asChild size="sm" variant="outline">
								<Link
									href={buildGalleryHref(
										basePath,
										filterParam,
										activeFilter,
										currentPage - 1,
									)}
								>
									<ChevronLeftIcon className="size-4" />
									上一页
								</Link>
							</Button>
						)}
						<span className="min-w-18 text-center text-slate-600 text-sm">
							{currentPage} / {totalPages}
						</span>
						{currentPage === totalPages ? (
							<Button disabled size="sm" variant="outline">
								下一页
								<ChevronRightIcon className="size-4" />
							</Button>
						) : (
							<Button asChild size="sm" variant="outline">
								<Link
									href={buildGalleryHref(
										basePath,
										filterParam,
										activeFilter,
										currentPage + 1,
									)}
								>
									下一页
									<ChevronRightIcon className="size-4" />
								</Link>
							</Button>
						)}
					</div>
				</nav>
			) : null}

			<Lightbox
				close={() => setActiveImageIndex(undefined)}
				index={activeImageIndex ?? 0}
				open={activeImageIndex !== undefined}
				slides={photos}
			/>
		</section>
	);
}
