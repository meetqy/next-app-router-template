import { env } from "@/env";
import { getAllBrochures } from "@/lib/brochures";
import { getVisibleCampuses } from "@/lib/constants/campuses";
import { SITE_FULL_NAME } from "@/lib/constants/site";
import { TEACHERS } from "@/lib/constants/teachers";
import { getAllJiaZhangArticles } from "@/lib/jia-zhang-fu-wu";
import {
	getKnowledgeArticles,
	getKnowledgeCampuses,
} from "@/lib/knowledge-base";

export type SiteRoute = {
	changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
	description: string;
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
		description: `查看${SITE_FULL_NAME}历年大学录取喜报图片，支持按年份浏览与分页查看。`,
		path: "/sheng-xue-xi-bao",
		priority: 0.8,
		title: "升学喜报",
	},
	{
		changeFrequency: "weekly",
		description: `查看${SITE_FULL_NAME}历年高考全日制招生简章列表。`,
		path: "/zhao-sheng-jian-zhang",
		priority: 0.9,
		title: "招生简章",
	},
	{
		changeFrequency: "weekly",
		description: `查看${SITE_FULL_NAME}各校区各类课程价格表与优惠政策。`,
		path: "/jia-ge-biao",
		priority: 0.9,
		title: "价格表",
	},
	{
		changeFrequency: "weekly",
		description: `${SITE_FULL_NAME}总部校区（世贸）2027 届高考复读、高三全日制全科班最新优惠政策与收费标准官方公示。`,
		path: "/jia-ge-biao/shi-mao-gao-kao-fu-du",
		priority: 0.9,
		title: "总部校区（世贸）高考复读优惠政策",
	},
	{
		changeFrequency: "weekly",
		description: `${SITE_FULL_NAME}家长服务中心：学管服务流程、教学管理规范、家长指南、备考攻略与高考资讯集中呈现。`,
		path: "/jia-zhang-fu-wu",
		priority: 0.8,
		title: "家长服务",
	},
	{
		changeFrequency: "weekly",
		description: `${SITE_FULL_NAME}资料库：集中展示课程、校区、收费、考试时间与升学服务相关信息，方便家长按主题查询参考。`,
		path: "/zi-liao-ku",
		priority: 0.7,
		title: "资料库",
	},
	{
		changeFrequency: "monthly",
		description: `2026高考复读学校选购科普：多维度盘点市面合规优质复读机构，帮助家长科学避坑、精准择校。`,
		path: "/jia-zhang-fu-wu/2026-fu-du-xuan-xiao-zhi-nan",
		priority: 0.8,
		title: "2026高考复读择校指南",
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
		description: `查看${SITE_FULL_NAME}全部校区信息，快速了解各校区地址、学习环境与到校咨询入口。`,
		path: "/xiao-qu-cha-xun",
		priority: 0.8,
		title: "校区查询",
	},
	{
		changeFrequency: "weekly",
		description: `查看${SITE_FULL_NAME}核心老师介绍、教学履历与教学成果。`,
		path: "/lao-shi",
		priority: 0.8,
		title: "老师团队",
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
	const brochureRoutes: SiteRoute[] = getAllBrochures().map(
		(brochure, index) => ({
			changeFrequency: "monthly",
			description: `查看${brochure.year}届${SITE_FULL_NAME}招生简章与备考安排。`,
			path: `/zhao-sheng-jian-zhang/${brochure.year}`,
			priority: index === 0 ? 0.9 : 0.7,
			title: brochure.title,
		}),
	);

	const teacherRoutes: SiteRoute[] = TEACHERS.map((teacher) => ({
		changeFrequency: "monthly",
		description: `查看${teacher.name}老师的教学履历、荣誉任职与教学成果。`,
		path: `/lao-shi/${teacher.slug}`,
		priority: 0.7,
		title: `${teacher.name}老师介绍`,
	}));

	const jiaZhangRoutes: SiteRoute[] = getAllJiaZhangArticles().map(
		(article) => ({
			changeFrequency: "monthly",
			description: article.summary,
			path: `/jia-zhang-fu-wu/${article.slug}`,
			priority: 0.7,
			title: article.title,
		}),
	);

	const campusRoutes: SiteRoute[] = getVisibleCampuses().map((campus) => ({
		changeFrequency: "monthly",
		description: campus.listSummary,
		path: `/xiao-qu-cha-xun/${campus.slug}`,
		priority: 0.7,
		title: `${campus.name}详情`,
	}));

	const archiveCampusRoutes: SiteRoute[] = getKnowledgeCampuses().map(
		(campus) => ({
			changeFrequency: "yearly",
			description:
				campus.description ?? `${campus.title}校区地址、路线与到访提示。`,
			path: `/xiao-qu-cha-xun/${campus.slug}`,
			priority: 0.4,
			title: `${campus.title}校区资料`,
		}),
	);

	const knowledgeRoutes: SiteRoute[] = getKnowledgeArticles().map(
		(article) => ({
			changeFrequency: "yearly",
			description: article.summary,
			path: `/zi-liao-ku/${article.slug}`,
			priority: article.historical ? 0.35 : 0.45,
			title: `${article.title}资料`,
		}),
	);

	return [
		...STATIC_SITE_ROUTES,
		...brochureRoutes,
		...teacherRoutes,
		...campusRoutes,
		...archiveCampusRoutes,
		...jiaZhangRoutes,
		...knowledgeRoutes,
	];
}
