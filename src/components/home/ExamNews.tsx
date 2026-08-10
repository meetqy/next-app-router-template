import Image from "next/image";
import Link from "next/link";

export function ExamNews() {
	const news = [
		{
			date: "2026-05-20",
			title: "2026 年高考政策新变化，家长和学生需要重点关注什么？",
			category: "政策",
			image: "/assets/资讯配图占图1.jpg",
		},
		{
			date: "2026-05-15",
			title: "高考冲刺阶段如何高效复习？这 5 个方法值得参考",
			category: "备考",
			image: "/assets/资讯配图占图2.jpg",
		},
		{
			date: "2026-05-10",
			title: "重点院校最新招生信息发布，志愿规划要提前准备",
			category: "招生",
			image: "/assets/资讯配图占图3.jpeg",
		},
	];

	return (
		<section className="bg-white py-20" id="xin-wen">
			<div className="container mx-auto px-4">
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
						href="/#xin-wen"
					>
						查看更多
					</Link>
				</div>

				<div className="grid gap-8 md:grid-cols-3">
					{news.map((item) => (
						<div key={item.title}>
							<div className="relative mb-4 aspect-video overflow-hidden rounded-xl">
								<Image
									alt={item.title}
									className="object-cover"
									fill
									sizes="(min-width: 768px) 33vw, 100vw"
									src={item.image}
								/>
							</div>
							<div className="mb-2 flex items-center gap-3">
								<span className="font-bold text-primary text-xs uppercase tracking-wider">
									{item.category}
								</span>
								<span className="text-slate-400 text-xs">{item.date}</span>
							</div>
							<h3 className="font-bold text-lg leading-tight">{item.title}</h3>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
