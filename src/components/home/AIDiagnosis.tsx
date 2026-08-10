import {
	BarChart3Icon,
	BrainCircuitIcon,
	TargetIcon,
	ZapIcon,
} from "lucide-react";
import { SITE_FULL_NAME } from "@/lib/constants/site";

export function AIDiagnosis() {
	const features = [
		{
			icon: <TargetIcon className="size-5" />,
			title: "快速找到孩子的薄弱点",
			desc: "通过做题情况分析，清楚告诉家长孩子哪一科、哪一类题最容易丢分",
		},
		{
			icon: <ZapIcon className="size-5" />,
			title: "每天安排练什么",
			desc: "根据孩子的练习情况，动态调整每天和每周的复习重点，不再盲目刷题",
		},
		{
			icon: <BarChart3Icon className="size-5" />,
			title: "进步看得见",
			desc: "把孩子的学习数据整理成清晰的图表，让家长随时了解孩子的成长变化",
		},
	];

	return (
		<section className="bg-white py-24">
			<div className="container mx-auto px-4">
				<div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 md:p-16 lg:p-20">
					{/* 背景装饰 */}
					<div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-[80px]" />
					<div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]" />

					<div className="relative z-10 grid gap-16 lg:grid-cols-2 lg:items-center">
						<div>
							<div className="mb-6 flex items-center gap-2">
								<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
									<BrainCircuitIcon className="size-5" />
								</div>
								<span className="font-bold text-primary text-sm uppercase tracking-wider">
									AI 智能诊断
								</span>
							</div>

							<h2 className="mb-8 font-bold text-4xl text-white leading-[1.1] md:text-5xl lg:text-6xl">
								AI 学情诊断
								<br />
								帮家长<span className="text-primary">看清孩子的学习情况</span>
							</h2>

							<p className="mb-12 max-w-xl text-lg text-slate-400 leading-relaxed">
								结合{SITE_FULL_NAME}多年的教学经验，AI
								帮孩子分析平时的做题数据，自动告诉家长和孩子：哪些知识点还没掌握、每天应该重点练什么、进步出现在哪里。
							</p>

							<div className="grid gap-6">
								{features.map((f) => (
									<div className="flex gap-4" key={f.title}>
										<div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-primary">
											{f.icon}
										</div>
										<div>
											<h3 className="mb-1 font-bold text-lg text-white">
												{f.title}
											</h3>
											<p className="text-slate-500 text-sm leading-relaxed">
												{f.desc}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="relative">
							{/* 模拟 AI 诊断界面 */}
							<div className="relative aspect-[4/3] w-full rounded-2xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-sm md:p-8">
								<div className="flex h-full flex-col gap-4">
									<div className="flex items-center justify-between border-white/5 border-b pb-4">
										<div className="flex gap-2">
											<div className="h-3 w-3 rounded-full bg-red-500/50" />
											<div className="h-3 w-3 rounded-full bg-yellow-500/50" />
											<div className="h-3 w-3 rounded-full bg-green-500/50" />
										</div>
										<div className="h-2 w-32 rounded-full bg-white/5" />
									</div>

									<div className="grid flex-1 grid-cols-2 gap-4">
										<div className="flex flex-col justify-between rounded-xl bg-white/5 p-4">
											<div className="text-slate-500 text-xs">
												知识点掌握情况
											</div>
											<div className="font-bold text-3xl text-primary">82%</div>
											<div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
												<div className="h-full w-[82%] bg-primary" />
											</div>
										</div>
										<div className="flex flex-col justify-between rounded-xl bg-white/5 p-4">
											<div className="text-slate-500 text-xs">预计还能提分</div>
											<div className="font-bold text-3xl text-green-400">
												+45 分
											</div>
											<div className="flex gap-1">
												{[1, 2, 3, 4, 5].map((j) => (
													<div
														className={`h-4 flex-1 rounded-sm ${j <= 4 ? "bg-green-400/50" : "bg-white/5"}`}
														key={j}
													/>
												))}
											</div>
										</div>
										<div className="col-span-2 rounded-xl bg-white/5 p-4">
											<div className="mb-4 text-slate-500 text-xs">
												孩子最近哪些题还容易错
											</div>
											<div className="space-y-3">
												{[
													{ label: "圆锥曲线综合题", val: 65 },
													{ label: "导数与不等式证明", val: 42 },
													{ label: "立体几何辅助线", val: 78 },
												].map((item) => (
													<div
														className="flex items-center gap-4"
														key={item.label}
													>
														<div className="w-24 truncate text-[10px] text-slate-400">
															{item.label}
														</div>
														<div className="h-1 flex-1 overflow-hidden rounded-full bg-white/5">
															<div
																className="h-full bg-primary/60"
																style={{ width: `${item.val}%` }}
															/>
														</div>
														<div className="text-[10px] text-primary">
															{item.val}%
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>

								{/* 漂浮的小装饰 */}
								<div className="absolute top-1/4 -right-4 animate-bounce rounded-lg bg-primary p-3 shadow-xl duration-[3000ms]">
									<BrainCircuitIcon className="size-6 text-primary-foreground" />
								</div>
								<div className="absolute bottom-1/4 -left-6 rounded-lg border border-white/10 bg-slate-800 p-3 shadow-xl">
									<div className="flex items-center gap-2">
										<div className="size-2 animate-pulse rounded-full bg-green-400" />
										<span className="text-[10px] text-slate-300">
											AI 正在分析中...
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
