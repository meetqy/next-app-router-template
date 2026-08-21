import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleDetailLayout } from "@/components/ArticleDetailLayout";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { CampusEnvironmentGallery } from "@/components/campus/CampusEnvironmentGallery";
import { CampusReviews } from "@/components/campus/CampusReviews";
import { PhoneButton, PhoneLink } from "@/components/phone-action";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { env } from "@/env";
import { imageUrl } from "@/lib/image-url";
import { cn } from "@/lib/utils";
import {
	createAmapSearchHref,
	createTencentSearchHref,
} from "@/lib/constants/contact";
import {
	type CampusProfile,
	getCampusBySlug,
	getCampusTeacherStats,
	getCampuses,
} from "@/lib/constants/campuses";
import { SITE_BRAND_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import { createNoIndexMetadata, createPageMetadata } from "@/lib/seo";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
	return getCampuses().map((campus) => ({ slug: campus.slug }));
}

function getCampusTitle(campus: CampusProfile) {
	const area = `${campus.city}${campus.district ?? ""}`;
	return `${campus.title}｜${area}地址、课程与咨询`;
}

function getCampusDescription(campus: CampusProfile) {
	const area = `${campus.city}${campus.district ? `${campus.district} ` : ""}`;
	return campus.infoStatus === "complete"
		? `${area}${campus.name}地址、导航、课程、师资与咨询信息。`
		: `${area}${campus.name}校区地址与咨询资料，更多信息持续完善中。`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const campus = getCampusBySlug(slug);

	if (!campus) {
		return createNoIndexMetadata("未找到校区");
	}

	return createPageMetadata({
		description: getCampusDescription(campus),
		noIndex: campus.infoStatus === "pending",
		path: `/xiao-qu-cha-xun/${campus.slug}`,
		title: getCampusTitle(campus),
	});
}

function CampusStructuredData({ campus }: { campus: CampusProfile }) {
	const siteUrl = new URL(`https://${env.NEXT_PUBLIC_SITE_DOMAIN}`);
	const pageUrl = new URL(
		`/xiao-qu-cha-xun/${campus.slug}`,
		siteUrl,
	).toString();
	const entranceImages =
		campus.entranceImages ??
		(campus.coverImage
			? [{ src: campus.coverImage, alt: `${campus.name}门头` }]
			: []);
	const images = [
		...entranceImages,
		...(campus.programImages ?? []),
		...(campus.gallery ?? []),
	].map((image) =>
		new URL(imageUrl(image.src), siteUrl).toString(),
	);

	return (
		<JsonLd
			data={{
				"@context": "https://schema.org",
				"@type": "EducationalOrganization",
				address: {
					"@type": "PostalAddress",
					addressCountry: "CN",
					addressLocality: campus.city,
					...(campus.district ? { addressRegion: campus.district } : {}),
					streetAddress: campus.address,
				},
				brand: { "@type": "Organization", name: SITE_BRAND_NAME },
				description: getCampusDescription(campus),
				...(images.length > 0 ? { image: images } : {}),
				name: campus.title,
				telephone: SITE_HOTLINE_TEXT,
				url: pageUrl,
			}}
		/>
	);
}

function AddressLink({ campus }: { campus: CampusProfile }) {
	if (!campus.mapHref) return <>{campus.address}</>;

	return (
		<a
			className="font-medium text-slate-900 transition-colors hover:text-primary"
			href={campus.mapHref}
			rel="noopener noreferrer"
			target="_blank"
		>
			{campus.address}
		</a>
	);
}

function CampusMapLinks({
	campus,
	className,
}: {
	campus: CampusProfile;
	className?: string;
}) {
	const mapLinks = getCampusMapLinks(campus);

	if (mapLinks.length === 0) return null;

	return (
		<div className={cn("flex flex-wrap justify-center gap-2", className)}>
			{mapLinks.map((link) => (
				<Button asChild key={link.href} size="sm" variant="outline">
					<a href={link.href} rel="noopener noreferrer" target="_blank">
						{link.label}
					</a>
				</Button>
			))}
		</div>
	);
}

function CampusLocation({ campus }: { campus: CampusProfile }) {
	const mapLinks = getCampusMapLinks(campus);
	const mapScreenshot = getCampusMapScreenshot(campus);
	const amapHref = mapLinks.find((link) => link.label === "高德地图")?.href;

	if (mapLinks.length === 0 && !mapScreenshot) return null;

	const mapPreview = mapScreenshot ? (
		<div className="relative aspect-[16/9] overflow-hidden bg-muted">
			<Image
				alt={`${campus.name}高德地图位置`}
				className="object-contain"
				fill
				sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 800px"
				src={imageUrl(mapScreenshot)}
			/>
		</div>
	) : null;

	return (
		<section className="border-border/70 border-t py-7 md:py-8">
			<h2 className="font-bold text-2xl text-slate-950">校区位置</h2>
			<div className="mt-6">
				<p className="text-muted-foreground leading-7">
					<span className="mr-2 text-slate-950">地址</span>
					<AddressLink campus={campus} />
				</p>
				{mapPreview && amapHref ? (
					<a
						aria-label={`在高德地图中查看${campus.name}`}
						className="mt-4 block"
						href={amapHref}
						rel="noopener noreferrer"
						target="_blank"
					>
						{mapPreview}
					</a>
				) : (
					mapPreview ? <div className="mt-4">{mapPreview}</div> : null
				)}
				<CampusMapLinks campus={campus} className={mapScreenshot ? "mt-4" : undefined} />
			</div>
		</section>
	);
}

function getCampusMapScreenshot(campus: CampusProfile) {
	const imagePaths = [
		campus.coverImage,
		...(campus.entranceImages ?? []).map((image) => image.src),
		...(campus.programImages ?? []).map((image) => image.src),
		...(campus.gallery ?? []).map((image) => image.src),
	];
	const campusImagePrefix = `/校区/${campus.name}/`;

	return imagePaths.some((path) => path?.startsWith(campusImagePrefix))
		? `${campusImagePrefix}高德.png`
		: undefined;
}

function getCampusMapLinks(campus: CampusProfile) {
	if (campus.mapLinks && campus.mapLinks.length > 0) return campus.mapLinks;

	const query = `${campus.title}（${campus.address}）`;
	return [
		{ href: campus.mapHref ?? createAmapSearchHref(query), label: "高德地图" },
		{ href: createTencentSearchHref(query), label: "腾讯地图" },
	];
}

function CampusImage({
	image,
	maxHeight = false,
	priority = false,
}: {
	image: NonNullable<CampusProfile["gallery"]>[number];
	maxHeight?: boolean;
	priority?: boolean;
}) {
	return (
		<div
			className={
				maxHeight
					? "relative h-[min(75vw,32rem)] overflow-hidden bg-slate-100"
					: "relative aspect-[4/3] overflow-hidden bg-slate-100"
			}
		>
			<Image
				alt={image.alt}
				className="object-contain"
				fill
				priority={priority}
				sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 800px"
				src={imageUrl(image.src)}
			/>
		</div>
	);
}

function CampusEntranceImages({ campus }: { campus: CampusProfile }) {
	const entranceImages =
		campus.entranceImages ??
		(campus.coverImage
			? [{ src: campus.coverImage, alt: `${campus.name}门头` }]
			: []);

	if (entranceImages.length === 0) return null;

	if (entranceImages.length === 1) {
		return <CampusImage image={entranceImages[0]} maxHeight priority />;
	}

	if (entranceImages.length === 2) {
		return (
			<div className="grid gap-3 md:grid-cols-2">
				{entranceImages.map((image, index) => (
					<CampusImage image={image} key={image.src} priority={index === 0} />
				))}
			</div>
		);
	}

	const [primaryImage, ...secondaryImages] = entranceImages;
	return (
		<div className="space-y-3">
			<div className="grid gap-3 md:grid-cols-[2fr_1fr]">
				<div className="md:row-span-2">
					<CampusImage image={primaryImage} priority />
				</div>
				<div className="grid grid-cols-2 gap-3 md:grid-cols-1">
					{secondaryImages.slice(0, 2).map((image) => (
						<CampusImage image={image} key={image.src} />
					))}
				</div>
			</div>
			{secondaryImages.length > 2 ? (
				<div className="grid gap-3 sm:grid-cols-2">
					{secondaryImages.slice(2).map((image) => (
						<CampusImage image={image} key={image.src} />
					))}
				</div>
			) : null}
		</div>
	);
}

export default async function CampusDetailPage({ params }: PageProps) {
	const { slug } = await params;
	const campus = getCampusBySlug(slug);

	if (!campus) {
		notFound();
	}
	const stats = getCampusTeacherStats(campus.campusTeacherName);
	const programs = campus.programs ?? [];
	const programImages = campus.programImages ?? [];
	const gallery = campus.gallery ?? [];
	const reviews = campus.reviews ?? [];
	const hasTeacherProfile = Boolean(campus.campusTeacherName && stats.teacherCount > 0);
	const teacherHref = hasTeacherProfile
		? `/lao-shi?xiaoqu=${encodeURIComponent(campus.campusTeacherName ?? "")}`
		: null;

	return (
		<div className="min-h-screen bg-muted/40">
			{campus.infoStatus === "complete" ? (
				<CampusStructuredData campus={campus} />
			) : null}
			<PageHeader
				breadcrumbOnly
				items={[
					{ label: "首页", href: "/" },
					{ label: "校区查询", href: "/xiao-qu-cha-xun" },
					{ label: campus.name, href: `/xiao-qu-cha-xun/${campus.slug}` },
				]}
			/>
			<ArticleDetailLayout
				sidebar={
					<Card className="gap-0 py-0">
						<CardHeader className="border-b px-5 py-5">
							<CardTitle>校区咨询</CardTitle>
							<CardDescription className="mt-1 line-clamp-2">
								{campus.title}
							</CardDescription>
						</CardHeader>
						<CardContent className="px-5 py-5">
							<div>
								<p className="text-muted-foreground text-xs">统一咨询电话</p>
								<PhoneLink className="mt-1 block font-bold text-2xl text-primary tracking-tight">
									{SITE_HOTLINE_TEXT}
								</PhoneLink>
								<p className="mt-2 text-muted-foreground text-xs leading-6">
									咨询课程服务与校区安排
								</p>
							</div>
							<PhoneButton className="mt-5 w-full">电话咨询</PhoneButton>
						</CardContent>
					</Card>
				}
			>
				<Card className="py-0 [--card-spacing:--spacing(6)]">
					<CampusEntranceImages campus={campus} />
					<CardContent className="py-0">
						<header className="py-7 md:py-8">
							<div className="flex flex-wrap items-center gap-2">
								<span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-medium text-primary text-sm">
									{campus.city}{campus.district ? ` · ${campus.district}` : ""}
								</span>
								{campus.operationType ? (
									<span className="rounded-full border px-3 py-1 text-muted-foreground text-sm">
										{campus.operationType === "direct" ? "直营校区" : "加盟校区"}
									</span>
								) : null}
								{campus.infoStatus === "pending" ? (
									<span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-800 text-xs">
										信息待完善
									</span>
								) : null}
							</div>
							<h1 className="mt-4 max-w-3xl font-bold text-3xl text-slate-950 leading-tight md:text-4xl">
								{campus.title}
							</h1>
							{campus.intro ? (
								<p className="mt-5 max-w-3xl text-muted-foreground leading-8">
									{campus.intro}
								</p>
							) : null}
						</header>

						{campus.infoStatus === "pending" ? (
							<p className="bg-amber-50/70 px-5 py-4 text-amber-900 text-sm leading-7">
								当前已收录校区名称、地址与咨询入口；课程、师资、环境等资料正在完善。
							</p>
						) : null}

						{programs.length > 0 || programImages.length > 0 ? (
							<section className="border-border/70 border-t py-7 md:py-8">
								<h2 className="font-bold text-2xl text-slate-950">课程服务</h2>
								{programs.length > 0 ? (
									<div className="mt-6 grid gap-x-10 gap-y-1 md:grid-cols-2">
										{programs.map((program, index) => (
											<article className="grid grid-cols-[2.5rem_1fr] gap-3 py-5" key={program.title}>
												<span className="font-semibold text-primary/45 text-sm">
													{String(index + 1).padStart(2, "0")}
												</span>
												<div>
													<h3 className="font-semibold text-slate-950">{program.title}</h3>
													{program.description ? (
														<p className="mt-2 text-muted-foreground text-sm leading-7">
															{program.description}
														</p>
													) : null}
												</div>
											</article>
										))}
									</div>
								) : null}
								{programImages.length > 0 ? (
									<div className="mt-6 grid gap-x-4 gap-y-6 md:grid-cols-2">
										{programImages.map((image) => (
											<figure key={image.src}>
												<CampusImage image={image} />
												<figcaption className="mt-2 text-muted-foreground text-sm">
													{image.alt}
												</figcaption>
											</figure>
										))}
									</div>
								) : null}
							</section>
						) : null}

						{hasTeacherProfile ? (
							<section className="border-border/70 border-t py-7 md:py-8">
								<div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
									<div>
										<h2 className="font-bold text-2xl text-slate-950">公开师资</h2>
										<p className="mt-2 text-muted-foreground leading-7">
											已公开 {stats.teacherCount} 位老师信息，覆盖 {stats.subjectCount} 个学科方向。
										</p>
									</div>
									<Button asChild className="shrink-0" variant="outline">
										<Link href={teacherHref ?? "/lao-shi"}>查看老师</Link>
									</Button>
								</div>
							</section>
						) : null}

						<CampusLocation campus={campus} />

		{gallery.length > 0 ? <CampusEnvironmentGallery campus={campus} images={gallery} /> : null}

		<CampusReviews reviews={reviews} />

					</CardContent>
				</Card>
			</ArticleDetailLayout>
		</div>
	);
}
