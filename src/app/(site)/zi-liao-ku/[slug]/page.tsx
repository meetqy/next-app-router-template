import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { PageTopNav } from "@/components/PageTopNav";
import { PhoneButton, PhoneLink } from "@/components/phone-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SITE_FULL_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import {
	formatKnowledgeArticleDate,
	getArticleCategoryFilterId,
	getKnowledgeArticleByAnySlug,
	getKnowledgeArticleSiblings,
	getRelatedKnowledgeArticles,
	resolveKnowledgeHref,
} from "@/lib/knowledge-base";

type PageProps = {
	params: Promise<{ slug: string }>;
};

// 资料库文章不在构建时预渲染：577 篇文章的预渲染产物（html/rsc/segments）
// 约 103MB，会让 Cloud SSR 函数包超过 128MiB 上限。改为首次访问时按需渲染
// 并长期缓存，内容只在重新部署时变化，因此不设置 revalidate。
export async function generateStaticParams() {
	return [];
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const articleResult = getKnowledgeArticleByAnySlug(slug);
	const article = articleResult?.article ?? null;

	if (!article) {
		return {
			title: "未找到资料",
		};
	}

	return {
		description: article.summary,
		title: `${article.title} - 资料库`,
	};
}

function SidebarCard({
	children,
	moreHref,
	title,
}: {
	children: React.ReactNode;
	moreHref?: string;
	title: string;
}) {
	return (
		<Card>
			<CardHeader className="border-b">
				<CardTitle className="border-primary border-l-4 pl-3">
					{title}
				</CardTitle>
				{moreHref ? (
					<CardAction>
						<Link
							className="text-muted-foreground text-xs hover:text-primary"
							href={moreHref}
						>
							更多+
						</Link>
					</CardAction>
				) : null}
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}

export default async function KnowledgeArticlePage({ params }: PageProps) {
	const { slug } = await params;
	const articleResult = getKnowledgeArticleByAnySlug(slug);

	if (!articleResult) {
		notFound();
	}

	if (!articleResult.isCanonical) {
		redirect(encodeURI(`/zi-liao-ku/${articleResult.article.slug}`));
	}

	const { article } = articleResult;
	const { next, previous } = getKnowledgeArticleSiblings(article.slug);
	const relatedArticles = getRelatedKnowledgeArticles(article);
	const publishedDate = formatKnowledgeArticleDate(article);
	const categoryFilterId = getArticleCategoryFilterId(article);

	return (
		<div className="min-h-screen bg-muted/40">
			<PageTopNav
				containerClassName="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
				items={[
					{ label: "首页", href: "/" },
					{ label: "资料库", href: "/zi-liao-ku" },
					{
						label: article.categoryLabel,
						href: `/zi-liao-ku/fen-lei/${categoryFilterId}`,
					},
					{ label: article.title, href: `/zi-liao-ku/${article.slug}` },
				]}
			/>
			<main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 md:py-8 lg:px-8">
				<div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
					<div className="space-y-5">
						<Card className="[--card-spacing:--spacing(6)]">
							<CardHeader className="border-b">
								<CardTitle className="text-center font-bold text-xl leading-relaxed md:text-2xl">
									<h1>{article.title}</h1>
								</CardTitle>
								<CardDescription className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
									<span>{publishedDate}</span>
									<Separator className="h-4" orientation="vertical" />
									<span>来源：{SITE_FULL_NAME}</span>
									<Separator className="h-4" orientation="vertical" />
									<span>{article.categoryLabel}</span>
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

						<Card size="sm">
							<CardContent>
								<nav
									aria-label="上下篇资料"
									className="divide-y divide-border text-sm"
								>
									<p className="flex gap-2 py-2 text-muted-foreground">
										<span className="shrink-0">上一篇：</span>
										{previous ? (
											<Link
												className="line-clamp-1 text-foreground hover:text-primary"
												href={`/zi-liao-ku/${previous.slug}`}
											>
												{previous.title}
											</Link>
										) : (
											<span>没有了</span>
										)}
									</p>
									<p className="flex gap-2 py-2 text-muted-foreground">
										<span className="shrink-0">下一篇：</span>
										{next ? (
											<Link
												className="line-clamp-1 text-foreground hover:text-primary"
												href={`/zi-liao-ku/${next.slug}`}
											>
												{next.title}
											</Link>
										) : (
											<span>没有了</span>
										)}
									</p>
								</nav>
							</CardContent>
						</Card>
					</div>

					<aside className="space-y-5 lg:sticky lg:top-16 lg:self-start">
						<SidebarCard title="阅读提示">
							<div className="space-y-1.5 text-muted-foreground text-sm leading-7">
								<p>分类：{article.categoryLabel}</p>
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
						</SidebarCard>

						{relatedArticles.length > 0 ? (
							<SidebarCard moreHref="/zi-liao-ku" title="相关资料">
								<ul className="divide-y divide-border text-sm">
									{relatedArticles.map((related) => (
										<li key={related.slug}>
											<Link
												className="block truncate py-2 text-muted-foreground hover:text-primary"
												href={`/zi-liao-ku/${related.slug}`}
												title={related.title}
											>
												{related.title}
											</Link>
										</li>
									))}
								</ul>
							</SidebarCard>
						) : null}
					</aside>
				</div>
			</main>
		</div>
	);
}
