import fs from "node:fs";
import path from "node:path";
import { SITE_HOTLINE_TEXT } from "@/lib/constants/site";

// content/ 下的 markdown 会被 Next.js 的 file tracing 自动收进函数包，
// 因此构建产物和运行时都能从项目根目录读取，无需额外拷贝。
const KNOWLEDGE_CONTENT_DIR = path.join(process.cwd(), "content");
const CRAWLED_CONTENT_DIR = path.join(KNOWLEDGE_CONTENT_DIR, "抓取页面");

const CATEGORY_LABELS: Record<string, string> = {
	about: "关于戴氏",
	activity: "课程活动",
	campus: "校区资料",
	course: "课程体系",
	hot: "热点关注",
	knowledge: "知识库文档",
	news: "资讯动态",
	teacher: "教师资料",
};

const CATEGORY_FILTER_META: Record<
	string,
	Omit<KnowledgeArticleFilter, "count" | "kind">
> = {
	about: {
		description: "查看品牌介绍、办学信息和戴氏相关内容。",
		id: "guan-yu-dai-shi",
		title: "关于戴氏",
	},
	activity: {
		description: "查看课程活动、阶段安排和学习服务内容。",
		id: "ke-cheng-huo-dong",
		title: "课程活动",
	},
	campus: {
		description: "查看校区地址、路线、环境和到访信息。",
		id: "xiao-qu-zi-liao",
		title: "校区资料",
	},
	course: {
		description: "查看课程体系、班型设置和教学安排。",
		id: "ke-cheng-ti-xi",
		title: "课程体系",
	},
	hot: {
		description: "查看家长关注较多的热点问题和升学话题。",
		id: "re-dian-guan-zhu",
		title: "热点关注",
	},
	knowledge: {
		description: "查看课程、服务和升学相关资料。",
		id: "zhi-shi-ku-wen-dang",
		title: "知识库文档",
	},
	news: {
		description: "查看考试资讯、政策时间和学习动态。",
		id: "zi-xun-dong-tai",
		title: "资讯动态",
	},
	teacher: {
		description: "查看教师团队、教学特色和师资相关内容。",
		id: "jiao-shi-zi-liao",
		title: "教师资料",
	},
};

const OTHER_CATEGORY_FILTER: Omit<KnowledgeArticleFilter, "count" | "kind"> = {
	description: "查看课程、服务和升学规划相关的综合资料。",
	id: "zong-he-zi-liao",
	title: "综合资料",
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
	"00-知识库索引.md",
	"05-家长服务文章详情.md",
	"09-src页面内容全集.md",
	"10-public素材索引.md",
]);

export type KnowledgeArticle = {
	category: string;
	categoryLabel: string;
	content: string;
	crawledAt?: string;
	description?: string;
	historical: boolean;
	legacySlug: string;
	legacyPhones: string[];
	originalPath: string;
	publishedAt?: string;
	relatedLatestHref?: string;
	slug: string;
	sourceUrl?: string;
	summary: string;
	title: string;
	year?: string;
};

export type KnowledgeArticleSummary = Omit<KnowledgeArticle, "content">;

export type KnowledgeTopicGroup = {
	count: number;
	description: string;
	id: string;
	title: string;
};

export type KnowledgeArticleFilter = {
	count: number;
	description: string;
	id: string;
	kind: "category" | "topic";
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
		return "/zhao-sheng-jian-zhang";
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
		return "/jia-ge-biao";
	}

	if (/校区|地址|电话|联系/.test(title)) {
		return "/xiao-qu-cha-xun";
	}

	if (/招生简章|复读|全日制/.test(title)) {
		return "/zhao-sheng-jian-zhang";
	}

	return "/jia-zhang-fu-wu";
}

function parseKnowledgeArticle(filePath: string): KnowledgeArticle | null {
	const relativePath = path.relative(CRAWLED_CONTENT_DIR, filePath);
	const fileName = path.basename(filePath);

	if (isListPage(fileName) || fileName === "00-抓取索引.md") {
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

	return {
		category,
		categoryLabel: CATEGORY_LABELS[category] ?? "综合资料",
		content,
		crawledAt: frontmatter.crawledAt,
		description,
		historical: isHistorical(title, body, publishedAt),
		legacySlug: createSlug(relativePath),
		legacyPhones,
		originalPath: relativePath,
		publishedAt,
		relatedLatestHref: relatedLatestHref(title),
		slug:
			createFrontmatterSlug(frontmatter.slug) ??
			createPublicSlug(title, relativePath),
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

	return {
		category: "knowledge",
		categoryLabel: "知识库文档",
		content,
		crawledAt: frontmatter.crawledAt,
		description,
		historical: isHistorical(title, body, publishedAt),
		legacySlug: createSlug(`knowledge-${relativePath}`),
		legacyPhones,
		originalPath: relativePath,
		publishedAt,
		relatedLatestHref: relatedLatestHref(title),
		slug:
			createFrontmatterSlug(frontmatter.slug) ??
			createPublicSlug(title, relativePath),
		sourceUrl: frontmatter.url,
		summary: extractSummary(content, description),
		title,
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
let knowledgeTopicGroupsCache: KnowledgeTopicGroup[] | null = null;
let knowledgeArticleFiltersCache: KnowledgeArticleFilter[] | null = null;

function getAllKnowledgeArticleRecords() {
	if (allKnowledgeArticleRecordsCache) {
		return allKnowledgeArticleRecordsCache;
	}

	const crawledArticles = walkMarkdownFiles(CRAWLED_CONTENT_DIR)
		.map(parseKnowledgeArticle)
		.filter((article): article is KnowledgeArticle => Boolean(article));
	const topLevelArticles = walkMarkdownFiles(KNOWLEDGE_CONTENT_DIR)
		.map(parseTopLevelKnowledgeArticle)
		.filter((article): article is KnowledgeArticle => Boolean(article));

	allKnowledgeArticleRecordsCache = withUniqueArticleSlugs([
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

export function getKnowledgeArticleBySlug(slug: string) {
	const normalizedSlug = decodeRouteSlug(slug);

	for (const article of getAllKnowledgeArticleRecords()) {
		if (article?.slug === normalizedSlug) {
			return article;
		}
	}

	return null;
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
	}

	return null;
}

function getTopicGroupId(article: KnowledgeArticleSummary) {
	const text = `${article.title} ${article.summary}`;

	if (/收费|价格|费用|价目|学费|优惠/.test(text)) {
		return "shou-fei-jia-ge";
	}
	if (/校区|地址|电话|联系/.test(text)) {
		return "xiao-qu-di-zhi";
	}
	if (/口碑|怎么样|靠谱吗|好不好|评价|推荐|排名|排行/.test(text)) {
		return "kou-bei-ping-jia";
	}
	if (/艺考|艺术|文化课/.test(text)) {
		return "yi-kao-wen-hua-ke";
	}
	if (/复读|全日制|冲刺|高考中心|高三/.test(text)) {
		return "gao-kao-fu-du";
	}
	if (/中考|小升初|小学|初中|高一|高二|高三/.test(text)) {
		return "xue-duan-ke-cheng";
	}
	if (/一诊|二诊|三诊|单招|志愿|分数线|政策|考试时间|出分/.test(text)) {
		return "kao-shi-zheng-ce";
	}

	return "qi-ta-zi-liao";
}

const TOPIC_GROUP_META: Record<string, Omit<KnowledgeTopicGroup, "count">> = {
	"gao-kao-fu-du": {
		description: "集中查看高考全日制、复读、冲刺、艺考文化课等相关内容。",
		id: "gao-kao-fu-du",
		title: "高考复读与全日制专题",
	},
	"kao-shi-zheng-ce": {
		description: "集中查看考试时间、分数线、志愿填报、单招政策等信息。",
		id: "kao-shi-zheng-ce",
		title: "考试政策与时间专题",
	},
	"kou-bei-ping-jia": {
		description: "集中查看口碑评价、机构对比、排名推荐等家长常关注内容。",
		id: "kou-bei-ping-jia",
		title: "口碑评价与机构对比专题",
	},
	"qi-ta-zi-liao": {
		description: "查看课程、服务和升学规划相关的其他资料。",
		id: "qi-ta-zi-liao",
		title: "其他资料",
	},
	"shou-fei-jia-ge": {
		description:
			"集中查看收费、价格表、优惠活动和费用说明，具体以电话确认为准。",
		id: "shou-fei-jia-ge",
		title: "收费价格专题",
	},
	"xiao-qu-di-zhi": {
		description: "集中查看校区地址、电话、路线和城市校区信息。",
		id: "xiao-qu-di-zhi",
		title: "校区地址与电话专题",
	},
	"xue-duan-ke-cheng": {
		description: "集中查看小学、初中、高中课程和衔接课程相关信息。",
		id: "xue-duan-ke-cheng",
		title: "学段课程专题",
	},
	"yi-kao-wen-hua-ke": {
		description: "集中查看艺考文化课集训、冲刺、收费和机构选择相关内容。",
		id: "yi-kao-wen-hua-ke",
		title: "艺考文化课专题",
	},
};

export function getKnowledgeTopicGroups(): KnowledgeTopicGroup[] {
	if (knowledgeTopicGroupsCache) {
		return knowledgeTopicGroupsCache;
	}

	const counts = new Map<string, number>();

	for (const article of getKnowledgeArticles()) {
		const groupId = getTopicGroupId(article);
		counts.set(groupId, (counts.get(groupId) ?? 0) + 1);
	}

	knowledgeTopicGroupsCache = [...counts.entries()]
		.map(([id, count]) => ({
			...TOPIC_GROUP_META[id],
			count,
			id,
		}))
		.filter((group): group is KnowledgeTopicGroup => Boolean(group.title))
		.sort((a, b) => b.count - a.count);

	return knowledgeTopicGroupsCache;
}

export function getKnowledgeArticleCategoryStats() {
	const articles = getKnowledgeArticles();
	const stats = new Map<string, { count: number; label: string }>();

	for (const article of articles) {
		const current = stats.get(article.category) ?? {
			count: 0,
			label: article.categoryLabel,
		};
		current.count += 1;
		stats.set(article.category, current);
	}

	return [...stats.entries()].map(([category, stat]) => ({
		category,
		...stat,
	}));
}

export function getArticleCategoryFilterId(article: KnowledgeArticleSummary) {
	return CATEGORY_FILTER_META[article.category]?.id ?? OTHER_CATEGORY_FILTER.id;
}

function getCategoryFilterById(id: string) {
	const matchedCategory = Object.entries(CATEGORY_FILTER_META).find(
		([, meta]) => meta.id === id,
	);

	if (matchedCategory) {
		const [category, meta] = matchedCategory;
		return {
			category,
			meta,
		};
	}

	if (id === OTHER_CATEGORY_FILTER.id) {
		return {
			category: null,
			meta: OTHER_CATEGORY_FILTER,
		};
	}

	return null;
}

export function getKnowledgeArticleFilters(): KnowledgeArticleFilter[] {
	if (knowledgeArticleFiltersCache) {
		return knowledgeArticleFiltersCache;
	}

	const topicFilters = getKnowledgeTopicGroups().map((group) => ({
		count: group.count,
		description: group.description,
		id: group.id,
		kind: "topic" as const,
		title: group.title,
	}));
	const categoryCounts = new Map<string, KnowledgeArticleFilter>();

	for (const article of getKnowledgeArticles()) {
		const meta =
			CATEGORY_FILTER_META[article.category] ?? OTHER_CATEGORY_FILTER;
		const current = categoryCounts.get(meta.id) ?? {
			count: 0,
			description: meta.description,
			id: meta.id,
			kind: "category" as const,
			title: meta.title,
		};
		current.count += 1;
		categoryCounts.set(meta.id, current);
	}

	const categoryFilters = [...categoryCounts.values()].sort(
		(a, b) => b.count - a.count || a.title.localeCompare(b.title, "zh-CN"),
	);

	knowledgeArticleFiltersCache = [...topicFilters, ...categoryFilters];

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

	if (filter.kind === "topic") {
		return articles.filter((article) => getTopicGroupId(article) === filter.id);
	}

	const categoryFilter = getCategoryFilterById(filter.id);
	if (!categoryFilter) {
		return null;
	}

	if (categoryFilter.category) {
		return articles.filter(
			(article) => article.category === categoryFilter.category,
		);
	}

	return articles.filter(
		(article) =>
			getArticleCategoryFilterId(article) === OTHER_CATEGORY_FILTER.id,
	);
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

export function getKnowledgeCampusBySlug(slug: string) {
	const normalizedSlug = decodeRouteSlug(slug);
	return (
		getKnowledgeCampuses().find((campus) => campus.slug === normalizedSlug) ??
		null
	);
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
	article: Pick<KnowledgeArticleSummary, "category" | "slug" | "title">,
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

			if (candidate.category === article.category) {
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
