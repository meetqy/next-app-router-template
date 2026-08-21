export type BrandChannel = {
	city?: string;
	note: string;
	pageType: string;
	phone?: string;
	status: "official" | "third-party";
	url: string;
};

export type PublicBrandChannel = BrandChannel & {
	platform: string;
	verifiedAt: string;
};

export type BrandChannelGroup = {
	description: string;
	id: string;
	name: string;
	channels: readonly BrandChannel[];
};

export const BRAND_CHANNEL_LAST_VERIFIED = "2026-08-21";

export const OFFICIAL_BRAND_CHANNELS = [
	{
		note: "戴氏教育高考中心直营官网。",
		pageType: "直营官网",
		status: "official",
		url: "https://dai-shi.cn/",
	},
	{
		note: "戴氏教育品牌官网，作为直营官网公开核验。",
		pageType: "直营官网",
		status: "official",
		url: "https://dai-shi.com/",
	},
] as const satisfies readonly BrandChannel[];

export const THIRD_PARTY_BRAND_CHANNEL_GROUPS = [
	{
		description: "使用戴氏教育品牌名称的独立域名，不属于 dai-shi.cn 或 dai-shi.com 直营官网。",
		id: "brand-domains",
		name: "品牌相关独立站",
		channels: [
			{
				note: "成都戴氏教育、戴氏教育精品中心页面。",
				pageType: "品牌招生站",
				phone: "15108235587",
				status: "third-party",
				url: "http://www.daishi-gsq.com/",
			},
			{
				note: "页面显示成都市武侯区戴氏启祥教育培训学校有限公司。",
				pageType: "高考中心站",
				status: "third-party",
				url: "http://www.daishi.pro/",
			},
			{
				note: "戴氏教育高考中心总部、集训中心页面。",
				pageType: "高考中心站",
				status: "third-party",
				url: "http://www.daishi.vip/",
			},
			{
				note: "成都戴氏精品堂页面，直营校区表述需以总部核验为准。",
				pageType: "精品堂站",
				phone: "15108235587",
				status: "third-party",
				url: "https://www.dsjptxx.com/",
			},
			{
				city: "成都",
				note: "成都戴氏总部、高考集训、艺考文化课页面。",
				pageType: "总部招生站",
				phone: "15108235587",
				status: "third-party",
				url: "http://m.cddaishi.net/",
			},
			{
				note: "戴氏教育招生与城市校区内容站。",
				pageType: "品牌招生站",
				status: "third-party",
				url: "https://www.daishi-edu.cn/",
			},
			{
				note: "戴氏教育招生与艺考文化集训页面。",
				pageType: "品牌招生站",
				phone: "15283982349",
				status: "third-party",
				url: "https://www.daishibuxi.cn/",
			},
			{
				city: "华润二十四城",
				note: "页面标题使用“戴氏教育官网”，但不是两家直营官网之一。",
				pageType: "区域招生站",
				status: "third-party",
				url: "http://www.daishi-edu.net/",
			},
			{
				city: "成都",
				note: "戴氏总校、高考辅导、艺考文化课和复读页面。",
				pageType: "总校招生站",
				phone: "15108235587",
				status: "third-party",
				url: "http://www.dai-shi.net/",
			},
			{
				city: "广西",
				note: "广西戴氏教育、高考教育机构页面。",
				pageType: "区域招生站",
				status: "third-party",
				url: "http://www.gx-ds.net/",
			},
			{
				city: "成都",
				note: "戴氏教育高考补习、冲刺辅导和艺考培训页面。",
				pageType: "高考招生站",
				phone: "15108235587",
				status: "third-party",
				url: "http://www.daishi2.com/",
			},
			{
				city: "成都",
				note: "戴氏教育高考总校、成都高考培训页面。",
				pageType: "高考总校站",
				phone: "15108235587",
				status: "third-party",
				url: "https://www.daishi-jy.com/",
			},
			{
				city: "南宁",
				note: "南宁戴氏教育、高考一对一和补习班页面。",
				pageType: "区域招生站",
				status: "third-party",
				url: "http://www.gxdse.com/",
			},
			{
				city: "成都",
				note: "成都戴氏、戴氏教育和戴氏精品堂页面。",
				pageType: "精品堂站",
				status: "third-party",
				url: "https://www.dsfudao.com/",
			},
		],
	},
	{
		description: "第三方平台为戴氏机构生成的学校主页、机构微站或子站路径。页面电话仅代表该平台当前展示值。",
		id: "platform-sites",
		name: "第三方平台子站",
		channels: [
			{
				note: "坦途独立子域名，含课程、师资、资讯和校区栏目。",
				pageType: "平台独立子站",
				phone: "400-601-6869",
				status: "third-party",
				url: "https://daishi.tantuw.com/",
			},
			{
				city: "成都",
				note: "坦途机构主页，School/1338 子站。",
				pageType: "机构主页",
				phone: "400-801-6269",
				status: "third-party",
				url: "https://cd.tantuw.com/School/1338",
			},
			{
				city: "成都",
				note: "坦途高考中心主页，School/8255 子站。",
				pageType: "机构主页",
				phone: "400-801-6269",
				status: "third-party",
				url: "https://cd.tantuw.com/School/8255",
			},
			{
				city: "成都",
				note: "坦途机构子站移动页面，对应 1338。",
				pageType: "移动子站",
				status: "third-party",
				url: "https://m.tantuw.com/cd/sch_1338",
			},
			{
				city: "成都",
				note: "坦途成都戴氏教育机构新闻页。",
				pageType: "机构新闻页",
				phone: "400-801-6269",
				status: "third-party",
				url: "https://cd.tantuw.com/SchoolNews/1338/760736",
			},
			{
				city: "成都",
				note: "坦途成都戴氏高考中心机构新闻页。",
				pageType: "机构新闻页",
				phone: "400-801-6269",
				status: "third-party",
				url: "https://cd.tantuw.com/SchoolNews/8255/770805",
			},
			{
				city: "成都",
				note: "课多多 schid=5147 机构主页。",
				pageType: "机构主页",
				phone: "19090515345",
				status: "third-party",
				url: "https://www.keedu.cn/school?schid=5147",
			},
			{
				city: "成都",
				note: "课多多机构简介页。",
				pageType: "机构简介页",
				status: "third-party",
				url: "https://www.keedu.cn/school/summary?schid=5147",
			},
			{
				city: "成都",
				note: "课多多机构联系页。",
				pageType: "机构联系页",
				status: "third-party",
				url: "https://www.keedu.cn/school/contact?area=510100&schid=5147",
			},
			{
				city: "成都",
				note: "课多多机构课程页。",
				pageType: "机构课程页",
				status: "third-party",
				url: "https://www.keedu.cn/course?schid=5147&subject=412001",
			},
			{
				city: "成都",
				note: "学满分成都戴氏教育主页。",
				pageType: "机构主页",
				phone: "400-888-4011",
				status: "third-party",
				url: "https://www.xuemanfen.cn/school/cd/6443/",
			},
			{
				city: "重庆",
				note: "学满分重庆戴氏教育主页。",
				pageType: "机构主页",
				phone: "400-888-4011",
				status: "third-party",
				url: "https://www.xuemanfen.cn/school/cq/2143/",
			},
			{
				city: "上海",
				note: "厚学网上海戴氏教育机构页。",
				pageType: "机构主页",
				phone: "15947890727",
				status: "third-party",
				url: "https://www.houxue.com/sh/xuexiao-85419.html",
			},
			{
				city: "海口",
				note: "厚学网海口戴氏小初高全科辅导机构页。",
				pageType: "机构主页",
				phone: "15947890727",
				status: "third-party",
				url: "https://www.houxue.com/xuexiao/1792747/",
			},
			{
				city: "成都",
				note: "厚学网成都戴氏教育机构页。",
				pageType: "机构主页",
				status: "third-party",
				url: "https://www.houxue.com/xuexiao/1826798/",
			},
			{
				city: "成都",
				note: "厚学网页面标注为非合作会员。",
				pageType: "机构主页",
				status: "third-party",
				url: "https://www.houxue.com/xuexiao/2020395/",
			},
			{
				city: "成都",
				note: "厚学网成都戴氏教育介绍页。",
				pageType: "机构介绍页",
				status: "third-party",
				url: "https://www.houxue.com/xuexiao/2025256/",
			},
			{
				city: "成都",
				note: "51教育网成都戴氏教育机构子站。",
				pageType: "机构主页",
				phone: "400-827-1001",
				status: "third-party",
				url: "https://www.51eduu.com/cd/sch-1338-33",
			},
			{
				city: "成都",
				note: "51教育网成都戴氏教育机构子站。",
				pageType: "机构主页",
				phone: "400-827-1001",
				status: "third-party",
				url: "https://www.51eduu.com/cd/sch-1338-512",
			},
			{
				city: "海口",
				note: "51教育网海口戴氏教育机构子站。",
				pageType: "机构主页",
				phone: "400-827-1001",
				status: "third-party",
				url: "https://www.51eduu.com/zh/sch-9026",
			},
			{
				city: "海口",
				note: "51教育网海口戴氏教育机构子站。",
				pageType: "机构主页",
				phone: "400-827-1001",
				status: "third-party",
				url: "https://www.51eduu.com/zh/sch-9026-33",
			},
			{
				city: "海口",
				note: "51教育网海口戴氏教育机构子站。",
				pageType: "机构主页",
				phone: "400-827-1001",
				status: "third-party",
				url: "https://www.51eduu.com/zh/sch-9026-603",
			},
			{
				city: "南宁",
				note: "51教育网南宁戴氏教育机构子站。",
				pageType: "机构主页",
				phone: "400-827-1001",
				status: "third-party",
				url: "https://www.51eduu.com/zh/sch-9062-13",
			},
			{
				city: "四川/成都",
				note: "好学校戴氏教育机构主页，页面另有多个手机号。",
				pageType: "机构主页",
				phone: "400-660-3310",
				status: "third-party",
				url: "https://www.91goodschool.com/school/12800.html",
			},
			{
				city: "海口",
				note: "好学校海口戴氏教育机构主页。",
				pageType: "机构主页",
				phone: "400-660-3310",
				status: "third-party",
				url: "https://www.91goodschool.com/school/11906.html",
			},
			{
				city: "贵阳",
				note: "好学校贵阳戴氏教育机构主页，页面另有多个手机号。",
				pageType: "机构主页",
				phone: "400-660-3310",
				status: "third-party",
				url: "https://www.91goodschool.com/school/8209.html",
			},
			{
				city: "郴州",
				note: "好学校郴州戴氏教育机构主页，页面另有多个手机号。",
				pageType: "机构主页",
				phone: "400-660-3310",
				status: "third-party",
				url: "https://www.91goodschool.com/school/16019.html",
			},
			{
				city: "成都",
				note: "勤学教育成都戴氏教育机构主页。",
				pageType: "机构主页",
				phone: "400-609-4309",
				status: "third-party",
				url: "https://www.qinxue365.com/member/cddsjy.html",
			},
			{
				city: "成都",
				note: "勤学教育成都戴氏教育简介页。",
				pageType: "机构简介页",
				phone: "400-609-4309",
				status: "third-party",
				url: "https://www.qinxue365.com/member/cdds-introduce.html",
			},
			{
				city: "成都",
				note: "勤学教育戴氏教育简介页。",
				pageType: "机构简介页",
				phone: "400-609-4309",
				status: "third-party",
				url: "https://www.qinxue365.com/member/cddsjy-introduce.html",
			},
			{
				city: "上海信息冲突",
				note: "页面标题为戴氏教育中考中心，但页面城市/地址信息存在冲突。",
				pageType: "机构微站",
				phone: "16825672993",
				status: "third-party",
				url: "http://www.unwtt.com/b/dsjyzkzxmjtiew",
			},
			{
				city: "贵阳信息冲突",
				note: "页面标题为贵阳戴氏教育，但页面城市/地址信息存在冲突。",
				pageType: "机构微站",
				phone: "16825672993",
				status: "third-party",
				url: "http://www.zdsfw.cn/b/gydsjydjntkl/",
			},
		],
	},
] as const satisfies readonly BrandChannelGroup[];

function getPlatform(url: string, groupId: string) {
	if (groupId === "brand-domains") return "品牌相关独立站";
	if (url.includes("tantuw.com")) return "坦途";
	if (url.includes("keedu.cn")) return "课多多";
	if (url.includes("xuemanfen.cn")) return "学满分";
	if (url.includes("houxue.com")) return "厚学网";
	if (url.includes("51eduu.com")) return "51教育网";
	if (url.includes("91goodschool.com")) return "好学校";
	if (url.includes("qinxue365.com")) return "勤学教育";
	return "其他机构微站";
}

export const PUBLIC_BRAND_CHANNELS: readonly PublicBrandChannel[] = [
	...OFFICIAL_BRAND_CHANNELS.map((channel) => ({
		...channel,
		platform: "直营官网",
		verifiedAt: BRAND_CHANNEL_LAST_VERIFIED,
	})),
	...THIRD_PARTY_BRAND_CHANNEL_GROUPS.flatMap((group) =>
		group.channels.map((channel) => ({
			...channel,
			platform: getPlatform(channel.url, group.id),
			verifiedAt: BRAND_CHANNEL_LAST_VERIFIED,
		})),
	),
];
