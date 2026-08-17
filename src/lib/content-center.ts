import {
	JIA_ZHANG_ARTICLES,
	type BottomCta,
	type JiaZhangArticle,
} from "@/lib/constants/jia-zhang-fu-wu";
import { getAllBrochures } from "@/lib/brochures";
import { SITE_FULL_NAME } from "@/lib/constants/site";

export const CONTENT_CENTER_SECTIONS = [
	{
		description: "查看各届招生对象、班型介绍、教学安排和报名说明。",
		id: "zhao-sheng-ke-cheng",
		label: "招生课程",
	},
	{
		description: "查看复读、高三全日制与艺体文化课的学习安排。",
		id: "fu-du-quan-ri-zhi",
		label: "复读与全日制",
	},
	{
		description: "查看各学段的学习方法、补弱策略与备考安排。",
		id: "bei-kao-ti-sheng",
		label: "备考提升",
	},
	{
		description: "查看考试、报名、查分、志愿与升学手续说明。",
		id: "sheng-xue-zheng-ce",
		label: "升学政策",
	},
	{
		description: "查看择校要点、复读路径和机构对比参考。",
		id: "ze-xiao-bi-jiao",
		label: "择校对比",
	},
	{
		description: "查看课程、师资、管理、住宿和报名等常见问题。",
		id: "jia-zhang-wen-da",
		label: "家长问答",
	},
	{
		description: "查看公开收费、优惠、退费与报名费用说明。",
		id: "fei-yong-fu-wu",
		label: "费用服务",
	},
	{
		description: "查看戴氏高考近期公开新闻与动态。",
		id: "xin-wen-dong-tai",
		label: "新闻动态",
	},
	{
		description: "查看高考、中考与学习相关热点内容。",
		id: "re-dian-guanzhu",
		label: "热点关注",
	},
] as const;

export type ContentCenterSectionId =
	(typeof CONTENT_CENTER_SECTIONS)[number]["id"];

export type ContentCenterArticleSource = {
	content: string;
	historical?: boolean;
	publishedAt: string;
	schema?: "faq";
	section: ContentCenterSectionId;
	slug: string;
	summary: string;
	title: string;
};

function toContentCenterHref(href: string) {
	return href.replaceAll("/jia-zhang-fu-wu/", "/zi-liao-ku/");
}

function anchor(id: string | undefined, heading: string, level = "##") {
	return `${id ? `<!-- anchor: ${id} -->\n\n` : ""}${level} ${heading}`;
}

function ctaMarkdown(cta: BottomCta | undefined) {
	if (!cta) {
		return "";
	}

	return ["", `## ${cta.title}`, "", cta.description].join("\n");
}

function parentArticleMarkdown(article: JiaZhangArticle) {
	const { content } = article;

	if (content.kind === "faq") {
		return [
			...content.sections.flatMap((section) => [
				anchor(undefined, section.title),
				"",
				...section.items.flatMap((item) => [
					anchor(item.id, item.question, "###"),
					"",
					item.answer,
					...(item.quickLink
						? [
							"",
							`[${item.quickLink.label}](${toContentCenterHref(item.quickLink.href)})`,
						]
						: []),
					"",
				]),
			]),
			ctaMarkdown(content.bottomCta),
		]
			.join("\n")
			.trim();
	}

	if (content.kind === "guide") {
		return [
			...content.intro,
			...content.sections.flatMap((section) => [
				"",
				anchor(section.id, section.title),
				"",
				section.description,
				"",
				...section.items.map((item) => `- ${item}`),
			]),
			...(content.relatedQuestions && content.relatedQuestions.length > 0
				? [
					"",
					"## 相关问题",
					...content.relatedQuestions.flatMap((item) => [
						"",
						`### ${item.question}`,
						"",
						...(item.answer ? [item.answer, ""] : []),
						`[查看相关说明](${toContentCenterHref(item.href)})`,
					]),
				]
				: []),
			ctaMarkdown(content.bottomCta),
		]
			.join("\n")
			.trim();
	}

	if (content.kind === "campus-directory") {
		return [
			...content.intro,
			...content.sections.flatMap((section) => [
				"",
				anchor(section.id, section.title),
				"",
				section.description,
				"",
				"| 城市 | 区域 | 校区 | 类型 | 地址 |",
				"| --- | --- | --- | --- | --- |",
				...section.rows.map(
					(row) =>
						`| ${row.city} | ${row.district} | ${row.campusName} | ${row.attribute} | ${row.address} |`,
				),
				...(section.note ? ["", section.note] : []),
			]),
			ctaMarkdown(content.bottomCta),
		]
			.join("\n")
			.trim();
	}

	return [
		...content.paragraphs,
		...(content.table
			? [
				"",
				`| ${content.table.headers.join(" | ")} |`,
				"| --- | --- | --- |",
				...content.table.rows.map(
					(row) => `| ${row.dimension} | ${row.left} | ${row.right} |`,
				),
			]
			: []),
		ctaMarkdown(content.bottomCta),
	]
		.join("\n")
		.trim();
}

const PARENT_ARTICLE_SECTION_BY_SLUG: Record<
	string,
	ContentCenterSectionId
> = {
	"2026-fu-du-xuan-xiao-zhi-nan": "ze-xiao-bi-jiao",
	"2026-si-chuan-ge-shi-zhong-kao-cheng-ji-cha-xun-shi-jian": "sheng-xue-zheng-ce",
	"bu-xi-ti-fen-wen-da": "jia-zhang-wen-da",
	"cheng-du-dan-zhao-pei-xun-ji-gou-zen-me-xuan": "ze-xiao-bi-jiao",
	"cheng-du-gao-san-fu-du-shou-xu": "sheng-xue-zheng-ce",
	"dai-shi-gao-kao-dian-hua-yu-yue-mian-fei-shi-ting-liu-cheng": "jia-zhang-wen-da",
	"dai-shi-gao-kao-zhong-xin-dui-bi-xue-cheng-gao-kao-xue-xiao": "ze-xiao-bi-jiao",
	"dai-shi-gao-kao-zhong-xin-ru-he-yu-yue-ti-yan-ke": "jia-zhang-wen-da",
	"dai-shi-jiao-yu-gao-kao-quan-ri-zhi-dui-bi-xin-xue": "ze-xiao-bi-jiao",
	"dai-shi-yu-dan-qiu-mei-ya-quan-mian-dui-bi": "ze-xiao-bi-jiao",
	"fu-du-ji-gou-duo-wei-du-dui-bi": "ze-xiao-bi-jiao",
	"jia-zhang-wen-ti": "jia-zhang-wen-da",
	"xue-guan-fu-wu-liu-cheng": "jia-zhang-wen-da",
};

function getParentArticleSection(slug: string): ContentCenterSectionId {
	const section = PARENT_ARTICLE_SECTION_BY_SLUG[slug];
	if (!section) {
		throw new Error(`Missing content-center section mapping: ${slug}`);
	}

	return section;
}

const PARENT_ARTICLE_OVERRIDES: Record<string, string> = {
	"2026-fu-du-xuan-xiao-zhi-nan": `## 先判断孩子是否适合复读

是否复读不能只看一次高考分数。建议结合当年成绩与平时水平的差距、目标院校和专业、各科短板、学习习惯、心理状态，以及家庭能够承受的一年学习强度综合判断。复读不是所有学生都适用的单一选择。

## 先核验办学与报名信息

选择前先确认办学主体、办学许可、校区地址和当期招生信息；高考报名、学籍或档案相关事项，应同时向当地招考机构、原毕业学校和拟就读机构了解。不要把口头承诺当作报名或服务依据。

到校时建议要求查看并留存以下资料：

- 当期班型、开班时间、课程周期和住宿安排。
- 收费项目、优惠条件、退费规则及服务边界。
- 学生管理、请假、手机管理、家校沟通和安全管理说明。
- 教师安排、分层方式、测评频次和作业订正的具体做法。

## 比较不同学习路径

| 学习路径 | 可以重点了解 | 适合进一步确认的情况 |
| --- | --- | --- |
| 独立复读班或全日制学习机构 | 是否按基础分层、课程节奏、答疑和日常管理 | 办学资质、师资稳定性、报名衔接和收费明细 |
| 民办高中复读项目 | 是否独立成班、是否与应届生混读、住宿与教学资源 | 复读生课程安排及高考报名支持 |
| 走读补习或单科辅导 | 是否适合短期补弱、授课频次和作业反馈 | 是否能覆盖全年复习、管理和测评需求 |
| 一对一学习 | 是否真正针对薄弱学科、课时规划和教师匹配 | 预算、学习氛围和长期执行成本 |

没有一种路径天然适合所有学生。基础、自律性、目标、预算和是否需要住校管理，通常比机构名称更值得优先比较。

## 看教学与管理是否能落地

问清楚“怎样做”比只看“有什么”更重要。可重点询问分班依据、每日课程和自习安排、晚间答疑、周测月测、错题订正、班主任跟进和家长反馈频次。也应了解学生出现适应困难、缺课或成绩波动时，学校如何沟通和处理。

不要仅依据单个高分案例、笼统的提分承诺或短期优惠下决定。成绩提升受学生基础、学习投入和备考过程等多种因素影响，应以可核验的教学安排和个人实际情况为准。

## 收费与合同逐项核对

总价之外，应逐项确认学费、住宿、资料、测评、餐费和其他服务是否另计；优惠能否叠加；转班、请假和退费如何计算；未提供服务的处理规则是什么。涉及金额的约定应写入当期收费文件或合同。

## 到校比较清单

带上高考成绩、近期试卷、错题记录、目标院校范围和家庭预算。用同一组问题咨询不同学校，再根据书面资料比较，能减少只看宣传页或单一评价所带来的误判。`,
	"fu-du-ji-gou-duo-wei-du-dui-bi": `## 对比前先明确三个前提

复读学习、高考报名和档案管理是不同事项。不同地区和年度的要求可能变化，家长应分别向当地招考机构、原毕业学校和拟选择的学校或机构确认。以下内容用于梳理比较维度，不替代任何一方的当期书面说明。

## 合规与报名衔接

| 对比项 | 需要核对的问题 |
| --- | --- |
| 办学主体 | 是否能提供公开办学信息、校区地址及实际教学场地说明？ |
| 高考报名 | 由谁提醒、协助或组织相关流程？社会考生报名如何办理？ |
| 档案处理 | 档案应存放在哪里，调取时由谁提供什么材料？ |
| 服务承诺 | 课程、住宿、管理和退费规则是否有书面文件？ |

## 教学体系与师资

复读生通常更需要针对已有基础重新安排节奏。比较时可了解是否按入学情况分层、每轮复习如何安排、薄弱学科如何补强、试卷与测评如何反馈，以及教师是否稳定授课和提供固定答疑。

| 对比项 | 建议询问 |
| --- | --- |
| 分层与分班 | 使用哪些入学资料分班，后续能否根据学情调整？ |
| 课程节奏 | 一轮、专题、综合训练如何安排，已掌握内容如何处理？ |
| 课后支持 | 是否有固定答疑、作业订正和错题反馈机制？ |
| 教师安排 | 实际授课教师是谁，发生调整时如何沟通？ |
| 测评反馈 | 周测、月测或阶段测评后如何分析并调整学习计划？ |

## 管理与学习环境

管理强度没有统一标准。需要住校、手机管理、固定作息或高频跟进的学生，应确认具体规则、执行人员和家校沟通方式；偏向走读或自主学习的学生，则应评估通勤、时间安排和在家学习环境能否长期支撑。

重点可看班级人数、住宿条件、晚自习安排、请假制度、电子设备管理、班主任职责、心理支持渠道和安全管理。现场查看教室、宿舍、公共区域和自习空间，比仅看宣传图片更可靠。

## 收费、合同与后续服务

| 对比项 | 需要确认的内容 |
| --- | --- |
| 总费用 | 学费、住宿、资料、测评、餐费等是否包含或另计？ |
| 优惠 | 适用条件、有效期、能否叠加及失效情形是什么？ |
| 退费与转班 | 已提供服务如何计算，申请流程与时间要求是什么？ |
| 后续服务 | 志愿填报、考务提醒等服务是否包含，边界在哪里？ |

高考成绩无法由任何机构承诺。对“保分”“保录取”或无法提供书面依据的宣传，应保持审慎，并将判断重点放在合同、教学安排和孩子自身的长期执行上。

## 建议的比较方法

准备一张对比表：把成绩基础、目标分数、薄弱科目、是否住校、管理需求和预算列在前面；再把资质信息、班型、教学、管理、费用和退费规则逐项记录。完成至少两到三家实地咨询后，再和孩子一起判断更适合的方案。`,
};

function getParentArticleSources(): ContentCenterArticleSource[] {
	return JIA_ZHANG_ARTICLES
		.filter((article) => article.slug !== "dai-shi-jiao-yu-ge-ge-xiao-qu-hui-zong")
		.map((article) => ({
		content:
			PARENT_ARTICLE_OVERRIDES[article.slug] ?? parentArticleMarkdown(article),
		publishedAt: article.publishedAt,
		...(article.content.kind === "faq" ? { schema: "faq" as const } : {}),
		section: getParentArticleSection(article.slug),
		slug: article.slug,
		summary: article.summary,
		title: article.title,
		}));
}

function brochureMarkdown(year: string) {
	const shared = [
		"## 招生对象与报名安排",
		"",
		"面向有高考全日制、复读或集中备考需求的学生。具体学段、班型、开班时间、入学测评和校区安排，以当届书面招生说明为准。",
		"",
		"## 报名前建议确认",
		"",
		"- 当前可选班型、课程周期和到校时间。",
		"- 入学测评、食宿、请假和日常管理规则。",
		"- 收费项目、优惠条件、有效期及退费约定。",
		"- 高考报名、档案等事项的当年办理要求。",
		"",
		"## 咨询说明",
		"",
		"招生政策会随年度和校区安排更新。正式报名以当期书面招生简章、收费说明和双方确认内容为准。",
	];

	const yearSpecific =
		year === "2026"
			? [
				"## 教学与备考安排",
				"",
				"本届招生说明围绕师资、课堂、学情、分班和备考节奏介绍全日制学习安排。家长可重点了解教师安排、课程如何按基础分层、阶段测评如何反馈，以及学生如何进行错题整理与薄弱环节补强。",
				"",
				"## 学情与学习管理",
				"",
				"入学后可通过学习情况、阶段测试和日常表现了解学生状态。正式沟通时可进一步确认日常作息、课堂纪律、作业检查、考后复盘和班主任跟进的具体方式。",
				"",
				"## 家校沟通与学习环境",
				"",
				"招生说明包含家校沟通、教室、自习、住宿和公共学习空间等内容。建议到校查看实际场地，并确认家长获取学习反馈的渠道、频次和问题处理流程。",
			]
			: [
				"## 教学教研体系",
				"",
				"本届招生说明介绍师资选拔、课堂教学、学情测评、分层教学和阶段复习安排。家长可结合孩子的学科基础和目标，了解班型、课程节奏、答疑安排与测评反馈是否匹配。",
				"",
				"## 教学管理与家校沟通",
				"",
				"学生管理通常涉及入学建档、课堂与作业、日常作息、阶段复盘和家校沟通。具体管理标准、手机管理、住宿规则及异常情况的沟通流程，应以校区当期书面说明为准。",
				"",
				"## 学习空间与服务边界",
				"",
				"招生说明包含教学空间、公共学习区域和生活配套等内容。建议实地查看，并逐项确认课程、住宿、资料、测评和其他服务是否包含在当期收费中。",
			];

	return [
		`## ${year} 届招生说明`,
		"",
		`${SITE_FULL_NAME}${year} 届高考全日制与复读招生信息，供家长和学生了解当届课程、管理与报名安排。`,
		"",
		...yearSpecific,
		"",
		...shared,
	].join("\n");
}

function getBrochureSources(): ContentCenterArticleSource[] {
	return getAllBrochures().map((brochure) => ({
		content: brochureMarkdown(brochure.year),
		publishedAt: `${Number(brochure.year) - 1}-01-01`,
		section: "zhao-sheng-ke-cheng",
		slug: `${brochure.year}-zhao-sheng-jian-zhang`,
		summary: `查看 ${brochure.year} 届高考全日制与复读班招生简章、班型介绍及备考安排。`,
		title: brochure.title,
	}));
}

const PRICE_ARTICLE: ContentCenterArticleSource = {
	content: `## 政策状态

本文归档 2026 年 6 月 1 日至 7 月 31 日期间公开的世贸校区 2027 届高考复读与高三全日制全科班收费及优惠信息。该暑期优惠期已结束，当前班型、名额、价格和优惠应以校区最新书面说明为准。

## 当期收费标准（历史公示）

| 班型 | 月度标准 | 常规月度优惠 | 常规优惠后总价 |
| --- | --- | --- | --- |
| 10 人精品班 | 12000 元 / 月 | 1000 元 / 月 | 86800 元 / 年 |
| 16 / 18 人中班 | 8000 元 / 月 | 1000 元 / 月 | 57800 元 / 年 |
| 24 人大班 | 5500 元 / 月 | 1000 元 / 月 | 36800 元 / 年 |

原公示注释：全年原价含 1200 元资料费及 5 月课程费；具体费用计算以当期书面明细为准。

## 暑期报名优惠（已结束）

| 报名时间 | 适用班型 | 优惠标准 |
| --- | --- | --- |
| 6 月 30 日前 | 10 人精品班 | 总费用立减 3000 元 |
| 6 月 30 日前 | 16 / 18 人中班 | 总费用立减 2000 元 |
| 6 月 30 日前 | 24 人大班 | 总费用立减 1000 元 |
| 7 月 1 日至 7 月 31 日 | 世贸校区全部班型 | 总价统一优惠 1000 元 |
| 7 月 31 日前 | 全部班型 | 免全年资料费（原价 1200 元） |

原公示还包含 2027 年 5 月整月课程赠送安排；该安排同样已随暑期政策期结束。

## 分数专项优惠（已结束）

| 分数条件 | 全年学费优惠 | 使用要求 |
| --- | --- | --- |
| 一本线及以上 | 总学费优惠 10000 元 | 提供有效高考成绩单 |
| 本科线及以上 | 总学费优惠 5000 元 | 提供有效高考成绩单 |

原规则中，分数专项优惠与暑期报名优惠不可叠加，按当期规则择一使用。

## 团报、插班与续报（历史规则）

| 情形 | 原公示说明 |
| --- | --- |
| 2 至 3 人组团 | 每人优惠 500 元 |
| 3 至 5 人组团 | 每人优惠 1000 元 |
| 5 人以上组团 | 每人优惠 1500 元 |
| 中途插班 | 班级开课满 30、60、90 天，原公示分别按 9.6、9.4、9.2 折核算 |
| 老生续报 | 依据既有全日制就读时长，原公示设置 5000 至 15000 元优惠 |

## 报名前如何确认

请向校区索取当前收费明细，并确认课程、住宿、资料、测评、餐费和其他服务是否包含在总价中；优惠是否可叠加；转班、插班和退费如何计算。涉及金额和服务的约定，以双方确认的当期书面文件或合同为准。`,
	publishedAt: "2026-06-01",
	historical: true,
	section: "fei-yong-fu-wu",
	slug: "shi-mao-gao-kao-fu-du-shou-fei-you-hui",
	summary: "世贸校区 2027 届高考复读与高三全日制全科班历史收费公示及暑期优惠规则，当前政策请以书面说明为准。",
	title: "2027 届世贸校区高考复读收费与优惠说明（历史政策）",
};

export function getContentCenterArticleSources() {
	return [...getParentArticleSources(), ...getBrochureSources(), PRICE_ARTICLE];
}

export function getContentCenterSection(
	sectionId: string | undefined,
): (typeof CONTENT_CENTER_SECTIONS)[number] | null {
	return (
		CONTENT_CENTER_SECTIONS.find((section) => section.id === sectionId) ??
		null
	);
}

export function getHomeFaqs() {
	const questions = new Set([
		"成都戴氏教育办学多少年了？",
		"成都戴氏教育主要做哪些年级的辅导？",
		"成都戴氏教育的老师都有教师资格证吗？",
		"成都戴氏教育高三全日制是封闭式管理吗？",
		"成都戴氏教育有真实提分案例吗？",
	]);

	return JIA_ZHANG_ARTICLES.flatMap((article) => {
		if (article.content.kind !== "faq") {
			return [];
		}

		return article.content.sections.flatMap((section) =>
			section.items
				.filter((item) => questions.has(item.question))
				.map((item) => ({
					...item,
					quickLink: item.quickLink
						? {
							...item.quickLink,
							href: toContentCenterHref(item.quickLink.href),
						}
						: undefined,
				})),
		);
	});
}
