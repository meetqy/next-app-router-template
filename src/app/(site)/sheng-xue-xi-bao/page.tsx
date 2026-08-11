import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { AdmissionCelebrationGallery } from "@/components/honors/AdmissionCelebrationGallery";
import { PageTopNav } from "@/components/PageTopNav";
import { PhoneButton } from "@/components/phone-action";
import { getAdmissionCelebrationYears } from "@/lib/admission-celebrations";
import { SITE_FULL_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import { getSiteOrigin } from "@/lib/site-routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	description: `查看${SITE_FULL_NAME}历年大学录取喜报图片展示，支持按年份查看与分页浏览，方便家长快速了解升学成果。`,
	path: "/sheng-xue-xi-bao",
	title: "升学喜报",
});

export default async function ShengXueXiBaoPage() {
	const celebrationYears = await getAdmissionCelebrationYears();
	const pageUrl = new URL("/sheng-xue-xi-bao", getSiteOrigin()).toString();

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		description: `查看${SITE_FULL_NAME}历年大学录取喜报图片展示，支持按年份查看与分页浏览。`,
		image: celebrationYears[0]?.images[0]?.src,
		mainEntity: {
			"@type": "ItemList",
			itemListElement: celebrationYears.map((year, index) => ({
				"@type": "ListItem",
				name: `${year.year}年大学录取喜报`,
				position: index + 1,
				url: pageUrl,
			})),
			numberOfItems: celebrationYears.length,
		},
		name: `${SITE_FULL_NAME}升学喜报`,
		url: pageUrl,
	};

	return (
		<div className="min-h-screen bg-slate-50 pb-16 md:pb-24">
			<PageTopNav
				items={[
					{ label: "首页", href: "/" },
					{ label: "升学喜报", href: "/sheng-xue-xi-bao" },
				]}
			/>

			<JsonLd data={jsonLd} />

			<section className="bg-white">
				<div className="container mx-auto px-4 py-12 md:py-16">
					<div className="max-w-5xl">
						<div className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-medium text-primary text-sm">
							{SITE_FULL_NAME} · 升学喜报
						</div>
						<h1 className="mt-5 text-balance font-bold text-3xl text-slate-900 leading-tight md:text-5xl">
							历年大学录取喜报展示
						</h1>
						<p className="mt-5 max-w-4xl text-base text-slate-600 leading-8 md:text-lg">
							这里集中展示戴氏教育学生考入大学的历年喜报图片，按年份整理，方便家长快速查看各年度升学成果。
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<PhoneButton
								className="h-12 rounded-xl px-8 font-semibold"
								size="lg"
							>
								立即电话咨询：{SITE_HOTLINE_TEXT}
							</PhoneButton>
							<Link
								className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-8 font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
								href="/lian-xi-wo-men"
							>
								联系我们
							</Link>
						</div>
					</div>
				</div>
			</section>

			<section className="container mx-auto px-4 pt-8 md:pt-10">
				{celebrationYears.length > 0 ? (
					<AdmissionCelebrationGallery
						showHeader={false}
						years={celebrationYears}
					/>
				) : (
					<div className="rounded-2xl border border-slate-200 bg-white p-10 text-center md:p-14">
						<p className="font-medium text-slate-900">暂未上传升学喜报图片</p>
						<p className="mt-3 text-slate-500 leading-7">
							后续将按年份持续更新，方便家长和学生查看最新录取喜报。
						</p>
					</div>
				)}
			</section>
		</div>
	);
}
