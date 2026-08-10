import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
	getKnowledgeArticleFilterById,
	getKnowledgeArticleFilters,
} from "@/lib/knowledge-base";
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
}: PageProps): Promise<Metadata> {
	const { filter } = await params;
	const activeFilter = getKnowledgeArticleFilterById(filter);

	if (!activeFilter) {
		return {
			title: "资料库",
		};
	}

	return {
		description: activeFilter.description,
		title: `${activeFilter.title} - 资料库`,
	};
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
