import { notFound, permanentRedirect } from "next/navigation";
import { resolveKnowledgeHref } from "@/lib/knowledge-base";

type PageProps = {
	params: Promise<{ segments?: string[] }>;
};

export default async function LegacyCampusPage({ params }: PageProps) {
	const { segments = [] } = await params;
	const legacyPath = `/campus/${segments.join("/")}`.replace(/\/$/g, "");
	const destination = resolveKnowledgeHref(legacyPath);
	if (!destination) notFound();
	permanentRedirect(encodeURI(destination));
}
