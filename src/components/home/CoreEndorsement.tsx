export function CoreEndorsement() {
	const stats = [
		{ value: "30+", label: "年办学经验", note: "长期深耕高中辅导" },
		{ value: "200+", label: "全国校区", note: "覆盖多个主要城市" },
		{ value: "1000+", label: "专职教师", note: "学科老师长期带班" },
		{ value: "10万+", label: "服务学生", note: "包含高考生和复读生" },
	];

	return (
		<section className="bg-white py-16">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-2 gap-8 md:grid-cols-4">
					{stats.map((stat) => (
						<div className="text-center" key={stat.label}>
							<div className="mb-2 font-bold text-4xl text-primary md:text-5xl">
								{stat.value}
							</div>
							<div className="font-medium text-slate-700">{stat.label}</div>
							<div className="mt-1 text-slate-500 text-sm">{stat.note}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
