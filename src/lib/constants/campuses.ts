import { CONTACT_HEADQUARTERS, createAmapSearchHref } from "./contact";
import { TEACHERS } from "./teachers";

export type CampusGalleryImage = {
	alt: string;
	src: string;
};

export type CampusProgram = {
	description: string;
	title: string;
};

export type CampusReview = {
	content: string;
	source: string;
};

export type CampusProfile = {
	address: string;
	campusTeacherName?: string;
	coverImage: string;
	gallery: CampusGalleryImage[];
	highlights: string[];
	hidden?: boolean;
	intro: string;
	listSummary: string;
	mapHref?: string;
	name: string;
	parentReasons: string[];
	programs: CampusProgram[];
	review?: CampusReview;
	serviceTags: string[];
	slug: string;
	subtitle: string;
	title: string;
};

export function getCampusTeacherStats(campusTeacherName?: string) {
	if (!campusTeacherName) {
		return {
			subjectCount: 0,
			teacherCount: 0,
		};
	}

	const campusTeachers = TEACHERS.filter(
		(teacher) => teacher.campus === campusTeacherName,
	);
	const subjects = new Set(
		campusTeachers
			.map((teacher) => teacher.subject)
			.filter((subject): subject is string => Boolean(subject)),
	);

	return {
		subjectCount: subjects.size,
		teacherCount: campusTeachers.length,
	};
}

export const CAMPUSES: CampusProfile[] = [
	{
		slug: "shun-ji",
		name: "顺吉校区",
		title: "戴氏教育高考中心总部（顺吉校区）",
		subtitle: "总部校区",
		address: CONTACT_HEADQUARTERS.address,
		intro:
			"顺吉校区作为总部校区，围绕高考全日制、复读、冲刺与家长到校咨询场景提供更完整的教学与来访配套，方便家长系统了解课程、管理与学习安排。",
		listSummary:
			"总部校区重点承接高考全日制、复读与到校咨询需求，适合希望先了解整体教学体系、班型安排与学习管理方式的家庭。",
		coverImage: "/assets/校区环境1.png",
		mapHref: CONTACT_HEADQUARTERS.mapHref,
		campusTeacherName: "顺吉校区",
		serviceTags: ["高考全日制", "高考复读", "升学规划咨询", "家长到校考察"],
		highlights: [
			"总部校区承接家长集中来访，咨询动线与接待安排更清晰。",
			"围绕高三冲刺、复读与阶段性提分需求，便于统一了解班型与管理节奏。",
			"公开师资信息更完整，方便家长结合孩子情况提前筛选学科方向。",
		],
		programs: [
			{
				title: "高考全日制",
				description:
					"面向需要全天候学习管理与阶段复盘的学生，关注学习节奏、执行力和目标拆解。",
			},
			{
				title: "高考复读",
				description: "适合希望系统重建知识结构、重新规划冲刺路径的学生与家庭。",
			},
			{
				title: "家长到校咨询",
				description:
					"支持家长提前电话预约到校，现场了解教室、自习环境、课程安排与管理方式。",
			},
			{
				title: "班型与价格沟通",
				description:
					"结合孩子基础、目标与学习习惯，沟通适配班型、学习规划与价格政策。",
			},
		],
		parentReasons: [
			"适合希望先完整了解戴氏整体教学体系、管理流程与班型安排的家庭。",
			"到校咨询路径清晰，方便家长现场确认环境、课程与来访流程。",
			"总部校区公开老师数量较多，便于家长提前查看学科方向与师资信息。",
		],
		gallery: [
			{ src: "/assets/校区环境1.png", alt: "顺吉校区学习环境展示一" },
			{ src: "/assets/校区环境2.jpg", alt: "顺吉校区学习环境展示二" },
			{ src: "/assets/校区环境3.jpg", alt: "顺吉校区学习环境展示三" },
			{ src: "/assets/校区环境4.jpg", alt: "顺吉校区学习环境展示四" },
		],
	},
	{
		slug: "shi-mao",
		name: "世贸校区",
		title: "戴氏教育世贸校区",
		subtitle: "教学型校区",
		address: "龙泉驿区天鹅湖南路333号25-2栋3层1号",
		intro:
			"世贸校区以学科教学与日常学习陪伴为核心，已公开较完整的老师信息，适合希望优先了解具体学科老师、课堂风格和学习环境的家长。",
		listSummary:
			"世贸校区公开老师信息较完整，便于家长从学科方向、课堂风格和学习氛围角度先做校区了解。",
		coverImage: "/assets/校区环境5.jpg",
		mapHref: createAmapSearchHref(
			"戴氏教育世贸校区（龙泉驿区天鹅湖南路333号25-2栋3层1号）",
		),
		campusTeacherName: "世贸校区",
		serviceTags: ["学科辅导", "高考冲刺", "日常提分", "老师团队公开"],
		highlights: [
			"公开师资覆盖学科较多，方便家长快速匹配孩子薄弱科目。",
			"更适合先从老师团队、课堂风格和学习氛围角度做校区了解。",
			"支持电话咨询路线与到校安排，减少家长来访前的信息成本。",
		],
		programs: [
			{
				title: "学科提分辅导",
				description: "围绕语数英物化生政史地等方向提供分层教学与阶段提升支持。",
			},
			{
				title: "高考冲刺安排",
				description:
					"适合高三阶段需要强化重难点、梳理失分点与稳定训练节奏的学生。",
			},
			{
				title: "老师团队查询",
				description: "可先结合已公开老师信息查看学科背景、教学成果与课堂特点。",
			},
			{
				title: "来访路线确认",
				description: "如需实地看校，可先电话沟通具体地址、时间安排与到校流程。",
			},
		],
		parentReasons: [
			"适合希望优先看具体学科老师与课堂风格的家庭。",
			"老师团队公开信息较多，便于先做线上筛选再决定到校沟通。",
			"如果孩子薄弱科目明确，家长更容易快速定位合适的咨询方向。",
		],
		gallery: [
			{ src: "/assets/校区环境3.jpg", alt: "世贸校区学习环境展示一" },
			{ src: "/assets/校区环境4.jpg", alt: "世贸校区学习环境展示二" },
			{ src: "/assets/校区环境5.jpg", alt: "世贸校区学习环境展示三" },
			{ src: "/assets/校区环境6.png", alt: "世贸校区学习环境展示四" },
		],
	},
	{
		slug: "hua-qian-ji",
		name: "花千集校区",
		title: "戴氏教育（花千集直营旗舰校）",
		subtitle: "直营旗舰校",
		address: "金牛区一环路北二段9号4栋2层附210号",
		intro:
			"花千集直营旗舰校覆盖小学、初中、高中到中高考集训场景，兼顾精品小班、升学规划、英语能力提升与暑假衔接课程，适合需要多学段衔接与集中规划的家庭。",
		listSummary:
			"新开直营旗舰校，覆盖小学到高中、多类精品班与中高考集训，适合关注学习环境、英语课程和暑期衔接安排的家庭。",
		coverImage: "/校区/花千集/门头 1.JPG",
		mapHref: createAmapSearchHref(
			"戴氏教育花千集直营旗舰校（金牛区一环路北二段9号4栋2层附210号）",
		),
		campusTeacherName: "花千集校区",
		serviceTags: [
			"KET 报名点",
			"精品小班",
			"中高考集训",
			"艺考文化课",
			"高考复读",
			"高职单招",
			"小学文化课",
			"初中文化课",
			"高中文化课",
		],
		highlights: [
			"新开直营旗舰校，门头醒目，到校辨识度高，方便家长首次来访。",
			"覆盖小学、初中、高中多个学段，便于同一家庭做持续性学习规划。",
			"英语、新高一、高三与暑假衔接等课程方向清晰，适合短中期并行咨询。",
		],
		programs: [
			{
				title: "新高一衔接",
				description: "针对初升高阶段提供全科一对一辅托与全日制升学规划支持。",
			},
			{
				title: "高三冲刺",
				description:
					"围绕高三全科一对一辅导与阶段规划，帮助学生更聚焦冲刺目标。",
			},
			{
				title: "英语能力提升",
				description: "覆盖新概念英语、自然拼读、KET、PET 与阅读训练等方向。",
			},
			{
				title: "暑假衔接班",
				description: "提供小学、初中、高中暑假班全科辅托与新学期衔接课程安排。",
			},
			{
				title: "高中学科强化",
				description:
					"围绕语文、数学、英语、物理、化学、生物等学科做暑期强化训练。",
			},
			{
				title: "小学基础提升",
				description:
					"提供语文、数学、英语辅导与阅读、作文、拼音等专项提升课程。",
			},
		],
		parentReasons: [
			"适合一个家庭同时关注多个学段、多个课程方向的咨询需求。",
			"英语、暑假衔接、新高一和高三冲刺信息清晰，便于快速判断是否匹配。",
			"来自家长评价的直接反馈集中在老师专业热情、环境新与活动性价比高。",
		],
		review: {
			source: "高德地图家长评价",
			content:
				"新开的校区，老师们都很专业热情，校区环境也很好，开业活动性价比很高。",
		},
		gallery: [
			{ src: "/校区/花千集/门头 1.JPG", alt: "花千集校区门头展示一" },
			{ src: "/校区/花千集/门头 2.JPG", alt: "花千集校区门头展示二" },
			{ src: "/校区/花千集/门头 3.JPG", alt: "花千集校区门头展示三" },
			{ src: "/校区/花千集/新高一.jpg", alt: "花千集校区新高一课程教室" },
			{ src: "/校区/花千集/高三.jpg", alt: "花千集校区高三课程教室" },
			{ src: "/校区/花千集/高中.jpg", alt: "花千集校区高中课程环境" },
			{ src: "/校区/花千集/数交班.jpg", alt: "花千集校区数学课程环境" },
			{ src: "/校区/花千集/英语.jpg", alt: "花千集校区英语课程环境" },
			{ src: "/校区/花千集/小学.jpg", alt: "花千集校区小学课程环境" },
		],
	},
];

export function getCampusBySlug(slug: string) {
	return CAMPUSES.find((campus) => campus.slug === slug && !campus.hidden);
}

export function getVisibleCampuses() {
	return CAMPUSES.filter((campus) => !campus.hidden);
}
