import { PageTopNav } from "@/components/PageTopNav";
import { SimpleCard } from "@/components/ui/simple-card";
import { SITE_FULL_NAME } from "@/lib/constants/site";

export const metadata = {
	title: "价格表",
	description: `查看${SITE_FULL_NAME}各校区各类课程价格表与优惠政策`,
};

const priceListItems = [
	{
		slug: "shi-mao-gao-kao-fu-du",
		title: "总部校区（世贸）2027届高考复读优惠政策",
		description:
			"高考中心总部校区（世贸）2027届高考复读、高三全日制全科班最新优惠政策与收费标准",
		category: "高考复读",
		campus: "总部校区（世贸）",
	},
];

export default function PriceListPage() {
	return (
		<div className="bg-slate-50 pb-12 md:pb-20">
			<PageTopNav
				items={[
					{ label: "首页", href: "/" },
					{ label: "价格表", href: "/jia-ge-biao" },
				]}
			/>
			<div className="container mx-auto px-4 pt-8 md:pt-12">
				<div className="mb-12 text-center">
					<h1 className="mb-4 font-bold text-3xl text-slate-900 md:text-5xl">
						价格表
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-slate-600">
						为您提供${SITE_FULL_NAME}各校区各类课程的价格信息与优惠政策。
					</p>
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{priceListItems.map((item) => (
						<SimpleCard
							description={item.description}
							href={`/jia-ge-biao/${item.slug}`}
							key={item.slug}
							meta={`${item.campus} · ${item.category}`}
							title={item.title}
						/>
					))}

					{priceListItems.length === 0 && (
						<div className="rounded-2xl border border-slate-300 border-dashed py-20 text-center">
							<p className="text-slate-500">暂无价格表内容</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
