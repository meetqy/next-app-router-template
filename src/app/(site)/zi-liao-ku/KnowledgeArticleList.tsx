"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArticleList } from "@/components/ArticleList";

export type KnowledgeArticleListItem = {
	date: string;
	href: string;
	title: string;
};

const ARTICLES_PER_PAGE = 10;

function resolvePage(page: string | null) {
	const parsedPage = Number.parseInt(page ?? "1", 10);
	return Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
}

function paginationHref(basePath: string, page: number) {
	if (page <= 1) {
		return basePath;
	}

	return {
		pathname: basePath,
		query: { page },
	};
}

function getPaginationItems(currentPage: number, totalPages: number) {
	const pages = new Set([1, totalPages]);

	for (let page = currentPage - 1; page <= currentPage + 1; page += 1) {
		if (page >= 1 && page <= totalPages) {
			pages.add(page);
		}
	}

	return Array.from(pages).sort((left, right) => left - right);
}

export function KnowledgeArticleList({
	basePath,
	items,
}: {
	basePath: string;
	items: KnowledgeArticleListItem[];
}) {
	const searchParams = useSearchParams();
	const totalPages = Math.max(1, Math.ceil(items.length / ARTICLES_PER_PAGE));
	const currentPage = Math.min(resolvePage(searchParams.get("page")), totalPages);
	const visibleItems = items.slice(
		(currentPage - 1) * ARTICLES_PER_PAGE,
		currentPage * ARTICLES_PER_PAGE,
	);

	return (
		<>
			<ArticleList
				items={visibleItems.map((item) => ({
					href: item.href,
					meta: <time>{item.date}</time>,
					title: item.title,
				}))}
			/>
			<Pagination
				basePath={basePath}
				currentPage={currentPage}
				totalPages={totalPages}
			/>
		</>
	);
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
			aria-label="资讯分页"
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
