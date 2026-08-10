import { Award, ShieldCheck, Trophy } from "lucide-react";
import Link from "next/link";
import { HONORS } from "@/lib/constants/honors";
import { SITE_FULL_NAME } from "@/lib/constants/site";

export function Honors() {
	const featuredHonors = HONORS.slice(0, 3);
	const icons = [Trophy, ShieldCheck, Award];

	return (
		<section className="bg-white py-14 md:py-16" id="rong-yu-zi-zhi">
			<div className="container mx-auto px-4">
				<div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
					<div className="max-w-2xl">
						<p className="mb-3 font-semibold text-primary text-sm">
							{SITE_FULL_NAME}获得过哪些认可
						</p>
						<h2 className="mb-3 font-bold text-2xl text-slate-900 md:text-3xl">
							真实荣誉，看得见的办学积累
						</h2>
						<p className="text-slate-600">
							挑了一些比较重要的荣誉和资质，方便家长快速了解{SITE_FULL_NAME}的办学实力和社会认可程度。
						</p>
					</div>
					<div className="rounded-full bg-slate-50 px-4 py-2 text-slate-500 text-sm">
						30+ 年办学经验，长期口碑积累
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					{featuredHonors.map((honor, index) => {
						const Icon = icons[index] ?? Award;

						return (
							<div
								className="rounded-2xl border border-slate-100 bg-slate-50 p-6"
								key={honor.title}
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
									<Icon className="h-6 w-6" />
								</div>

								<div className="mb-3 flex items-center justify-between gap-3">
									<h3 className="font-bold text-lg text-slate-900">
										{honor.title}
									</h3>
									{honor.year && (
										<span className="text-slate-400 text-sm">{honor.year}</span>
									)}
								</div>

								<p className="mb-2 font-medium text-primary/80 text-sm">
									颁发单位：{honor.issuer}
								</p>
								{honor.description && (
									<p className="line-clamp-2 text-slate-500 text-sm leading-relaxed">
										{honor.description}
									</p>
								)}
							</div>
						);
					})}
				</div>

				<div className="mt-6 rounded-2xl border border-slate-200 border-dashed bg-slate-50 px-5 py-4 text-center text-slate-500 text-sm">
					<span>
						如需进一步了解办学资质、品牌荣誉和相关证明材料，可查看完整荣誉资质页面。
					</span>
					<Link
						className="ml-2 font-semibold text-primary transition-colors hover:text-primary/80"
						href="/rong-yu-zi-zhi"
					>
						查看全部荣誉资质
					</Link>
				</div>
			</div>
		</section>
	);
}
