import { permanentRedirect } from "next/navigation";
import { getPriceArticleDestination } from "@/lib/content-center";

export const dynamic = "force-dynamic";

export default function Page() {
	permanentRedirect(getPriceArticleDestination());
}
