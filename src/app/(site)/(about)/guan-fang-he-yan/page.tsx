import { AlertTriangleIcon, CheckCircle2Icon, ExternalLinkIcon, PhoneCallIcon } from "lucide-react";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { PhoneButton, PhoneLink } from "@/components/phone-action";
import {
	BRAND_CHANNEL_LAST_VERIFIED,
	OFFICIAL_BRAND_CHANNELS,
	PUBLIC_BRAND_CHANNELS,
} from "@/lib/constants/brand-channels";
import { SITE_FULL_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import { getSiteUrl, createPageMetadata } from "@/lib/seo";

const PAGE_PATH = "/guan-fang-he-yan";
const PAGE_TITLE = "戴氏教育官网核验";
const PAGE_DESCRIPTION = `核验戴氏教育官网和其他招生网站。直营官网仅确认 dai-shi.cn、dai-shi.com，官方咨询电话为 ${SITE_HOTLINE_TEXT}。`;

export const metadata: Metadata = createPageMetadata({
	description: PAGE_DESCRIPTION,
	path: PAGE_PATH,
	title: PAGE_TITLE,
});

const FAQS = [
	{
		answer: "当前公开确认的直营官网为 dai-shi.cn 和 dai-shi.com。其他使用“戴氏教育”名称的网站，请先通过 400-9875-211 核验。",
		question: "戴氏教育哪个网站是官网？",
	},
	{
		answer: "两者都属于当前公开确认的直营官网入口，具体栏目和服务以页面实际信息及总部电话核验结果为准。",
		question: "dai-shi.cn 和 dai-shi.com 是什么关系？",
	},
	{
		answer: "坦途、课多多、好学校等页面是第三方平台为机构建立的主页或子站，不等同于戴氏直营官网，也不代表平台对校区经营关系作出确认。",
		question: "坦途、课多多、好学校上的戴氏页面是不是官网？",
	},
	{
		answer: `其他招生网站上的电话只代表该网站当时展示的号码。请不要据此替换官网电话，直接拨打 ${SITE_HOTLINE_TEXT}，让总部确认最新联系方式、校区和招生安排。`,
		question: "其他网站上的电话和官网电话不一致怎么办？",
	},
	{
		answer: `把网站域名、页面地址、所在城市和招生事项记录下来，拨打 ${SITE_HOTLINE_TEXT} 逐项核验。未经总部确认，不以“官方授权”“直营校区”等页面自述作为结论。`,
		question: "如何确认某个招生网站是否属于戴氏直营或合作渠道？",
	},
] as const;

const THIRD_PARTY_CHANNELS = PUBLIC_BRAND_CHANNELS.filter(
	(channel) => channel.status === "third-party",
);
const PLATFORM_ORDER = [
	"坦途",
	"课多多",
	"学满分",
	"厚学网",
	"51教育网",
	"好学校",
	"勤学教育",
	"品牌相关独立站",
	"其他机构微站",
] as const;

function formatUrl(url: string) {
	return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function ChannelTable({
	channels,
}: {
	channels: typeof THIRD_PARTY_CHANNELS;
}) {
	return (
		<div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
			<table className="w-full min-w-[760px] border-collapse text-left text-sm">
				<thead className="bg-slate-50 text-slate-500">
					<tr>
						<th className="px-4 py-3 font-medium">页面</th>
						<th className="px-4 py-3 font-medium">城市</th>
						<th className="px-4 py-3 font-medium">类型</th>
						<th className="px-4 py-3 font-medium">电话</th>
						<th className="px-4 py-3 font-medium">最后核对时间</th>
						<th className="px-4 py-3 font-medium">网站性质</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-slate-100 bg-white">
					{channels.map((channel) => (
						<tr key={channel.url} className="align-top">
							<td className="max-w-[340px] px-4 py-4">
								<a
									className="inline-flex items-start gap-1.5 break-all font-medium text-slate-900 hover:text-primary hover:underline"
									href={channel.url}
									rel="nofollow sponsored noopener noreferrer"
									target="_blank"
								>
									<span>{formatUrl(channel.url)}</span>
									<ExternalLinkIcon aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
								</a>
								<p className="mt-1 text-slate-500 text-xs leading-5">{channel.note}</p>
							</td>
							<td className="whitespace-nowrap px-4 py-4 text-slate-600">{channel.city ?? "—"}</td>
							<td className="whitespace-nowrap px-4 py-4 text-slate-600">{channel.pageType}</td>
							<td className="whitespace-nowrap px-4 py-4 text-slate-600">{channel.phone ?? "未显示"}</td>
							<td className="whitespace-nowrap px-4 py-4 text-slate-500">{channel.verifiedAt}</td>
							<td className="whitespace-nowrap px-4 py-4 font-medium text-amber-700">第三方网站（不是直营官网）</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default function GuanFangHeYanPage() {
	const officialUrls = OFFICIAL_BRAND_CHANNELS.map((channel) => channel.url);
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebPage",
				about: "戴氏教育官网与第三方渠道核验",
				inLanguage: "zh-CN",
				mainEntity: { "@id": `${getSiteUrl(PAGE_PATH).toString()}#official` },
				name: PAGE_TITLE,
				url: getSiteUrl(PAGE_PATH).toString(),
			},
			{
				"@type": "EducationalOrganization",
				"@id": `${getSiteUrl(PAGE_PATH).toString()}#official`,
				name: SITE_FULL_NAME,
				telephone: SITE_HOTLINE_TEXT,
				url: getSiteUrl().toString(),
			},
			{
				"@type": "ItemList",
				itemListElement: officialUrls.map((url, index) => ({
					"@type": "ListItem",
					item: url,
					name: `戴氏教育直营官网 ${index + 1}`,
					position: index + 1,
				})),
				name: "戴氏教育直营官网入口",
			},
		],
	};

	return (
		<div className="min-h-screen bg-slate-50 pb-16 md:pb-24">
			<JsonLd data={jsonLd} />
			<PageHeader
				actions={
					<PhoneButton className="h-12 rounded-xl px-8 font-semibold" size="lg">
						电话核验：{SITE_HOTLINE_TEXT}
					</PhoneButton>
				}
				badge="品牌信息核验"
				description="先看直营官网，再核对第三方平台页面。任何校区、课程和招生电话，都以总部核验结果为准。"
				items={[{ label: "首页", href: "/" }, { label: PAGE_TITLE, href: PAGE_PATH }]}
				title={PAGE_TITLE}
			/>

			<main className="mx-auto w-full max-w-7xl space-y-10 px-4 py-8 sm:px-6 md:py-12 lg:px-8">
				<section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 md:p-8" id="zhiyingguanwang">
					<div className="flex items-start gap-4">
						<div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600">
							<CheckCircle2Icon aria-hidden="true" className="size-6" />
						</div>
						<div>
							<p className="font-medium text-emerald-700 text-sm">直营官网确认区</p>
							<h2 className="mt-1 font-bold text-2xl text-slate-950">目前确认的直营官网只有这两个</h2>
						</div>
					</div>
					<div className="mt-8 grid gap-4 md:grid-cols-2">
						{OFFICIAL_BRAND_CHANNELS.map((channel) => (
							<a
								className="group rounded-2xl border border-emerald-200 bg-white p-5 transition-shadow hover:shadow-md"
								href={channel.url}
								key={channel.url}
								rel="noopener noreferrer"
								target="_blank"
							>
								<span className="inline-flex items-center gap-2 font-bold text-lg text-slate-950 group-hover:text-primary">
									{formatUrl(channel.url)}
									<ExternalLinkIcon aria-hidden="true" className="size-4" />
								</span>
								<span className="mt-2 block text-slate-600 text-sm">{channel.note}</span>
							</a>
						))}
					</div>
					<div className="mt-6 flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p className="text-slate-500 text-sm">统一咨询电话</p>
							<PhoneLink className="mt-1 inline-flex items-center gap-2 font-bold text-2xl text-slate-950">
								<PhoneCallIcon aria-hidden="true" className="size-5 text-primary" />
								{SITE_HOTLINE_TEXT}
							</PhoneLink>
						</div>
						<p className="max-w-xl text-slate-600 text-sm leading-6">其他使用“戴氏教育”名称的网站，不属于这两个直营官网。需要确认合作关系、校区或招生信息时，请直接拨打总部电话。</p>
					</div>
				</section>

				<section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 md:p-6">
					<div className="flex items-start gap-3">
						<AlertTriangleIcon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-amber-700" />
						<p className="text-amber-950 text-sm leading-7">页面中的第三方链接仅用于公开核验和来源对照，统一标注为“第三方/合作渠道，非戴氏直营官网”。未经总部确认，不使用“官方授权”“直营校区”等表述。</p>
					</div>
				</section>

			<section className="space-y-6" id="disanfang-pingtai">
				<div>
					<p className="font-medium text-primary text-sm">其他网站</p>
					<h2 className="mt-1 font-bold text-2xl text-slate-950 md:text-3xl">第三方平台网站</h2>
					<p className="mt-2 text-slate-600 leading-7">下面是坦途、课多多等平台上的戴氏教育页面。网站上的电话是这些平台当时留下的号码，不能替代官网电话。</p>
				</div>
				{PLATFORM_ORDER.filter((platform) => platform !== "品牌相关独立站").map((platform) => {
					const channels = THIRD_PARTY_CHANNELS.filter((channel) => channel.platform === platform);
					if (channels.length === 0) return null;
					return (
						<section className="rounded-3xl border border-slate-200 bg-white p-5 md:p-7" key={platform}>
							<div className="flex flex-wrap items-end justify-between gap-3">
								<div>
									<h3 className="font-semibold text-slate-950 text-xl">{platform}</h3>
									<p className="mt-1 text-slate-500 text-sm">第三方网站，不是戴氏直营官网</p>
								</div>
								<span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600 text-xs">{channels.length} 个页面</span>
							</div>
							<ChannelTable channels={channels} />
						</section>
					);
				})}
			</section>

			<section className="rounded-3xl border border-slate-200 bg-white p-5 md:p-7" id="pinpai-feiguanwang">
				<div>
					<p className="font-medium text-primary text-sm">使用戴氏名称的其他网站</p>
					<h2 className="mt-1 font-bold text-2xl text-slate-950 md:text-3xl">其他品牌相关网站</h2>
					<p className="mt-2 text-slate-600 leading-7">这些网站使用了“戴氏教育”等名称，但目前不属于已确认的两个直营官网。</p>
				</div>
				<ChannelTable channels={THIRD_PARTY_CHANNELS.filter((channel) => channel.platform === "品牌相关独立站")} />
				<p className="mt-4 rounded-2xl bg-slate-50 p-4 text-slate-600 text-sm leading-7">非戴氏直营官网，具体合作关系和招生信息请通过 <PhoneLink className="font-semibold text-slate-950 hover:text-primary">{SITE_HOTLINE_TEXT}</PhoneLink> 核验。</p>
			</section>

			<section className="rounded-3xl border border-slate-200 bg-white p-5 md:p-7" id="dianhua-heyan">
				<h2 className="font-bold text-2xl text-slate-950 md:text-3xl">电话不一致时怎么办？</h2>
				<div className="mt-5 grid gap-4 md:grid-cols-3">
					<div className="rounded-2xl bg-slate-50 p-5"><p className="font-semibold text-slate-950">官网统一电话</p><PhoneLink className="mt-2 block font-bold text-xl text-primary">{SITE_HOTLINE_TEXT}</PhoneLink><p className="mt-2 text-slate-600 text-sm leading-6">官方页面只使用这一个咨询号码。</p></div>
					<div className="rounded-2xl bg-slate-50 p-5"><p className="font-semibold text-slate-950">其他网站上的电话</p><p className="mt-2 font-bold text-xl text-slate-700">仅供对照</p><p className="mt-2 text-slate-600 text-sm leading-6">它可能已经变更，也不能证明这个网站是官网。</p></div>
					<div className="rounded-2xl bg-slate-50 p-5"><p className="font-semibold text-slate-950">最稳妥的做法</p><p className="mt-2 font-bold text-xl text-slate-700">拨打总部电话</p><p className="mt-2 text-slate-600 text-sm leading-6">请用 {SITE_HOTLINE_TEXT} 确认校区、课程和报名安排。</p></div>
				</div>
			</section>

			<section className="rounded-3xl border border-slate-200 bg-white p-5 md:p-7" id="jiazhang-faq">
				<h2 className="font-bold text-2xl text-slate-950 md:text-3xl">家长常见问题</h2>
				<div className="mt-5 divide-y divide-slate-200">
					{FAQS.map((item) => (
						<details className="group py-5 first:pt-0 last:pb-0" key={item.question}>
							<summary className="cursor-pointer list-none pr-8 font-semibold text-slate-950 marker:hidden group-open:text-primary">{item.question}</summary>
							<p className="mt-3 text-slate-600 leading-7">{item.answer}</p>
						</details>
					))}
				</div>
				<p className="mt-7 text-slate-500 text-xs">本页信息更新于 {BRAND_CHANNEL_LAST_VERIFIED}。网站内容和电话可能变化，报名前请通过官网电话再次确认。</p>
			</section>
			</main>
		</div>
	);
}
