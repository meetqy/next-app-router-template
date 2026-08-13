import type { Metadata } from "next";
import Link from "next/link";
import { PageTopNav } from "@/components/PageTopNav";
import { PhoneButton } from "@/components/phone-action";
import { Button } from "@/components/ui/button";
import { SITE_FULL_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	description: `${SITE_FULL_NAME}提分案例资料正在整理，后续将按可核验信息展示学习过程与阶段变化。`,
	noIndex: true,
	path: "/ti-fen-an-li",
	title: "提分案例",
});

export default function ScoreImprovementCasesPage() {
	return (
		<div className="min-h-screen bg-slate-50 pb-16 md:pb-24">
			<PageTopNav
				items={[
					{ label: "首页", href: "/" },
					{ label: "案例展示", href: "/sheng-xue-xi-bao" },
					{ label: "提分案例", href: "/ti-fen-an-li" },
				]}
			/>
			<main className="mx-auto w-full max-w-7xl px-4 pt-12 sm:px-6 md:pt-20 lg:px-8">
				<section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm md:px-12 md:py-16">
					<p className="font-medium text-primary text-sm">案例展示 · 提分案例</p>
					<h1 className="mt-4 font-bold text-3xl text-slate-950 leading-tight md:text-5xl">
						提分案例资料正在整理
					</h1>
					<p className="mt-6 text-slate-600 leading-8 md:text-lg">
						后续仅展示信息完整、可核验的学习过程与阶段变化，不发布无法核实的分数或结果。
					</p>
					<div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
						<Button asChild size="lg">
							<Link href="/sheng-xue-xi-bao">查看升学案例</Link>
						</Button>
						<PhoneButton className="h-11 px-6" size="lg">
							咨询学习安排：{SITE_HOTLINE_TEXT}
						</PhoneButton>
					</div>
				</section>
			</main>
		</div>
	);
}
