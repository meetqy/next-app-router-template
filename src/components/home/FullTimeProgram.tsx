import Image from "next/image";

export function FullTimeProgram() {
	return (
		<section className="bg-slate-50 py-20" id="gao-kao-quan-ri-zhi">
			<div className="container mx-auto px-4">
				<div className="flex flex-col items-center gap-12 md:flex-row">
					<div className="flex-1">
						<h2 className="mb-6 font-bold text-3xl text-slate-900 md:text-4xl">
							高考全日制：住校集中备考
						</h2>
						<p className="mb-8 text-lg text-slate-600 leading-relaxed">
							针对需要全身心投入高考备考的学生，提供统一吃住、规律作息、系统上课的住校班。班主任全程跟班，老师针对每位学生的情况安排学习和练习，定期把孩子的表现同步给家长。
						</p>
						<ul className="space-y-4">
							{[
								"吃住学一体的备考环境",
								"针对每位学生的学习和练习安排",
								"学科老师每天跟班答疑",
								"关注孩子学习和心理状态",
							].map((item) => (
								<li
									className="flex items-center gap-3 text-slate-700"
									key={item}
								>
									<div className="size-2 rounded-full bg-primary" />
									{item}
								</li>
							))}
						</ul>
					</div>
					<div className="relative h-100 w-full flex-1 overflow-hidden rounded-2xl">
						<Image
							alt="高考全日制项目介绍"
							className="object-cover"
							fill
							sizes="(min-width: 768px) 50vw, 100vw"
							src="/assets/高考全日制项目介绍600x400.jpg"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
