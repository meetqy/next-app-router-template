import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PageTopNav } from "@/components/PageTopNav";
import { PhoneButton } from "@/components/phone-action";
import { SITE_FULL_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import {
	getKnowledgeArticleFilterById,
	getKnowledgeArticleFilters,
	getKnowledgeArticles,
	getKnowledgeArticlesByFilter,
	type KnowledgeArticleFilter,
} from "@/lib/knowledge-base";

type KnowledgeBaseContentProps = {
	activeFilterId?: string;
	currentPage?: number;
};

function filterHref(filter: KnowledgeArticleFilter) {
	return `/zi-liao-ku/fen-lei/${filter.id}`;
}

const ARTICLES_PER_PAGE = 10;
export const KNOWLEDGE_PAGE_PARAM = "page";

export function resolveKnowledgePage(page?: string | string[]) {
	const pageValue = Array.isArray(page) ? page[0] : page;
	const parsedPage = Number.parseInt(pageValue ?? "1", 10);

	return Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
}

function formatArticleDate(
	article: ReturnType<typeof getKnowledgeArticles>[number],
) {
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

function paginationHref(basePath: string, page: number) {
	if (page <= 1) {
		return basePath;
	}

	return {
		pathname: basePath,
		query: {
			[KNOWLEDGE_PAGE_PARAM]: page,
		},
	};
}

function getPaginationItems(currentPage: number, totalPages: number) {
	const pages = new Set([1, totalPages]);

	for (let page = currentPage - 1; page <= currentPage + 1; page += 1) {
		if (page >= 1 && page <= totalPages) {
			pages.add(page);
		}
	}

	return Array.from(pages).sort((a, b) => a - b);
}

function Pagination({
	basePath,
	currentPage,
	totalPages,
}: {
	basePath: string;
	currentPage: number;
	totalPages: number;
}) {
	if (totalPages <= 1) {
		return null;
	}

	const pageItems = getPaginationItems(currentPage, totalPages);

	return (
		<nav
			aria-label="资料分页"
			className="mt-6 flex flex-wrap items-center justify-center gap-2"
		>
			{currentPage > 1 ? (
				<Link
					className="inline-flex h-9 items-center gap-1 rounded-full border border-slate-200 bg-white px-3 font-medium text-slate-700 text-sm transition-colors hover:border-primary/30 hover:text-primary"
					href={paginationHref(basePath, currentPage - 1)}
				>
					<ChevronLeftIcon className="size-4" />
					上一页
				</Link>
			) : null}

			{pageItems.map((page, index) => {
				const previousPage = pageItems[index - 1];
				const hasGap = previousPage && page - previousPage > 1;

				return (
					<span className="inline-flex items-center gap-2" key={page}>
						{hasGap ? (
							<span className="px-1 text-slate-400 text-sm">...</span>
						) : null}
						<Link
							aria-current={currentPage === page ? "page" : undefined}
							className={
								currentPage === page
									? "inline-flex size-9 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground text-sm"
									: "inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white font-medium text-slate-700 text-sm transition-colors hover:border-primary/30 hover:text-primary"
							}
							href={paginationHref(basePath, page)}
						>
							{page}
						</Link>
					</span>
				);
			})}

			{currentPage < totalPages ? (
				<Link
					className="inline-flex h-9 items-center gap-1 rounded-full border border-slate-200 bg-white px-3 font-medium text-slate-700 text-sm transition-colors hover:border-primary/30 hover:text-primary"
					href={paginationHref(basePath, currentPage + 1)}
				>
					下一页
					<ChevronRightIcon className="size-4" />
				</Link>
			) : null}
		</nav>
	);
}

export function KnowledgeBaseContent({
	activeFilterId,
	currentPage = 1,
}: KnowledgeBaseContentProps) {
	const allArticles = getKnowledgeArticles();
	const articles = getKnowledgeArticlesByFilter(activeFilterId) ?? allArticles;
	const filters = getKnowledgeArticleFilters();
	const activeFilter = activeFilterId
		? getKnowledgeArticleFilterById(activeFilterId)
		: null;
	const totalPages = Math.max(
		1,
		Math.ceil(articles.length / ARTICLES_PER_PAGE),
	);
	const safeCurrentPage = Math.min(currentPage, totalPages);
	const visibleArticles = articles.slice(
		(safeCurrentPage - 1) * ARTICLES_PER_PAGE,
		safeCurrentPage * ARTICLES_PER_PAGE,
	);
	const basePath = activeFilterId
		? `/zi-liao-ku/fen-lei/${activeFilterId}`
		: "/zi-liao-ku";

	return (
		<div className="min-h-screen bg-slate-50 pb-16 md:pb-24">
			<PageTopNav
				items={[
					{ label: "首页", href: "/" },
					{ label: "资料库", href: "/zi-liao-ku" },
				]}
			/>
			<PageHero
				actions={
					<PhoneButton className="h-12 rounded-xl px-6 font-semibold">
						电话咨询：{SITE_HOTLINE_TEXT}
					</PhoneButton>
				}
				badge={`${SITE_FULL_NAME} · 家长资料`}
				description={
					activeFilter
						? activeFilter.description
						: "这里集中展示课程、校区、收费、考试时间与升学服务相关信息，方便家长按主题快速查找。"
				}
				title={activeFilter ? activeFilter.title : "资料库"}
			/>

			<section className="container mx-auto px-4 py-10">
				<div className="border-slate-200 border-b">
					<div className="-mx-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
						<nav
							aria-label="资料分类"
							className="flex w-max min-w-full items-center gap-2"
						>
							<CategoryTab active={!activeFilterId} href="/zi-liao-ku">
								全部资料（{allArticles.length}）
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

			<section className="container mx-auto px-4">
				<div className="divide-y divide-slate-200 border-slate-200 border-y">
					{visibleArticles.map((article) => (
						<Link
							className="group grid gap-1 px-2 py-3 transition-colors hover:bg-slate-100/70 sm:grid-cols-[minmax(0,1fr)_9rem] sm:items-center sm:px-3"
							href={`/zi-liao-ku/${article.slug}`}
							key={article.slug}
						>
							<h3 className="line-clamp-2 font-medium text-slate-950 text-sm leading-6 transition-colors group-hover:text-primary sm:text-base">
								{article.title}
							</h3>
							<time className="text-slate-500 text-xs sm:text-right sm:text-sm">
								{formatArticleDate(article)}
							</time>
						</Link>
					))}
				</div>
				<Pagination
					basePath={basePath}
					currentPage={safeCurrentPage}
					totalPages={totalPages}
				/>
			</section>
		</div>
	);
}
