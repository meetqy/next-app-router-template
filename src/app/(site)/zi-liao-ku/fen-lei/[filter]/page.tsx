import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
	getKnowledgeArticleFilterById,
	getKnowledgeArticlesByFilter,
	getKnowledgeArticleFilters,
} from "@/lib/knowledge-base";
import { createNoIndexMetadata, createPageMetadata } from "@/lib/seo";
import {
	KNOWLEDGE_PAGE_PARAM,
	KnowledgeBaseContent,
	resolveKnowledgePage,
} from "../../KnowledgeBaseContent";

type PageProps = {
	params: Promise<{ filter: string }>;
	searchParams?: Promise<{
		[KNOWLEDGE_PAGE_PARAM]?: string | string[];
	}>;
};

export function generateStaticParams() {
	return getKnowledgeArticleFilters().map((filter) => ({
		filter: filter.id,
	}));
}

export async function generateMetadata({
	params,
	searchParams,
}: PageProps): Promise<Metadata> {
	const { filter } = await params;
	const activeFilter = getKnowledgeArticleFilterById(filter);

	if (!activeFilter) {
		return createNoIndexMetadata("资讯中心");
	}

	const resolvedSearchParams = await searchParams;
	const currentPage = resolveKnowledgePage(
		resolvedSearchParams?.[KNOWLEDGE_PAGE_PARAM],
	);
	const articleCount = getKnowledgeArticlesByFilter(filter)?.length ?? 0;
	const totalPages = Math.max(1, Math.ceil(articleCount / 10));
	const safePage = Math.min(currentPage, totalPages);
	const path =
		safePage > 1
			? `/zi-liao-ku/fen-lei/${filter}?page=${safePage}`
			: `/zi-liao-ku/fen-lei/${filter}`;

	return createPageMetadata({
		description: activeFilter.description,
		path,
		title:
			safePage > 1
				? `${activeFilter.title} 第${safePage}页 - 资讯中心`
				: `${activeFilter.title} - 资讯中心`,
	});
}

export default async function KnowledgeFilterPage({
	params,
	searchParams,
}: PageProps) {
	const { filter } = await params;
	const resolvedSearchParams = await searchParams;
	const currentPage = resolveKnowledgePage(
		resolvedSearchParams?.[KNOWLEDGE_PAGE_PARAM],
	);

	if (!getKnowledgeArticleFilterById(filter)) {
		notFound();
	}

	return (
		<KnowledgeBaseContent activeFilterId={filter} currentPage={currentPage} />
	);
}
