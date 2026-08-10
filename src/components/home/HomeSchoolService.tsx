export function HomeSchoolService() {
	return (
		<section className="bg-primary py-20 text-primary-foreground">
			<div className="container mx-auto px-4 text-center">
				<h2 className="mb-8 font-bold text-3xl md:text-4xl">
					家长怎么了解孩子在校情况
				</h2>
				<p className="mx-auto mb-12 max-w-3xl text-xl opacity-90">
					学校、家长和孩子三方一起保持沟通：孩子的考勤、学习进度和心理状态，家长都能及时知道，遇到问题也能一起想办法解决。
				</p>
				<div className="grid gap-8 md:grid-cols-3">
					{[
						{
							title: "每天考勤同步",
							desc: "孩子是否按时到校、有无请假，家长都能及时知道",
						},
						{
							title: "每周学习反馈",
							desc: "孩子这周学了哪些内容、练得怎么样，老师会定期告诉家长",
						},
						{
							title: "家长沟通指导",
							desc: "在孩子情绪、亲子沟通上遇到问题时，可以向老师寻求建议",
						},
					].map((item) => (
						<div
							className="rounded-xl bg-primary-foreground/10 p-6 backdrop-blur-sm"
							key={item.title}
						>
							<div className="font-semibold text-lg">{item.title}</div>
							<div className="mt-2 text-sm opacity-90">{item.desc}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
