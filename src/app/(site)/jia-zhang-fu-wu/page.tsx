import { FileTextIcon } from "lucide-react";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PageTopNav } from "@/components/PageTopNav";
import { PhoneButton } from "@/components/phone-action";
import { SimpleCard } from "@/components/ui/simple-card";
import { SITE_FULL_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import { getAllJiaZhangArticles } from "@/lib/jia-zhang-fu-wu";

export const metadata: Metadata = {
	title: "家长服务",
	description: `${SITE_FULL_NAME}家长服务中心：学管服务流程、教学管理规范、家长指南、学习方法、备考攻略与高考资讯集中呈现，帮助家长系统性解决高三备考中的各类问题。`,
};

function formatDate(iso: string) {
	const date = new Date(iso);
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function JiaZhangFuWuPage() {
	const articles = getAllJiaZhangArticles();

	return (
		<div className="min-h-screen bg-slate-50 pb-16 md:pb-24">
			<PageTopNav
				items={[
					{ label: "首页", href: "/" },
					{ label: "家长服务", href: "/jia-zhang-fu-wu" },
				]}
			/>
			<PageHero
				actions={
					<PhoneButton
						className="h-12 w-full rounded-xl px-8 font-semibold sm:w-auto"
						size="lg"
					>
						立即电话咨询：{SITE_HOTLINE_TEXT}
					</PhoneButton>
				}
				badge={`${SITE_FULL_NAME} · 家长服务中心`}
				description={
					<>
						系统性呈现 {SITE_FULL_NAME}
						的学管服务流程、教学管理规范、家长沟通指南与备考攻略。
						帮助家长在孩子高三这一年，少一分焦虑，多一分笃定。
					</>
				}
				title="家长服务"
			/>

			{/* 文章列表 */}
			<section className="py-12 md:py-16">
				<div className="container mx-auto px-4">
					<div className="mb-6 flex items-baseline justify-between">
						<h2 className="font-bold text-2xl text-slate-900">全部内容</h2>
						<span className="text-slate-500 text-sm">
							共 {articles.length} 篇
						</span>
					</div>

					{articles.length === 0 ? (
						<div className="col-span-full rounded-2xl border border-slate-300 border-dashed bg-white py-20 text-center">
							<FileTextIcon className="mx-auto mb-3 size-10 text-slate-300" />
							<p className="text-slate-500">暂无内容，敬请期待</p>
						</div>
					) : (
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{articles.map((article) => (
								<SimpleCard
									description={article.summary}
									href={`/jia-zhang-fu-wu/${article.slug}`}
									key={article.slug}
									meta={formatDate(article.publishedAt)}
									title={article.title}
								/>
							))}
						</div>
					)}
				</div>
			</section>

			{/* 底部 CTA */}
			<section className="pb-16 md:pb-24">
				<div className="container mx-auto px-4">
					<div className="overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 text-center text-white md:px-12 md:py-14">
						<h2 className="font-bold text-2xl leading-tight md:text-4xl">
							还有问题没找到答案？
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
							每个孩子的情况都不同。直接电话沟通，我们为您匹配最合适的方案。
						</p>
						<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<PhoneButton
								className="h-12 rounded-xl px-8 font-semibold"
								size="lg"
							>
								立即电话咨询：{SITE_HOTLINE_TEXT}
							</PhoneButton>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
