import { redirect } from "next/navigation";
import { resolveKnowledgeHref } from "@/lib/knowledge-base";

type PageProps = {
	params: Promise<{ segments?: string[] }>;
};

export default async function LegacyCampusPage({ params }: PageProps) {
	const { segments = [] } = await params;
	const legacyPath = `/campus/${segments.join("/")}`.replace(/\/$/g, "");
	redirect(encodeURI(resolveKnowledgeHref(legacyPath) ?? "/xiao-qu-cha-xun"));
}
