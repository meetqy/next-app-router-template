import type { Metadata } from "next";
import { SITE_FULL_NAME } from "@/lib/constants/site";
import { createPageMetadata } from "@/lib/seo";
import { KnowledgeBaseContent } from "./KnowledgeBaseContent";

const KNOWLEDGE_DESCRIPTION = `${SITE_FULL_NAME}资讯中心，集中展示招生简章、收费说明、考试政策、备考建议、择校对比与家长问答。`;

export const metadata: Metadata = createPageMetadata({
	description: KNOWLEDGE_DESCRIPTION,
	path: "/zi-liao-ku",
	title: "资讯中心",
});

export default function KnowledgeBasePage() {
	return <KnowledgeBaseContent />;
}
