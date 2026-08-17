import {
	Building2Icon,
	GraduationCapIcon,
	MapPinIcon,
	UsersIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	ArticleDetailLayout,
	DetailSidebarCard,
} from "@/components/ArticleDetailLayout";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { PhoneButton } from "@/components/phone-action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { env } from "@/env";
import { imageUrl } from "@/lib/image-url";
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
	return `戴氏教育${campus.name}｜${area}地址、课程与咨询`;
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
	const images = (campus.gallery ?? []).map((image) =>
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

export default async function CampusDetailPage({ params }: PageProps) {
	const { slug } = await params;
	const campus = getCampusBySlug(slug);

	if (!campus) {
		notFound();
	}
	const stats = getCampusTeacherStats(campus.campusTeacherName);
	const programs = campus.programs ?? [];
	const serviceTags = campus.serviceTags ?? [];
	const gallery = campus.gallery ?? [];
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
					<DetailSidebarCard title="校区信息">
						<div className="space-y-3 text-muted-foreground text-sm leading-7">
							<p>城市：{campus.city}</p>
							{campus.district ? <p>区域：{campus.district}</p> : null}
							<p>
								地址：<AddressLink campus={campus} />
							</p>
							{campus.operationType ? (
								<p>
									运营方式：{campus.operationType === "direct" ? "直营校区" : "加盟校区"}
								</p>
							) : null}
							<p>咨询电话：{SITE_HOTLINE_TEXT}</p>
							{campus.updatedAt ? <p>资料更新：{campus.updatedAt}</p> : null}
						</div>
						<div className="mt-5 flex flex-col gap-2">
							<PhoneButton>电话咨询</PhoneButton>
							{campus.mapHref ? (
								<Button asChild variant="outline">
									<a href={campus.mapHref} rel="noopener noreferrer" target="_blank">
										查看导航
									</a>
								</Button>
							) : null}
							<Button asChild variant="outline">
								<Link href="/xiao-qu-cha-xun">返回校区列表</Link>
							</Button>
						</div>
					</DetailSidebarCard>
				}
			>
				<Card className="[--card-spacing:--spacing(6)]">
					<CardHeader className="border-b text-center">
						<div className="flex flex-wrap justify-center gap-2">
							<span className="rounded-full bg-primary/10 px-3 py-1 text-primary text-sm">
								{campus.city}{campus.district ? ` · ${campus.district}` : ""}
							</span>
							{campus.infoStatus === "pending" ? (
								<span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800 text-sm">
									信息待完善
								</span>
							) : null}
						</div>
						<CardTitle className="mt-4 font-bold text-xl leading-relaxed md:text-2xl">
							<h1>{campus.title}</h1>
						</CardTitle>
						<p className="mt-3 text-muted-foreground text-sm leading-7">
							<MapPinIcon className="mr-1 inline size-4 text-primary" />
							<AddressLink campus={campus} />
						</p>
					</CardHeader>
					<CardContent>
						{campus.infoStatus === "pending" ? (
							<p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900 text-sm leading-7">
								当前已收录校区名称、地址与咨询入口；课程、师资、环境等资料正在完善。
							</p>
						) : null}
						{campus.intro ? (
							<p className="mt-4 rounded-xl bg-muted p-4 text-muted-foreground text-sm leading-7">
								{campus.intro}
							</p>
						) : null}
						{campus.coverImage ? (
							<div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
								<Image
									alt={campus.title}
									className="object-cover"
									fill
									priority
									sizes="(max-width: 1024px) 100vw, 800px"
									src={imageUrl(campus.coverImage)}
								/>
							</div>
						) : null}

						<div className="mt-10 space-y-12">
							<section>
								<h2 className="font-bold text-2xl text-slate-950">校区基本信息</h2>
								<div className="mt-5 grid gap-4 md:grid-cols-2">
									<div className="rounded-2xl bg-slate-50 p-6">
										<div className="flex items-center gap-2 font-semibold text-slate-950">
											<Building2Icon className="size-4 text-primary" />
											<span>地址与咨询</span>
										</div>
										<div className="mt-4 space-y-3 text-slate-600 leading-8">
											<p>{campus.city}{campus.district ? ` · ${campus.district}` : ""}</p>
											<p><AddressLink campus={campus} /></p>
											<p>咨询热线：{SITE_HOTLINE_TEXT}</p>
										</div>
									</div>
									{serviceTags.length > 0 ? (
										<div className="rounded-2xl bg-slate-50 p-6">
											<div className="flex items-center gap-2 font-semibold text-slate-950">
												<GraduationCapIcon className="size-4 text-primary" />
												<span>已公开服务方向</span>
											</div>
											<div className="mt-4 flex flex-wrap gap-2">
												{serviceTags.map((tag) => (
													<span className="rounded-full bg-white px-3 py-1.5 text-slate-600 text-sm" key={tag}>
														{tag}
													</span>
												))}
											</div>
										</div>
									) : null}
								</div>
							</section>

							{programs.length > 0 ? (
								<section>
									<h2 className="font-bold text-2xl text-slate-950">课程与服务</h2>
									<div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
										{programs.map((program) => (
											<div className="border-slate-200 border-b px-6 py-5 last:border-b-0" key={program.title}>
												<h3 className="font-semibold text-lg text-slate-950">{program.title}</h3>
												<p className="mt-2 text-slate-600 leading-8">{program.description}</p>
											</div>
										))}
									</div>
								</section>
							) : null}

							{hasTeacherProfile ? (
								<section className="rounded-2xl bg-slate-50 p-6">
									<div className="flex items-center gap-2 font-semibold text-slate-950">
										<UsersIcon className="size-4 text-primary" />
										<span>公开师资</span>
									</div>
									<p className="mt-4 text-slate-600 leading-8">
										已公开 {stats.teacherCount} 位老师信息，覆盖 {stats.subjectCount} 个学科方向。
									</p>
									<Button asChild className="mt-5" variant="outline">
										<Link href={teacherHref ?? "/lao-shi"}>查看该校区老师</Link>
									</Button>
								</section>
							) : null}

							{gallery.length > 0 ? (
								<section>
									<h2 className="font-bold text-2xl text-slate-950">校区环境</h2>
									<div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
										{gallery.map((image) => (
											<div className="overflow-hidden rounded-2xl bg-slate-100" key={image.src}>
												<div className="relative aspect-[4/3]">
													<Image alt={image.alt} className="object-cover" fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" src={imageUrl(image.src)} />
												</div>
												<p className="border-slate-200 border-t bg-white px-4 py-3 text-slate-600 text-sm">{image.alt}</p>
											</div>
										))}
									</div>
								</section>
							) : null}
						</div>

						<section className="mt-12 rounded-2xl bg-slate-900 p-8 text-white md:p-10">
							<h2 className="font-bold text-3xl leading-tight">咨询校区安排</h2>
							<p className="mt-4 text-slate-300 leading-8">
								如需了解校区、课程或老师安排，可直接拨打 {SITE_HOTLINE_TEXT}。
							</p>
							<PhoneButton className="mt-7 h-12 rounded-xl px-8 text-base">电话咨询</PhoneButton>
						</section>
					</CardContent>
				</Card>
			</ArticleDetailLayout>
		</div>
	);
}
