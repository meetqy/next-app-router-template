import { redirect } from "next/navigation";
import { resolveKnowledgeHref } from "@/lib/knowledge-base";

type PageProps = {
	params: Promise<{ segments?: string[] }>;
};

export default async function LegacyTeacherPage({ params }: PageProps) {
	const { segments = [] } = await params;
	const legacyPath = `/teacher/${segments.join("/")}`.replace(/\/$/g, "");
	redirect(encodeURI(resolveKnowledgeHref(legacyPath) ?? "/lao-shi"));
}
