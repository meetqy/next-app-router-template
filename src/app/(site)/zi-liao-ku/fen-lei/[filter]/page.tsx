import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
	getKnowledgeArticleFilterById,
	getKnowledgeArticleFilters,
} from "@/lib/knowledge-base";
import { createNoIndexMetadata, createPageMetadata } from "@/lib/seo";
import { KnowledgeBaseContent } from "../../KnowledgeBaseContent";

type PageProps = {
	params: Promise<{ filter: string }>;
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
		return createNoIndexMetadata("资讯中心");
	}

	return createPageMetadata({
		description: activeFilter.description,
		path: `/zi-liao-ku/fen-lei/${filter}`,
		title: `${activeFilter.title} - 资讯中心`,
	});
}

export default async function KnowledgeFilterPage({ params }: PageProps) {
	const { filter } = await params;

	if (!getKnowledgeArticleFilterById(filter)) {
		notFound();
	}

	return <KnowledgeBaseContent activeFilterId={filter} />;
}
