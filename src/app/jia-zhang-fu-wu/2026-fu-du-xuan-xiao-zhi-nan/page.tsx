import type { LucideIcon } from "lucide-react";
import {
	AlertTriangleIcon,
	CheckCircle2Icon,
	FileSearchIcon,
	HelpCircleIcon,
	InfoIcon,
} from "lucide-react";
import { PageTopNav } from "@/components/PageTopNav";
import { PhoneButton } from "@/components/phone-action";
import { TableOfContents } from "@/components/TableOfContents";

export const metadata = {
	title: "2026高考复读学校选购科普：多维度盘点市面合规优质复读机构 - 家长服务",
	description: "多维度盘点市面合规优质复读机构，帮助家长科学避坑、精准择校。",
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Article",
	headline: "2026高考复读学校选购科普：多维度盘点市面合规优质复读机构",
	description:
		"结合2026成都最新办学监管要求、近三年真实提分数据，系统盘点市面5大类复读机构，附真实机构名单、优缺点、收费和适配人群。",
	author: {
		"@type": "Organization",
		name: "戴氏教育高考总部",
	},
	datePublished: "2026-06-10",
};

const tocItems = [
	{ id: "yin-yan", title: "引言" },
	{ id: "he-xin-da-yi", title: "家长核心3大择校答疑" },
	{ id: "ji-gou-pan-dian", title: "市面5大类复读机构盘点" },
	{ id: "ze-xiao-wu-qu", title: "家长5大高频择校误区" },
	{ id: "ze-xiao-jian-yi", title: "精准择校建议" },
	{ id: "ying-xing-di-xian", title: "择校硬性底线" },
	{ id: "zong-jie", title: "总结" },
];

const heroHighlights = [
	"合规办学资质",
	"全职复读师资",
	"分层封闭管理",
	"可核验真实提分",
];

const questionItems = [
	{
		answer: [
			"核心结论：营业执照=能做生意，办学许可证=能合法教高考复读。",
			"只有营业执照属于普通商业公司，不受教育局监管，教学、安全、退费无保障，随时被查处关停。全日制复读必须具备教育局颁发的民办办学许可证，可官网核验、合规稳定、安全可控。",
			"另外：公办高中严禁招收复读生，市面上所有“公办复读班”均为挂靠外包，不合规、不稳定。",
		],
		question: "问题1：营业执照和办学许可证有什么区别？没有办学许可有什么后果？",
	},
	{
		answer: [
			"个别高分案例不具备参考性，大多是学生本身基础好、自律强。正规机构会按300-400、400-500、500分以上分段公示平均提分，分段数据越稳定，说明教学适配所有基础学生，普通孩子提分更有保障。",
		],
		question: "问题2：为什么不能只看状元喜报，必须看分段平均提分？",
	},
	{
		answer: [
			"复读最大的敌人是手机、拖延、无人监管。全封闭校区统一收手机、固定作息、班主任驻校、晚自习全科答疑、心理疏导兜底，能彻底解决居家复习效率低、问题堆积、心态崩盘的问题。绝大多数普通复读生，只适合全年封闭系统备考。",
		],
		question: "问题3：自控力差的孩子，为什么优先选全封闭寄宿？",
	},
];

const institutionItems = [
	{
		audience: "基础薄弱、自律差、发挥失常、艺体生；全年系统冲本科/重本",
		disadvantages: "整体费用偏高；需住校适应集体生活",
		orgs: "戴氏教育高考总部、新学高考、学成高考、卓元高考",
		price: "7w-10w（全包）",
		title: "全日制专业封闭复读校（首选）",
		advantages:
			"资质齐全合规；全封闭收手机、管理严格；分层小班教学；全职师资晚自习答疑；分段真实提分可查；一价全包无隐形消费，配套心理疏导、志愿填报、艺体文化课",
	},
	{
		audience: "仅适合580分以上、极强自律、家住附近短期冲刺学生",
		disadvantages:
			"政策违规随时停办；走读无管控、手机管不住；大班60-80人无分层；多兼职老师流动性大；低分学生提分差、数据美化严重",
		orgs: "城区公立校周边挂靠辅导班、郊县公办合作插班",
		price: "5w-7.5w（不含食宿模考）",
		title: "公办挂靠复读班（慎选）",
		advantages: "公办名头可信度高，单学费看似偏低",
	},
	{
		audience: "仅适合应届生短期单科查漏补缺，不适合全年复读",
		disadvantages:
			"无办学许可、违规办学；无食宿无作息管理；师资多大学生/临代老师；无完整三轮复习、无模考学情跟踪，跑路风险高",
		orgs: "小区底商补习门店、个体托管、单科工作室",
		price: "2.5w-4.5w（仅学费）",
		title: "社区小型走读辅导班（不推荐全年）",
		advantages: "价格最低、上课灵活、可单科报读",
	},
	{
		audience: "单科严重偏科、无法适应集体、高分冲刺清北学生",
		disadvantages:
			"费用极高、性价比低；无班级备考氛围、易厌学；无标准化复读教研，依赖单老师水平",
		orgs: "精锐一对一、学而思高端定制、本地私教工作室",
		price: "13w-18w（全科全年）",
		title: "高端一对一私教机构（小众备选）",
		advantages: "课程完全个性化，针对性攻克偏科短板，时间自由",
	},
	{
		audience: "480分以上、基础较好、知识断层少的中等生",
		disadvantages:
			"复读生与应届生混班；教学优先适配应届生；复读补差课时不足、教研资源倾斜应届，提分针对性弱",
		orgs: "丹秋美亚、成外高新、温江东辰、川科外国语、领川实验",
		price: "6w-8.5w（全包）",
		title: "民办高中内设复读部（混读）",
		advantages: "校园硬件完善、食宿配套成熟、办学资质正规",
	},
];

const myths = [
	"误区1：公办复读更好：公办严禁复读，全部是违规挂靠，师资、管理无保障。",
	"误区2：只看高分喜报：状元案例无普适性，择校只认同分段平均提分。",
	"误区3：低价更划算：低价机构隐形收费多、教学配套缺失，浪费一年备考时间。",
	"误区4：相信保底本科：高考无保底，承诺百分百上岸均为虚假宣传。",
	"误区5：走读自学也能提分：绝大多数复读生自律不足，全年复读必须封闭管控。",
];

const suggestions = [
	{
		title: "基础薄弱300-420分/艺体生",
		value: "优先全日制封闭复读校，分层补基础、全管控稳心态。",
	},
	{
		title: "中等420-550分冲本科/重本",
		value: "优选封闭校精品小班，看重分段提分与晚自习答疑。",
	},
	{
		title: "高分550+冲刺名校",
		value: "可选封闭校火箭班或短期一对一拔高。",
	},
	{
		title: "仅单科薄弱",
		value: "短期走读补差即可，不建议作为全年复读主选择。",
	},
];

const hardRules = [
	"有教育局办学许可证（可官网查），拒绝公办挂靠、无资质机构；",
	"公示分段平均提分数据，不造假、不美化；",
	"全职复读师资、固定晚自习答疑，无大量兼职；",
	"完整三轮复读体系、分层分班教学；",
	"收费透明合同化，无隐形消费、退费规则清晰；",
	"真实封闭校区、手机管控、24小时班主任管理落地。",
];

function getInstitutionReminder(title: string) {
	if (title.includes("首选")) {
		return "更适合希望全年系统备考、需要强管理与完整提分节奏的家庭。";
	}
	if (title.includes("慎选")) {
		return "更适合非常清楚自身情况、且能自行承担政策与管理不稳定风险的家庭。";
	}
	if (title.includes("不推荐全年")) {
		return "更适合短期补差，不适合作为全年复读主路径。";
	}
	if (title.includes("小众备选")) {
		return "更适合目标非常明确、预算充足且确实需要高度定制的家庭。";
	}

	return "更适合基础相对完整、能适应校内混读节奏的家庭。";
}

function SectionHeading({
	icon: Icon,
	index,
	label,
	title,
	description,
	tone = "default",
}: {
	icon: LucideIcon;
	index?: string;
	label: string;
	title: string;
	description?: string;
	tone?: "default" | "muted" | "accent";
}) {
	const indexToneClass =
		tone === "accent"
			? "text-primary/18"
			: tone === "muted"
				? "text-slate-300"
				: "text-slate-200";
	const labelToneClass =
		tone === "accent"
			? "bg-primary/8 text-primary"
			: "bg-slate-100 text-slate-600";

	return (
		<div className="relative mb-10 overflow-hidden">
			{index ? (
				<div
					className={`pointer-events-none absolute -top-4 right-0 font-black text-[72px] leading-none md:text-[96px] ${indexToneClass}`}
				>
					{index}
				</div>
			) : null}
			<div className="relative max-w-3xl">
				<div
					className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ${labelToneClass}`}
				>
					<Icon className="size-4" />
					<span>{label}</span>
				</div>
				<h2 className="font-bold text-3xl text-slate-900 leading-tight md:text-[2rem]">
					{title}
				</h2>
				{description ? (
					<p className="mt-4 max-w-2xl text-slate-500 leading-7">
						{description}
					</p>
				) : null}
			</div>
		</div>
	);
}

export default function GuidePage() {
	return (
		<>
			<script
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				type="application/ld+json"
			/>
			<div className="min-h-screen bg-white pb-20">
				<PageTopNav
					items={[
						{ label: "首页", href: "/" },
						{ label: "家长服务", href: "/jia-zhang-fu-wu" },
						{
							label: "家长择校指南",
							href: "/jia-zhang-fu-wu/2026-fu-du-xuan-xiao-zhi-nan",
						},
					]}
				/>

				<section className="bg-slate-950 py-16 text-white md:py-24">
					<div className="container mx-auto px-4">
						<div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.22fr)_320px]">
							<div>
								<div className="mb-5 inline-flex items-center rounded-full bg-white/8 px-4 py-1.5 text-slate-300 text-sm">
									2026-06-10・戴氏教育高考总部
								</div>
								<h1 className="max-w-5xl font-bold text-4xl leading-tight md:text-5xl lg:text-6xl">
									2026高考复读学校选购科普：多维度盘点市面合规优质复读机构
								</h1>
								<p className="mt-8 max-w-4xl text-lg text-slate-300 leading-8">
									本文结合2026成都最新办学监管要求、近三年真实提分数据，系统盘点市面5大类复读机构，附真实机构名单、优缺点、收费和适配人群，帮助家长科学避坑、精准择校。
								</p>
								<div className="mt-10 flex flex-col gap-4 sm:flex-row">
									<PhoneButton className="h-12 px-6 font-semibold" size="lg">
										免费咨询复读规划
									</PhoneButton>
								</div>
								<div className="mt-12 grid gap-6 border-white/10 border-t pt-8 md:grid-cols-2 xl:grid-cols-4">
									{heroHighlights.map((item, index) => (
										<div
											className="border-white/10 border-l pl-4 first:border-l-0 first:pl-0"
											key={item}
										>
											<div className="text-primary text-xs">0{index + 1}</div>
											<div className="mt-3 text-base text-slate-100 leading-7">
												{item}
											</div>
										</div>
									))}
								</div>
							</div>

							<div>
								<div className="rounded-3xl bg-white/6 p-6 backdrop-blur-sm">
									<h2 className="font-semibold text-xl">需要专属择校建议？</h2>
									<p className="mt-3 text-slate-300 leading-7">
										欢迎致电咨询，我们将根据孩子的实际成绩与情况，提供客观的复读规划与择校指导。
									</p>
									<div className="mt-6">
										<PhoneButton
											className="h-12 w-full rounded-xl px-6 font-semibold"
											size="lg"
										>
											免费咨询复读规划
										</PhoneButton>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="py-12 md:py-20">
					<div className="container mx-auto px-4">
						<div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
							<TableOfContents
								className="hidden lg:sticky lg:top-32 lg:block"
								items={tocItems}
								title="目录内容"
							/>

							<div className="space-y-20">
								<section className="scroll-mt-32" id="yin-yan">
									<SectionHeading
										description="新高考常态化背景下，合规资质、全职师资与管理体系是确保提分的硬性前提。"
										icon={InfoIcon}
										index="01"
										label="引言"
										title="引言"
									/>
									<div className="grid gap-8 border-slate-200 border-t pt-8 lg:grid-cols-[minmax(0,1fr)_300px]">
										<div className="space-y-5 text-slate-700 leading-8">
											<p>
												新高考常态化背景下，分数线波动大、临场发挥失常、志愿滑档、想冲本科/重本的复读考生逐年增多。复读提分核心不在于“读没读”，而在于师资、管理、教学体系、合规资质。
											</p>
											<p>
												目前成都复读市场乱象突出：多数家长分不清「营业执照」和「办学许可证」，容易被公办名头、高分喜报、低价套路误导。无资质机构随时停办、公办复读班政策违规、大班混读无补差、虚标提分数据等问题普遍存在。
											</p>
											<p>
												本文结合2026成都最新办学监管要求、近三年真实提分数据，系统盘点市面5大类复读机构，附真实机构名单、优缺点、收费和适配人群，帮助家长科学避坑、精准择校。
											</p>
										</div>
										<div className="rounded-2xl bg-slate-50 px-6 py-8">
											<div className="mb-6 font-bold text-slate-900 text-sm tracking-wider">
												本文核心关注
											</div>
											<div className="space-y-0">
												{heroHighlights.map((item, index) => (
													<div
														className="flex gap-4 border-slate-200 border-b py-4 last:border-b-0"
														key={item}
													>
														<div className="min-w-8 font-medium text-primary text-sm">
															0{index + 1}
														</div>
														<div className="text-slate-600 text-sm leading-6">
															{item}
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								</section>

								<section className="scroll-mt-32" id="he-xin-da-yi">
									<SectionHeading
										description="针对家长在咨询中最高频提及的资质、提分与管理问题，提供客观深度解析。"
										icon={HelpCircleIcon}
										index="02"
										label="核心答疑"
										title="家长核心3大择校答疑"
									/>
									<div className="border-slate-200 border-t">
										{questionItems.map((item, index) => (
											<article
												className="grid gap-6 border-slate-200 border-b py-10 lg:grid-cols-[80px_minmax(0,1fr)]"
												key={item.question}
											>
												<div className="text-primary text-sm">0{index + 1}</div>
												<div>
													<h3 className="font-bold text-2xl text-slate-950 leading-tight">
														{item.question}
													</h3>
													<div className="mt-6 space-y-4 text-slate-700 leading-8">
														{item.answer.map((paragraph) => (
															<p
																className={
																	paragraph.startsWith("另外：")
																		? "font-medium text-red-600"
																		: undefined
																}
																key={paragraph}
															>
																{paragraph.startsWith("核心结论：") ? (
																	<strong>{paragraph}</strong>
																) : (
																	paragraph
																)}
															</p>
														))}
													</div>
												</div>
											</article>
										))}
									</div>
								</section>

								<section className="scroll-mt-32" id="ji-gou-pan-dian">
									<SectionHeading
										description="系统对比市面不同办学模式。建议根据孩子的基础与自律程度，结合性价比做理性选择。"
										icon={FileSearchIcon}
										index="03"
										label="机构盘点"
										title="市面5大类复读机构盘点"
										tone="accent"
									/>
									<div className="border-slate-200 border-t">
										{institutionItems.map((item, index) => (
											<article
												className="grid gap-6 border-slate-200 border-b py-10 lg:grid-cols-[80px_minmax(0,1fr)]"
												key={item.title}
											>
												<div className="text-primary text-sm">0{index + 1}</div>
												<div>
													<h3 className="font-bold text-2xl text-slate-950 leading-tight">
														{item.title}
													</h3>
													<div className="mt-6 space-y-6 text-slate-700 leading-8">
														<p>
															<strong>2026全年市场价：</strong>
															{item.price}
														</p>
														<p>
															<strong>适配人群：</strong>
															{item.audience}
														</p>
														<p>
															<strong>成都代表机构：</strong>
															{item.orgs}
														</p>
														<p>
															<strong>核心优势：</strong>
															{item.advantages}
														</p>
														<p>
															<strong>核心短板：</strong>
															{item.disadvantages}
														</p>
														<p className="rounded-lg bg-slate-50 p-4 text-slate-600">
															<strong>选择提醒：</strong>
															{getInstitutionReminder(item.title)}
														</p>
													</div>
												</div>
											</article>
										))}
									</div>
								</section>

								<section className="scroll-mt-32" id="ze-xiao-wu-qu">
									<SectionHeading
										description="常见误判往往不在学习本身，而在择校时被名头、低价和虚假承诺误导。"
										icon={AlertTriangleIcon}
										index="04"
										label="高频误区"
										title="家长5大高频择校误区"
										tone="accent"
									/>
									<div className="border-slate-200 border-t">
										{myths.map((item, index) => (
											<div
												className="grid gap-4 border-slate-200 border-b py-6 md:grid-cols-[72px_minmax(0,1fr)]"
												key={item}
											>
												<div className="text-primary text-sm">0{index + 1}</div>
												<p className="text-slate-700 leading-8">{item}</p>
											</div>
										))}
									</div>
								</section>

								<section className="scroll-mt-32" id="ze-xiao-jian-yi">
									<SectionHeading
										description="按分数段、自律情况和备考目标进行匹配，避免全年复读路径选择错误。"
										icon={CheckCircle2Icon}
										index="05"
										label="择校建议"
										title="精准择校建议"
									/>
									<div className="border-slate-200 border-t">
										{suggestions.map((item, index) => (
											<div
												className="grid gap-4 border-slate-200 border-b py-6 md:grid-cols-[72px_minmax(0,1fr)]"
												key={item.title}
											>
												<div className="text-primary text-sm">0{index + 1}</div>
												<div>
													<h3 className="font-semibold text-lg text-slate-950">
														{item.title}
													</h3>
													<p className="mt-2 text-slate-700 leading-8">
														{item.value}
													</p>
												</div>
											</div>
										))}
									</div>
								</section>

								<section className="scroll-mt-32" id="ying-xing-di-xian">
									<SectionHeading
										description="无论看哪一类机构，这六条都应作为家长筛选时的硬性底线。"
										icon={AlertTriangleIcon}
										index="06"
										label="硬性底线"
										title="择校硬性底线"
										tone="accent"
									/>
									<div className="rounded-2xl bg-red-50/40 p-8 md:p-10">
										<div className="space-y-0">
											{hardRules.map((item) => (
												<div
													className="flex gap-4 border-red-100/60 border-b py-5 last:border-b-0"
													key={item}
												>
													<CheckCircle2Icon className="mt-1 size-5 shrink-0 text-red-500" />
													<p className="text-slate-700 leading-8">{item}</p>
												</div>
											))}
										</div>
									</div>
								</section>

								<section className="scroll-mt-32" id="zong-jie">
									<SectionHeading
										description="综合合规、师资与管理多维度标准，为孩子匹配最稳妥的复读提分路径。"
										icon={CheckCircle2Icon}
										index="07"
										label="总结"
										title="总结"
									/>
									<div className="space-y-5 border-slate-200 border-t py-8 text-slate-700 leading-8">
										<p>
											2026年成都复读行业监管收紧，违规公办挂靠、无资质小机构逐步清退。家长择校核心只看四点：合规办学资质、全职复读师资、分层封闭管理、可核验真实提分。
										</p>
										<p>
											戴氏教育高考总部作为成都本土老牌全日制封闭复读标杆，适配绝大多数复读考生全年系统提分需求。择校不看噱头、不贪低价、不迷公办名头，匹配孩子基础与自律情况，结合学校专业教学与孩子自身努力，才能实现高效提分。
										</p>
									</div>

									<div className="rounded-3xl bg-slate-950 p-8 text-white md:p-10">
										<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
											<div>
												<h3 className="font-bold text-2xl leading-tight md:text-3xl">
													对复读政策与机构选择还有疑问？
												</h3>
												<p className="mt-4 max-w-2xl text-slate-300 leading-8">
													拨打官方咨询热线，为您详细解答
												</p>
											</div>
											<PhoneButton
												className="h-12 rounded-xl px-6 font-semibold"
												size="lg"
											>
												免费咨询复读规划
											</PhoneButton>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
