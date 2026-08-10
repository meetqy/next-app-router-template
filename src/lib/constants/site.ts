export type NavLink = {
	href: string;
	label: string;
};

export type DropdownNavLink = {
	items: NavLink[];
	label: string;
};

export type HeaderNavItem = NavLink | DropdownNavLink;

export const SITE_BRAND_NAME = "成都戴氏高考中心";
export const SITE_FULL_NAME = "成都戴氏教育高考中心总部（顺吉校区）";
export const SITE_HOTLINE_TEXT = "400-9875-211";
export const SITE_HOTLINE_TEL = "tel:4009875211";

export const UTILITY_LINKS: NavLink[] = [
	{ href: "/rong-yu-zi-zhi", label: "荣誉资质" },
	{ href: "/sheng-xue-xi-bao", label: "升学喜报" },
	{ href: "/#xin-wen", label: "考试资讯" },
	{ href: "/zi-liao-ku", label: "资料库" },
	{ href: "/xiao-qu-cha-xun", label: "校区查询" },
	{ href: "/#jia-chang-wen-da", label: "家长问答" },
	{ href: "/lian-xi-wo-men", label: "联系我们" },
];

export const PRIMARY_LINKS: HeaderNavItem[] = [
	{ href: "/", label: "首页" },
	{
		items: [
			{ href: "/#gao-kao-quan-ri-zhi", label: "高考全日制" },
			{ href: "/#jiao-xue-jiao-yan", label: "教学教研" },
			{ href: "/#jiao-xue-guan-li", label: "教学管理" },
		],
		label: "课程体系",
	},
	{
		items: [
			{ href: "/zhao-sheng-jian-zhang", label: "招生简章" },
			{ href: "/jia-ge-biao", label: "价格表" },
			{ href: "/xiao-qu-cha-xun", label: "校区查询" },
			{ href: "/sheng-xue-xi-bao", label: "升学喜报" },
			{ href: "/#jia-chang-wen-da", label: "家长问答" },
			{ href: "/#xin-wen", label: "考试资讯" },
			{ href: "/zi-liao-ku", label: "资料库" },
		],
		label: "招生与服务",
	},
	{ href: "/jia-zhang-fu-wu", label: "家长服务" },
	{
		items: [
			{ href: "/lao-shi", label: "老师团队" },
			{ href: "/rong-yu-zi-zhi", label: "荣誉资质" },
			{ href: "/#xiao-qu", label: "学习环境" },
			{ href: "/lian-xi-wo-men", label: "联系我们" },
		],
		label: "关于我们",
	},
];

export const MOBILE_PRIMARY_LINKS: NavLink[] = [
	{ href: "/", label: "首页" },
	{ href: "/#gao-kao-quan-ri-zhi", label: "高考全日制" },
	{ href: "/#jiao-xue-jiao-yan", label: "教学教研" },
	{ href: "/#jiao-xue-guan-li", label: "教学管理" },
	{ href: "/zhao-sheng-jian-zhang", label: "招生简章" },
	{ href: "/jia-ge-biao", label: "价格表" },
	{ href: "/jia-zhang-fu-wu", label: "家长服务" },
	{ href: "/sheng-xue-xi-bao", label: "升学喜报" },
	{ href: "/xiao-qu-cha-xun", label: "校区查询" },
	{ href: "/#jia-chang-wen-da", label: "家长问答" },
	{ href: "/#xin-wen", label: "考试资讯" },
	{ href: "/zi-liao-ku", label: "资料库" },
	{ href: "/lao-shi", label: "老师团队" },
	{ href: "/rong-yu-zi-zhi", label: "荣誉资质" },
	{ href: "/#xiao-qu", label: "学习环境" },
	{ href: "/lian-xi-wo-men", label: "联系我们" },
];
