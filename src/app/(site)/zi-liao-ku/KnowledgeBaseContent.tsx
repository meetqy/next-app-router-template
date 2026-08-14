import Link from "next/link";
import { Suspense } from "react";
import { ArticleList } from "@/components/ArticleList";
import { PageHeader } from "@/components/PageHeader";
import { PhoneButton } from "@/components/phone-action";
import { SITE_FULL_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import {
	getKnowledgeArticleFilterById,
	getKnowledgeArticleFilters,
	getKnowledgeArticles,
	getKnowledgeArticlesByFilter,
	type KnowledgeArticleFilter,
	type KnowledgeArticleSummary,
} from "@/lib/knowledge-base";
import {
	KnowledgeArticleList,
	type KnowledgeArticleListItem,
} from "./KnowledgeArticleList";

type KnowledgeBaseContentProps = {
	activeFilterId?: string;
};

function filterHref(filter: KnowledgeArticleFilter) {
	return `/zi-liao-ku/fen-lei/${filter.id}`;
}

function formatArticleDate(article: KnowledgeArticleSummary) {
	const dateText = article.publishedAt ?? article.crawledAt ?? article.year;

	if (!dateText) {
		return "时间待更新";
	}

	const normalizedDate = dateText.match(/\d{4}[-/]\d{1,2}[-/]\d{1,2}/)?.[0];
	if (normalizedDate) {
		return normalizedDate.replaceAll("/", "-");
	}

	if (/^20\d{2}$/.test(dateText)) {
		return `${dateText} 年`;
	}

	return dateText;
}

function CategoryTab({
	active,
	children,
	href,
}: {
	active: boolean;
	children: React.ReactNode;
	href: string;
}) {
	return (
		<Link
			aria-current={active ? "page" : undefined}
			className={
				active
					? "inline-flex h-10 shrink-0 items-center rounded-full bg-primary px-4 font-medium text-primary-foreground text-sm transition-colors"
					: "inline-flex h-10 shrink-0 items-center rounded-full bg-slate-100 px-4 font-medium text-slate-700 text-sm transition-colors hover:bg-primary/10 hover:text-primary"
			}
			href={href}
		>
			{children}
		</Link>
	);
}

export function KnowledgeBaseContent({
	activeFilterId,
}: KnowledgeBaseContentProps) {
	const allArticles = getKnowledgeArticles();
	const articles = getKnowledgeArticlesByFilter(activeFilterId) ?? allArticles;
	const filters = getKnowledgeArticleFilters();
	const activeFilter = activeFilterId
		? getKnowledgeArticleFilterById(activeFilterId)
		: null;
	const basePath = activeFilterId
		? `/zi-liao-ku/fen-lei/${activeFilterId}`
		: "/zi-liao-ku";
	const listItems: KnowledgeArticleListItem[] = articles.map((article) => ({
		date: formatArticleDate(article),
		href: `/zi-liao-ku/${article.slug}`,
		title: article.title,
	}));

	return (
		<div className="min-h-screen bg-slate-50 pb-16 md:pb-24">
			<PageHeader
				actions={
					<PhoneButton className="h-12 rounded-xl px-6 font-semibold">
						电话咨询：{SITE_HOTLINE_TEXT}
					</PhoneButton>
				}
				badge={`${SITE_FULL_NAME} · 资讯中心`}
				description={
					activeFilter
						? activeFilter.description
						: "集中查看招生简章、收费说明、考试政策、备考建议、择校对比与家长问答。"
				}
				items={[
					{ label: "首页", href: "/" },
					{ label: "资讯中心", href: "/zi-liao-ku" },
				]}
				title={activeFilter ? activeFilter.title : "戴氏招生与备考资讯中心"}
			/>

			<section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
				<div className="border-slate-200 border-b">
					<div className="-mx-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
						<nav
							aria-label="资讯分类"
							className="flex w-max min-w-full items-center gap-2"
						>
							<CategoryTab active={!activeFilterId} href="/zi-liao-ku">
								全部资讯（{allArticles.length}）
							</CategoryTab>
							{filters.map((filter) => (
								<CategoryTab
									active={activeFilterId === filter.id}
									href={filterHref(filter)}
									key={filter.id}
								>
									{filter.title}（{filter.count}）
								</CategoryTab>
							))}
						</nav>
					</div>
				</div>
			</section>

			<section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<Suspense
					fallback={
						<ArticleList
							items={listItems.slice(0, 10).map((item) => ({
								href: item.href,
								meta: <time>{item.date}</time>,
								title: item.title,
							}))}
						/>
					}
				>
					<KnowledgeArticleList basePath={basePath} items={listItems} />
				</Suspense>
			</section>
		</div>
	);
}
