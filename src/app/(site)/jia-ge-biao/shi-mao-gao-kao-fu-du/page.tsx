import { permanentRedirect } from "next/navigation";
import { getPriceArticleDestination } from "@/lib/content-center";

export default function ShiMaoGaoKaoFuDuPage() {
	permanentRedirect(getPriceArticleDestination());
}
