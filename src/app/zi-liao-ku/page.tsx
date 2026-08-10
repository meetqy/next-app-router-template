import type { Metadata } from "next";
import { SITE_FULL_NAME } from "@/lib/constants/site";
import {
	KNOWLEDGE_PAGE_PARAM,
	KnowledgeBaseContent,
	resolveKnowledgePage,
} from "./KnowledgeBaseContent";

export const metadata: Metadata = {
	title: "资料库",
	description: `${SITE_FULL_NAME}资料库，集中展示课程、校区、收费、考试时间与升学服务相关信息，方便家长按主题查询参考。`,
};

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
