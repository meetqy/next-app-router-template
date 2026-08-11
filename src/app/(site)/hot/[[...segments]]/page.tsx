import { redirect } from "next/navigation";
import { resolveKnowledgeHref } from "@/lib/knowledge-base";

type PageProps = {
	params: Promise<{ segments?: string[] }>;
};

export default async function LegacyHotPage({ params }: PageProps) {
	const { segments = [] } = await params;
	const legacyPath = `/hot/${segments.join("/")}`.replace(/\/$/g, "");
	redirect(encodeURI(resolveKnowledgeHref(legacyPath) ?? "/zi-liao-ku"));
}
