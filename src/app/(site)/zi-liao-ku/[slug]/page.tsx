import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	ArticleDetailLayout,
	DetailSidebarCard,
	RelatedLinksCard,
} from "@/components/ArticleDetailLayout";
import { JsonLd } from "@/components/JsonLd";
import { MarkdownContent } from "@/components/MarkdownContent";
import { PageHeader } from "@/components/PageHeader";
import { PhoneButton, PhoneLink } from "@/components/phone-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	SITE_BRAND_NAME,
	SITE_FULL_NAME,
	SITE_HOTLINE_TEXT,
} from "@/lib/constants/site";
import {
	formatKnowledgeArticleDate,
	getArticleCategoryFilterId,
	getKnowledgeArticleByAnySlug,
	getKnowledgeArticles,
	getKnowledgeArticleSiblings,
	getRelatedKnowledgeArticles,
	resolveKnowledgeHref,
} from "@/lib/knowledge-base";
import {
	createNoIndexMetadata,
	createPageMetadata,
	getPublicImageUrl,
	getSiteUrl,
	normalizeSeoDate,
} from "@/lib/seo";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
	return getKnowledgeArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const articleResult = getKnowledgeArticleByAnySlug(slug);
	const article = articleResult?.article ?? null;

	if (!article) {
		return createNoIndexMetadata("未找到资料");
	}

	return createPageMetadata({
		authors: [SITE_BRAND_NAME],
		description: article.summary,
		openGraphType: "article",
		path: `/zi-liao-ku/${article.slug}`,
		publishedTime: normalizeSeoDate(article.publishedAt),
		title: `${article.title} - 资讯中心`,
	});
}

export default async function KnowledgeArticlePage({ params }: PageProps) {
	const { slug } = await params;
	const articleResult = getKnowledgeArticleByAnySlug(slug);

	if (!articleResult) {
		notFound();
	}

	const { article } = articleResult;
	const { next, previous } = getKnowledgeArticleSiblings(article.slug);
	const relatedArticles = getRelatedKnowledgeArticles(article);
	const publishedDate = formatKnowledgeArticleDate(article);
	const categoryFilterId = getArticleCategoryFilterId(article);
	const pageUrl = getSiteUrl(`/zi-liao-ku/${article.slug}`).toString();
	const sourceUrl = article.sourceUrl?.trim();
	const publicSourceUrl = sourceUrl && /^https?:\/\//i.test(sourceUrl)
		? sourceUrl
		: undefined;
	const publishedTime = normalizeSeoDate(article.publishedAt);
	const articleJsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		articleSection: article.sectionLabel,
		author: {
			"@type": "Organization",
			name: SITE_BRAND_NAME,
			url: getSiteUrl().toString(),
		},
		...(publishedTime ? { datePublished: publishedTime } : {}),
		description: article.summary,
		headline: article.title,
		...(publicSourceUrl ? { isBasedOn: publicSourceUrl } : {}),
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
	const faqJsonLd =
		article.schema === "faq"
			? {
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: [...article.content.matchAll(/^###\s+(.+)\n\n([^#\n][\s\S]*?)(?=\n\n#{2,3}\s|$)/gm)].map(
						([, question, answer]) => ({
							"@type": "Question",
							acceptedAnswer: {
								"@type": "Answer",
								text: answer.trim(),
							},
							name: question.trim(),
						}),
					),
				}
			: null;

	return (
		<div className="min-h-screen bg-muted/40">
			<JsonLd data={articleJsonLd} />
			{faqJsonLd?.mainEntity.length ? <JsonLd data={faqJsonLd} /> : null}
			<PageHeader
				breadcrumbOnly
				items={[
					{ label: "首页", href: "/" },
					{ label: "资讯中心", href: "/zi-liao-ku" },
					{
						label: article.sectionLabel,
						href: `/zi-liao-ku/fen-lei/${categoryFilterId}`,
					},
					{ label: article.title, href: `/zi-liao-ku/${article.slug}` },
				]}
			/>
			<ArticleDetailLayout
				next={
					next
						? { href: `/zi-liao-ku/${next.slug}`, title: next.title }
						: null
				}
				previous={
					previous
						? { href: `/zi-liao-ku/${previous.slug}`, title: previous.title }
						: null
				}
				sidebar={
					<>
						<DetailSidebarCard title="阅读提示">
							<div className="space-y-1.5 text-muted-foreground text-sm leading-7">
								<p>栏目：{article.sectionLabel}</p>
								<p>发布日期：{publishedDate}</p>
								<p>统一咨询电话：{SITE_HOTLINE_TEXT}</p>
							</div>
							<div className="mt-4 flex flex-col gap-2">
								<PhoneButton>电话确认最新信息</PhoneButton>
								{article.relatedLatestHref ? (
									<Button asChild variant="outline">
										<Link href={article.relatedLatestHref}>
											查看相关页面
											<ArrowRightIcon className="size-4" />
										</Link>
									</Button>
								) : null}
								<Button asChild variant="outline">
									<PhoneLink>咨询热线：{SITE_HOTLINE_TEXT}</PhoneLink>
								</Button>
							</div>
						</DetailSidebarCard>

						<RelatedLinksCard
							items={relatedArticles.map((related) => ({
								href: `/zi-liao-ku/${related.slug}`,
								title: related.title,
							}))}
							moreHref="/zi-liao-ku"
							title="相关文章"
						/>
					</>
				}
				siblingAriaLabel="上下篇资料"
			>
				<Card className="[--card-spacing:--spacing(6)]">
							<CardHeader className="border-b">
								<CardTitle className="text-center font-bold text-xl leading-relaxed md:text-2xl">
									<h1>{article.title}</h1>
								</CardTitle>
								<CardDescription className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
									<span>{publishedDate}</span>
									<Separator className="h-4" orientation="vertical" />
									<span>
										来源：
										{publicSourceUrl ? (
											<a
												href={publicSourceUrl}
												rel="noopener noreferrer"
												target="_blank"
											>
												原始公开资料
											</a>
										) : (
											SITE_FULL_NAME
										)}
									</span>
									<Separator className="h-4" orientation="vertical" />
									<span>{article.sectionLabel}</span>
									{article.year ? (
										<Badge variant="secondary">{article.year} 年资料</Badge>
									) : null}
								</CardDescription>
							</CardHeader>
							<CardContent>
								{article.summary ? (
									<p className="rounded-lg bg-muted p-4 text-muted-foreground text-sm leading-7">
										{article.summary}
									</p>
								) : null}

								{article.historical ? (
									<div className="mt-4 rounded-lg border-primary border-l-4 bg-muted p-4 text-muted-foreground text-sm leading-7">
										如需了解当前收费、考试时间、政策或校区安排，可以查看相关页面或电话咨询。
										{article.relatedLatestHref ? (
											<Link
												className="ml-2 font-semibold text-primary hover:underline"
												href={article.relatedLatestHref}
											>
												查看相关页面
											</Link>
										) : null}
									</div>
								) : null}

								<MarkdownContent
									className={
										article.summary || article.historical ? "mt-4" : ""
									}
									content={article.content}
									resolveHref={resolveKnowledgeHref}
								/>
							</CardContent>
				</Card>
			</ArticleDetailLayout>
		</div>
	);
}
