import { PageHero } from "@/components/PageHero";
import { PageTopNav } from "@/components/PageTopNav";
import { SimpleCard } from "@/components/ui/simple-card";
import { getAllBrochures } from "@/lib/brochures";
import { SITE_FULL_NAME } from "@/lib/constants/site";

export const metadata = {
	title: "招生简章列表",
	description: `查看${SITE_FULL_NAME}历年高考全日制招生简章`,
};

export default function BrochuresPage() {
	const brochures = getAllBrochures();

	return (
		<div className="bg-slate-50 pb-12 md:pb-20">
			<PageTopNav
				items={[
					{ label: "首页", href: "/" },
					{ label: "招生简章", href: "/zhao-sheng-jian-zhang" },
				]}
			/>
			<PageHero
				badge={`${SITE_FULL_NAME} · 招生简章`}
				description="为您提供最新、最全面的高考全日制备考方案与招生信息。"
				title="招生简章"
			/>

			<section className="pb-12 md:pb-20">
				<div className="container mx-auto px-4 pt-8 md:pt-12">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{brochures.map((brochure) => (
							<SimpleCard
								description={`查看 ${brochure.year} 届高考全日制与复读班招生简章、班型介绍及备考安排。`}
								href={`/zhao-sheng-jian-zhang/${brochure.year}`}
								key={brochure.year}
								meta={`发布日期：${Number(brochure.year) - 1}-01-01`}
								title={brochure.title}
							/>
						))}

						{brochures.length === 0 && (
							<div className="rounded-2xl border border-slate-300 border-dashed py-20 text-center">
								<p className="text-slate-500">暂无招生简章内容</p>
							</div>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}
