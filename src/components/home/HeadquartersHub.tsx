import {
	MapPinIcon,
	NavigationIcon,
	PhoneCallIcon,
	SchoolIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PhoneButton, PhoneLink } from "@/components/phone-action";
import { CONTACT_HEADQUARTERS, CONTACT_TOPICS } from "@/lib/constants/contact";
import { SITE_FULL_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import { imageUrl } from "@/lib/image-url";

export function HeadquartersHub() {
	return (
		<section className="bg-slate-50 py-20" id="zong-bu-ru-kou">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-10 max-w-3xl">
					<div className="inline-flex rounded-full bg-white px-4 py-1.5 font-medium text-primary text-sm">
						总部在哪里
					</div>
					<h2 className="mt-5 font-bold text-3xl text-slate-900 leading-tight md:text-4xl">
						{SITE_FULL_NAME}在成都，家长可以直接打电话或预约到访了解情况。
					</h2>
					<p className="mt-4 text-base text-slate-600 leading-8 md:text-lg">
						想看总部地址、了解怎么坐车、问课程和收费、想预约到访校区看环境，都可以从这里开始。打一个电话，老师会先听孩子的情况，再告诉您接下来可以怎么做。
					</p>
				</div>

				<div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-stretch">
					<div className="relative min-h-80 overflow-hidden rounded-3xl">
						<Image
							alt="戴氏教育总部环境展示"
							className="object-cover"
							fill
							sizes="(min-width: 1024px) 50vw, 100vw"
							src={imageUrl("/assets/校园环境图占位.jpg")}
						/>
						<div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/30 to-transparent" />
						<div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
							<p className="font-semibold text-sm tracking-wide">
								{SITE_FULL_NAME}
							</p>
							<p className="mt-3 max-w-xl text-slate-100 text-sm leading-7 md:text-base">
								欢迎家长先打总部电话咨询，或预约到访总部现场看环境和课程安排。
							</p>
						</div>
					</div>

					<div className="space-y-6">
						<div className="flex items-start gap-4">
							<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-primary">
								<SchoolIcon className="size-5" />
							</div>
							<div>
								<div className="text-slate-500 text-sm">总部名称</div>
								<div className="mt-1 font-semibold text-lg text-slate-900">
									{CONTACT_HEADQUARTERS.name}
								</div>
							</div>
						</div>

						{CONTACT_HEADQUARTERS.address ? (
							<div className="flex items-start gap-4">
								<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-700">
									<MapPinIcon className="size-5" />
								</div>
								<div>
									<div className="text-slate-500 text-sm">总部地址</div>
									{CONTACT_HEADQUARTERS.mapHref ? (
										<a
											className="mt-1 inline-block font-semibold text-slate-900 transition-colors hover:text-primary"
											href={CONTACT_HEADQUARTERS.mapHref}
											rel="noopener noreferrer"
											target="_blank"
										>
											{CONTACT_HEADQUARTERS.address}
										</a>
									) : (
										<div className="mt-1 font-semibold text-slate-900">
											{CONTACT_HEADQUARTERS.address}
										</div>
									)}
								</div>
							</div>
						) : null}

						{CONTACT_HEADQUARTERS.navigationNote ? (
							<div className="flex items-start gap-4">
								<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-700">
									<NavigationIcon className="size-5" />
								</div>
								<div>
									<div className="text-slate-500 text-sm">怎么到总部</div>
									<div className="mt-1 text-slate-700 leading-7">
										{CONTACT_HEADQUARTERS.navigationNote}
									</div>
								</div>
							</div>
						) : null}

						<div className="flex items-start gap-4">
							<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-700">
								<PhoneCallIcon className="size-5" />
							</div>
							<div>
								<div className="text-slate-500 text-sm">咨询电话</div>
								<PhoneLink className="mt-1 inline-block font-bold text-2xl text-slate-900">
									{SITE_HOTLINE_TEXT}
								</PhoneLink>
								<div className="mt-1 text-slate-500 text-sm">
									{CONTACT_HEADQUARTERS.phoneDescription}
								</div>
							</div>
						</div>

						{CONTACT_TOPICS.length > 0 ? (
							<div className="pt-2">
								<h3 className="font-semibold text-slate-900">
									打总部电话，老师会帮您解答这些事
								</h3>
								<div className="mt-4 space-y-3">
									{CONTACT_TOPICS.map((item) => (
										<div
											className="flex items-start gap-3 text-slate-700"
											key={item}
										>
											<div className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
											<span className="leading-7">{item}</span>
										</div>
									))}
								</div>
							</div>
						) : null}

						<div className="flex flex-col gap-3 pt-2 sm:flex-row">
							<PhoneButton className="h-12 rounded-full px-7 text-base">
								立即电话咨询
							</PhoneButton>
							{CONTACT_HEADQUARTERS.mapHref ? (
								<a
									className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-7 font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
									href={CONTACT_HEADQUARTERS.mapHref}
									rel="noopener noreferrer"
									target="_blank"
								>
									一键导航到总部
								</a>
							) : null}
							<Link
								className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-7 font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
								href="/guan-fang-he-yan"
							>
								核验官网与电话
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
