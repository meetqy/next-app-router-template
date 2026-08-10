export type HonorCertificateFact = {
	label: string;
	value: string;
};

export type HonorCertificate = {
	id: number;
	category: string;
	title: string;
	headline: string;
	summary: string;
	issuer: string;
	issuedAt: string;
	imageSrc: string;
	imageAlt: string;
	facts: HonorCertificateFact[];
};

export const HONOR_CERTIFICATES: HonorCertificate[] = [
	{
		id: 1,
		category: "官方版权认证",
		title: "《戴氏·高考中心教学教研管理体系》作品登记证书",
		headline:
			"戴氏教育高考总部自研教学教研管理体系完成作品登记，原创教研成果获得官方著作权保护。",
		summary:
			"证书对应著作权归属于成都市金牛区戴氏励锐教育培训学校有限公司，体现戴氏教育高考总部在高考教学教研上的自主研发能力与体系化沉淀。",
		issuer: "国家版权局",
		issuedAt: "2025 年 07 月 10 日",
		imageSrc: "/honors/1.jpeg",
		imageAlt: "戴氏教育高考总部教研体系作品登记证书",
		facts: [
			{ label: "登记号", value: "国作登字 - 2025-A-00212287" },
			{ label: "作品类别", value: "文字作品" },
			{ label: "创作完成时间", value: "2025 年 05 月 22 日" },
			{ label: "版权登记核准日期", value: "2025 年 07 月 10 日" },
			{
				label: "著作权归属",
				value: "成都市金牛区戴氏励锐教育培训学校有限公司（戴氏教育高考总部）",
			},
		],
	},
	{
		id: 2,
		category: "办学资质起点",
		title: "1993 年办学许可证",
		headline:
			"1993 年，成都市锦江区教委正式批准办学，这是戴氏教育高考总部办学历史的重要起点。",
		summary:
			"从早期的戴氏英语学校到今天专注高考冲刺的戴氏教育高考总部，长期坚持合规办学与教学积累，品牌发展脉络清晰可查。",
		issuer: "成都市锦江区教委",
		issuedAt: "一九九三年六月十一日",
		imageSrc: "/honors/2.jpeg",
		imageAlt: "戴氏教育高考总部前身办学许可证",
		facts: [
			{ label: "证件名称", value: "办学许可证" },
			{ label: "编号", value: "成教社 (1993) 锦字 057 号" },
			{
				label: "学校名称",
				value: "戴氏英语学校（戴氏教育高考总部前身）",
			},
			{ label: "主办 / 负责人", value: "戴国斌" },
			{ label: "教学地点", value: "成都市盐道街小学" },
		],
	},
	{
		id: 3,
		category: "行业任职认证",
		title: "四川省民办教育协会培训教育专业委员会第二届理事会理事长",
		headline:
			"戴国斌先生当选四川省民办教育协会培训教育专业委员会第二届理事会理事长，体现戴氏教育高考总部的行业影响力。",
		summary:
			"这项行业任职来自四川省民办教育协会，说明戴氏教育高考总部在办学理念、教学质量与行业口碑方面获得专业组织认可。",
		issuer: "四川省民办教育协会",
		issuedAt: "二〇一九年十二月十九日",
		imageSrc: "/honors/3.png",
		imageAlt: "四川省民办教育协会理事长任职证书",
		facts: [
			{ label: "颁发机构", value: "四川省民办教育协会" },
			{
				label: "荣誉 / 职务",
				value: "四川省民办教育协会培训教育专业委员会第二届理事会 理事长",
			},
			{ label: "授予对象", value: "戴国斌" },
			{ label: "颁发日期", value: "二〇一九年十二月十九日" },
		],
	},
	{
		id: 4,
		category: "国际质量认证",
		title: "ISO9001 质量管理体系认证证书",
		headline:
			"戴氏教育高考总部通过 GB/T 19001-2016 / ISO 9001:2015 质量管理体系认证，高中段学科培训服务具备标准化管理依据。",
		summary:
			"从课程、师资到服务流程，这份认证说明戴氏教育高考总部在许可范围内的高中段学科培训上建立了可追溯、可执行的质量管理体系。",
		issuer: "中澜认证有限公司",
		issuedAt: "2025 年 07 月 17 日",
		imageSrc: "/honors/4.jpeg",
		imageAlt: "戴氏教育高考总部 ISO9001 质量管理体系认证证书",
		facts: [
			{ label: "证书号", value: "55425Q10610ROM" },
			{
				label: "获证主体",
				value: "成都市金牛区戴氏励锐教育培训学校有限公司（戴氏教育高考总部）",
			},
			{
				label: "认证标准",
				value: "GB/T 19001-2016 / ISO 9001:2015",
			},
			{
				label: "认证范围",
				value: "许可范围内的非全日制普通教育培训（高中段学科）",
			},
			{ label: "有效期至", value: "2028 年 07 月 16 日" },
		],
	},
	{
		id: 5,
		category: "全国级复读荣誉",
		title: "中国高考复读优秀学校",
		headline:
			"2007 年，原成都戴氏英语学校获评“中国高考复读优秀学校”，高考复读教学能力获得全国层面的荣誉认可。",
		summary:
			"该荣誉由中国中学生报社与中国教育技术协会中学远程教育技术专业委员会联合颁发，是戴氏教育高考总部高考复读教学实力的重要历史见证。",
		issuer: "中国中学生报社、中国教育技术协会中学远程教育技术专业委员会",
		issuedAt: "二〇〇七年九月",
		imageSrc: "/honors/5.jpeg",
		imageAlt: "中国高考复读优秀学校荣誉证书",
		facts: [
			{ label: "证书名称", value: "荣誉证书" },
			{
				label: "授予对象",
				value: "成都戴氏英语学校（戴氏教育高考总部前身）",
			},
			{ label: "荣誉称号", value: "2007 年度 中国高考复读优秀学校" },
			{
				label: "颁发机构",
				value: "中国中学生报社、中国教育技术协会中学远程教育技术专业委员会",
			},
			{ label: "颁发日期", value: "二〇〇七年九月" },
		],
	},
	{
		id: 6,
		category: "国家级行业任职",
		title: "中国民办教育协会培训教育专业委员会副理事长单位",
		headline:
			"戴氏教育科技有限公司获任中国民办教育协会培训教育专业委员会副理事长单位，戴国斌同志担任副理事长。",
		summary:
			"这份任职证书来自中国民办教育协会体系，体现戴氏教育高考总部所属主体在办学规范、教学实力与行业影响力上的持续积累。",
		issuer: "中国民办教育协会、中国民办教育协会培训教育专业委员会",
		issuedAt: "2019 年 04 月",
		imageSrc: "/honors/6.jpeg",
		imageAlt: "中国民办教育协会副理事长单位任职证书",
		facts: [
			{
				label: "证书名称",
				value: "中国民办教育协会证书（任职证书）",
			},
			{ label: "证书编号", value: "D20191905040045" },
			{
				label: "授予单位",
				value: "戴氏教育科技有限公司（戴氏教育高考总部所属主体）",
			},
			{
				label: "授予职务",
				value:
					"中国民办教育协会培训教育专业委员会副理事长单位；戴国斌同志担任副理事长",
			},
			{ label: "颁发日期", value: "2019 年 04 月" },
		],
	},
	{
		id: 7,
		category: "省级品牌荣誉",
		title: "四川十大品牌教育",
		headline:
			"2015 年，戴氏教育集团获评“四川十大品牌教育”，体现其在四川教育市场中的品牌影响力。",
		summary:
			"这项荣誉对应戴氏教育高考总部所属集团主体，是对办学品质与品牌沉淀的省级层面认可，也构成总部品牌背书的重要组成部分。",
		issuer: "2015 年四川品牌机构・品质项目评选",
		issuedAt: "二零一五年二月",
		imageSrc: "/honors/7.jpeg",
		imageAlt: "四川十大品牌教育荣誉证书",
		facts: [
			{ label: "证书名称", value: "荣誉证书" },
			{
				label: "授予对象",
				value: "戴氏教育集团（戴氏教育高考总部所属集团主体）",
			},
			{ label: "荣誉称号", value: "四川十大品牌教育" },
			{
				label: "评选活动",
				value: "2015 年四川品牌机构・品质项目评选",
			},
			{
				label: "颁发机构说明",
				value: "四川省教育厅相关评选（证书落款盖章）",
			},
		],
	},
	{
		id: 8,
		category: "央视品牌展播",
		title: "CCTV 四川优秀企业・品牌形象展播",
		headline:
			"四川戴氏教育发展有限公司获得 CCTV 四川优秀企业・品牌形象展播荣誉牌匾，品牌形象公开展示可查。",
		summary:
			"该牌匾由 CCTV 品牌形象展播活动组与 CCTV 央视中网四川节目制作中心授牌，是戴氏教育高考总部品牌影响力的公开背书材料之一。",
		issuer: "CCTV 品牌形象展播活动组、CCTV 央视中网四川节目制作中心",
		issuedAt: "二〇一三年",
		imageSrc: "/honors/8.jpeg",
		imageAlt: "CCTV 四川优秀企业品牌形象展播牌匾",
		facts: [
			{ label: "企业全称", value: "四川戴氏教育发展有限公司" },
			{ label: "荣誉称号", value: "CCTV 四川优秀企业 品牌形象展播" },
			{
				label: "发证单位",
				value: "CCTV 品牌形象展播活动组、CCTV 央视中网四川节目制作中心",
			},
			{ label: "备案编号", value: "1301460019010022" },
			{ label: "牌匾落款年份", value: "二〇一三年" },
		],
	},
	{
		id: 9,
		category: "商标注册认证",
		title: "DSE 第 41 类商标注册证",
		headline:
			"DSE 商标完成教育类目核准注册，覆盖教育、培训、教学与组织培训班等办学相关服务。",
		summary:
			"商标注册证显示品牌注册信息明确，是戴氏教育高考总部品牌规范建设和教育服务布局的重要佐证材料之一。",
		issuer: "原中华人民共和国国家工商行政管理总局商标局",
		issuedAt: "2009 年 01 月 28 日",
		imageSrc: "/honors/9.png",
		imageAlt: "DSE 商标注册证",
		facts: [
			{ label: "证件名称", value: "商标注册证，编号：第 4752090 号" },
			{
				label: "商标",
				value:
					"DSE，核定第 41 类（教育、培训、教学、组织培训班等办学相关项目）",
			},
			{ label: "注册人", value: "戴国斌" },
			{ label: "注册地址", value: "四川成都市龙泉驿区" },
			{
				label: "有效期限",
				value: "2009 年 01 月 28 日 至 2019 年 01 月 27 日",
			},
		],
	},
	{
		id: 10,
		category: "权威媒体报道",
		title: "《四川日报》专题报道《好一个“戴氏英语”》",
		headline:
			"1992 年 9 月 2 日，《四川日报》专题刊发报道《好一个“戴氏英语”—— 记蓉城高考英语速成学校》。",
		summary:
			"这份省级党媒报道记录了早期戴氏办学成果，是戴氏教育高考总部品牌发展历程中的重要纸质资料与历史节点。",
		issuer: "《四川日报》",
		issuedAt: "1992 年 9 月 2 日",
		imageSrc: "/honors/10.png",
		imageAlt: "四川日报关于戴氏英语的专题报道",
		facts: [
			{ label: "刊登报刊", value: "《四川日报》" },
			{ label: "刊登日期", value: "1992 年 9 月 2 日" },
			{
				label: "报道标题",
				value: "好一个 “戴氏英语”—— 记蓉城高考英语速成学校",
			},
			{
				label: "内容说明",
				value:
					"省级党媒专题采访报道早期戴氏办学成果，是品牌历史的重要纸质佐证。",
			},
		],
	},
	{
		id: 11,
		category: "教育局官方表彰",
		title: "成都市 2007 年度民办教育先进集体",
		headline:
			"原成都戴氏英语学校于 2008 年 4 月获成都市教育局授牌，取得“成都市 2007 年度民办教育先进集体”荣誉。",
		summary:
			"这项市级教育主管部门表彰，体现戴氏教育高考总部前身在办学品质、教学管理与育人成果方面获得官方认可。",
		issuer: "成都市教育局",
		issuedAt: "二〇〇八年四月",
		imageSrc: "/honors/11.png",
		imageAlt: "成都市民办教育先进集体荣誉牌匾",
		facts: [
			{
				label: "授奖对象",
				value: "成都戴氏英语学校（戴氏教育高考总部前身）",
			},
			{ label: "荣誉名称", value: "成都市 2007 年度民办教育先进集体" },
			{ label: "颁发单位", value: "成都市教育局" },
			{ label: "授牌时间", value: "二〇〇八年四月" },
		],
	},
];
