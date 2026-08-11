import { redirect } from "next/navigation";
import { resolveKnowledgeHref } from "@/lib/knowledge-base";

type PageProps = {
	params: Promise<{ segments?: string[] }>;
};

export default async function LegacyCoursePage({ params }: PageProps) {
	const { segments = [] } = await params;
	const legacyPath = `/course/${segments.join("/")}`.replace(/\/$/g, "");
	redirect(
		encodeURI(resolveKnowledgeHref(legacyPath) ?? "/zhao-sheng-jian-zhang"),
	);
}
