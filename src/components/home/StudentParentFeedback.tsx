export function StudentParentFeedback() {
	const testimonials = [
		{
			name: "张同学",
			role: "高考生",
			text: "老师讲解很细致，学习安排也很清楚，几个月下来成绩提升很明显，自己也越来越有信心。",
		},
		{
			name: "李家长",
			role: "学生家长",
			text: "学校管理规范，老师会主动沟通孩子的学习情况，孩子在状态和自信心上都有很大变化。",
		},
		{
			name: "王同学",
			role: "复读生",
			text: "老师帮我一点点梳理薄弱的地方，复习方向更清楚，学习也比以前更有效率。",
		},
	];

	return (
		<section className="bg-white py-20">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<h2 className="mb-16 text-center font-bold text-3xl md:text-4xl">
					学生成果与家长口碑
				</h2>
				<div className="grid gap-8 md:grid-cols-3">
					{testimonials.map((t) => (
						<div
							className="relative rounded-2xl border border-slate-100 bg-slate-50 p-8"
							key={t.name}
						>
							<div className="absolute top-4 left-4 font-serif text-4xl text-primary opacity-20">
									&ldquo;
							</div>
							<p className="relative z-10 mb-6 text-slate-700">{t.text}</p>
							<div>
								<div className="font-bold text-slate-900">{t.name}</div>
								<div className="text-slate-500 text-sm">{t.role}</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
