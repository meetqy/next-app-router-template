import { ArticleList } from "@/components/ArticleList";
import { PageHeader } from "@/components/PageHeader";
import { SITE_FULL_NAME } from "@/lib/constants/site";
import { SCORE_IMPROVEMENT_CASES } from "@/lib/score-improvement-cases";
import { createPageMetadata } from "@/lib/seo";

const PAGE_DESCRIPTION = `${SITE_FULL_NAME}提分案例，展示学生阶段成绩变化、学习过程与帮扶措施。`;

export const metadata = createPageMetadata({
	description: PAGE_DESCRIPTION,
	path: "/ti-fen-an-li",
	title: "提分案例",
});

export default function ScoreImprovementCasesPage() {
	return (
		<div className="min-h-screen bg-muted/40 pb-16 md:pb-24">
			<PageHeader
				badge={`${SCORE_IMPROVEMENT_CASES.length} 个学习案例`}
				description={PAGE_DESCRIPTION}
				items={[
					{ label: "首页", href: "/" },
					{ label: "提分案例", href: "/ti-fen-an-li" },
				]}
				title="提分案例"
			/>

			<main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
				<ArticleList
					items={SCORE_IMPROVEMENT_CASES.map((item) => ({
						href: `/ti-fen-an-li/${item.slug}`,
						meta:
							item.entryScore !== undefined && item.improvement !== undefined
								? `${item.entryLabel} ${item.entryScore} 分 → 高考 ${item.finalScore} 分 · 提升 ${item.improvement} 分`
								: `高考 ${item.finalScore} 分`,
						title: item.title,
					}))}
				/>

				<p className="mx-auto mt-8 max-w-4xl text-center text-muted-foreground text-sm leading-7">
					以上内容为个别学生的阶段学习记录。成绩变化受原有基础、学习投入、考试状态等多种因素影响，不代表对其他学生学习结果的承诺。
				</p>
			</main>
		</div>
	);
}
