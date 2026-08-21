import { MapPinIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PhoneButton } from "@/components/phone-action";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getCampuses } from "@/lib/constants/campuses";
import { SITE_FULL_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	description: `查看${SITE_FULL_NAME}校区地址、导航和已公开的服务资料。`,
	path: "/xiao-qu-cha-xun",
	title: "校区查询",
});

export default function CampusListPage() {
	const campuses = getCampuses();
	const headquartersCampuses = campuses.filter((campus) =>
		["顺吉校区", "世贸校区"].includes(campus.name),
	);
	const otherCampuses = campuses.filter(
		(campus) => !headquartersCampuses.some((headquarters) => headquarters.slug === campus.slug),
	);
	const cities = [...new Set(otherCampuses.map((campus) => campus.city))];

	return (
		<div className="min-h-screen bg-slate-50">
			<main className="pb-16">
				<PageHeader
						actions={
						<>
							<PhoneButton className="h-12 rounded-xl px-6 font-semibold">
								电话咨询：{SITE_HOTLINE_TEXT}
							</PhoneButton>
							<Link
								className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
								href="/guan-fang-he-yan"
							>
								核验官网与电话
							</Link>
						</>
					}
					badge={`${SITE_FULL_NAME} · 校区查询`}
					description="按城市查看校区地址、导航与已公开的课程、师资和环境资料。资料待完善的校区会明确标注。"
					items={[
						{ label: "首页", href: "/" },
						{ label: "校区查询", href: "/xiao-qu-cha-xun" },
					]}
					title="校区查询"
				/>

				<section className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 md:pt-12 lg:px-8">
					<section className="mb-10">
						<div className="mb-5 flex items-end justify-between gap-4">
							<div>
								<p className="font-medium text-primary text-sm">戴氏教育总部</p>
								<h2 className="mt-1 font-bold text-2xl text-slate-950">总部校区</h2>
							</div>
							<p className="text-slate-500 text-sm">共 {headquartersCampuses.length} 个校区</p>
						</div>
						<Table className="border-y border-slate-200 bg-white text-slate-950">
							<TableHeader className="bg-slate-100">
								<TableRow>
									<TableHead>校区</TableHead>
									<TableHead>区域</TableHead>
									<TableHead className="min-w-80">地址</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{headquartersCampuses.map((campus) => (
									<TableRow key={campus.slug}>
										<TableCell className="font-medium text-slate-950">
											<a className="inline-flex items-center gap-2 hover:text-primary hover:underline" href={`/xiao-qu-cha-xun/${campus.slug}`}>
												{campus.name}
												<span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary text-xs no-underline">
													总部
												</span>
											</a>
										</TableCell>
										<TableCell>{campus.district ?? "—"}</TableCell>
										<TableCell className="whitespace-normal text-slate-600">{campus.address}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</section>

					<div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
						<div>
							<h2 className="font-bold text-2xl text-slate-950">全部校区</h2>
						</div>
						<div className="inline-flex items-center gap-2 text-slate-500 text-sm">
							<MapPinIcon className="size-4 text-primary" />
							<span>共 {otherCampuses.length} 个校区</span>
						</div>
					</div>

					<div className="space-y-8 pb-12 md:pb-20">
						{cities.map((city) => {
							const cityCampuses = otherCampuses.filter((campus) => campus.city === city);

							return (
								<section className="rounded-2xl bg-white p-6 md:p-8" key={city}>
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
									<Table>
										<TableHeader className="bg-slate-50">
											<TableRow>
												<TableHead>校区</TableHead>
												<TableHead>区域</TableHead>
												<TableHead>运营方式</TableHead>
												<TableHead>资料状态</TableHead>
												<TableHead className="min-w-80">地址</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{cityCampuses.map((campus) => (
												<TableRow key={campus.slug}>
													<TableCell className="font-medium text-slate-950">
														<a className="hover:text-primary hover:underline" href={`/xiao-qu-cha-xun/${campus.slug}`}>
															{campus.name}
														</a>
													</TableCell>
													<TableCell>{campus.district ?? "—"}</TableCell>
													<TableCell>{campus.operationType === "direct" ? "直营" : campus.operationType === "franchise" ? "加盟" : "—"}</TableCell>
													<TableCell>{campus.infoStatus === "complete" ? "已完善" : "信息待完善"}</TableCell>
													<TableCell className="whitespace-normal text-slate-600">{campus.address}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</section>
							);
						})}
					</div>
				</section>
			</main>
		</div>
	);
}
