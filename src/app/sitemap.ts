import type { MetadataRoute } from "next";
import { getSiteOrigin, getSiteRoutes } from "@/lib/site-routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	return getSiteRoutes().map((route) => ({
		changeFrequency: route.changeFrequency,
		...(route.lastModified ? { lastModified: route.lastModified } : {}),
		priority: route.priority,
		url: new URL(route.path, getSiteOrigin()).toString(),
	}));
}
