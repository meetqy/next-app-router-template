import type { Metadata } from "next";
import { SITE_FULL_NAME } from "@/lib/constants/site";
import {
	KNOWLEDGE_PAGE_PARAM,
	KnowledgeBaseContent,
	resolveKnowledgePage,
} from "./KnowledgeBaseContent";
import { getKnowledgeArticles } from "@/lib/knowledge-base";
import { createPageMetadata } from "@/lib/seo";

const KNOWLEDGE_DESCRIPTION = `${SITE_FULL_NAME}资料库，集中展示课程、校区、收费、考试时间与升学服务相关信息，方便家长按主题查询参考。`;

export async function generateMetadata({
	searchParams,
}: PageProps): Promise<Metadata> {
	const resolvedSearchParams = await searchParams;
	const currentPage = resolveKnowledgePage(
		resolvedSearchParams?.[KNOWLEDGE_PAGE_PARAM],
	);
	const totalPages = Math.max(1, Math.ceil(getKnowledgeArticles().length / 10));
	const safePage = Math.min(currentPage, totalPages);
	const path = safePage > 1 ? `/zi-liao-ku?page=${safePage}` : "/zi-liao-ku";

	return createPageMetadata({
		description: KNOWLEDGE_DESCRIPTION,
		path,
		title: safePage > 1 ? `资料库 第${safePage}页` : "资料库",
	});
}

type PageProps = {
	searchParams?: Promise<{
		[KNOWLEDGE_PAGE_PARAM]?: string | string[];
	}>;
};

export default async function KnowledgeBasePage({ searchParams }: PageProps) {
	const resolvedSearchParams = await searchParams;
	const currentPage = resolveKnowledgePage(
		resolvedSearchParams?.[KNOWLEDGE_PAGE_PARAM],
	);

	return <KnowledgeBaseContent currentPage={currentPage} />;
}
