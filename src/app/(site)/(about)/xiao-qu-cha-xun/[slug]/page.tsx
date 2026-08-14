import {
	ArrowRightIcon,
	BookOpenTextIcon,
	Building2Icon,
	MapPinIcon,
	MessageSquareQuoteIcon,
	SchoolIcon,
	UsersIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import {
	ArticleDetailLayout,
	DetailSidebarCard,
} from "@/components/ArticleDetailLayout";
import { JsonLd } from "@/components/JsonLd";
import { MarkdownContent } from "@/components/MarkdownContent";
import { PageHeader } from "@/components/PageHeader";
import { PhoneButton, PhoneLink } from "@/components/phone-action";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import { imageUrl } from "@/lib/image-url";
import {
	type CampusProfile,
	getCampusBySlug,
	getCampusTeacherStats,
	getVisibleCampuses,
} from "@/lib/constants/campuses";
import { createAmapSearchHref } from "@/lib/constants/contact";
import { SITE_BRAND_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import {
	getKnowledgeCampusByAnySlug,
	getKnowledgeCampuses,
	resolveKnowledgeHref,
} from "@/lib/knowledge-base";
import { createNoIndexMetadata, createPageMetadata } from "@/lib/seo";

type PageProps = {
	params: Promise<{ slug: string }>;
};

type TocItem = {
	id: string;
	title: string;
};

export async function generateStaticParams() {
	const projectCampuses = getVisibleCampuses().map((campus) => ({
		slug: campus.slug,
	}));
	const archiveCampuses = getKnowledgeCampuses().map((campus) => ({
		slug: campus.slug,
	}));

	return [...projectCampuses, ...archiveCampuses];
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const campus = getCampusBySlug(slug);
	const archiveCampusResult = getKnowledgeCampusByAnySlug(slug);
	const archiveCampus = archiveCampusResult?.campus ?? null;

	if (!campus) {
		if (archiveCampus) {
			return createPageMetadata({
				description: archiveCampus.description ?? archiveCampus.address,
				path: `/xiao-qu-cha-xun/${archiveCampus.slug}`,
				title: `${archiveCampus.title}详情`,
			});
		}

		return createNoIndexMetadata("未找到校区");
	}

	return createPageMetadata({
		description: campus.listSummary,
		path: `/xiao-qu-cha-xun/${campus.slug}`,
		title: `${campus.name}详情`,
	});
}

function buildTocItems(campus: CampusProfile): TocItem[] {
	return [
		{ id: "ji-ben-xin-xi", title: "基本信息" },
		{ id: "ke-cheng-fu-wu", title: "课程与服务" },
		{ id: "xue-xi-huan-jing", title: "学习环境" },
		...(campus.review ? [{ id: "hao-ping-fan-kui", title: "家长反馈" }] : []),
		{ id: "jia-zhang-guan-zhu", title: "家长更关心什么" },
		{ id: "dao-xiao-zi-xun", title: "到校咨询" },
	];
}

function SectionHeading({
	description,
	label,
	title,
}: {
	description: string;
	label: string;
	title: string;
}) {
	return (
		<div className="mb-8">
			<div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-primary text-sm">
				{label}
			</div>
			<h2 className="mt-4 font-bold text-3xl text-slate-950 leading-tight">
				{title}
			</h2>
			<p className="mt-4 text-slate-600 leading-8">{description}</p>
		</div>
	);
}

function CampusStructuredData({
	campus,
	url,
}: {
	campus: CampusProfile;
	url: string;
}) {
	const siteUrl = new URL(`https://${env.NEXT_PUBLIC_SITE_DOMAIN}`);
	const pageUrl = new URL(url, siteUrl).toString();
	const images = campus.gallery.map((image) =>
		new URL(image.src, siteUrl).toString(),
	);

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "EducationalOrganization",
		name: campus.title,
		description: campus.listSummary,
		url: pageUrl,
		image: images,
		telephone: SITE_HOTLINE_TEXT,
		address: {
			"@type": "PostalAddress",
			addressCountry: "CN",
			addressLocality: "成都市",
			addressRegion: "四川省",
			streetAddress: campus.address,
		},
		brand: {
			"@type": "Organization",
			name: SITE_BRAND_NAME,
		},
	};

	return <JsonLd data={structuredData} />;
}

function AddressLink({
	address,
	className,
	href,
}: {
	address: string;
	className?: string;
	href?: string;
}) {
	if (!href) {
		return <>{address}</>;
	}

	return (
		<a
			className={className ?? "transition-colors hover:text-primary"}
			href={href}
			rel="noopener noreferrer"
			target="_blank"
		>
			{address}
		</a>
	);
}

export default async function CampusDetailPage({ params }: PageProps) {
	const { slug } = await params;
	const campus = getCampusBySlug(slug);
	const archiveCampusResult = getKnowledgeCampusByAnySlug(slug);
	const archiveCampus = archiveCampusResult?.campus ?? null;

	if (!campus && archiveCampusResult && !archiveCampusResult.isCanonical) {
		permanentRedirect(
			encodeURI(`/xiao-qu-cha-xun/${archiveCampusResult.campus.slug}`),
		);
	}

	if (!campus) {
		if (!archiveCampus) {
			notFound();
		}
		const archiveMapHref = createAmapSearchHref(
			`${archiveCampus.title}（${archiveCampus.address}）`,
		);

		return (
			<div className="min-h-screen bg-muted/40">
				<PageHeader
					breadcrumbOnly
					items={[
						{ label: "首页", href: "/" },
						{ label: "校区查询", href: "/xiao-qu-cha-xun" },
						{ label: archiveCampus.title, href: `/xiao-qu-cha-xun/${slug}` },
					]}
				/>
				<ArticleDetailLayout
					sidebar={
						<DetailSidebarCard title="到访提示">
							<div className="space-y-3 text-muted-foreground text-sm leading-7">
								<p>城市：{archiveCampus.city}</p>
								<p>
									地址：
									<AddressLink
										address={archiveCampus.address}
										href={archiveMapHref}
									/>
								</p>
								{archiveCampus.route ? <p>路线：{archiveCampus.route}</p> : null}
								<p>统一咨询电话：{SITE_HOTLINE_TEXT}</p>
							</div>
							<div className="mt-5 flex flex-col gap-2">
								<PhoneButton>电话咨询校区安排</PhoneButton>
								<Button asChild variant="outline">
									<Link href="/xiao-qu-cha-xun">返回全部校区</Link>
								</Button>
							</div>
						</DetailSidebarCard>
					}
				>
					<Card className="[--card-spacing:--spacing(6)]">
						<CardHeader className="border-b">
							<CardTitle className="text-center font-bold text-xl leading-relaxed md:text-2xl">
								<h1>{archiveCampus.title}</h1>
							</CardTitle>
							<CardDescription className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
								<span>{archiveCampus.city}校区</span>
								<Separator className="h-4" orientation="vertical" />
								<AddressLink
									address={archiveCampus.address}
									href={archiveMapHref}
								/>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 text-sm leading-7">
								如需了解校区路线、课程和到访安排，可以先拨打统一咨询电话：
								{SITE_HOTLINE_TEXT}
								{archiveCampus.legacyPhones.length > 0
									? `，${archiveCampus.legacyPhones
											.map(
												(phone) => `${SITE_HOTLINE_TEXT}(原 ${phone}，已弃用)`,
											)
											.join("、")}`
									: null}
							</div>
							<MarkdownContent
								className="mt-4"
								content={archiveCampus.content}
								resolveHref={resolveKnowledgeHref}
							/>
						</CardContent>
					</Card>
				</ArticleDetailLayout>
			</div>
		);
	}

	const tocItems = buildTocItems(campus);
	const stats = getCampusTeacherStats(campus.campusTeacherName);
	const campusTeacherHref =
		stats.teacherCount > 0 && campus.campusTeacherName
			? `/lao-shi?xiaoqu=${encodeURIComponent(campus.campusTeacherName)}`
			: null;

	return (
		<div className="min-h-screen bg-muted/40">
			<CampusStructuredData
				campus={campus}
				url={`/xiao-qu-cha-xun/${campus.slug}`}
			/>
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
					<>
						<DetailSidebarCard title="校区信息">
							<div className="space-y-3 text-muted-foreground text-sm leading-7">
								<p>校区定位：{campus.subtitle}</p>
								<p>
									地址：
									<AddressLink address={campus.address} href={campus.mapHref} />
								</p>
								<p>重点课程：{campus.programs.length} 类</p>
								<p>
									公开师资：
									{stats.teacherCount > 0
										? `${stats.teacherCount} 位，${stats.subjectCount} 个学科方向`
										: "持续更新中"}
								</p>
							</div>
							<div className="mt-5 flex flex-col gap-2">
								<PhoneButton>电话咨询到校安排</PhoneButton>
								{campus.mapHref ? (
									<Button asChild variant="outline">
										<a
											href={campus.mapHref}
											rel="noopener noreferrer"
											target="_blank"
										>
											查看导航
										</a>
									</Button>
								) : null}
								{campusTeacherHref ? (
									<Button asChild variant="outline">
										<Link href={campusTeacherHref}>查看该校区老师</Link>
									</Button>
								) : null}
								<Button asChild variant="outline">
									<Link href="/xiao-qu-cha-xun">返回校区列表</Link>
								</Button>
							</div>
						</DetailSidebarCard>

						<DetailSidebarCard title="校区目录">
							<nav className="flex flex-col gap-y-3 text-sm">
								{tocItems.map((item) => (
									<Link
										className="text-muted-foreground hover:text-primary"
										href={`#${item.id}`}
										key={item.id}
									>
										{item.title}
									</Link>
								))}
							</nav>
						</DetailSidebarCard>
					</>
				}
			>
				<Card className="[--card-spacing:--spacing(6)]">
					<CardHeader className="border-b">
						<CardTitle className="text-center font-bold text-xl leading-relaxed md:text-2xl">
							<h1>{campus.title}</h1>
						</CardTitle>
						<CardDescription className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
							<span>{campus.subtitle}</span>
							<Separator className="h-4" orientation="vertical" />
							<AddressLink address={campus.address} href={campus.mapHref} />
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="rounded-lg bg-muted p-4 text-muted-foreground text-sm leading-7">
							{campus.intro}
						</p>
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
						<div className="mt-6 grid gap-3 sm:grid-cols-3">
							<div className="rounded-xl bg-muted p-4 text-center">
								<p className="font-bold text-xl">{campus.serviceTags.length}</p>
								<p className="mt-1 text-muted-foreground text-xs">项服务方向</p>
							</div>
							<div className="rounded-xl bg-muted p-4 text-center">
								<p className="font-bold text-xl">{campus.programs.length}</p>
								<p className="mt-1 text-muted-foreground text-xs">类重点课程</p>
							</div>
							<div className="rounded-xl bg-muted p-4 text-center">
								<p className="font-bold text-xl">
									{stats.teacherCount || "待补充"}
								</p>
								<p className="mt-1 text-muted-foreground text-xs">公开师资</p>
							</div>
						</div>

						<div className="mt-12 space-y-16">
							<section className="scroll-mt-48 py-2" id="ji-ben-xin-xi">
								<SectionHeading
									description="先看这所校区的定位、地址和适合咨询的人群，家长能更快判断是否值得安排到校了解。"
									label="基本信息"
									title="先了解校区定位，再决定下一步咨询方向"
								/>
								<div className="grid gap-4 md:grid-cols-2">
									<div className="rounded-2xl bg-slate-50 p-6">
										<div className="flex items-center gap-2 font-semibold text-slate-950">
											<Building2Icon className="size-4 text-primary" />
											<span>校区概况</span>
										</div>
										<div className="mt-5 space-y-4 text-slate-600 leading-8">
											<p>
												<span className="font-medium text-slate-900">
													校区名称：
												</span>
												{campus.title}
											</p>
											<p>
												<span className="font-medium text-slate-900">
													校区定位：
												</span>
												{campus.subtitle}
											</p>
											<p>
												<span className="font-medium text-slate-900">
													咨询地址：
												</span>
												<AddressLink
													address={campus.address}
													className="font-medium text-slate-900 transition-colors hover:text-primary"
													href={campus.mapHref}
												/>
											</p>
										</div>
									</div>
									<div className="rounded-2xl bg-slate-50 p-6">
										<div className="flex items-center gap-2 font-semibold text-slate-950">
											<SchoolIcon className="size-4 text-primary" />
											<span>可关注方向</span>
										</div>
										<div className="mt-5 flex flex-wrap gap-2">
											{campus.serviceTags.map((tag) => (
												<span
													className="rounded-full bg-white px-3 py-1.5 text-slate-600 text-sm"
													key={tag}
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>

								<div className="mt-6 rounded-2xl bg-white">
									<div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 md:px-8">
										<div className="flex items-center gap-2 font-semibold text-slate-950">
											<UsersIcon className="size-4 text-primary" />
											<span>家长先看这些亮点</span>
										</div>
										<div className="mt-4 divide-y divide-slate-200">
											{campus.highlights.map((item) => (
												<div
													className="py-4 text-slate-600 leading-8"
													key={item}
												>
													{item}
												</div>
											))}
										</div>
									</div>
								</div>
							</section>

							<section className="scroll-mt-48 py-2" id="ke-cheng-fu-wu">
								<SectionHeading
									description="如果家长已经明确孩子处于哪个学段、目前最需要哪类支持，可以先从课程与服务方向做快速匹配。"
									label="课程与服务"
									title="先按孩子当前阶段筛选更合适的咨询内容"
								/>
								<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
									{campus.programs.map((program) => (
										<div
											className="border-slate-200 border-b px-6 py-5 last:border-b-0 md:px-8"
											key={program.title}
										>
											<h3 className="font-semibold text-lg text-slate-950">
												{program.title}
											</h3>
											<p className="mt-2 text-slate-600 leading-8">
												{program.description}
											</p>
										</div>
									))}
								</div>
							</section>

							<section className="scroll-mt-48 py-2" id="xue-xi-huan-jing">
								<SectionHeading
									description="对很多家长来说，实地环境是否整洁、教室是否清晰分区、孩子来校后是否容易进入学习状态，往往和最终选择同样重要。"
									label="学习环境"
									title="通过现场图片先看校区氛围与教学空间"
								/>
								<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
									{campus.gallery.map((image) => (
										<div
											className="overflow-hidden rounded-2xl bg-slate-100"
											key={image.src}
										>
											<div className="relative aspect-[4/3]">
												<Image
													alt={image.alt}
													className="object-cover"
													fill
													sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
													src={imageUrl(image.src)}
												/>
											</div>
											<div className="border-slate-200 border-t bg-white px-4 py-3 text-slate-600 text-sm">
												{image.alt}
											</div>
										</div>
									))}
								</div>
							</section>

							{campus.review ? (
								<section className="scroll-mt-48 py-2" id="hao-ping-fan-kui">
									<SectionHeading
										description="除了页面展示的信息外，很多家长还会特别在意到校后的真实感受，这类直接反馈能帮助家长更快建立第一印象。"
										label="家长反馈"
										title="先看看已经到访过的家长怎么评价"
									/>
									<div className="rounded-2xl bg-slate-50 p-6 md:p-8">
										<div className="flex items-center gap-2 text-primary text-sm">
											<MessageSquareQuoteIcon className="size-4" />
											<span>{campus.review.source}</span>
										</div>
										<p className="mt-5 text-lg text-slate-700 leading-9">
											“{campus.review.content}”
										</p>
									</div>
								</section>
							) : null}

							<section className="scroll-mt-48 py-2" id="jia-zhang-guan-zhu">
								<SectionHeading
									description="如果您还在比较不同校区，不妨从孩子的阶段目标、距离成本、老师匹配度和学习环境感受四个方向来判断。"
									label="家长关注"
									title="家长通常会从这些角度继续做校区比较"
								/>
								<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
									<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
										{campus.parentReasons.map((reason) => (
											<div
												className="border-slate-200 border-b px-6 py-5 text-slate-600 leading-8 last:border-b-0 md:px-8"
												key={reason}
											>
												{reason}
											</div>
										))}
									</div>

									<div className="rounded-2xl bg-slate-50 p-6">
										<div className="flex items-center gap-2 font-semibold text-slate-950">
											<BookOpenTextIcon className="size-4 text-primary" />
											<span>公开信息补充</span>
										</div>
										<div className="mt-5 space-y-4 text-slate-600 leading-8">
											<p>
												展示{" "}
												<span className="font-semibold text-slate-950">
													{campus.programs.length}
												</span>{" "}
												类重点课程方向，方便家长先筛选咨询内容。
											</p>
											<p>
												当前公开{" "}
												<span className="font-semibold text-slate-950">
													{stats.teacherCount}
												</span>{" "}
												位老师信息
												{stats.teacherCount > 0
													? `，覆盖 ${stats.subjectCount} 个学科方向。`
													: "，后续还会持续补充。"}
											</p>
										</div>
										{campusTeacherHref ? (
											<Button
												asChild
												className="mt-6 w-full rounded-xl"
												variant="outline"
											>
												<Link href={campusTeacherHref}>
													查看该校区老师
													<ArrowRightIcon className="size-4" />
												</Link>
											</Button>
										) : null}
									</div>
								</div>
							</section>

							<section className="scroll-mt-48 py-2" id="dao-xiao-zi-xun">
								<SectionHeading
									description="如果您希望进一步确认教室、学习氛围和咨询流程，建议先电话预约，再按校区安排到校沟通，会比临时到访更高效。"
									label="到校咨询"
									title="先预约，再到校实地了解学习环境"
								/>
								<div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
									<div className="px-6 py-6 md:px-8">
										<div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
											<div>
												<div className="flex items-center gap-2 text-primary text-sm">
													<MapPinIcon className="size-4" />
													<span>校区地址</span>
												</div>
												<p className="mt-3 font-medium text-slate-950 leading-8">
													<AddressLink
														address={campus.address}
														href={campus.mapHref}
													/>
												</p>
												<p className="mt-2 text-slate-600 text-sm leading-7">
													如需了解路线、停车、来访时间或试听安排，可直接拨打热线，我们会根据孩子情况协助您安排。
												</p>
											</div>
											<div className="flex flex-col gap-3 sm:flex-row">
												<PhoneButton className="h-11 rounded-xl px-6">
													电话预约到校
												</PhoneButton>
												{campus.mapHref ? (
													<Button
														asChild
														className="h-11 rounded-xl px-6"
														variant="outline"
													>
														<a
															href={campus.mapHref}
															rel="noopener noreferrer"
															target="_blank"
														>
															打开导航
														</a>
													</Button>
												) : (
													<Button
														asChild
														className="h-11 rounded-xl px-6"
														variant="outline"
													>
														<PhoneLink>先电话确认路线</PhoneLink>
													</Button>
												)}
											</div>
										</div>
									</div>
								</div>
							</section>

							<section className="rounded-2xl bg-slate-900 p-8 text-white md:p-10">
								<div className="inline-flex rounded-full bg-primary/20 px-3 py-1 text-primary text-sm">
									校区咨询
								</div>
								<h2 className="mt-5 font-bold text-3xl leading-tight md:text-4xl">
									想进一步了解 {campus.name} 是否适合孩子？
								</h2>
								<p className="mt-4 text-slate-300 leading-8">
									如果您还在比较校区、班型、老师方向或来访安排，可以直接电话沟通。我们会结合孩子当前阶段，帮助您更快判断下一步该怎么选。
								</p>
								<div className="mt-8 flex flex-col gap-3 sm:flex-row">
									<PhoneButton className="h-12 rounded-xl px-8 text-base">
										立即电话咨询
									</PhoneButton>
									<Button
										asChild
										className="h-12 rounded-xl border-white bg-white px-8 text-slate-900 hover:bg-slate-100 hover:text-slate-950"
										variant="outline"
									>
										<Link href="/xiao-qu-cha-xun">返回校区列表</Link>
									</Button>
								</div>
							</section>
						</div>
					</CardContent>
				</Card>
			</ArticleDetailLayout>
		</div>
	);
}
