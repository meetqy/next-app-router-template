import { BookOpenTextIcon, FileStackIcon, Layers3Icon } from "lucide-react";

export function TeachingSystem() {
	const features = [
		{
			icon: <BookOpenTextIcon className="h-8 w-8 text-primary" />,
			title: "课程安排清楚",
			desc: "围绕高考目标制定教学进度，孩子和家长都能看到每周要学什么、练什么",
		},
		{
			icon: <FileStackIcon className="h-8 w-8 text-primary" />,
			title: "配套练习资料",
			desc: "提供每阶段对应的讲义、练习题和复习资料，孩子不用自己到处找题",
		},
		{
			icon: <Layers3Icon className="h-8 w-8 text-primary" />,
			title: "按孩子水平教学",
			desc: "根据孩子不同基础安排适合的教学方式，基础弱的补基础，能力强的往上拔",
		},
	];

	return (
		<section className="bg-white py-20" id="jiao-xue-jiao-yan">
			<div className="container mx-auto px-4 text-center">
				<h2 className="mb-12 font-bold text-3xl text-slate-900 md:text-4xl">
					孩子在学校是怎么学的
				</h2>
				<div className="grid gap-8 md:grid-cols-3">
					{features.map((f) => (
						<div
							className="rounded-xl border border-slate-100 p-8"
							key={f.title}
						>
							<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
								{f.icon}
							</div>
							<h3 className="mb-4 font-bold text-xl">{f.title}</h3>
							<p className="text-slate-600">{f.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
