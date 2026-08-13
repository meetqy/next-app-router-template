import { notFound, permanentRedirect } from "next/navigation";
import { getBrochureDestination } from "@/lib/content-center";

type PageProps = {
	params: Promise<{ year: string }>;
};

export default async function BrochureRedirectPage({ params }: PageProps) {
	const { year } = await params;
	const destination = getBrochureDestination(year);

	if (!destination) {
		notFound();
	}

	permanentRedirect(destination);
}
