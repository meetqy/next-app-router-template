import { ArrowLeftIcon } from "lucide-react";
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
import { PhoneButton } from "@/components/phone-action";
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
	getScoreImprovementCase,
	getScoreImprovementCaseSiblings,
	getRelatedScoreImprovementCases,
	SCORE_IMPROVEMENT_CASES,
} from "@/lib/score-improvement-cases";
import {
	createNoIndexMetadata,
	createPageMetadata,
	getPublicImageUrl,
	getSiteUrl,
} from "@/lib/seo";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
	return SCORE_IMPROVEMENT_CASES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const item = getScoreImprovementCase(slug);

	if (!item) {
		return createNoIndexMetadata("未找到提分案例");
	}

	return createPageMetadata({
		authors: [SITE_BRAND_NAME],
		description: item.summary,
		openGraphType: "article",
		path: `/ti-fen-an-li/${item.slug}`,
		title: item.title,
	});
}

export default async function ScoreImprovementCasePage({ params }: PageProps) {
	const { slug } = await params;
	const item = getScoreImprovementCase(slug);

	if (!item) {
		notFound();
	}

	const { next, previous } = getScoreImprovementCaseSiblings(item.slug);
	const relatedCases = getRelatedScoreImprovementCases(item.slug);
	const pageUrl = getSiteUrl(`/ti-fen-an-li/${item.slug}`).toString();
	const articleJsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		articleSection: "提分案例",
		author: {
			"@type": "Organization",
			name: SITE_BRAND_NAME,
			url: getSiteUrl().toString(),
		},
		description: item.summary,
		headline: item.title,
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
		<div className="min-h-screen bg-muted/40">
			<JsonLd data={articleJsonLd} />
			<PageHeader
				breadcrumbOnly
				items={[
					{ label: "首页", href: "/" },
					{ label: "提分案例", href: "/ti-fen-an-li" },
					{
						label: item.name,
						href: `/ti-fen-an-li/${item.slug}`,
					},
				]}
			/>

			<ArticleDetailLayout
				next={
					next
						? { href: `/ti-fen-an-li/${next.slug}`, title: next.title }
						: null
				}
				previous={
					previous
						? { href: `/ti-fen-an-li/${previous.slug}`, title: previous.title }
						: null
				}
				sidebar={
					<>
						<DetailSidebarCard title="成绩概览">
							<div className="grid grid-cols-3 gap-2 text-center">
								<div>
									<p className="font-bold text-lg">
										{item.entryScore ?? "-"}
									</p>
									<p className="text-muted-foreground text-xs">
										{item.entryLabel}
									</p>
								</div>
								<div>
									<p className="font-bold text-lg">{item.finalScore}</p>
									<p className="text-muted-foreground text-xs">高考成绩</p>
								</div>
								<div>
									<p className="font-bold text-lg text-primary">
										{item.improvement !== undefined
											? `+${item.improvement}`
											: "-"}
									</p>
									<p className="text-muted-foreground text-xs">分数变化</p>
								</div>
							</div>
							<div className="mt-5 flex flex-col gap-2">
								<PhoneButton>电话咨询：{SITE_HOTLINE_TEXT}</PhoneButton>
								<Button asChild variant="outline">
									<Link href="/ti-fen-an-li">
										<ArrowLeftIcon className="size-4" />
										返回案例列表
									</Link>
								</Button>
							</div>
						</DetailSidebarCard>

						<RelatedLinksCard
							items={relatedCases.map((related) => ({
								href: `/ti-fen-an-li/${related.slug}`,
								title: related.title,
							}))}
							moreHref="/ti-fen-an-li"
							title="相关案例"
						/>
					</>
				}
				siblingAriaLabel="上下篇案例"
			>
				<Card className="[--card-spacing:--spacing(6)]">
								<CardHeader className="border-b">
									<CardTitle className="text-center font-bold text-xl leading-relaxed md:text-2xl">
										<h1>{item.title}</h1>
									</CardTitle>
									<CardDescription className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
										<span>学生：{item.name}</span>
										<Separator className="h-4" orientation="vertical" />
										<span>来源：{SITE_FULL_NAME}</span>
										<Separator className="h-4" orientation="vertical" />
										<span>提分案例</span>
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="rounded-lg bg-muted p-4 text-muted-foreground text-sm leading-7">
										{item.summary}
									</p>
									<MarkdownContent className="mt-4" content={item.content} />
									<p className="mt-8 rounded-lg border border-border bg-muted/50 p-4 text-muted-foreground text-sm leading-7">
										说明：本文记录个别学生的阶段学习过程。成绩变化受原有基础、学习投入、考试状态等多种因素影响，不代表对其他学生学习结果的承诺。
									</p>
								</CardContent>
				</Card>
			</ArticleDetailLayout>
		</div>
	);
}
