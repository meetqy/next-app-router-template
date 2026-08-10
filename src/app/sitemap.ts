import type { MetadataRoute } from "next";
import { getSiteOrigin, getSiteRoutes } from "@/lib/site-routes";

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();

	return getSiteRoutes().map((route) => ({
		changeFrequency: route.changeFrequency,
		lastModified,
		priority: route.priority,
		url: new URL(route.path, getSiteOrigin()).toString(),
	}));
}
