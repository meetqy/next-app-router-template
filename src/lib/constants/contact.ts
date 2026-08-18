import { SITE_FULL_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";

export type ContactChannel = {
	label: string;
	value: string;
	href?: string;
	description?: string;
};

export const CONTACT_PAGE_INTRO = {
	badge: `${SITE_FULL_NAME} · 联系我们`,
	description: `如果您想咨询高考全日制、高三复读、艺考文化课、价格安排或校区来访事宜，可以直接联系${SITE_FULL_NAME}。页面仅展示当前已经确认的信息，未提供的内容将不单独显示。`,
	title: "联系我们",
};

export function createAmapSearchHref(query: string) {
	return `https://www.amap.com/search?query=${query.replace(/\s+/g, "")}`;
}

export function createTencentSearchHref(query: string) {
	return `https://map.qq.com/?type=search&keyword=${encodeURIComponent(query.replace(/\s+/g, ""))}`;
}

export const CONTACT_HEADQUARTERS = {
	address: "成都市青羊区顺城大街 252 号顺吉大厦",
	mapHref: createAmapSearchHref(
		"戴氏教育总部（成都市青羊区顺城大街252号顺吉大厦）",
	),
	name: SITE_FULL_NAME,
	navigationNote:
		"欢迎家长提前电话预约到访，现场查看教室、宿舍、学习环境与课程安排。",
	phoneDescription: "工作时间内可直接拨打，老师会结合孩子情况进行说明。",
};

export const CONTACT_CHANNELS: ContactChannel[] = [
	{
		description: CONTACT_HEADQUARTERS.phoneDescription,
		href: `tel:${SITE_HOTLINE_TEXT.replace(/-/g, "")}`,
		label: "咨询热线",
		value: SITE_HOTLINE_TEXT,
	},
	{
		href: CONTACT_HEADQUARTERS.mapHref,
		label: "总部地址",
		value: CONTACT_HEADQUARTERS.address,
	},
];

export const CONTACT_TOPICS = [
	`咨询${SITE_FULL_NAME}高考全日制、高三复读与艺考文化课安排`,
	`了解${SITE_FULL_NAME}校区来访、总部位置与到校方式`,
	"沟通孩子当前基础、班型选择、价格与学习规划问题",
];
