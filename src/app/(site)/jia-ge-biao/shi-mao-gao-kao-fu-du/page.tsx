import {
	BadgeCheckIcon,
	ClipboardCheckIcon,
	GraduationCapIcon,
	InfoIcon,
	type LucideIcon,
	MapPinIcon,
	PhoneIcon,
	ReceiptIcon,
	SparklesIcon,
	TagIcon,
	UsersIcon,
} from "lucide-react";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageTopNav } from "@/components/PageTopNav";
import { PhoneButton, PhoneLink } from "@/components/phone-action";
import { TableOfContents } from "@/components/TableOfContents";
import { Button } from "@/components/ui/button";
import { getCampusBySlug } from "@/lib/constants/campuses";
import { SITE_BRAND_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import { createPageMetadata, getSiteUrl } from "@/lib/seo";

function getShiMaoCampus() {
	const campus = getCampusBySlug("shi-mao");
	if (!campus) {
		throw new Error("未配置世贸校区信息");
	}
	return campus;
}

const CAMPUS = getShiMaoCampus();
const PAGE_TITLE = `2027 届${CAMPUS.name}复读优惠政策与收费标准公示`;
const PAGE_DESCRIPTION = `${CAMPUS.title}2027 届高考复读、高三全日制全科班最新优惠政策与收费标准官方公示。`;
const PAGE_PATH = "/jia-ge-biao/shi-mao-gao-kao-fu-du";

export const metadata: Metadata = createPageMetadata({
	authors: [SITE_BRAND_NAME],
	description: PAGE_DESCRIPTION,
	openGraphType: "article",
	path: PAGE_PATH,
	title: PAGE_TITLE,
});

const catalogueItems = [
	{ id: "you-hui-zheng-ce", title: "暑期报名优惠" },
	{ id: "fen-shu-jiang-li", title: "分数专项优惠" },
	{ id: "tuan-bao-zhe-kou", title: "团报与插班折扣" },
	{ id: "lao-sheng-xu-bao", title: "老生续报专项" },
	{ id: "shou-fei-biao-zhun", title: "收费标准详情" },
	{ id: "bu-chong-gui-ze", title: "补充规则说明" },
];

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
			{index && (
				<div
					className={`pointer-events-none absolute -top-4 right-0 font-black text-[72px] leading-none md:text-[96px] ${indexToneClass}`}
				>
					{index}
				</div>
			)}
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

function InfoTable({
	headers,
	rows,
	caption,
}: {
	headers: string[];
	rows: (string | React.ReactNode)[][];
	caption?: string;
}) {
	const getCellKey = (cell: string | React.ReactNode, index: number) => {
		if (typeof cell === "string") {
			return cell;
		}

		if (cell && typeof cell === "object" && "key" in cell && cell.key != null) {
			return String(cell.key);
		}

		return `node-${index}`;
	};

	return (
		<div className="my-6 overflow-x-auto rounded-xl border border-slate-200">
			<table className="w-full border-collapse text-left text-sm">
				{caption && (
					<caption className="border-slate-200 border-b bg-slate-50 px-4 py-3 text-left font-semibold text-slate-900">
						{caption}
					</caption>
				)}
				<thead className="bg-slate-50/50 text-slate-600">
					<tr>
						{headers.map((header) => (
							<th
								className="border-slate-200 border-b px-4 py-3 font-medium"
								key={header}
							>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y divide-slate-100 bg-white">
					{rows.map((row) => {
						const rowKey = row
							.map((cell, index) => getCellKey(cell, index))
							.join("-");

						return (
							<tr
								className="transition-colors hover:bg-slate-50/50"
								key={rowKey}
							>
								{row.map((cell, index) => (
									<td
										className="px-4 py-4 text-slate-700"
										key={`${rowKey}-${getCellKey(cell, index)}`}
									>
										{cell}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

function PageStructuredData() {
	const pageUrl = getSiteUrl(PAGE_PATH).toString();
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: PAGE_TITLE,
		description: PAGE_DESCRIPTION,
		inLanguage: "zh-CN",
		mainEntityOfPage: pageUrl,
		articleSection: catalogueItems.map((item) => item.title),
		about: ["高考复读", "高三全日制", CAMPUS.name, "收费标准", "暑期报名优惠"],
		author: {
			"@type": "Organization",
			name: SITE_BRAND_NAME,
		},
		publisher: {
			"@type": "Organization",
			name: SITE_BRAND_NAME,
			telephone: SITE_HOTLINE_TEXT,
			address: {
				"@type": "PostalAddress",
				addressCountry: "CN",
				addressLocality: "成都市",
				addressRegion: "四川省",
				streetAddress: CAMPUS.address,
			},
		},
	};

	return <JsonLd data={structuredData} />;
}

export default function ShiMaoGaoKaoFuDuPage() {
	return (
		<div className="min-h-screen bg-white">
			<PageStructuredData />
			<PageTopNav
				items={[
					{ label: "首页", href: "/" },
					{ label: "价格表", href: "/jia-ge-biao" },
					{
						label: `2027 届${CAMPUS.name}复读优惠政策公示`,
						href: "/jia-ge-biao/shi-mao-gao-kao-fu-du",
					},
				]}
			/>

			{/* Hero Section */}
			<section className="border-slate-800 border-b bg-slate-950 py-16 text-white md:py-24">
				<div className="container mx-auto px-4">
					<div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.15fr)_340px]">
						<div>
							<div className="mb-4 text-primary text-sm tracking-[0.24em]">
								2027 官方优惠政策公示
							</div>
							<h1 className="max-w-4xl font-black text-4xl leading-tight tracking-tight md:text-6xl">
								2027 届{CAMPUS.name}暑期报名优惠政策公示
							</h1>
							<p className="mt-6 max-w-3xl text-lg text-slate-300 leading-8">
								为助力 2027 届高考学子高效备考，{CAMPUS.title}
								现正式公示本年度优惠政策。涵盖暑期提前批优惠、分数专项减免、团报福利及老生续报专项。政策透明，保障每一位学子的升学之路。
							</p>
							<div className="mt-10 flex flex-col gap-4 sm:flex-row">
								<PhoneButton className="h-11 px-6 text-base">
									<span className="inline-flex items-center">
										<PhoneIcon className="mr-2 size-4" />
										立即咨询详情
									</span>
								</PhoneButton>
								<Button
									asChild
									className="h-11 border-white/20 bg-transparent px-6 text-white hover:border-white/35 hover:bg-white/10 hover:text-white"
									variant="outline"
								>
									<PhoneLink>咨询热线：{SITE_HOTLINE_TEXT}</PhoneLink>
								</Button>
							</div>
							<div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
								{[
									["最高暑期优惠", "3000 元"],
									["最高分数奖励", "10000 元"],
									["资料费减免", "1200 元"],
									["赠送课程", "1 个月"],
								].map(([label, value]) => (
									<div className="py-2" key={label}>
										<div className="text-slate-400 text-xs">{label}</div>
										<div className="mt-2 font-bold text-2xl text-primary md:text-3xl">
											{value}
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="rounded-2xl bg-white/6 p-6 backdrop-blur">
							<div className="pb-4">
								<div className="text-slate-400 text-xs">公示说明</div>
								<div className="mt-2 text-lg text-slate-200 leading-8">
									本政策执行周期为 2026 年 6 月 1 日 — 2026 年 7 月 31 日
								</div>
							</div>
							<div className="space-y-3 pt-4 text-slate-300 text-sm">
								<p>1. 本页公示口径仅适用于{CAMPUS.name}。</p>
								<p>2. 复读生分数优惠与暑期优惠不可叠加，取最高值使用。</p>
							</div>
							<div className="mt-6 flex items-center gap-2 text-primary text-sm">
								<SparklesIcon className="size-4" />
								下滑查看详细政策表格
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className="container mx-auto px-4 py-12 md:py-16">
				<div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
					<TableOfContents items={catalogueItems} title="政策目录" />

					<div className="space-y-20">
						{/* 暑期报名优惠 */}
						<section className="scroll-mt-48 py-2" id="you-hui-zheng-ce">
							<SectionHeading
								description={`针对 2027 届高三全科班（含复读生）的暑期提前批报名优惠，以下内容仅按${CAMPUS.name}口径公示，越早报名优惠力度越大。`}
								icon={TagIcon}
								index="01"
								label="暑期报名优惠"
								title="提前规划备考，享受限时定额立减"
							/>
							<InfoTable
								headers={["优惠类型", "适用班型", "优惠标准"]}
								rows={[
									[
										"6 月 30 日前报名",
										"10 人精品班",
										<span className="font-bold text-primary" key="price">
											总费用立减 3000 元
										</span>,
									],
									[
										"6 月 30 日前报名",
										"16/18 人中班",
										<span className="font-bold text-primary" key="price">
											总费用立减 2000 元
										</span>,
									],
									[
										"6 月 30 日前报名",
										"24 人大班",
										<span className="font-bold text-primary" key="price">
											总费用立减 1000 元
										</span>,
									],
									[
										"7 月 1 日 - 7 月 31 日",
										`${CAMPUS.name}全部班型`,
										<span className="font-bold text-primary" key="price">
											总价统一优惠 1000 元
										</span>,
									],
									[
										"7.31 前报名资料费优惠",
										"全部班型",
										<span className="font-bold text-primary" key="price">
											免全年资料费（原价 1200 元）
										</span>,
									],
								]}
							/>
							<div className="mt-6 rounded-xl bg-slate-50 p-6">
								<h4 className="flex items-center gap-2 font-bold text-slate-900">
									<InfoIcon className="size-4 text-primary" />
									常规年度赠送
								</h4>
								<p className="mt-3 text-slate-600 text-sm leading-7">
									除了上述现金减免外，所有 7.31 前报名的学员均可享受：
									<br />
									1.{" "}
									<span className="font-semibold">
										2027 年 5 月整月课程免费赠送
									</span>
									，不计入学费核算；
									<br />
									2. 全年统一资料费 1200 元全额免除。
								</p>
							</div>
						</section>

						{/* 分数专项优惠 */}
						<section className="scroll-mt-48 py-2" id="fen-shu-jiang-li">
							<SectionHeading
								description="针对高考成绩优异的复读生，我们提供专属的高分奖学金式减免，旨在支持更多优秀学子再战辉煌。"
								icon={GraduationCapIcon}
								index="02"
								label="分数专项优惠"
								title="复读生高考分数专项减免奖励"
								tone="accent"
							/>
							<InfoTable
								headers={["考生分数线", "全年学费优惠额度", "使用要求"]}
								rows={[
									[
										"一本线及以上（含一本）",
										<span className="font-bold text-primary" key="reward">
											总学费优惠 10000 元
										</span>,
										"需提供有效高考成绩单",
									],
									[
										"本科线及以上（含二本）",
										<span className="font-bold text-primary" key="reward">
											总学费优惠 5000 元
										</span>,
										"需提供有效高考成绩单",
									],
								]}
							/>
							<div className="mt-4 rounded-xl border border-amber-100 bg-amber-50/50 p-4 text-amber-800 text-sm">
								<p className="flex items-start gap-2">
									<BadgeCheckIcon className="mt-0.5 size-4 shrink-0" />
									<span>
										<strong>注意：</strong>
										复读生分数优惠与暑期报名优惠不可叠加，学员可根据自身情况二选一使用（建议优先选择额度更高的一项）。
									</span>
								</p>
							</div>
						</section>

						{/* 团报与插班折扣 */}
						<section className="scroll-mt-48 py-2" id="tuan-bao-zhe-kou">
							<SectionHeading
								description="结伴同行，共享福利。同时针对学年中途加入的插班生及员工亲属，提供透明的折扣标准。"
								icon={UsersIcon}
								index="03"
								label="团报与插班折扣"
								title="组团报名优惠及插班新生折扣标准"
							/>
							<div className="grid gap-8 lg:grid-cols-2">
								<div>
									<h4 className="mb-4 font-bold text-slate-900">
										团报优惠政策
									</h4>
									<InfoTable
										headers={["组团人数", "单人优惠金额"]}
										rows={[
											["2-3 人组团", "每人优惠 500 元"],
											["3-5 人组团", "每人优惠 1000 元"],
											["5 人以上组团", "每人优惠 1500 元"],
										]}
									/>
									<p className="text-slate-500 text-xs italic">
										* 可同其他非分数类优惠叠加使用。
									</p>
								</div>
								<div>
									<h4 className="mb-4 font-bold text-slate-900">
										插班新生折扣
									</h4>
									<InfoTable
										headers={["开班时长", "优惠标准"]}
										rows={[
											["班级开课 ≥ 30 天", "9.6 折优惠"],
											["班级开课 ≥ 60 天", "9.4 折优惠"],
											["班级开课 ≥ 90 天", "9.2 折优惠"],
										]}
									/>
									<p className="text-slate-500 text-xs italic">
										* 适用于中途新进插班全科生。
									</p>
								</div>
							</div>
							<div className="mt-8">
								<h4 className="mb-4 font-bold text-slate-900">
									员工亲属报名优惠
								</h4>
								<InfoTable
									headers={["亲属关系", "优惠标准"]}
									rows={[
										["旁系亲属", "8.5 折报名"],
										["直系亲属", "7.5 折报名"],
									]}
								/>
							</div>
						</section>

						{/* 老生续报专项 */}
						<section className="scroll-mt-48 py-2" id="lao-sheng-xu-bao">
							<SectionHeading
								description="感恩老生及家长的信任。针对往届高三续报及高二直升学员，提供最高 15000 元的专项感恩回馈。"
								icon={SparklesIcon}
								index="04"
								label="老生续报专项"
								title="全日制老生续报及高二连报优惠"
								tone="accent"
							/>
							<InfoTable
								headers={["在校学习时长", "优惠金额", "适用范围/条件"]}
								rows={[
									[
										"全日制就读 6 个月以上",
										<span className="font-bold text-primary" key="amt">
											优惠 15000 元
										</span>,
										"原高三老生续报 / 高二全日制满 6 个月直升",
									],
									[
										"全日制就读 3-6 个月",
										<span className="font-bold text-primary" key="amt">
											优惠 10000 元
										</span>,
										"原高三老生续报 / 高二全日制 3-6 个月直升",
									],
									[
										"全日制就读 1-3 个月",
										<span className="font-bold text-primary" key="amt">
											优惠 5000 元
										</span>,
										"原高三老生续报 / 高二全日制 1-3 个月直升",
									],
								]}
							/>
						</section>

						{/* 收费标准详情 */}
						<section className="scroll-mt-48 py-2" id="shou-fei-biao-zhun">
							<SectionHeading
								description={`本页仅公示${CAMPUS.name}收费标准，价格透明，无隐形消费。`}
								icon={ReceiptIcon}
								index="05"
								label="收费标准详情"
								title={`2027 届${CAMPUS.name}收费公示`}
							/>
							<InfoTable
								headers={["班型", "月度标准", "常规月度优惠", "常规优惠后总价"]}
								rows={[
									[
										"10 人精品班",
										"12000 元/月",
										"1000 元/月",
										<span className="font-bold" key="total">
											86800 元/年
										</span>,
									],
									[
										"16/18 人中班",
										"8000 元/月",
										"1000 元/月",
										<span className="font-bold" key="total">
											57800 元/年
										</span>,
									],
									[
										"24 人大班",
										"5500 元/月",
										"1000 元/月",
										<span className="font-bold" key="total">
											36800 元/年
										</span>,
									],
								]}
							/>
							<p className="mt-4 text-slate-500 text-sm italic">
								* 注：全年原价含 1200 元资料费及 5 月课程费。7.31
								前报名可享受总价立减及资料费/5月课时费免除。
							</p>
						</section>

						{/* 补充规则说明 */}
						<section className="scroll-mt-48 py-2" id="bu-chong-gui-ze">
							<SectionHeading
								description="为确保政策执行的公平性与规范性，请仔细阅读以下补充执行细则。"
								icon={ClipboardCheckIcon}
								index="06"
								label="补充规则说明"
								title="政策执行细则及特殊审批规定"
							/>
							<div className="grid gap-4 md:grid-cols-2">
								{[
									{
										title: "不可叠加规则",
										content:
											"复读生分数优惠与暑期报名优惠不可叠加，二选一使用。",
									},
									{
										title: "计算顺序",
										content:
											"先扣除各项定额减免优惠（如暑期立减），再核算折扣类优惠（如团报折扣）。",
									},
									{
										title: "有效期说明",
										content:
											"本公示政策执行有效期为 2026 年 6 月 1 日 — 2026 年 7 月 31 日。",
									},
									{
										title: "特殊审批",
										content: "非正常低价优惠需经集团 / 菅总专项审批方可执行。",
									},
								].map((rule) => (
									<div
										className="rounded-xl border border-slate-100 bg-slate-50/50 p-6"
										key={rule.title}
									>
										<h5 className="font-bold text-slate-900">{rule.title}</h5>
										<p className="mt-2 text-slate-600 text-sm leading-6">
											{rule.content}
										</p>
									</div>
								))}
							</div>
						</section>

						<div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-left">
							<div className="px-5 py-4">
								<div className="flex items-center gap-2 text-primary text-sm">
									<MapPinIcon className="size-4" />
									<span>{CAMPUS.name}到校咨询地址</span>
								</div>
								<div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
									<div className="min-w-0">
										<a
											className="font-medium text-slate-900 text-sm leading-7 transition-colors hover:text-primary"
											href={CAMPUS.mapHref}
											rel="noopener noreferrer"
											target="_blank"
										>
											{CAMPUS.address}
										</a>
										<p className="mt-1 text-slate-600 text-sm leading-7">
											如对具体位置、路线或到校流程还不清楚，可直接拨打电话咨询。
										</p>
									</div>
									<PhoneButton className="h-10 shrink-0 px-5 text-sm">
										到店咨询
									</PhoneButton>
								</div>
							</div>
						</div>

						{/* CTA Section */}
						<section className="rounded-3xl bg-slate-900 p-8 text-white md:p-12">
							<div className="flex flex-col items-center text-center">
								<div className="inline-flex rounded-full bg-primary/20 px-4 py-1 text-primary text-sm">
									抢占提前批名额
								</div>
								<h3 className="mt-6 font-bold text-3xl md:text-4xl">
									开启您的 2027 届提分之旅
								</h3>
								<p className="mt-4 max-w-2xl text-slate-400">
									现在预约咨询，不仅可锁定最高 3000 元的暑期优惠，还可享受 7
									天免费试学。让提分更有保障，让升学更有底气。
								</p>
								<div className="mt-10 flex flex-col gap-4 sm:flex-row">
									<PhoneButton className="h-12 px-8 text-lg">
										立即电话咨询
									</PhoneButton>
									<Button
										asChild
										className="h-12 border-white/20 bg-transparent px-8 text-white hover:bg-white/10"
										variant="outline"
									>
										<PhoneLink>拨打热线：{SITE_HOTLINE_TEXT}</PhoneLink>
									</Button>
								</div>
								<p className="mt-4 text-slate-400 text-sm">
									地址或路线不清楚，可直接拨打电话咨询，我们会协助您快速到校。
								</p>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}
