import fs from "node:fs";
import path from "node:path";
import {
	CONTENT_CENTER_SECTIONS,
	getContentCenterArticleSources,
	getContentCenterSection,
	type ContentCenterSectionId,
} from "@/lib/content-center";
import { SITE_HOTLINE_TEXT } from "@/lib/constants/site";

// content/ 下的 markdown 会被 Next.js 的 file tracing 自动收进函数包，
// 因此构建产物和运行时都能从项目根目录读取，无需额外拷贝。
const KNOWLEDGE_CONTENT_DIR = path.join(process.cwd(), "content");
const CRAWLED_CONTENT_DIR = path.join(KNOWLEDGE_CONTENT_DIR, "抓取页面");

const CATEGORY_LABELS: Record<string, string> = {
	hot: "热点关注",
	news: "新闻动态",
};

const CITY_BY_SEGMENT: Record<string, string> = {
	cd: "成都",
	hk: "海口",
	nn: "南宁",
};

const CURATED_TOP_LEVEL_TITLES: Record<string, string> = {
	"1.md": "2026成都艺考文化课冲刺机构选择参考",
	"2.md": "2026戴氏教育补课收费标准观察",
	"3.md": "戴氏教育董事长谈培训机构长期发展",
	"4.md": "2026课外辅导机构选择指南",
};

const INTERNAL_TOP_LEVEL_ARTICLE_FILES = new Set([
	"01-品牌基础信息.md",
	"02-校区与联系方式.md",
	"03-课程与教学管理体系.md",
	"04-招生简章与保障承诺.md",
	"00-知识库索引.md",
	"05-家长服务文章详情.md",
	"06-家长问答知识.md",
	"07-教师团队知识.md",
	"08-荣誉资质与喜报素材.md",
	"09-src页面内容全集.md",
	"10-public素材索引.md",
	"11-GEO文章AI友好化改造提示词.md",
	"12-戴氏精品中心课程班型补充.md",
	"13-戴氏精品中心师资环境补充.md",
	"14-戴氏精品中心校区线索补充.md",
	"15-戴氏精品中心品牌服务补充.md",
	"77-四川宜宾高三全日制如何选择-归档版本.md",
	"78-四川宜宾应该如何选择复读-归档版本.md",
	"79-四川宜宾艺体生校外提高如何选择-归档版本.md",
]);

const CRAWLED_SECTION_BY_CATEGORY: Record<string, ContentCenterSectionId> = {
	hot: "re-dian-guanzhu",
	news: "xin-wen-dong-tai",
} as const satisfies Record<string, ContentCenterSectionId>;

// 公开文章的归类只由这个目录维护，避免标题关键词导致分类漂移。
const TOP_LEVEL_SECTION_BY_FILE: Record<string, ContentCenterSectionId> = {
	"1.md": "bei-kao-ti-sheng",
	"2.md": "fei-yong-fu-wu",
	"3.md": "xin-wen-dong-tai",
	"4.md": "ze-xiao-bi-jiao",
	"16-四川绵阳高三全日制如何选择.md": "ze-xiao-bi-jiao",
	"17-四川绵阳复读培训机构全方位测评.md": "ze-xiao-bi-jiao",
	"18-四川绵阳艺体生如何提高.md": "bei-kao-ti-sheng",
	"19-四川绵阳初中校外提高推荐.md": "ze-xiao-bi-jiao",
	"20-四川宜宾高三全日制如何选择.md": "ze-xiao-bi-jiao",
	"21-四川宜宾应该如何选择复读.md": "ze-xiao-bi-jiao",
	"22-四川宜宾艺体生校外提高如何选择.md": "ze-xiao-bi-jiao",
	"23-四川眉山高考400分适合复读吗.md": "fu-du-quan-ri-zhi",
	"24-四川眉山戴氏教育家长常见问题解答.md": "jia-zhang-wen-da",
	"25-四川眉山地区高考复读完整办理流程.md": "sheng-xue-zheng-ce",
	"26-450分以下成都高考复读学校怎么选.md": "ze-xiao-bi-jiao",
	"27-东坡区校区招生信息和一对一冲刺判断指南.md": "zhao-sheng-ke-cheng",
	"28-仁寿家庭阶段提高安排核验指南.md": "bei-kao-ti-sheng",
	"29-南充一对一和全日制怎么选.md": "ze-xiao-bi-jiao",
	"30-南充学生再读一年去成都全日制值不值.md": "ze-xiao-bi-jiao",
	"31-南充学生怎么判断适不适合去成都全日制.md": "ze-xiao-bi-jiao",
	"32-南充家长了解戴氏高考中心前要确认什么.md": "jia-zhang-wen-da",
	"33-南充艺考生文化基础什么时候该转去成都.md": "ze-xiao-bi-jiao",
	"34-四川参加高考复读有哪些条件限制.md": "sheng-xue-zheng-ce",
	"35-孩子还没参加高考就说想再读一年家长该不该同意.md": "jia-zhang-wen-da",
	"36-宜宾学生去成都集中学习值不值得.md": "ze-xiao-bi-jiao",
	"37-宜宾学生想换环境去成都集中学习要看什么.md": "ze-xiao-bi-jiao",
	"38-宜宾家长咨询戴氏高考中心前要问清哪些问题.md": "jia-zhang-wen-da",
	"39-宜宾考前阶段留本地还是去成都怎么选.md": "ze-xiao-bi-jiao",
	"40-宜宾艺体生返校晚什么时候适合去成都.md": "ze-xiao-bi-jiao",
	"41-实地考察复读寄宿学校需要重点查看哪些硬件条件.md": "ze-xiao-bi-jiao",
	"42-成都哪个复读学校提分高.md": "ze-xiao-bi-jiao",
	"43-成都复读生常见问题答疑.md": "jia-zhang-wen-da",
	"44-成都新高三全日制培训机构推荐.md": "ze-xiao-bi-jiao",
	"45-成都艺体生文化课冲刺怎么收费.md": "fei-yong-fu-wu",
	"46-戴氏教育上到一半不想继续了可以退费吗.md": "jia-zhang-wen-da",
	"47-戴氏教育林家坝校区招生简章.md": "zhao-sheng-ke-cheng",
	"48-泸州偏科学生选本地补弱还是成都集中学习.md": "ze-xiao-bi-jiao",
	"49-泸州再读一年学生想换环境可以重点看哪些机构.md": "ze-xiao-bi-jiao",
	"50-泸州冲刺机构测评本地机构和成都方案怎么比.md": "ze-xiao-bi-jiao",
	"51-泸州备考机构合辑推荐与全方面测评.md": "ze-xiao-bi-jiao",
	"52-泸州艺体生文化课时间紧怎么选择靠谱机构.md": "ze-xiao-bi-jiao",
	"53-眉山再读一年机构全方位测评.md": "ze-xiao-bi-jiao",
	"54-眉山初二孩子阅读和完形失分多戴氏教育会怎么安排提升.md": "jia-zhang-wen-da",
	"55-眉山家长报戴氏教育1对1前能不能先看学情分析和阶段规划.md": "jia-zhang-wen-da",
	"56-眉山戴氏教育一对一老师不合适能申请调整吗.md": "jia-zhang-wen-da",
	"57-眉山戴氏教育会先测评再安排老师吗.md": "jia-zhang-wen-da",
	"58-眉山戴氏教育会定期反馈孩子学习情况吗.md": "jia-zhang-wen-da",
	"59-眉山戴氏教育假期集中查漏补缺安排适合住校生吗.md": "jia-zhang-wen-da",
	"60-眉山戴氏教育全日制适合基础中等学生吗.md": "jia-zhang-wen-da",
	"61-眉山戴氏教育再读一年和阶段冲刺有什么区别.md": "fu-du-quan-ri-zhi",
	"62-眉山戴氏教育初三一对一辅导适合基础薄弱想冲刺中考的孩子吗.md": "jia-zhang-wen-da",
	"63-眉山戴氏教育收费是按课时班型还是阶段收.md": "fei-yong-fu-wu",
	"64-眉山戴氏教育有没有月考退步后的补救安排.md": "jia-zhang-wen-da",
	"65-眉山戴氏教育有没有针对高一学生的补基础安排.md": "jia-zhang-wen-da",
	"66-眉山戴氏教育有没有针对高一学生的补基础课程.md": "jia-zhang-wen-da",
	"67-眉山戴氏教育有没有针对高一数学跟不上学校进度的补基础课程.md": "jia-zhang-wen-da",
	"68-眉山戴氏教育高三全日制冲刺班适合艺考生文化课补习吗.md": "jia-zhang-wen-da",
	"69-绵阳一对一和成都全日制集训有什么区别.md": "ze-xiao-bi-jiao",
	"70-绵阳学生再读一年留本地还是去成都集中管理.md": "ze-xiao-bi-jiao",
	"71-绵阳家长咨询戴氏高考中心前要问清哪些问题.md": "jia-zhang-wen-da",
	"72-绵阳艺体生文化课时间紧怎么安排成都集中补弱.md": "ze-xiao-bi-jiao",
	"73-绵阳高分段冲刺什么时候考虑成都全日制集训.md": "fu-du-quan-ri-zhi",
	"74-艺体生专业考试后如何确认集训安排.md": "zhao-sheng-ke-cheng",
	"75-艺考生如何填报高考志愿.md": "sheng-xue-zheng-ce",
	"76-高三想外出全日制补习-该如何向原高中办理请假手续.md": "sheng-xue-zheng-ce",
	"80-2026乐山培训机构合辑 按全日制小班和一对一分类梳理.md": "ze-xiao-bi-jiao",
	"81-戴氏教育-vs-龙兴教育.md": "ze-xiao-bi-jiao",
	"82-峨眉山夹江犍为井研学生去哪补课 乐山市区与成都方案测评.md": "ze-xiao-bi-jiao",
	"83-假期到底该查漏补缺还是提前预习.md": "bei-kao-ti-sheng",
	"84-乐山补课班能试听吗.md": "jia-zhang-wen-da",
	"85-乐山复读培训怎么选 本地学校与成都集中学习横评.md": "ze-xiao-bi-jiao",
	"86-乐山高考备考机构合辑 不同管理模式全方面测评.md": "ze-xiao-bi-jiao",
	"87-乐山高考培训机构教学管理测评.md": "ze-xiao-bi-jiao",
	"88-乐山高三复习常见问答.md": "jia-zhang-wen-da",
	"89-乐山高三全日制补习班什么时候开课.md": "zhao-sheng-ke-cheng",
	"90-乐山高中偏科补弱机构合辑 单科走读和集中学习怎么选.md": "ze-xiao-bi-jiao",
	"91-乐山孩子校外提高怎么选-家长先看哪几家.md": "ze-xiao-bi-jiao",
	"92-乐山全日制机构推荐.md": "ze-xiao-bi-jiao",
	"93-乐山小学辅导班哪几家问的人多 实际体验怎么样.md": "ze-xiao-bi-jiao",
	"94-乐山一对一辅导哪几家能约试听-适合什么样的孩子.md": "jia-zhang-wen-da",
	"95-乐山艺考文化课机构哪几家可以先了解-适合什么孩子.md": "ze-xiao-bi-jiao",
	"96-乐山艺考文化课机构推荐 走读集训与成都全日制测评.md": "ze-xiao-bi-jiao",
	"97-乐山再读一年学校和培训机构合辑 招生对象与学习安排实查.md": "ze-xiao-bi-jiao",
	"98-美博教育-vs-戴氏教育.md": "ze-xiao-bi-jiao",
	"99-名师荟-vs-戴氏教育.md": "ze-xiao-bi-jiao",
	"100-自贡戴氏教育招生简章.md": "zhao-sheng-ke-cheng",
	"101-自贡高考备考机构合辑 本地补弱和成都集中学习怎么选.md": "ze-xiao-bi-jiao",
	"102-自贡高考复读培训机构全方面测评 哪类学生更需要完整作息.md": "ze-xiao-bi-jiao",
	"103-自贡高三全日制方案合辑 本地学习与成都封闭管理对比.md": "ze-xiao-bi-jiao",
	"104-自贡高中一对一和小班机构测评 谁能持续盯住学习过程.md": "ze-xiao-bi-jiao",
	"105-自贡艺考文化课机构推荐 返校后补弱还是去成都集训.md": "ze-xiao-bi-jiao",
	"106-自贡艺体生文化课集训怎么收费.md": "fei-yong-fu-wu",
	"107-为什么现在高中以下的学生百分之九十都上补习班学校在教什么.md": "bei-kao-ti-sheng",
	"108-准高三想在家里自学怎么办.md": "bei-kao-ti-sheng",
	"109-吉林高考468分被调剂到物流管理去读还是复读.md": "fu-du-quan-ri-zhi",
	"110-复读的话去插班应届还是去复读学校的好.md": "ze-xiao-bi-jiao",
	"111-复读还是上省民办大专如果复读需要去复读机构吗.md": "jia-zhang-wen-da",
	"112-孩子被交大医学院临床八年录取却想复读选工科家长该怎么办.md": "jia-zhang-wen-da",
	"113-孩子高中想辍学家长还要坚持让孩子念完高中吗.md": "jia-zhang-wen-da",
	"114-给准高一学生有哪些建议吗.md": "bei-kao-ti-sheng",
	"115-高一开学可以直接放弃一些科目吗.md": "bei-kao-ti-sheng",
	"116-高二才开始努力会不会太迟了.md": "bei-kao-ti-sheng",
	"117-高二辍学后20岁自学参加单招或夏季高考有什么建议.md": "sheng-xue-zheng-ce",
	"118-高考后三个月长假该旅游还是进厂打工.md": "jia-zhang-wen-da",
	"119-高考没考出理想成绩怎么办正常发挥不等于失败.md": "jia-zhang-wen-da",
	"120-高考真的决定人生吗我的答案是不决定.md": "jia-zhang-wen-da",
	"121-中考结束初中升高中衔接补习几门.md": "bei-kao-ti-sheng",
	"122-单招选专业家庭能承担就优先选自己想读的方向.md": "sheng-xue-zheng-ce",
	"123-如何在高一就用上高三冲刺的方法.md": "bei-kao-ti-sheng",
	"124-物化生排名四百多升高二怎么逼自己考上好大学.md": "bei-kao-ti-sheng",
	"125-现在高二要不要休学.md": "jia-zhang-wen-da",
	"126-高三早上8点上课下午3点放学算累吗.md": "jia-zhang-wen-da",
	"127-高三生回家自学可以吗.md": "bei-kao-ti-sheng",
	"128-高中化学怎么从60分学到80+.md": "bei-kao-ti-sheng",
	"129-高中化学总在60分左右怎么冲80+.md": "bei-kao-ti-sheng",
	"130-复读插班后很难融入集体感到孤独压抑该怎么调整.md": "jia-zhang-wen-da",
	"131-孩子要高考会放下时间陪考吗.md": "jia-zhang-wen-da",
	"132-休学一年后复学特别害怕跟不上学校节奏怎么办.md": "jia-zhang-wen-da",
	"133-孩子小学成绩一般到了初中能跟上吗.md": "bei-kao-ti-sheng",
	"历史活动汇总.md": "xin-wen-dong-tai",
};

export type KnowledgeArticle = {
	category: string;
	categoryLabel: string;
	content: string;
	crawledAt?: string;
	description?: string;
	historical: boolean;
	legacySlug: string;
	legacySlugs?: string[];
	legacyPhones: string[];
	originalPath: string;
	publishedAt?: string;
	relatedLatestHref?: string;
	schema?: "faq";
	section: ContentCenterSectionId;
	sectionLabel: string;
	slug: string;
	sourceUrl?: string;
	summary: string;
	title: string;
	year?: string;
};

export type KnowledgeArticleSummary = Omit<KnowledgeArticle, "content">;

export type KnowledgeArticleFilter = {
	count: number;
	description: string;
	id: string;
	kind: "section";
	title: string;
};

export type KnowledgeCampus = {
	address: string;
	category: string;
	city: string;
	content: string;
	crawledAt?: string;
	description?: string;
	district: string;
	legacySlug: string;
	legacyPhones: string[];
	originalPath: string;
	route?: string;
	slug: string;
	sourceUrl?: string;
	title: string;
};

type FrontmatterParseResult = {
	body: string;
	frontmatter: Record<string, string>;
};

function safeReadDir(dir: string) {
	if (!fs.existsSync(dir)) {
		return [];
	}

	return fs.readdirSync(dir, { withFileTypes: true });
}

function walkMarkdownFiles(dir: string): string[] {
	return safeReadDir(dir).flatMap((entry) => {
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			return walkMarkdownFiles(fullPath);
		}

		if (!entry.isFile() || !entry.name.endsWith(".md")) {
			return [];
		}

		return [fullPath];
	});
}

function parseFrontmatter(raw: string): FrontmatterParseResult {
	if (!raw.startsWith("---\n")) {
		return {
			body: raw,
			frontmatter: {},
		};
	}

	const endIndex = raw.indexOf("\n---", 4);
	if (endIndex === -1) {
		return {
			body: raw,
			frontmatter: {},
		};
	}

	const frontmatterText = raw.slice(4, endIndex).trim();
	const body = raw.slice(endIndex + 4).trimStart();
	const frontmatter: Record<string, string> = {};

	for (const line of frontmatterText.split("\n")) {
		const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
		if (!match) {
			continue;
		}

		const key = match[1];
		const value = match[2] ?? "";
		if (!key) {
			continue;
		}
		frontmatter[key] = value.trim().replace(/^"(.*)"$/, "$1");
	}

	return {
		body,
		frontmatter,
	};
}

function createSlug(relativePath: string) {
	return relativePath
		.replace(/\.md$/, "")
		.replaceAll(path.sep, "-")
		.replace(/^-+|-+$/g, "")
		.toLowerCase();
}

function stripMarkdownSyntax(text: string) {
	return text
		.replace(/!\[([^\]]*)]\([^)]+\)/g, "$1")
		.replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
		.replace(/[*_`>#]/g, "")
		.trim();
}

function cleanVisibleTitle(title: string, fallback: string) {
	const curatedTitle = CURATED_TOP_LEVEL_TITLES[fallback];
	if (curatedTitle) {
		return curatedTitle;
	}

	const titleWithoutMarkdown = stripMarkdownSyntax(title)
		.replace(/^\s*\d+[\s.、．-]*/g, "")
		.replace(
			/^\s*(news|hot|activity|course|teacher|about|campus|knowledge)[-_]/i,
			"",
		)
		.replace(/^\s*\d+[-_]/g, "")
		.replace(/\s+/g, " ")
		.trim();

	if (
		titleWithoutMarkdown &&
		titleWithoutMarkdown.length <= 80 &&
		!/^(?:\d+|knowledge-\d+|news-\d+|hot-\d+|activity-\d+)$/i.test(
			titleWithoutMarkdown,
		)
	) {
		return titleWithoutMarkdown;
	}

	return fallback
		.replace(/\.md$/, "")
		.replace(/^\d+[-_.、\s]*/, "")
		.replace(
			/^(news|hot|activity|course|teacher|about|campus|knowledge)[-_]\d+[-_]*/i,
			"",
		)
		.trim();
}

function extractTitle(body: string, fallback: string) {
	const heading = body.match(/^#\s+(.+)$/m)?.[1]?.trim();
	const firstLine = body
		.split("\n")
		.map((line) => line.replace(/^#+\s*/, "").trim())
		.find(Boolean);

	return cleanVisibleTitle(heading || firstLine || fallback, fallback);
}

function createPublicSlug(title: string, fallback: string) {
	const visibleTitle = cleanVisibleTitle(title, fallback);
	const slug = visibleTitle
		.toLowerCase()
		.replace(/&[a-z]+;/g, "")
		.replace(/[^\p{Script=Han}a-z0-9]+/gu, "-")
		.replace(/^-+|-+$/g, "")
		.replace(/^(news|hot|activity|course|teacher|about|campus|knowledge)-/i, "")
		.replace(/^\d+[-_]*/g, "")
		.slice(0, 64)
		.replace(/-+$/g, "");

	return slug || "zi-liao";
}

function createFrontmatterSlug(slug?: string) {
	const normalizedSlug = slug
		?.toLowerCase()
		.replace(/[^a-z0-9-]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.replace(/-{2,}/g, "-")
		.slice(0, 80)
		.replace(/-+$/g, "");

	return normalizedSlug || undefined;
}

function createCrawledArticleSlug(
	category: string,
	fileName: string,
	title: string,
	relativePath: string,
	frontmatterSlug?: string,
) {
	const explicitSlug = createFrontmatterSlug(frontmatterSlug);
	if (explicitSlug) {
		return explicitSlug;
	}

	const sourceId = fileName.match(/^(\d+)[-_]/)?.[1];
	if (sourceId && (category === "news" || category === "hot")) {
		return `${category}-${sourceId}`;
	}

	return createPublicSlug(title, relativePath);
}

function extractSummary(body: string, description?: string) {
	if (description) {
		return normalizeText(description).slice(0, 160);
	}

	const firstParagraph = body
		.replace(/^#\s+.+$/m, "")
		.split(/\n{2,}/)
		.map((paragraph) => normalizeText(paragraph))
		.find((paragraph) => paragraph && !paragraph.startsWith("!"));

	return (
		firstParagraph ||
		"戴氏教育相关资料，供家长了解课程、校区、价格与升学服务信息。"
	).slice(0, 160);
}

function normalizeText(text: string) {
	return stripMarkdownSyntax(text).replace(/\s+/g, " ").trim();
}

function extractYear(...values: Array<string | undefined>) {
	const joined = values.filter(Boolean).join(" ");
	return joined.match(/20\d{2}/)?.[0];
}

function extractLegacyPhones(text: string) {
	const phonePattern =
		/(?:0\d{2,3}[-\s]?)?400\d?[-\s]?\d{3,4}[-\s]?\d{3,4}|0\d{2,3}[-\s]?\d{7,8}|1[3-9]\d{9}/g;
	const phones = text.match(phonePattern) ?? [];
	return [
		...new Set(
			phones
				.map((phone) => phone.replace(/\s+/g, ""))
				.filter((phone) => {
					const digits = phone.replace(/\D/g, "");
					return (
						digits !== SITE_HOTLINE_TEXT.replaceAll("-", "") &&
						!digits.startsWith("011")
					);
				}),
		),
	];
}

function escapeRegExp(text: string) {
	return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeLegacyPhoneText(text: string, legacyPhones: string[]) {
	if (legacyPhones.length === 0) {
		return text;
	}

	let normalized = text;
	for (const phone of [...legacyPhones].sort((a, b) => b.length - a.length)) {
		const replacement = `${SITE_HOTLINE_TEXT}(原 ${phone}，已弃用)`;
		const existingFormatPattern = new RegExp(
			`${escapeRegExp(SITE_HOTLINE_TEXT)}[（(]原[：:\\s]*${escapeRegExp(phone)}[，,]已(?:弃用|作废|废弃)[）)]`,
			"g",
		);
		const protectedToken = `__LEGACY_PHONE_${phone.replace(/\D/g, "")}__`;

		normalized = normalized.replace(existingFormatPattern, replacement);
		normalized = normalized.replaceAll(replacement, protectedToken);
		normalized = normalized.replaceAll(phone, replacement);
		normalized = normalized.replaceAll(protectedToken, replacement);
	}

	return normalized;
}

function normalizeParentFacingCopy(text: string) {
	return text
		.replace(/信息仅供参考/g, "信息可结合实际情况了解")
		.replace(/仅供参考/g, "可结合实际情况了解")
		.replace(/信息需确认|需确认信息|人工确认/g, "资料信息")
		.replace(/待确认/g, "可进一步了解")
		.replace(/需确认/g, "建议了解")
		.replace(/已整理/g, "整理")
		.replace(/后台私信/g, "咨询中")
		.replace(/后台/g, "咨询中");
}

function normalizeMarkdownImages(markdown: string) {
	return markdown
		.replaceAll("../../../public/", "/")
		.replaceAll("../../public/", "/");
}

const MARKDOWN_IMAGE_PATTERN = /!\[[^\]]*]\([^)]+\)/g;
const RESOURCE_PATH_PATTERN =
	/(?:\/|public\/)?(?:assets|老师|校区|honors|address|daishi-site\/uploads)\/[^`，。；、\]]+\.(?:jpg|jpeg|png|webp|gif)/gi;

function containsResourcePath(text: string) {
	RESOURCE_PATH_PATTERN.lastIndex = 0;
	return RESOURCE_PATH_PATTERN.test(text);
}

function isResourceReferenceLine(trimmed: string) {
	const hasResourcePath = containsResourcePath(trimmed);
	const lineWithoutResources = stripResourceReferences(trimmed)
		.replace(/^[-*+]\s*/, "")
		.trim();

	return (
		/^[-*+]?\s*(?:图片|封面图|.*图片|素材|当前素材|image|src)[：:]/i.test(
			trimmed,
		) ||
		/^[-*+]?\s*(?:\/|public\/)?(?:assets|老师|校区|honors|address|daishi-site\/uploads)\//i.test(
			trimmed,
		) ||
		(hasResourcePath &&
			(/^[-*+]\s+/.test(trimmed) ||
				/(?:图片|素材|封面图|路径|文件)/.test(trimmed) ||
				lineWithoutResources.length <= 30))
	);
}

function stripResourceReferences(line: string) {
	return line
		.replace(MARKDOWN_IMAGE_PATTERN, "")
		.replace(RESOURCE_PATH_PATTERN, "")
		.replace(/\s+([，。；、])/g, "$1")
		.replace(/[：:]\s*$/g, "")
		.trimEnd();
}

function isStructuralMarkdownLine(trimmed: string) {
	return (
		!trimmed ||
		/^#{1,6}\s+/.test(trimmed) ||
		/^[-*+]\s+/.test(trimmed) ||
		/^\d+[.)、]\s+/.test(trimmed) ||
		trimmed.startsWith("|") ||
		trimmed.startsWith("![") ||
		/^-{3,}$/.test(trimmed)
	);
}

function splitReadableParagraph(line: string) {
	if (line.length <= 220) {
		return [line];
	}

	const sentences = line.match(/[^。！？；!?;]+[。！？；!?;]?/g) ?? [line];
	const paragraphs: string[] = [];
	let current = "";

	for (const sentence of sentences) {
		const next = `${current}${sentence}`;
		if (current && next.length > 220) {
			paragraphs.push(current.trim());
			current = sentence;
			continue;
		}
		current = next;
	}

	if (current.trim()) {
		paragraphs.push(current.trim());
	}

	return paragraphs.length > 0 ? paragraphs : [line];
}

function pushReadableParagraph(normalized: string[], line: string) {
	const trimmed = line.trim();
	if (isStructuralMarkdownLine(trimmed)) {
		normalized.push(line);
		return;
	}

	for (const paragraph of splitReadableParagraph(line)) {
		normalized.push(paragraph);
		normalized.push("");
	}
}

function isDuplicateTitleLine(line: string, title: string) {
	const normalizedLine = normalizeText(line);
	const normalizedTitle = normalizeText(title);

	if (!normalizedLine || !normalizedTitle) {
		return false;
	}

	return (
		normalizedLine === normalizedTitle ||
		(normalizedLine.length <= 120 &&
			(normalizedLine.includes(normalizedTitle) ||
				normalizedTitle.includes(normalizedLine) ||
				normalizedLine.slice(0, 12) === normalizedTitle.slice(0, 12)))
	);
}

function stripLeadingSourceTitle(line: string, title: string) {
	const normalizedLine = normalizeText(line);
	const normalizedTitle = normalizeText(title);

	if (
		normalizedLine.length < 80 ||
		!normalizedTitle ||
		normalizedLine.slice(0, 12) !== normalizedTitle.slice(0, 12)
	) {
		return line;
	}

	const markerIndexes = ["每年", "对于", "不少", "为了", "随着", "基于"]
		.map((marker) => line.indexOf(marker, 12))
		.filter((index) => index >= 12 && index <= 100);
	const firstMarkerIndex = Math.min(...markerIndexes);

	if (!Number.isFinite(firstMarkerIndex)) {
		return line;
	}

	return line.slice(firstMarkerIndex).trim();
}

function normalizePublicMarkdown(markdown: string, title: string) {
	const lines = normalizeMarkdownImages(markdown).split("\n");
	const normalized: string[] = [];
	let hasSeenVisibleLine = false;

	for (const rawLine of lines) {
		const line = rawLine.trimEnd();
		const trimmed = line.trim();

		if (
			/^(-\s*)?(slug|发布时间|是否重点文章|摘要|关联路径|关联入口|按钮文案|SEO备选标题|生成提示词|内部备注|编辑建议)[：:]/i.test(
				trimmed,
			)
		) {
			continue;
		}

		if (/^\d{4}[-/]\d{1,2}[-/]\d{1,2}.*发布于/.test(trimmed)) {
			continue;
		}

		if (isResourceReferenceLine(trimmed)) {
			continue;
		}

		const lineWithoutResources = stripResourceReferences(line);
		const trimmedWithoutResources = lineWithoutResources.trim();

		if (!trimmedWithoutResources) {
			continue;
		}

		const headingMatch = trimmedWithoutResources.match(/^(#{1,6})\s+(.+)$/);
		if (headingMatch) {
			hasSeenVisibleLine = true;
			const [, marks = "", heading = ""] = headingMatch;
			const cleanHeading = cleanVisibleTitle(heading, heading);

			if (cleanHeading === title) {
				continue;
			}

			if (
				/^(?:图片素材|素材|素材索引|public\s*素材索引)$/i.test(cleanHeading)
			) {
				continue;
			}

			normalized.push(`${marks} ${cleanHeading}`);
			continue;
		}

		if (!trimmedWithoutResources) {
			normalized.push(lineWithoutResources);
			continue;
		}

		if (
			!hasSeenVisibleLine &&
			isDuplicateTitleLine(trimmedWithoutResources, title)
		) {
			continue;
		}

		hasSeenVisibleLine = true;
		pushReadableParagraph(
			normalized,
			stripLeadingSourceTitle(lineWithoutResources, title),
		);
	}

	return normalizeParentFacingCopy(
		normalized
			.join("\n")
			.replace(/\n{3,}/g, "\n\n")
			.trim(),
	);
}

function normalizeLegacyPath(href: string) {
	if (!href) {
		return null;
	}

	try {
		const parsed = href.startsWith("http")
			? new URL(href)
			: new URL(href, "https://daishi.tantuw.com");
		return parsed.pathname.replace(/\/+$/g, "") || "/";
	} catch {
		return null;
	}
}

function sourcePathMatches(sourceUrl: string | undefined, legacyPath: string) {
	const sourcePath = sourceUrl ? normalizeLegacyPath(sourceUrl) : null;
	return sourcePath === legacyPath;
}

export function resolveKnowledgeHref(href: string) {
	const legacyPath = normalizeLegacyPath(href);

	if (!legacyPath) {
		return null;
	}

	if (legacyPath === "/" || legacyPath === "/index.html") {
		return "/";
	}

	if (legacyPath === "/campus") {
		return "/xiao-qu-cha-xun";
	}

	if (legacyPath === "/teacher") {
		return "/lao-shi";
	}

	if (legacyPath === "/about") {
		return "/zi-liao-ku";
	}

	if (
		legacyPath === "/news" ||
		legacyPath === "/hot" ||
		legacyPath === "/activity"
	) {
		return "/zi-liao-ku";
	}

	if (legacyPath === "/course") {
		return "/zi-liao-ku/fen-lei/zhao-sheng-ke-cheng";
	}

	const campus = getKnowledgeCampuses().find((item) =>
		sourcePathMatches(item.sourceUrl, legacyPath),
	);
	if (campus) {
		return `/xiao-qu-cha-xun/${campus.slug}`;
	}

	const article = getKnowledgeArticles().find((item) =>
		sourcePathMatches(item.sourceUrl, legacyPath),
	);
	if (article) {
		return `/zi-liao-ku/${article.slug}`;
	}

	return null;
}

function getCategory(relativePath: string) {
	const [category = "archive"] = relativePath.split(path.sep);
	return category;
}

function isListPage(fileName: string) {
	return fileName.startsWith("list_") || fileName.startsWith("index-");
}

function getCrawledArticleSection(relativePath: string) {
	const category = getCategory(relativePath);
	return CRAWLED_SECTION_BY_CATEGORY[category];
}

function isPublicCrawledArticle(filePath: string) {
	const relativePath = path.relative(CRAWLED_CONTENT_DIR, filePath);
	return Boolean(getCrawledArticleSection(relativePath));
}

function getTopLevelArticleSection(fileName: string): ContentCenterSectionId {
	const section = TOP_LEVEL_SECTION_BY_FILE[fileName];
	if (!section) {
		throw new Error(`Missing content-center section mapping: ${fileName}`);
	}

	return section;
}

function validateTopLevelArticleSectionMapping() {
	const topLevelArticleFiles = walkMarkdownFiles(KNOWLEDGE_CONTENT_DIR)
		.filter((filePath) => {
			const relativePath = path.relative(KNOWLEDGE_CONTENT_DIR, filePath);
			return (
				!relativePath.includes(path.sep) &&
				!INTERNAL_TOP_LEVEL_ARTICLE_FILES.has(path.basename(filePath))
			);
		})
		.map((filePath) => path.basename(filePath));
	const mappedFiles = Object.keys(TOP_LEVEL_SECTION_BY_FILE);
	const validSections = new Set<ContentCenterSectionId>(
		CONTENT_CENTER_SECTIONS.map((section) => section.id),
	);
	const missingFiles = topLevelArticleFiles.filter(
		(fileName) => !TOP_LEVEL_SECTION_BY_FILE[fileName],
	);
	const staleFiles = mappedFiles.filter(
		(fileName) => !topLevelArticleFiles.includes(fileName),
	);
	const invalidSections = Object.entries(TOP_LEVEL_SECTION_BY_FILE)
		.filter(([, section]) => !validSections.has(section))
		.map(([fileName, section]) => `${fileName} (${section})`);

	if (missingFiles.length || staleFiles.length || invalidSections.length) {
		throw new Error(
			[
				missingFiles.length
					? `missing: ${missingFiles.join(", ")}`
					: undefined,
				staleFiles.length ? `stale: ${staleFiles.join(", ")}` : undefined,
				invalidSections.length
					? `invalid sections: ${invalidSections.join(", ")}`
					: undefined,
			]
				.filter(Boolean)
				.join("; "),
		);
	}
}

function isHistorical(title: string, body: string, publishedAt?: string) {
	const year = extractYear(title, body, publishedAt);
	const hasOldKeyword =
		/旧|历史|2024|2025|收费|价格|政策|考试时间|出分时间|一诊|二诊|三诊/.test(
			`${title} ${body}`,
		);
	return Boolean(year && Number(year) < 2026) || hasOldKeyword;
}

function relatedLatestHref(title: string) {
	if (/收费|价格|费用|价目|优惠/.test(title)) {
		return "/zi-liao-ku/fen-lei/fei-yong-fu-wu";
	}

	if (/校区|地址|电话|联系/.test(title)) {
		return "/xiao-qu-cha-xun";
	}

	if (/招生简章|复读|全日制/.test(title)) {
		return "/zi-liao-ku/fen-lei/fu-du-quan-ri-zhi";
	}

	return "/zi-liao-ku";
}

function parseKnowledgeArticle(filePath: string): KnowledgeArticle | null {
	const relativePath = path.relative(CRAWLED_CONTENT_DIR, filePath);
	const fileName = path.basename(filePath);
	const section = getCrawledArticleSection(relativePath);

	if (!section || isListPage(fileName) || fileName === "00-抓取索引.md") {
		return null;
	}

	const raw = fs.readFileSync(filePath, "utf8");
	const { body, frontmatter } = parseFrontmatter(raw);
	const category = getCategory(relativePath);
	const legacyPhones = extractLegacyPhones(raw);
	const title = normalizeParentFacingCopy(
		normalizeLegacyPhoneText(
			frontmatter.title || extractTitle(body, fileName),
			legacyPhones,
		),
	);
	const content = normalizeParentFacingCopy(
		normalizeLegacyPhoneText(
			normalizePublicMarkdown(body, title),
			legacyPhones,
		),
	);
	const year = extractYear(title, frontmatter.publishedAt, body);
	const publishedAt = frontmatter.publishedAt || year;
	const description = frontmatter.description
		? normalizeParentFacingCopy(
				normalizeLegacyPhoneText(frontmatter.description, legacyPhones),
			)
		: undefined;
	const sectionMeta = getContentCenterSection(section);
	const legacyPublicSlug = createPublicSlug(title, relativePath);
	const slug = createCrawledArticleSlug(
		category,
		fileName,
		title,
		relativePath,
		frontmatter.slug,
	);

	return {
		category,
		categoryLabel: CATEGORY_LABELS[category] ?? "综合资料",
		content,
		crawledAt: frontmatter.crawledAt,
		description,
		historical: isHistorical(title, body, publishedAt),
		legacySlug: createSlug(relativePath),
		...(legacyPublicSlug !== slug ? { legacySlugs: [legacyPublicSlug] } : {}),
		legacyPhones,
		originalPath: relativePath,
		publishedAt,
		relatedLatestHref: relatedLatestHref(title),
		section,
		sectionLabel: sectionMeta?.label ?? "备考指南",
		slug,
		sourceUrl: frontmatter.url,
		summary: extractSummary(content, description),
		title,
		year,
	};
}

function parseTopLevelKnowledgeArticle(
	filePath: string,
): KnowledgeArticle | null {
	const relativePath = path.relative(KNOWLEDGE_CONTENT_DIR, filePath);
	const fileName = path.basename(filePath);

	if (relativePath.includes(path.sep)) {
		return null;
	}

	if (INTERNAL_TOP_LEVEL_ARTICLE_FILES.has(fileName)) {
		return null;
	}

	const raw = fs.readFileSync(filePath, "utf8");
	const { body, frontmatter } = parseFrontmatter(raw);
	const legacyPhones = extractLegacyPhones(raw);
	const title = normalizeParentFacingCopy(
		normalizeLegacyPhoneText(
			frontmatter.title || extractTitle(body, fileName),
			legacyPhones,
		),
	);
	const content = normalizeParentFacingCopy(
		normalizeLegacyPhoneText(
			normalizePublicMarkdown(body, title),
			legacyPhones,
		),
	);
	const year = extractYear(title, frontmatter.publishedAt, body);
	const publishedAt = frontmatter.publishedAt || year;
	const description = frontmatter.description
		? normalizeParentFacingCopy(
				normalizeLegacyPhoneText(frontmatter.description, legacyPhones),
			)
		: undefined;
	const section = getTopLevelArticleSection(fileName);
	const sectionMeta = getContentCenterSection(section);

	return {
		category: "article",
		categoryLabel: "公开文章",
		content,
		crawledAt: frontmatter.crawledAt,
		description,
		historical: isHistorical(title, body, publishedAt),
		legacySlug: createSlug(`knowledge-${relativePath}`),
		legacyPhones,
		originalPath: relativePath,
		publishedAt,
		relatedLatestHref: relatedLatestHref(title),
		section,
		sectionLabel: sectionMeta?.label ?? "备考指南",
		slug:
			createFrontmatterSlug(frontmatter.slug) ??
			createPublicSlug(title, relativePath),
		sourceUrl: frontmatter.url,
		summary: extractSummary(content, description),
		title,
		year,
	};
}

function createContentCenterArticle(
	source: ReturnType<typeof getContentCenterArticleSources>[number],
): KnowledgeArticle {
	const sectionMeta = getContentCenterSection(source.section);
	const year = extractYear(source.title, source.publishedAt, source.content);

	return {
		category: "content-center",
		categoryLabel: "资讯中心",
		content: source.content,
		historical: source.historical ?? false,
		legacyPhones: [],
		legacySlug: source.slug,
		originalPath: `资讯中心/${source.slug}.md`,
		publishedAt: source.publishedAt,
		relatedLatestHref: undefined,
		schema: source.schema,
		section: source.section,
		sectionLabel: sectionMeta?.label ?? "备考指南",
		slug: source.slug,
		summary: source.summary,
		title: source.title,
		year,
	};
}

const DUPLICATE_SLUG_SUFFIXES = [
	"补充",
	"延伸",
	"参考",
	"归档",
	"资料",
	"案例",
	"说明",
	"更新",
	"旧版",
	"附录",
];

function withUniqueArticleSlugs(articles: KnowledgeArticle[]) {
	const used = new Set<string>();

	return articles.map((article) => {
		let slug = article.slug;
		let suffixIndex = 0;

		while (used.has(slug)) {
			const suffix =
				DUPLICATE_SLUG_SUFFIXES[suffixIndex] ??
				`补充${String.fromCharCode(97 + (suffixIndex % 26))}`;
			slug = `${article.slug}-${suffix}`;
			suffixIndex += 1;
		}

		used.add(slug);
		return {
			...article,
			slug,
		};
	});
}

let allKnowledgeArticleRecordsCache: KnowledgeArticle[] | null = null;
let knowledgeArticleSummariesCache: KnowledgeArticleSummary[] | null = null;
let knowledgeArticleFiltersCache: KnowledgeArticleFilter[] | null = null;

function getAllKnowledgeArticleRecords() {
	if (allKnowledgeArticleRecordsCache) {
		return allKnowledgeArticleRecordsCache;
	}

	validateTopLevelArticleSectionMapping();

	const crawledArticles = walkMarkdownFiles(CRAWLED_CONTENT_DIR)
		.filter(isPublicCrawledArticle)
		.map(parseKnowledgeArticle)
		.filter((article): article is KnowledgeArticle => Boolean(article));
	const topLevelArticles = walkMarkdownFiles(KNOWLEDGE_CONTENT_DIR)
		.map(parseTopLevelKnowledgeArticle)
		.filter((article): article is KnowledgeArticle => Boolean(article));
	const contentCenterArticles = getContentCenterArticleSources().map(
		createContentCenterArticle,
	);

	allKnowledgeArticleRecordsCache = withUniqueArticleSlugs([
		...contentCenterArticles,
		...topLevelArticles,
		...crawledArticles,
	]);

	return allKnowledgeArticleRecordsCache;
}

export function getKnowledgeArticles(): KnowledgeArticleSummary[] {
	if (knowledgeArticleSummariesCache) {
		return knowledgeArticleSummariesCache;
	}

	knowledgeArticleSummariesCache = getAllKnowledgeArticleRecords()
		.map(({ content: _content, ...article }) => article)
		.sort((a, b) => {
			const dateA = a.publishedAt || a.crawledAt || "";
			const dateB = b.publishedAt || b.crawledAt || "";
			return (
				dateB.localeCompare(dateA) || a.title.localeCompare(b.title, "zh-CN")
			);
		});

	return knowledgeArticleSummariesCache;
}

function decodeRouteSlug(slug: string) {
	try {
		return decodeURIComponent(slug);
	} catch {
		return slug;
	}
}

export function getKnowledgeArticleByAnySlug(slug: string) {
	const normalizedSlug = decodeRouteSlug(slug);

	for (const article of getAllKnowledgeArticleRecords()) {
		if (article.slug === normalizedSlug) {
			return {
				article,
				isCanonical: true,
			};
		}

		if (article.legacySlug === normalizedSlug) {
			return {
				article,
				isCanonical: false,
			};
		}

		if (article.legacySlugs?.includes(normalizedSlug)) {
			return {
				article,
				isCanonical: false,
			};
		}
	}

	return null;
}

export function getArticleCategoryFilterId(article: KnowledgeArticleSummary) {
	return article.section;
}

export function getKnowledgeArticleFilters(): KnowledgeArticleFilter[] {
	if (knowledgeArticleFiltersCache) {
		return knowledgeArticleFiltersCache;
	}

	const articles = getKnowledgeArticles();
	knowledgeArticleFiltersCache = CONTENT_CENTER_SECTIONS.map((section) => ({
		count: articles.filter((article) => article.section === section.id).length,
		description: section.description,
		id: section.id,
		kind: "section" as const,
		title: section.label,
	})).filter((section) => section.count > 0);

	return knowledgeArticleFiltersCache;
}

export function getKnowledgeArticleFilterById(id: string) {
	return (
		getKnowledgeArticleFilters().find((filter) => filter.id === id) ?? null
	);
}

export function getKnowledgeArticlesByFilter(filterId?: string) {
	const articles = getKnowledgeArticles();

	if (!filterId) {
		return articles;
	}

	const filter = getKnowledgeArticleFilterById(filterId);
	if (!filter) {
		return null;
	}

	return articles.filter((article) => article.section === filter.id);
}

function getCampusCityAndDistrict(relativePath: string, title: string) {
	const parts = relativePath.split(path.sep);
	const citySegment = parts[0] ?? "";
	const city =
		CITY_BY_SEGMENT[citySegment] ??
		(title.includes("海口")
			? "海口"
			: title.includes("南宁")
				? "南宁"
				: "成都");
	const districtMatch = title.match(/([\u4e00-\u9fa5]{2,4})(?:区|县|市)/)?.[0];
	return {
		city,
		district: districtMatch ?? "校区",
	};
}

function parseCampus(filePath: string): KnowledgeCampus | null {
	const relativePath = path.relative(
		path.join(CRAWLED_CONTENT_DIR, "campus"),
		filePath,
	);
	const fileName = path.basename(filePath);

	if (isListPage(fileName) || fileName.startsWith("index-")) {
		return null;
	}

	const raw = fs.readFileSync(filePath, "utf8");
	const { body, frontmatter } = parseFrontmatter(raw);
	const legacyPhones = extractLegacyPhones(raw);
	const title = normalizeParentFacingCopy(
		normalizeLegacyPhoneText(
			frontmatter.title || extractTitle(body, fileName),
			legacyPhones,
		),
	);
	const address =
		body.match(/上课地址：(.+)/)?.[1]?.trim() ??
		frontmatter.description?.replace("上课地址：", "") ??
		"具体地址可电话了解";
	const route = body.match(/乘车路线：(.+)/)?.[1]?.trim();
	const { city, district } = getCampusCityAndDistrict(relativePath, title);
	const description = frontmatter.description
		? normalizeParentFacingCopy(
				normalizeLegacyPhoneText(frontmatter.description, legacyPhones),
			)
		: undefined;

	return {
		address,
		category: "校区资料",
		city,
		content: normalizeParentFacingCopy(
			normalizeLegacyPhoneText(
				normalizePublicMarkdown(body, title),
				legacyPhones,
			),
		),
		crawledAt: frontmatter.crawledAt,
		description,
		district,
		legacySlug: createSlug(relativePath),
		legacyPhones,
		originalPath: relativePath,
		route,
		slug: createPublicSlug(title, relativePath),
		sourceUrl: frontmatter.url,
		title,
	};
}

export function getKnowledgeCampuses() {
	const campuses = walkMarkdownFiles(path.join(CRAWLED_CONTENT_DIR, "campus"))
		.map(parseCampus)
		.filter((campus): campus is KnowledgeCampus => Boolean(campus))
		.sort(
			(a, b) =>
				a.city.localeCompare(b.city, "zh-CN") ||
				a.title.localeCompare(b.title, "zh-CN"),
		);

	const used = new Set<string>();
	return campuses.map((campus) => {
		let slug = campus.slug;
		let suffixIndex = 0;

		while (used.has(slug)) {
			const suffix =
				DUPLICATE_SLUG_SUFFIXES[suffixIndex] ??
				`补充${String.fromCharCode(97 + (suffixIndex % 26))}`;
			slug = `${campus.slug}-${suffix}`;
			suffixIndex += 1;
		}

		used.add(slug);
		return {
			...campus,
			slug,
		};
	});
}

export function getKnowledgeCampusByAnySlug(slug: string) {
	const normalizedSlug = decodeRouteSlug(slug);

	for (const campus of getKnowledgeCampuses()) {
		if (campus.slug === normalizedSlug) {
			return {
				campus,
				isCanonical: true,
			};
		}

		if (campus.legacySlug === normalizedSlug) {
			return {
				campus,
				isCanonical: false,
			};
		}
	}

	return null;
}

export function formatKnowledgeArticleDate(
	article: Pick<KnowledgeArticleSummary, "crawledAt" | "publishedAt" | "year">,
) {
	const dateText = article.publishedAt ?? article.crawledAt ?? article.year;

	if (!dateText) {
		return "时间待更新";
	}

	const normalizedDate = dateText.match(/\d{4}[-/]\d{1,2}[-/]\d{1,2}/)?.[0];
	if (normalizedDate) {
		return normalizedDate.replaceAll("/", "-");
	}

	if (/^20\d{2}$/.test(dateText)) {
		return `${dateText} 年`;
	}

	return dateText;
}

export function getKnowledgeArticleSiblings(slug: string) {
	const articles = getKnowledgeArticles();
	const currentIndex = articles.findIndex((article) => article.slug === slug);

	if (currentIndex === -1) {
		return { next: null, previous: null };
	}

	return {
		next: articles[currentIndex + 1] ?? null,
		previous: articles[currentIndex - 1] ?? null,
	};
}

function getTitleKeywords(title: string) {
	const keywords = new Set<string>();

	for (const match of title.matchAll(/[一-龥]{2,}/g)) {
		const segment = match[0];
		for (let start = 0; start + 2 <= segment.length; start += 1) {
			keywords.add(segment.slice(start, start + 2));
		}
	}

	return keywords;
}

export function getRelatedKnowledgeArticles(
	article: Pick<KnowledgeArticleSummary, "section" | "slug" | "title">,
	limit = 9,
) {
	const baseKeywords = getTitleKeywords(article.title);

	return getKnowledgeArticles()
		.filter((candidate) => candidate.slug !== article.slug)
		.map((candidate) => {
			let score = 0;

			for (const keyword of getTitleKeywords(candidate.title)) {
				if (baseKeywords.has(keyword)) {
					score += 1;
				}
			}

			if (candidate.section === article.section) {
				score += 1;
			}

			return { candidate, score };
		})
		.filter((item) => item.score > 1)
		.sort(
			(a, b) =>
				b.score - a.score ||
				a.candidate.title.localeCompare(b.candidate.title, "zh-CN"),
		)
		.slice(0, limit)
		.map((item) => item.candidate);
}
