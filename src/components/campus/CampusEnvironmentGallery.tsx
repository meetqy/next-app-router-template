import Image from "next/image";
import type { ReactNode } from "react";
import {
	PaginatedImageGallery,
	type GalleryImage,
} from "@/components/gallery/PaginatedImageGallery";
import type { CampusProfile } from "@/lib/constants/campuses";
import { imageUrl } from "@/lib/image-url";

function CampusImage({ image }: { image: NonNullable<CampusProfile["gallery"]>[number] }) {
	return (
		<div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
			<Image
				alt={image.alt}
				className="object-contain"
				fill
				sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 800px"
				src={imageUrl(image.src)}
			/>
		</div>
	);
}

export function CampusEnvironmentGallery({
	campus,
	images,
}: {
	campus: CampusProfile;
	images: NonNullable<CampusProfile["gallery"]>;
}) {
	const galleryImages: GalleryImage[] = images.flatMap((image) =>
		image.width && image.height ? [{ ...image, height: image.height, width: image.width }] : [],
	);

	if (galleryImages.length !== images.length) {
		return <CampusEnvironmentSection campus={campus}>
			<div className="grid gap-x-4 gap-y-6 md:grid-cols-2">
				{images.map((image) => (
					<figure key={image.src}>
						<CampusImage image={image} />
						<figcaption className="mt-2 text-muted-foreground text-sm">{image.alt}</figcaption>
					</figure>
				))}
			</div>
		</CampusEnvironmentSection>;
	}

	return <CampusEnvironmentSection campus={campus}>
		<PaginatedImageGallery
			activePage={1}
			basePath={`/xiao-qu-cha-xun/${campus.slug}`}
			className="max-w-none bg-transparent px-0 pb-0 sm:px-0 md:pb-0 lg:px-0"
			emptyMessage="该校区暂未上传环境图片"
			filterAriaLabel={`${campus.name}环境图片`}
			filterParam=""
			filters={[]}
			images={galleryImages}
			itemsPerPage={galleryImages.length}
			paginationAriaLabel={`${campus.name}环境图片分页`}
		/>
 	</CampusEnvironmentSection>;
}

function CampusEnvironmentSection({
	campus,
	children,
}: {
	campus: CampusProfile;
	children: ReactNode;
}) {
	return (
		<section className="border-border/70 border-t py-7 md:py-8">
			<h2 className="font-bold text-2xl text-slate-950">{campus.galleryTitle ?? "校区环境"}</h2>
			<div className="mt-6 [margin-inline:calc(var(--card-spacing)*-1)]">{children}</div>
		</section>
	);
}
