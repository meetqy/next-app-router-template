import Link from "next/link";
import { getKnowledgeArticlesByFilter } from "@/lib/knowledge-base";

const NEWS_ARTICLES = (getKnowledgeArticlesByFilter("xin-wen-dong-tai") ?? []).slice(
	0,
	3,
);

export function ExamNews() {
	return (
		<section className="bg-white py-20" id="xin-wen">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-12 flex items-end justify-between">
					<div>
						<h2 className="mb-2 font-bold text-3xl text-slate-900 md:text-4xl">
							高考资讯
						</h2>
						<p className="text-slate-600">
							为家长整理的高考政策、备考方法和升学信息，方便了解最近都在发生什么。
						</p>
					</div>
					<Link
						className="font-semibold text-primary hover:underline"
							href="/zi-liao-ku/fen-lei/xin-wen-dong-tai"
					>
						查看更多
					</Link>
				</div>

				<div className="grid gap-8 md:grid-cols-3">
					{NEWS_ARTICLES.map((item) => (
						<Link
							className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-colors hover:border-primary/30 hover:bg-primary/5"
							href={`/zi-liao-ku/${item.slug}`}
							key={item.slug}
						>
							<div className="mb-3 flex items-center gap-3">
								<span className="font-bold text-primary text-xs uppercase tracking-wider">
									新闻动态
								</span>
								<span className="text-slate-400 text-xs">
									{item.publishedAt ?? item.crawledAt ?? "时间待更新"}
								</span>
							</div>
							<h3 className="font-bold text-lg leading-tight">{item.title}</h3>
							<p className="mt-3 line-clamp-3 text-slate-600 text-sm leading-7">
								{item.summary}
							</p>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
