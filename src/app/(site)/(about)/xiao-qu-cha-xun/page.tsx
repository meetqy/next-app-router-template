import { GraduationCapIcon, MapPinIcon, SchoolIcon } from "lucide-react";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PageTopNav } from "@/components/PageTopNav";
import { PhoneButton } from "@/components/phone-action";
import { SimpleCard } from "@/components/ui/simple-card";
import { getVisibleCampuses } from "@/lib/constants/campuses";
import { SITE_FULL_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import { getKnowledgeCampuses } from "@/lib/knowledge-base";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	description: `查看${SITE_FULL_NAME}全部校区信息，快速了解各校区地址、课程方向、学习环境与到校咨询入口。`,
	path: "/xiao-qu-cha-xun",
	title: "校区查询",
});

export default function CampusListPage() {
	const campuses = getVisibleCampuses();
	const archiveCampuses = getKnowledgeCampuses();
	const archiveCityGroups = [
		...new Set(archiveCampuses.map((campus) => campus.city)),
	];

	return (
		<div className="min-h-screen bg-slate-50">
			<PageTopNav
				items={[
					{ label: "首页", href: "/" },
					{ label: "校区查询", href: "/xiao-qu-cha-xun" },
				]}
			/>
			<main className="pb-16">
				<PageHero
					actions={
						<PhoneButton className="h-12 rounded-xl px-6 font-semibold">
							电话咨询校区安排：{SITE_HOTLINE_TEXT}
						</PhoneButton>
					}
					badge={`${SITE_FULL_NAME} · 校区查询`}
					description={
						<>
							这里集中展示 {SITE_FULL_NAME}
							目前展示的校区信息，方便家长先对比校区定位、课程方向、学习环境与到校方式，再决定进一步咨询。
						</>
					}
					title="校区查询"
				/>

				<section className="pb-12 md:pb-20">
					<div className="container mx-auto px-4 pt-8 md:pt-12">
						<div className="mb-8">
							<h2 className="font-bold text-2xl text-slate-950">重点校区</h2>
							<p className="mt-2 text-slate-600 leading-7">
								以下为重点校区，顺吉、世贸、花千集均已显示，方便家长统一比较。
							</p>
						</div>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{campuses.map((campus) => (
								<SimpleCard
									description={campus.listSummary}
									href={`/xiao-qu-cha-xun/${campus.slug}`}
									imageAlt={campus.title}
									imageSrc={campus.coverImage}
									key={campus.slug}
									meta={`${campus.subtitle} · ${campus.address}`}
									title={campus.title}
								/>
							))}
							{campuses.length === 0 && (
								<div className="rounded-2xl border border-slate-300 border-dashed py-20 text-center">
									<p className="text-slate-500">暂无校区内容</p>
								</div>
							)}
						</div>
					</div>
				</section>

				<section className="container mx-auto px-4 pb-12 md:pb-20">
					<div className="mb-8">
						<div className="text-primary text-sm">更多校区信息</div>
						<h2 className="mt-1 font-bold text-2xl text-slate-950">
							全部校区资料
						</h2>
						<p className="mt-2 text-slate-600 leading-7">
							这里按城市展示校区地址和路线信息，方便家长先了解位置与到访方式。校区开放状态和课程安排，建议到访前统一拨打{" "}
							{SITE_HOTLINE_TEXT} 了解。
						</p>
					</div>
					<div className="space-y-8">
						{archiveCityGroups.map((city) => {
							const cityCampuses = archiveCampuses.filter(
								(campus) => campus.city === city,
							);
							return (
								<div className="rounded-2xl bg-white p-6 md:p-8" key={city}>
									<div className="mb-5 flex items-end justify-between gap-4">
										<div>
											<h3 className="font-semibold text-slate-950 text-xl">
												{city}校区
											</h3>
											<p className="mt-1 text-slate-500 text-sm">
												共 {cityCampuses.length} 个校区
											</p>
										</div>
									</div>
									<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
										{cityCampuses.map((campus) => (
											<SimpleCard
												description={campus.description ?? campus.address}
												href={`/xiao-qu-cha-xun/${campus.slug}`}
												key={campus.slug}
												meta={`${campus.city} · ${campus.address}`}
												title={campus.title}
											/>
										))}
									</div>
								</div>
							);
						})}
					</div>
				</section>

				<section className="container mx-auto px-4 pt-10">
					<div className="grid gap-6 rounded-2xl bg-white p-6 md:grid-cols-3 md:p-8">
						<div className="rounded-2xl bg-slate-50 p-5">
							<div className="inline-flex rounded-full bg-primary/10 p-2 text-primary">
								<MapPinIcon className="size-4" />
							</div>
							<h3 className="mt-4 font-semibold text-slate-950">先看位置</h3>
							<p className="mt-2 text-slate-600 text-sm leading-7">
								如果家长更关注到校距离、交通便利度和来访安排，可以优先查看各校区地址与路线信息。
							</p>
						</div>
						<div className="rounded-2xl bg-slate-50 p-5">
							<div className="inline-flex rounded-full bg-primary/10 p-2 text-primary">
								<GraduationCapIcon className="size-4" />
							</div>
							<h3 className="mt-4 font-semibold text-slate-950">再看课程</h3>
							<p className="mt-2 text-slate-600 text-sm leading-7">
								不同校区展示重点略有差异，家长可以先筛选更符合孩子学段与阶段目标的课程方向。
							</p>
						</div>
						<div className="rounded-2xl bg-slate-50 p-5">
							<div className="inline-flex rounded-full bg-primary/10 p-2 text-primary">
								<SchoolIcon className="size-4" />
							</div>
							<h3 className="mt-4 font-semibold text-slate-950">最后约到校</h3>
							<p className="mt-2 text-slate-600 text-sm leading-7">
								如果想进一步了解教室、自习区与管理节奏，建议先电话预约，再到校实地查看学习环境。
							</p>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
