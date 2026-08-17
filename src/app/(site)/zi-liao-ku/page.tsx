import type { Metadata } from "next";
import { SITE_FULL_NAME } from "@/lib/constants/site";
import { createPageMetadata } from "@/lib/seo";
import { KnowledgeBaseContent } from "./KnowledgeBaseContent";

const KNOWLEDGE_DESCRIPTION = `${SITE_FULL_NAME}资讯中心，集中展示招生课程、复读全日制、备考提升、升学政策、择校对比、家长问答、费用服务、新闻动态与热点关注。`;

export const metadata: Metadata = createPageMetadata({
	description: KNOWLEDGE_DESCRIPTION,
	path: "/zi-liao-ku",
	title: "资讯中心",
});

export default function KnowledgeBasePage() {
	return <KnowledgeBaseContent />;
}
