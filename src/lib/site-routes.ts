import { env } from "@/env";
import { SITE_FULL_NAME } from "@/lib/constants/site";
import { TEACHERS } from "@/lib/constants/teachers";
import { getVisibleCampuses } from "@/lib/constants/campuses";
import {
	getKnowledgeArticles,
	getKnowledgeArticleFilters,
	getKnowledgeArticlesByFilter,
} from "@/lib/knowledge-base";
import { normalizeSeoDate } from "@/lib/seo";
import { SCORE_IMPROVEMENT_CASES } from "@/lib/score-improvement-cases";

export type SiteRoute = {
	changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
	description: string;
	lastModified?: string;
	path: string;
	priority: number;
	title: string;
};

const SITE_ORIGIN = `https://${env.NEXT_PUBLIC_SITE_DOMAIN}`;

const STATIC_SITE_ROUTES: SiteRoute[] = [
	{
		changeFrequency: "daily",
		description: `${SITE_FULL_NAME}高考全日制与升学服务官网首页。`,
		path: "/",
		priority: 1,
		title: "首页",
	},
	{
		changeFrequency: "weekly",
		description: `查看${SITE_FULL_NAME}荣誉证书、资质认证与品牌背书内容。`,
		path: "/rong-yu-zi-zhi",
		priority: 0.8,
		title: "荣誉资质",
	},
	{
		changeFrequency: "weekly",
		description: `查看${SITE_FULL_NAME}历年大学录取案例图片，支持按年份浏览与分页查看。`,
		path: "/sheng-xue-xi-bao",
		priority: 0.8,
		title: "升学案例",
	},
	{
		changeFrequency: "monthly",
		description: `查看${SITE_FULL_NAME}学生阶段成绩变化、学习过程与帮扶措施。`,
		path: "/ti-fen-an-li",
		priority: 0.8,
		title: "提分案例",
	},
	{
		changeFrequency: "weekly",
		description: `${SITE_FULL_NAME}资讯中心：集中展示招生课程、复读全日制、备考提升、升学政策、择校对比、费用服务、新闻动态与热点关注。`,
		path: "/zi-liao-ku",
		priority: 0.7,
		title: "资讯中心",
	},
	{
		changeFrequency: "weekly",
		description: `查看${SITE_FULL_NAME}电话、地址、到访说明与联系入口。`,
		path: "/lian-xi-wo-men",
		priority: 0.7,
		title: "联系我们",
	},
	{
		changeFrequency: "weekly",
		description: `核验${SITE_FULL_NAME}直营官网、第三方平台子站、品牌相关域名与官方咨询电话。`,
		path: "/guan-fang-he-yan",
		priority: 0.8,
		title: "官网核验",
	},
	{
		changeFrequency: "weekly",
		description: `查看${SITE_FULL_NAME}全部校区信息，快速了解各校区地址、学习环境与到校咨询入口。`,
		path: "/xiao-qu-cha-xun",
		priority: 0.8,
		title: "校区查询",
	},
	{
		changeFrequency: "weekly",
		description: `查看${SITE_FULL_NAME}课堂教学、学习日常、考试测评和空间环境实景照片。`,
		path: "/jiao-xue-huan-jing",
		priority: 0.8,
		title: "教学环境",
	},
	{
		changeFrequency: "weekly",
		description: `查看${SITE_FULL_NAME}核心老师介绍、教学履历与教学成果。`,
		path: "/lao-shi",
		priority: 0.8,
		title: "教师团队",
	},
	{
		changeFrequency: "weekly",
		description: `${SITE_FULL_NAME}网站全部公开页面 URL 的分页文本目录。`,
		path: "/urls",
		priority: 0.3,
		title: "URL 目录",
	},
];

export function getSiteOrigin() {
	return SITE_ORIGIN;
}

export function getSiteRoutes(): SiteRoute[] {
	const campusRoutes: SiteRoute[] = getVisibleCampuses().map((campus) => ({
		changeFrequency: "monthly",
		description: `${campus.title}地址、课程服务、环境图片与咨询信息。`,
		lastModified: campus.updatedAt,
		path: `/xiao-qu-cha-xun/${campus.slug}`,
		priority: 0.6,
		title: campus.title,
	}));
	const teacherRoutes: SiteRoute[] = TEACHERS.map((teacher) => ({
		changeFrequency: "monthly",
		description: `查看${teacher.name}教师的教学履历、荣誉任职与教学成果。`,
		path: `/lao-shi/${teacher.slug}`,
		priority: 0.7,
		title: `${teacher.name}教师介绍`,
	}));
	const teacherCampuses = [
		...new Set(
			TEACHERS.map((teacher) => teacher.campus).filter(
				(campus): campus is string => Boolean(campus),
			),
		),
	];
	const teacherFilterRoutes: SiteRoute[] = teacherCampuses.map((campus) => ({
		changeFrequency: "monthly",
		description: `查看${campus}教师团队的教学背景、学科方向与代表性成果。`,
		path: `/lao-shi?xiaoqu=${encodeURIComponent(campus)}`,
		priority: 0.5,
		title: `${campus}教师团队`,
	}));

	const knowledgeRoutes: SiteRoute[] = getKnowledgeArticles().map(
		(article) => ({
			changeFrequency: "yearly",
			description: article.summary,
			lastModified:
				normalizeSeoDate(article.publishedAt) ??
				normalizeSeoDate(article.crawledAt),
			path: `/zi-liao-ku/${article.slug}`,
			priority: article.historical ? 0.35 : 0.45,
			title: `${article.title}资讯`,
		}),
	);
	const scoreImprovementCaseRoutes: SiteRoute[] = SCORE_IMPROVEMENT_CASES.map(
		(item) => ({
			changeFrequency: "yearly",
			description: item.summary,
			path: `/ti-fen-an-li/${item.slug}`,
			priority: 0.6,
			title: item.title,
		}),
	);
	const knowledgeArticles = getKnowledgeArticles();
	const knowledgePageCount = Math.max(1, Math.ceil(knowledgeArticles.length / 10));
	const knowledgeListRoutes: SiteRoute[] = Array.from(
		{ length: Math.max(0, knowledgePageCount - 1) },
		(_, index) => {
			const page = index + 2;
			return {
				changeFrequency: "weekly" as const,
				description: `${SITE_FULL_NAME}资讯中心第${page}页。`,
				path: `/zi-liao-ku?page=${page}`,
				priority: 0.4,
				title: `资讯中心第${page}页`,
			};
		},
	);
	const knowledgeFilterRoutes: SiteRoute[] = getKnowledgeArticleFilters().flatMap(
		(filter) => {
			const pageCount = Math.max(
				1,
				Math.ceil((getKnowledgeArticlesByFilter(filter.id)?.length ?? 0) / 10),
			);
			const baseRoute: SiteRoute = {
				changeFrequency: "weekly",
				description: filter.description,
				path: `/zi-liao-ku/fen-lei/${filter.id}`,
				priority: 0.5,
				title: `${filter.title}资讯中心`,
			};
			const pageRoutes: SiteRoute[] = Array.from(
				{ length: Math.max(0, pageCount - 1) },
				(_, index) => {
					const page = index + 2;
					return {
						changeFrequency: "weekly" as const,
						description: `${filter.description}第${page}页。`,
						path: `/zi-liao-ku/fen-lei/${filter.id}?page=${page}`,
						priority: 0.35,
						title: `${filter.title}第${page}页`,
					};
				},
			);
			return [baseRoute, ...pageRoutes];
		},
	);

	const routes = [
		...STATIC_SITE_ROUTES,
		...campusRoutes,
		...teacherRoutes,
		...teacherFilterRoutes,
		...knowledgeRoutes,
		...scoreImprovementCaseRoutes,
		...knowledgeListRoutes,
		...knowledgeFilterRoutes,
	];
	const seenPaths = new Set<string>();
	return routes.filter((route) => {
		if (seenPaths.has(route.path)) return false;
		seenPaths.add(route.path);
		return true;
	});
}
