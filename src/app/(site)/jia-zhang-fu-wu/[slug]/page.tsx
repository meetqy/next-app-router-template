import { notFound, permanentRedirect } from "next/navigation";
import { getParentArticleDestination } from "@/lib/content-center";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export default async function JiaZhangArticleRedirectPage({ params }: PageProps) {
	const { slug } = await params;
	const destination = getParentArticleDestination(slug);

	if (!destination) {
		notFound();
	}

	permanentRedirect(destination);
}
