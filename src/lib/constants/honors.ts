export type Honor = {
	title: string;
	year?: string;
	issuer: string;
	description?: string;
};

export const HONORS: Honor[] = [
	{
		title: "中国最具影响力教育集团",
		issuer: "新浪教育",
		year: "2023",
		description:
			"在年度教育盛典中，凭借卓越的教学质量和品牌影响力荣获此项殊荣。",
	},
	{
		title: "全国AAA级信用示范单位",
		issuer: "中国质量信用协会",
		year: "2022",
		description: "对戴氏教育在诚信办学、规范管理方面的权威认可。",
	},
	{
		title: "中国民办教育百强学校",
		issuer: "中国教育报",
		year: "2021",
		description: "戴氏教育凭借独特的教学体系和显著的提分效果入选百强。",
	},
	{
		title: "社会责任感教育机构",
		issuer: "腾讯网教育频道",
		year: "2023",
		description: "表彰戴氏教育在公益助学、推动教育公平方面的突出贡献。",
	},
	{
		title: "四川省著名商标",
		issuer: "四川省工商行政管理局",
		description: "标志着戴氏教育在区域教育市场中的领军地位和极高的社会认可度。",
	},
	{
		title: "高新技术企业证书",
		issuer: "四川省科学技术厅",
		description: "认可戴氏教育在“AI+教育”及教学研发方面的技术创新能力。",
	},
];
