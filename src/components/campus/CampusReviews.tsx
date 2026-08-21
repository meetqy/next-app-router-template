import Image from "next/image";
import type { CampusUserReview } from "@/lib/constants/campuses";
import { imageUrl } from "@/lib/image-url";

export function CampusReviews({ reviews }: { reviews: readonly CampusUserReview[] }) {
	if (reviews.length === 0) return null;

	const reviewGroups = reviews.reduce<{ screenshot: string; reviews: CampusUserReview[] }[]>(
		(groups, review) => {
			const last = groups.at(-1);
			if (last && last.screenshot === review.screenshot) {
				last.reviews.push(review);
			} else {
				groups.push({ screenshot: review.screenshot, reviews: [review] });
			}
			return groups;
		},
		[],
	);

	return (
		<section className="border-border/70 border-t py-7 md:py-8">
			<h2 className="font-bold text-2xl text-slate-950">高德用户评价</h2>
			<div className="mt-6 space-y-8">
				{reviewGroups.map((group, index) => (
					<div className="flex flex-col-reverse items-start gap-5 md:flex-row" key={group.screenshot}>
						<div className="min-w-0 flex-1 divide-y divide-border/70">
							{group.reviews.map((review) => (
								<article className="py-6 first:pt-0 last:pb-0" key={`${review.reviewer}-${review.date}`}>
									<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
										<p className="font-semibold text-slate-950">{review.reviewer}</p>
										<p className="font-medium text-primary">{review.rating.toFixed(1)} 分</p>
										<p className="text-muted-foreground">{review.date}</p>
										<p className="text-muted-foreground">高德地图用户评价</p>
									</div>
									{review.content ? (
										<p className="mt-4 whitespace-pre-line text-slate-700 leading-8">{review.content}</p>
									) : (
										<p className="mt-4 text-slate-400">该用户仅评分，未填写文字评价</p>
									)}
								</article>
							))}
						</div>
						<div className="w-full shrink-0 md:w-44 lg:w-52">
							<a className="group block" href={imageUrl(group.screenshot)} rel="noopener noreferrer" target="_blank">
								<div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-100">
									<Image
										alt={`高德用户评价截图 ${index + 1}`}
										className="object-contain transition-transform duration-300 group-hover:scale-105"
										fill
										sizes="(min-width: 1024px) 208px, (min-width: 768px) 176px, 75vw"
										src={imageUrl(group.screenshot)}
									/>
								</div>
							</a>
							<p className="mt-2 text-center text-xs text-muted-foreground">截图 {index + 1} · 点击查看大图</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
