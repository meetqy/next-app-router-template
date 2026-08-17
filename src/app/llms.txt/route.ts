import { getSiteOrigin, getSiteRoutes } from "@/lib/site-routes";
import { SITE_FULL_NAME } from "@/lib/constants/site";

export const dynamic = "force-static";

function buildLlmsText() {
	const siteOrigin = getSiteOrigin();
	const routeLines = getSiteRoutes().map((route) => {
		const url = new URL(route.path, siteOrigin).toString();
		const lastModified = route.lastModified
			? `（页面日期：${route.lastModified}）`
			: "";
		return `- [${route.title}](${url}): ${route.description}${lastModified}`;
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
		"- 内容说明：价格、课程、校区开放状态和招生安排以对应页面当前公开信息及当期书面说明为准。",
		"- 资讯中心说明：资讯中心包含招生课程、复读全日制、备考提升、升学政策、择校对比、费用服务、新闻动态与热点关注；历史资料会标注公开来源或资料时间。",
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
