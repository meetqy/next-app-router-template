import { ArrowRightIcon, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageTopNav } from "@/components/PageTopNav";
import { PhoneButton, PhoneLink } from "@/components/phone-action";
import { TableOfContents } from "@/components/TableOfContents";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type {
	BottomCta,
	CampusDirectorySection,
	JiaZhangArticle,
	SimpleArticleTable,
} from "@/lib/constants/jia-zhang-fu-wu";
import { SITE_BRAND_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import {
	getAllJiaZhangArticles,
	getJiaZhangArticleBySlug,
} from "@/lib/jia-zhang-fu-wu";
import {
	createNoIndexMetadata,
	createPageMetadata,
	getPublicImageUrl,
	getSiteUrl,
	normalizeSeoDate,
} from "@/lib/seo";
import { cn } from "@/lib/utils";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	return getAllJiaZhangArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const article = getJiaZhangArticleBySlug(slug);
	if (!article) {
		return createNoIndexMetadata();
	}
	return createPageMetadata({
		authors: [SITE_BRAND_NAME],
		description: article.summary,
		openGraphType: "article",
		path: `/jia-zhang-fu-wu/${article.slug}`,
		publishedTime: normalizeSeoDate(article.publishedAt),
		title: `${article.title} - 家长服务`,
	});
}

function InlineFaqCta({
	buttonText,
	description,
	icon: Icon,
	title,
}: {
	buttonText: string;
	description: string;
	icon: LucideIcon;
	title: string;
}) {
	return (
		<div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-1 shadow-sm">
			<div className="flex flex-col gap-6 rounded-[calc(1.5rem-1px)] bg-slate-50/50 p-6 md:flex-row md:items-center md:justify-between md:p-8">
				<div className="flex items-start gap-5">
					<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
						<Icon className="size-6" />
					</div>
					<div className="max-w-xl">
						<h3 className="font-bold text-slate-900 text-xl leading-tight">
							{title}
						</h3>
						<p className="mt-2 text-slate-600 leading-relaxed">{description}</p>
					</div>
				</div>
				<div className="flex shrink-0 items-center">
					<PhoneButton className="h-12 w-full rounded-xl px-8 font-semibold md:w-auto">
						{buttonText}
					</PhoneButton>
				</div>
			</div>
		</div>
	);
}

function FaqBlock({ article }: { article: JiaZhangArticle }) {
	if (article.content.kind !== "faq") return null;
	const { sections, bottomCta } = article.content;

	const visibleSections = sections
		.map((section) => ({
			...section,
			items: section.items.filter(
				(item) => !item.answer.includes("（待补充）"),
			),
		}))
		.filter((section) => section.items.length > 0);

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: visibleSections.flatMap((section) =>
			section.items.map((item) => ({
				"@type": "Question",
				name: item.question,
				acceptedAnswer: {
					"@type": "Answer",
					text: item.answer,
				},
			})),
		),
	};

	return (
		<>
			<JsonLd data={jsonLd} />
			<div className="space-y-12">
				{visibleSections.map((section) => (
					<div className="space-y-6" key={section.title}>
						<section className="space-y-4">
							<h2 className="border-red-500 border-l-4 pl-4 font-semibold text-slate-800 text-xl">
								{section.title}
							</h2>
							<Accordion collapsible type="single">
								{section.items.map((item) => (
									<div
										className="scroll-mt-48"
										id={item.id}
										key={`${section.title}-${item.question}`}
									>
										<AccordionItem
											className={cn(item.isNegative && "bg-red-50/40")}
											value={`${section.title}-${item.question}`}
										>
											<AccordionTrigger className="py-4 text-base text-slate-900 hover:no-underline">
												<span className="pr-4 font-medium text-slate-900">
													{item.question}
												</span>
											</AccordionTrigger>
											<AccordionContent>
												<div className="max-w-none text-slate-600 leading-7">
													{item.answer}
												</div>
												{item.quickLink ? (
													<div className="mt-4">
														<Link
															className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-medium text-primary text-sm transition-colors hover:bg-primary/10"
															href={item.quickLink.href}
														>
															<span>{item.quickLink.label}</span>
															<ArrowRightIcon className="size-4" />
														</Link>
													</div>
												) : null}
											</AccordionContent>
										</AccordionItem>
									</div>
								))}
							</Accordion>
						</section>
						{section.cta ? <InlineFaqCta {...section.cta} /> : null}
					</div>
				))}
			</div>
			{bottomCta ? <BottomCtaBlock cta={bottomCta} /> : null}
		</>
	);
}

function GuideBlock({ article }: { article: JiaZhangArticle }) {
	if (article.content.kind !== "guide") return null;
	const { hero, intro, sections, relatedQuestions, bottomCta } =
		article.content;

	const guideLabels: Record<string, string> = {
		"jia-xiao-gou-tong": "家校沟通",
		"pai-ke-kai-ban": "排课开班",
		"ri-chang-guan-li": "日常管理",
		"ru-xue-jian-dang": "入学建档",
		"shou-ke-hui-fang": "首课关注",
		"yu-jing-gan-yu": "预警干预",
	};

	const heroBadge = hero?.badge ?? "家长服务专题";
	const heroButtonText = hero?.primaryButtonText ?? "立即电话咨询";
	const heroStats = hero?.stats ?? [
		{ label: "服务节点", value: `${sections.length} 个` },
		{ label: "家校反馈", value: "常规反馈" },
		{ label: "重点支持", value: "习惯与情绪" },
		{ label: "适用阶段", value: "全日制 / 复读" },
	];
	const tocTitle = hero?.tocTitle ?? "服务流程目录";
	const tocDescription = hero?.tocDescription ?? [
		"从入学建档到预警干预，按节点说明学管如何持续跟进孩子。",
		"家长可以结合左侧目录，快速定位自己当前最关心的环节。",
	];
	const tocFootnote = hero?.tocFootnote ?? "继续下滑查看完整流程";

	return (
		<article className="bg-white">
				<section className="border-slate-800 border-b bg-slate-950 py-16 text-white md:py-24">
					<div className="container mx-auto px-4">
						<div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.15fr)_340px]">
							<div>
								<div className="mb-4 text-primary text-sm tracking-[0.24em]">
									{heroBadge}
								</div>
								<h1 className="max-w-4xl font-black text-4xl leading-tight tracking-tight md:text-6xl">
									{article.title}
								</h1>
								<p className="mt-6 max-w-3xl text-lg text-slate-300 leading-8">
									{article.summary}
								</p>
								<div className="mt-8 max-w-3xl space-y-4">
									{intro.map((paragraph) => (
										<p className="text-slate-300 leading-8" key={paragraph}>
											{paragraph}
										</p>
									))}
								</div>
								<div className="mt-10 flex flex-col gap-4 sm:flex-row">
									<PhoneButton className="h-11 px-6 text-base">
										{heroButtonText}
									</PhoneButton>
									<Button
										asChild
										className="h-11 border-white/20 bg-transparent px-6 text-white hover:border-white/35 hover:bg-white/10 hover:text-white"
										variant="outline"
									>
										<PhoneLink>咨询热线：{SITE_HOTLINE_TEXT}</PhoneLink>
									</Button>
								</div>
								<div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
									{heroStats.map(({ label, value }) => (
										<div className="py-2" key={label}>
											<div className="text-slate-400 text-xs">{label}</div>
											<div className="mt-2 font-bold text-2xl text-primary md:text-3xl">
												{value}
											</div>
										</div>
									))}
								</div>
							</div>

							<div className="rounded-2xl bg-white/6 p-6 backdrop-blur">
								<div className="pb-4">
									<div className="text-slate-400 text-xs">{tocTitle}</div>
									<div className="mt-2 text-lg leading-8">
										{sections.map((section) => section.title).join("、")}
									</div>
								</div>
								<div className="space-y-3 border-white/10 border-t pt-4 text-slate-300 text-sm">
									{tocDescription.map((item) => (
										<p key={item}>{item}</p>
									))}
								</div>
								<div className="mt-6 flex items-center gap-2 text-primary text-sm">
									<span className="size-1.5 rounded-full bg-primary" />
									{tocFootnote}
								</div>
							</div>
						</div>
					</div>
				</section>

				<div className="container mx-auto px-4 py-12 md:py-16">
					<div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
						<TableOfContents
							extraItems={
								relatedQuestions && relatedQuestions.length > 0
									? [{ id: "xiang-guan-wen-da", title: "相关家长问答" }]
									: undefined
							}
							items={sections.map((s) => ({ id: s.id, title: s.title }))}
							title={tocTitle}
						/>

						<div className="space-y-20">
							{sections.map((section, sectionIndex) => (
								<section
									className={cn(
										"scroll-mt-48 py-2",
										sectionIndex % 2 === 1 &&
											"bg-slate-50/70 px-6 py-10 md:px-8",
									)}
									id={section.id}
									key={section.id}
								>
									<div className="relative mb-10 overflow-hidden">
										<div className="pointer-events-none absolute -top-4 right-0 font-black text-[72px] text-slate-200 leading-none md:text-[96px]">
											{String(sectionIndex + 1).padStart(2, "0")}
										</div>
										<div className="relative max-w-3xl">
											<div className="mb-4 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-600 text-sm">
												{section.label ?? guideLabels[section.id] ?? "内容要点"}
											</div>
											<h2 className="font-bold text-3xl text-slate-900 leading-tight md:text-[2rem]">
												{section.title}
											</h2>
											<p className="mt-4 max-w-2xl text-slate-500 leading-7">
												{section.description}
											</p>
										</div>
									</div>
									<div className="border-slate-200 border-t">
										{section.items.map((item, index) => (
											<div
												className="grid gap-4 border-slate-200 border-b py-5 md:grid-cols-[72px_minmax(0,1fr)]"
												key={item}
											>
												<div className="font-medium text-primary text-sm leading-8">
													{String(index + 1).padStart(2, "0")}
												</div>
												<p className="text-slate-700 leading-8">{item}</p>
											</div>
										))}
									</div>
								</section>
							))}

							{relatedQuestions && relatedQuestions.length > 0 ? (
								<section className="scroll-mt-48 py-2" id="xiang-guan-wen-da">
									<div className="relative mb-10 overflow-hidden">
										<div className="pointer-events-none absolute -top-4 right-0 font-black text-[72px] text-slate-300 leading-none md:text-[96px]">
											{String(sections.length + 1).padStart(2, "0")}
										</div>
										<div className="relative max-w-3xl">
											<div className="mb-4 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-600 text-sm">
												延伸阅读
											</div>
											<h2 className="font-bold text-3xl text-slate-900 leading-tight md:text-[2rem]">
												相关家长问答
											</h2>
											<p className="mt-4 max-w-2xl text-slate-500 leading-7">
												如果您还想从问答角度快速了解重点问题，可以继续查看下面这些关联内容。
											</p>
										</div>
									</div>
									<div className="border-slate-200 border-t">
										{relatedQuestions.map((item) => (
											<div
												className="border-slate-200 border-b py-6"
												key={item.href}
											>
												<h3 className="font-bold text-lg text-slate-900 leading-7">
													{item.question}
												</h3>
												{item.answer && (
													<div className="mt-3 text-slate-600 leading-8">
														{item.answer}
													</div>
												)}
											</div>
										))}
										<div className="mt-8">
											<Link
												className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-6 py-2.5 font-medium text-primary transition-colors hover:bg-primary/10"
												href="/jia-zhang-fu-wu/jia-zhang-wen-ti"
											>
												<span>查看更多家长关心的问题</span>
												<ArrowRightIcon className="size-4" />
											</Link>
										</div>
									</div>
								</section>
							) : null}

							{bottomCta ? (
								<section className="py-2">
									<div className="border-slate-200 border-t pt-10">
										<div className="max-w-3xl">
											<div className="text-primary text-sm tracking-[0.18em]">
												{bottomCta.badge}
											</div>
											<h2 className="mt-4 font-bold text-3xl text-slate-900 leading-tight md:text-4xl">
												{bottomCta.title}
											</h2>
											<p className="mt-5 text-slate-600 leading-8">
												{bottomCta.description}
											</p>
											<div className="mt-8 flex flex-col gap-4 sm:flex-row">
												<PhoneButton className="h-11 px-6">
													{bottomCta.buttonText}
												</PhoneButton>
												<Button asChild className="h-11 px-6" variant="outline">
													<PhoneLink>咨询热线：{SITE_HOTLINE_TEXT}</PhoneLink>
												</Button>
											</div>
											<p className="mt-5 text-slate-400 text-sm">
												服务时间：周一至周日 09:00 - 21:00
											</p>
										</div>
									</div>
								</section>
							) : null}
						</div>
					</div>
				</div>
		</article>
	);
}

function SimpleArticleTableBlock({ table }: { table: SimpleArticleTable }) {
	return (
		<div className="overflow-x-auto">
			<table>
				<thead>
					<tr>
						{table.headers.map((header) => (
							<th key={header}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{table.rows.map((row) => (
						<tr key={row.dimension}>
							<td>{row.dimension}</td>
							<td>{row.left}</td>
							<td>{row.right}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function SimpleArticleBlock({ article }: { article: JiaZhangArticle }) {
	if (article.content.kind !== "simple-article") return null;
	const { paragraphs, table, bottomCta } = article.content;

	const tocItems = table ? [{ id: "dui-bi-biao", title: "完整对比表" }] : [];

	return (
		<article className="container mx-auto px-4 py-10 md:py-14">
				<div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
					<TableOfContents
						className="hidden lg:sticky lg:top-32 lg:block"
						items={tocItems}
						title="文章目录"
					/>

					<div>
						<header>
							<div className="text-slate-500 text-sm">
								{article.publishedAt} · 家长服务专题
							</div>
							<h1 className="mt-3 font-bold text-3xl text-slate-900 leading-tight md:text-5xl">
								{article.title}
							</h1>
							<p className="mt-5 text-base text-slate-600 leading-8 md:text-lg">
								{article.summary}
							</p>
						</header>

						<div className="prose prose-slate mt-10 max-w-none">
							{paragraphs.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}

							{table ? (
								<section id="dui-bi-biao">
									<h2>完整对比表</h2>
									<SimpleArticleTableBlock table={table} />
								</section>
							) : null}

							{bottomCta ? (
								<section className="not-prose mt-12">
									<div className="text-primary text-sm tracking-[0.18em]">
										{bottomCta.badge}
									</div>
									<h2 className="mt-4 font-bold text-3xl text-slate-900 leading-tight">
										{bottomCta.title}
									</h2>
									<p className="mt-4 max-w-3xl text-slate-600 leading-8">
										{bottomCta.description}
									</p>
									<div className="mt-8 flex flex-col gap-4 sm:flex-row">
										<PhoneButton className="h-11 px-6">
											{bottomCta.buttonText}
										</PhoneButton>
										<Button asChild className="h-11 px-6" variant="outline">
											<PhoneLink>咨询热线：{SITE_HOTLINE_TEXT}</PhoneLink>
										</Button>
									</div>
								</section>
							) : null}
						</div>
					</div>
				</div>
		</article>
	);
}

function CampusDirectoryTable({
	section,
}: {
	section: CampusDirectorySection;
}) {
	return (
		<div className="space-y-4">
			{section.note ? (
				<p className="text-slate-500 text-sm leading-7">{section.note}</p>
			) : null}
			<div className="overflow-x-auto rounded-2xl border border-slate-200">
				<table className="min-w-full border-collapse text-left text-sm">
					<thead className="bg-slate-50/70 text-slate-600">
						<tr>
							<th className="border-slate-200 border-b px-4 py-3 font-medium">
								城市
							</th>
							<th className="border-slate-200 border-b px-4 py-3 font-medium">
								城区
							</th>
							<th className="border-slate-200 border-b px-4 py-3 font-medium">
								校区名称
							</th>
							<th className="border-slate-200 border-b px-4 py-3 font-medium">
								校区属性
							</th>
							<th className="border-slate-200 border-b px-4 py-3 font-medium">
								校区地址
							</th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{section.rows.map((row) => (
							<tr
								className="border-slate-100 border-b last:border-b-0"
								key={`${row.city}-${row.district}-${row.campusName}`}
							>
								<td className="px-4 py-4 text-slate-700">{row.city}</td>
								<td className="px-4 py-4 text-slate-700">{row.district}</td>
								<td className="px-4 py-4 font-medium text-slate-900">
									{row.campusName}
								</td>
								<td className="px-4 py-4 text-slate-700">{row.attribute}</td>
								<td className="px-4 py-4 text-slate-700 leading-7">
									{row.address}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

function CampusDirectoryBlock({ article }: { article: JiaZhangArticle }) {
	if (article.content.kind !== "campus-directory") return null;
	const { hero, intro, sections, bottomCta } = article.content;

	const heroBadge = hero?.badge ?? "校区汇总专题";
	const heroButtonText = hero?.primaryButtonText ?? "立即电话咨询";
	const heroStats = hero?.stats ?? [
		{
			label: "校区总数",
			value: `${sections.reduce((sum, section) => sum + section.rows.length, 0)} 个`,
		},
		{ label: "分类数量", value: `${sections.length} 类` },
		{ label: "覆盖城市", value: "多区域" },
		{ label: "使用方式", value: "按区域筛选" },
	];
	const tocTitle = hero?.tocTitle ?? "校区目录";
	const tocDescription = hero?.tocDescription ?? [
		"先判断孩子更适合全日制还是常规校区，再按所在城区筛选会更高效。",
		"如果不确定如何选择，建议先电话说明孩子年级、科目和通勤区域。",
	];
	const tocFootnote = hero?.tocFootnote ?? "继续下滑查看完整校区信息";

	return (
		<article className="bg-white">
				<section className="border-slate-800 border-b bg-slate-950 py-16 text-white md:py-24">
					<div className="container mx-auto px-4">
						<div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.15fr)_340px]">
							<div>
								<div className="mb-4 text-primary text-sm tracking-[0.24em]">
									{heroBadge}
								</div>
								<h1 className="max-w-4xl font-black text-4xl leading-tight tracking-tight md:text-6xl">
									{article.title}
								</h1>
								<p className="mt-6 max-w-3xl text-lg text-slate-300 leading-8">
									{article.summary}
								</p>
								<div className="mt-8 max-w-3xl space-y-4">
									{intro.map((paragraph) => (
										<p className="text-slate-300 leading-8" key={paragraph}>
											{paragraph}
										</p>
									))}
								</div>
								<div className="mt-10 flex flex-col gap-4 sm:flex-row">
									<PhoneButton className="h-11 px-6 text-base">
										{heroButtonText}
									</PhoneButton>
									<Button
										asChild
										className="h-11 border-white/20 bg-transparent px-6 text-white hover:border-white/35 hover:bg-white/10 hover:text-white"
										variant="outline"
									>
										<PhoneLink>咨询热线：{SITE_HOTLINE_TEXT}</PhoneLink>
									</Button>
								</div>
								<div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
									{heroStats.map(({ label, value }) => (
										<div className="py-2" key={label}>
											<div className="text-slate-400 text-xs">{label}</div>
											<div className="mt-2 font-bold text-2xl text-primary md:text-3xl">
												{value}
											</div>
										</div>
									))}
								</div>
							</div>

							<div className="rounded-2xl bg-white/6 p-6 backdrop-blur">
								<div className="pb-4">
									<div className="text-slate-400 text-xs">{tocTitle}</div>
									<div className="mt-2 text-lg leading-8">
										{sections.map((section) => section.title).join("、")}
									</div>
								</div>
								<div className="space-y-3 border-white/10 border-t pt-4 text-slate-300 text-sm">
									{tocDescription.map((item) => (
										<p key={item}>{item}</p>
									))}
								</div>
								<div className="mt-6 flex items-center gap-2 text-primary text-sm">
									<span className="size-1.5 rounded-full bg-primary" />
									{tocFootnote}
								</div>
							</div>
						</div>
					</div>
				</section>

				<div className="container mx-auto px-4 py-12 md:py-16">
					<div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
						<TableOfContents
							items={sections.map((section) => ({
								id: section.id,
								title: section.title,
							}))}
							title={tocTitle}
						/>

						<div className="space-y-20">
							{sections.map((section, sectionIndex) => (
								<section
									className={cn(
										"scroll-mt-48 py-2",
										sectionIndex % 2 === 1 &&
											"rounded-2xl bg-slate-50/70 px-6 py-10 md:px-8",
									)}
									id={section.id}
									key={section.id}
								>
									<div className="relative mb-10 overflow-hidden">
										<div className="pointer-events-none absolute -top-4 right-0 font-black text-[72px] text-slate-200 leading-none md:text-[96px]">
											{String(sectionIndex + 1).padStart(2, "0")}
										</div>
										<div className="relative max-w-3xl">
											<div className="mb-4 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-600 text-sm">
												{section.label ?? "校区分组"}
											</div>
											<h2 className="font-bold text-3xl text-slate-900 leading-tight md:text-[2rem]">
												{section.title}
											</h2>
											<p className="mt-4 max-w-2xl text-slate-500 leading-7">
												{section.description}
											</p>
										</div>
									</div>
									<CampusDirectoryTable section={section} />
								</section>
							))}

							{bottomCta ? (
								<section className="py-2">
									<div className="border-slate-200 border-t pt-10">
										<div className="max-w-3xl">
											<div className="text-primary text-sm tracking-[0.18em]">
												{bottomCta.badge}
											</div>
											<h2 className="mt-4 font-bold text-3xl text-slate-900 leading-tight md:text-4xl">
												{bottomCta.title}
											</h2>
											<p className="mt-5 text-slate-600 leading-8">
												{bottomCta.description}
											</p>
											<div className="mt-8 flex flex-col gap-4 sm:flex-row">
												<PhoneButton className="h-11 px-6">
													{bottomCta.buttonText}
												</PhoneButton>
												<Button asChild className="h-11 px-6" variant="outline">
													<PhoneLink>咨询热线：{SITE_HOTLINE_TEXT}</PhoneLink>
												</Button>
											</div>
											<p className="mt-5 text-slate-400 text-sm">
												服务时间：周一至周日 09:00 - 21:00
											</p>
										</div>
									</div>
								</section>
							) : null}
						</div>
					</div>
				</div>
		</article>
	);
}

function BottomCtaBlock({ cta }: { cta: BottomCta }) {
	return (
		<div className="mt-16">
			<div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-6 py-12 text-center text-white md:px-12 md:py-16">
				<div className="relative z-10 mx-auto max-w-3xl">
					<div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-medium text-sm text-white/90 backdrop-blur-sm">
						{cta.badge}
					</div>
					<h2 className="font-bold text-3xl leading-tight md:text-5xl">
						{cta.title}
					</h2>
					<p className="mx-auto mt-6 text-lg text-slate-300 md:text-xl">
						{cta.description}
					</p>
					<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<PhoneButton className="h-14 rounded-2xl px-10 text-lg" size="lg">
							{cta.buttonText}：{SITE_HOTLINE_TEXT}
						</PhoneButton>
					</div>
					<p className="mt-6 text-slate-400 text-sm">
						服务时间：周一至周日 09:00 - 21:00
					</p>
				</div>
				<div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
				<div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
			</div>
		</div>
	);
}

export default async function JiaZhangArticleDetailPage({ params }: PageProps) {
	const { slug } = await params;
	const article = getJiaZhangArticleBySlug(slug);
	if (!article) {
		notFound();
	}
	const pageUrl = getSiteUrl(`/jia-zhang-fu-wu/${article.slug}`).toString();
	const publishedTime = normalizeSeoDate(article.publishedAt);
	const articleJsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		author: {
			"@type": "Organization",
			name: SITE_BRAND_NAME,
			url: getSiteUrl().toString(),
		},
		...(publishedTime ? { datePublished: publishedTime } : {}),
		description: article.summary,
		headline: article.title,
		mainEntityOfPage: {
			"@id": pageUrl,
			"@type": "WebPage",
		},
		publisher: {
			"@type": "Organization",
			logo: {
				"@type": "ImageObject",
				url: getPublicImageUrl("/logo.png"),
			},
			name: SITE_BRAND_NAME,
		},
		url: pageUrl,
	};

	return (
		<div
			className={`min-h-screen ${article.content.kind === "faq" ? "bg-slate-50" : "bg-white"}`}
		>
			<JsonLd data={articleJsonLd} />
			<PageTopNav
				items={[
					{ label: "首页", href: "/" },
					{ label: "家长服务", href: "/jia-zhang-fu-wu" },
					{ label: article.title, href: `/jia-zhang-fu-wu/${article.slug}` },
				]}
			/>
			{article.content.kind === "guide" ? (
				<GuideBlock article={article} />
			) : null}
			{article.content.kind === "campus-directory" ? (
				<CampusDirectoryBlock article={article} />
			) : null}
			{article.content.kind === "simple-article" ? (
				<SimpleArticleBlock article={article} />
			) : null}

			<div className="container mx-auto px-4">
				{article.content.kind === "faq" ? (
					<div className="py-12">
						<div className="mb-12 text-center">
							<div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-medium text-primary text-sm">
								戴氏教育 · 家长问答
							</div>
							<h1 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl">
								{article.title}
							</h1>
							<p className="mx-auto max-w-3xl text-lg text-slate-600 leading-8">
								{article.summary}
							</p>
						</div>
						<FaqBlock article={article} />
					</div>
				) : null}
			</div>
		</div>
	);
}
