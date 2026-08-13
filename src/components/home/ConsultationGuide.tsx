import {
	CalendarCheckIcon,
	CheckCircle2Icon,
	PhoneCallIcon,
} from "lucide-react";
import { PhoneButton, PhoneLink } from "@/components/phone-action";
import { SITE_HOTLINE_TEXT } from "@/lib/constants/site";

export function ConsultationGuide() {
	return (
		<section className="border-slate-200 border-y bg-white py-20">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid gap-10 rounded-3xl border border-slate-200 bg-slate-50/60 p-8 md:p-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:gap-12 lg:p-12">
					<div>
						<div className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-medium text-primary text-sm">
							帮孩子定一个清晰的备考计划
						</div>
						<h2 className="max-w-2xl font-bold text-3xl text-slate-900 leading-tight md:text-4xl">
							打一个电话，听听老师怎么说
						</h2>
						<p className="mt-5 max-w-2xl text-base text-slate-600 leading-7 md:text-lg">
							根据孩子现在的成绩、想考的学校和最近的学习状态，老师会先聊清楚情况，再给家长一个更合适现阶段的具体建议：什么时候该补什么、怎么安排节奏、下一步该做什么。
						</p>
						<div className="mt-8 grid gap-4 text-slate-700 sm:grid-cols-2">
							<div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
								<CheckCircle2Icon className="mt-0.5 size-5 text-primary" />
								<div>
									<div className="font-semibold">一对一沟通分析</div>
									<div className="mt-1 text-slate-500 text-sm">
										围绕成绩现状和目标方向进行针对性建议
									</div>
								</div>
							</div>
							<div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
								<CheckCircle2Icon className="mt-0.5 size-5 text-primary" />
								<div>
									<div className="font-semibold">学习问题梳理</div>
									<div className="mt-1 text-slate-500 text-sm">
										聚焦薄弱学科、备考节奏和阶段安排
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
						<div className="space-y-6">
							<div className="flex items-start gap-4">
								<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
									<PhoneCallIcon className="size-5" />
								</div>
								<div className="min-w-0">
									<div className="text-slate-500 text-sm">电话咨询</div>
									<PhoneLink className="mt-1 block font-bold text-2xl text-slate-900">
										{SITE_HOTLINE_TEXT}
									</PhoneLink>
									<div className="mt-1 text-slate-500 text-sm">
										工作时间内可直接联系老师进行初步沟通
									</div>
								</div>
							</div>

							<div className="h-px bg-slate-200" />

							<div className="flex items-start gap-4">
								<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
									<CalendarCheckIcon className="size-5" />
								</div>
								<div className="min-w-0 flex-1">
									<div className="text-slate-500 text-sm">到校预约</div>
									<div className="mt-1 font-semibold text-lg text-slate-900">
										预约到访校区，现场了解课程与管理安排
									</div>
									<div className="mt-1 text-slate-500 text-sm">
										适合需要进一步了解环境、班型和入学流程的家长
									</div>
								</div>
							</div>

							<PhoneButton
								className="mt-2 h-12 w-full rounded-xl text-base"
								size="lg"
							>
								立即预约咨询
							</PhoneButton>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
