import { getSiteOrigin, getSiteRoutes } from "@/lib/site-routes";
import { SITE_FULL_NAME } from "@/lib/constants/site";

function buildLlmsText() {
	const siteOrigin = getSiteOrigin();
	const routeLines = getSiteRoutes().map((route) => {
		const url = new URL(route.path, siteOrigin).toString();
		return `- [${route.title}](${url}): ${route.description}`;
	});

	return [
		`# ${SITE_FULL_NAME}`,
		"",
		`> ${SITE_FULL_NAME}高考全日制与升学服务官网。`,
		"",
		"## 站点信息",
		`- 官网：${siteOrigin}`,
		"- 语言：中文",
		"- 主题：高考全日制、招生简章、荣誉资质、常见问题与咨询服务",
		"",
		"## 页面清单",
		...routeLines,
	].join("\n");
}

export function GET() {
	return new Response(buildLlmsText(), {
		headers: {
			"Cache-Control": "public, max-age=0, s-maxage=86400",
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}
