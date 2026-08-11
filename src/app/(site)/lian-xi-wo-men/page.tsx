import {
	Clock3Icon,
	MapPinnedIcon,
	MessageSquareMoreIcon,
	PhoneCallIcon,
	SchoolIcon,
} from "lucide-react";
import type { Metadata } from "next";
import { PageTopNav } from "@/components/PageTopNav";
import { PhoneButton, PhoneLink } from "@/components/phone-action";
import {
	CONTACT_CHANNELS,
	CONTACT_HEADQUARTERS,
	CONTACT_PAGE_INTRO,
	CONTACT_TOPICS,
} from "@/lib/constants/contact";
import { SITE_FULL_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";

export const metadata: Metadata = {
	title: "联系我们",
	description: `查看${SITE_FULL_NAME}联系方式、总部地址、到访说明与电话咨询方式。未提供的信息不单独展示，方便家长快速联系${SITE_FULL_NAME}。`,
};

const CONTACT_ICONS = {
	咨询热线: PhoneCallIcon,
	总部地址: MapPinnedIcon,
};

export default function LianXiWoMenPage() {
	const visibleChannels = CONTACT_CHANNELS.filter((item) => item.value);
	const hasNavigation = Boolean(CONTACT_HEADQUARTERS.mapHref);
	const hasTopics = CONTACT_TOPICS.length > 0;

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		mainEntity: {
			"@type": "EducationalOrganization",
			address: CONTACT_HEADQUARTERS.address
				? {
						"@type": "PostalAddress",
						addressLocality: "成都",
						addressRegion: "四川",
						streetAddress: CONTACT_HEADQUARTERS.address,
					}
				: undefined,
			name: CONTACT_HEADQUARTERS.name,
			telephone: SITE_HOTLINE_TEXT,
			url: "/lian-xi-wo-men",
		},
	};

	return (
		<div className="min-h-screen bg-slate-50 pb-16 md:pb-24">
			<PageTopNav
				items={[
					{ label: "首页", href: "/" },
					{ label: "联系我们", href: "/lian-xi-wo-men" },
				]}
			/>

			<script
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				type="application/ld+json"
			/>

			<section className="bg-white">
				<div className="container mx-auto px-4 py-12 md:py-16">
					<div className="max-w-4xl">
						<div className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-medium text-primary text-sm">
							{CONTACT_PAGE_INTRO.badge}
						</div>
						<h1 className="mt-5 font-bold text-3xl text-slate-900 leading-tight md:text-5xl">
							{CONTACT_PAGE_INTRO.title}
						</h1>
						<p className="mt-5 max-w-3xl text-base text-slate-600 leading-8 md:text-lg">
							{CONTACT_PAGE_INTRO.description}
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<PhoneButton
								className="h-12 rounded-xl px-8 font-semibold"
								size="lg"
							>
								立即电话咨询：{SITE_HOTLINE_TEXT}
							</PhoneButton>
							{hasNavigation ? (
								<a
									className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-8 font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
									href={CONTACT_HEADQUARTERS.mapHref}
									rel="noopener noreferrer"
									target="_blank"
								>
									查看总部导航
								</a>
							) : null}
						</div>
					</div>
				</div>
			</section>

			<section className="py-12 md:py-16">
				<div className="container mx-auto px-4">
					<div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
						<div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
							<div className="flex items-start gap-4">
								<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
									<SchoolIcon className="size-5" />
								</div>
								<div>
									<div className="text-slate-500 text-sm">机构名称</div>
									<div className="mt-1 font-semibold text-lg text-slate-900">
										{CONTACT_HEADQUARTERS.name}
									</div>
								</div>
							</div>

							{visibleChannels.map((item) => {
								const Icon =
									CONTACT_ICONS[item.label as keyof typeof CONTACT_ICONS] ??
									MessageSquareMoreIcon;

								return (
									<div className="flex items-start gap-4" key={item.label}>
										<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-700">
											<Icon className="size-5" />
										</div>
										<div>
											<div className="text-slate-500 text-sm">{item.label}</div>
											{item.label === "咨询热线" ? (
												<PhoneLink className="mt-1 inline-block font-bold text-2xl text-slate-900">
													{item.value}
												</PhoneLink>
											) : item.href ? (
												<a
													className="mt-1 inline-block font-semibold text-slate-900 transition-colors hover:text-primary"
													href={item.href}
													rel="noopener noreferrer"
													target="_blank"
												>
													{item.value}
												</a>
											) : (
												<div className="mt-1 font-semibold text-slate-900">
													{item.value}
												</div>
											)}
											{item.description ? (
												<div className="mt-1 text-slate-500 text-sm leading-6">
													{item.description}
												</div>
											) : null}
										</div>
									</div>
								);
							})}
						</div>

						<div className="space-y-6">
							{hasTopics ? (
								<div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
									<div className="flex items-center gap-3">
										<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
											<MessageSquareMoreIcon className="size-5" />
										</div>
										<h2 className="font-semibold text-slate-900 text-xl">
											可以咨询这些问题
										</h2>
									</div>
									<div className="mt-5 space-y-3">
										{CONTACT_TOPICS.map((item) => (
											<div
												className="flex items-start gap-3 text-slate-700"
												key={item}
											>
												<div className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
												<p className="leading-7">{item}</p>
											</div>
										))}
									</div>
								</div>
							) : null}

							{CONTACT_HEADQUARTERS.navigationNote ? (
								<div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
									<div className="flex items-center gap-3">
										<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
											<Clock3Icon className="size-5" />
										</div>
										<h2 className="font-semibold text-slate-900 text-xl">
											到访说明
										</h2>
									</div>
									<p className="mt-4 text-slate-600 leading-8">
										{CONTACT_HEADQUARTERS.navigationNote}
									</p>
									{hasNavigation ? (
										<div className="mt-6">
											<a
												className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
												href={CONTACT_HEADQUARTERS.mapHref}
												rel="noopener noreferrer"
												target="_blank"
											>
												一键导航到总部
											</a>
										</div>
									) : null}
								</div>
							) : null}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
