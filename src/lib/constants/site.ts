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

export const PRIMARY_LINKS: HeaderNavItem[] = [
	{ href: "/", label: "首页" },
	{ href: "/lao-shi", label: "教师团队" },
	{ href: "/xiao-qu-cha-xun", label: "校区查询" },
	{
		items: [
			{ href: "/sheng-xue-xi-bao", label: "升学案例" },
			{ href: "/ti-fen-an-li", label: "提分案例" },
		],
		label: "案例展示",
	},
	{ href: "/zi-liao-ku", label: "资讯中心" },
	{
		items: [
			{ href: "/jiao-xue-huan-jing", label: "教学环境" },
			{ href: "/rong-yu-zi-zhi", label: "荣誉资质" },
			{ href: "/lian-xi-wo-men", label: "联系我们" },
		],
		label: "了解戴氏",
	},
];
