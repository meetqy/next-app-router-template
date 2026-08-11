import { CalendarIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageTopNav } from "@/components/PageTopNav";
import { PhoneButton } from "@/components/phone-action";
import { HONOR_CERTIFICATES } from "@/lib/constants/honor-certificates";
import { imageUrl } from "@/lib/image-url";
import { SITE_FULL_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	description: `查看${SITE_FULL_NAME}荣誉证书、版权登记、办学资质、质量认证、媒体报道与行业任职等真实展示内容。`,
	path: "/rong-yu-zi-zhi",
	title: "荣誉资质",
});

function HonorCard({ index }: { index: number }) {
	const honor = HONOR_CERTIFICATES[index];

	if (!honor) {
		return null;
	}

	const isReversed = index % 2 === 1;
	const gridClassName = isReversed
		? "grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-12"
		: "grid items-start gap-8 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-12";
	const imageWrapperClassName = isReversed
		? "lg:order-2 lg:w-full lg:max-w-[520px] lg:justify-self-end"
		: "lg:w-full";
	const contentWrapperClassName = isReversed ? "lg:order-1" : undefined;

	return (
		<article
			className="border-slate-200 border-b py-10 md:py-14"
			id={`rong-yu-${honor.id}`}
		>
			<div className={gridClassName}>
				<div className={imageWrapperClassName}>
					<a
						className="group block"
						href={imageUrl(honor.imageSrc)}
						rel="noopener noreferrer"
						target="_blank"
					>
						<div className="relative h-80 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 md:h-96">
							<Image
								alt={honor.imageAlt}
								className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02]"
								fill
								priority={index < 2}
								sizes="(max-width: 1024px) 100vw, 520px"
								src={imageUrl(honor.imageSrc)}
							/>
						</div>
						<p className="mt-3 text-slate-500 text-sm transition-colors group-hover:text-primary">
							点击查看大图
						</p>
					</a>
				</div>

				<div className={contentWrapperClassName}>
					<div className="mb-4 flex flex-wrap items-center gap-3">
						<span className="inline-flex items-center bg-primary/8 px-3 py-1 font-medium text-primary text-sm">
							{honor.category}
						</span>
						<span className="inline-flex items-center gap-2 text-slate-500 text-sm">
							<CalendarIcon className="size-4" />
							{honor.issuedAt}
						</span>
					</div>

					<h2 className="text-balance font-bold text-2xl text-slate-950 leading-tight md:text-3xl">
						{honor.title}
					</h2>
					<p className="mt-4 font-medium text-lg text-slate-800 leading-relaxed">
						{honor.headline}
					</p>
					<p className="mt-4 text-slate-600 leading-8">{honor.summary}</p>

					<div className="mt-8 border-slate-200 border-t pt-6">
						<p className="font-semibold text-slate-900">证书关键信息</p>
						<dl className="mt-4 space-y-3">
							<div className="grid gap-2 md:grid-cols-[132px_minmax(0,1fr)]">
								<dt className="text-slate-500 leading-7">颁发机构 / 来源</dt>
								<dd className="font-medium text-slate-900 leading-7">
									{honor.issuer}
								</dd>
							</div>
							{honor.facts.map((fact) => (
								<div
									className="grid gap-2 md:grid-cols-[132px_minmax(0,1fr)]"
									key={`${honor.id}-${fact.label}`}
								>
									<dt className="text-slate-500 leading-7">{fact.label}</dt>
									<dd className="text-slate-900 leading-7">{fact.value}</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
			</div>
		</article>
	);
}

export default function HonorsPage() {
	return (
		<div className="bg-slate-50">
			<PageTopNav
				items={[
					{ label: "首页", href: "/" },
					{ label: "荣誉资质", href: "/rong-yu-zi-zhi" },
				]}
			/>
			<main className="pb-16">
				<section className="bg-white">
					<div className="container mx-auto px-4 py-10 md:py-14">
						<p className="font-semibold text-primary text-sm">荣誉资质</p>
						<h1 className="mt-3 max-w-4xl text-balance font-bold text-4xl text-slate-950 leading-tight md:text-5xl">
							戴氏教育高考总部荣誉证书展示
						</h1>
						<p className="mt-5 max-w-4xl text-lg text-slate-600 leading-8">
							这里集中展示戴氏教育高考总部的办学资质、版权登记、质量认证、行业任职、品牌荣誉与媒体报道。
							从长期办学到多维背书，让家长与学生更直观看见品牌沉淀与办学实力。
						</p>
						<div className="mt-8 flex flex-col gap-4 sm:flex-row">
							<PhoneButton className="h-12 rounded-xl px-6 font-semibold">
								立即咨询：{SITE_HOTLINE_TEXT}
							</PhoneButton>
							<Link
								className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 font-semibold text-slate-800 transition-colors hover:border-slate-300 hover:text-slate-950"
								href="/#rong-yu-zi-zhi"
							>
								返回首页荣誉区
							</Link>
						</div>

						<div className="mt-10 flex flex-wrap gap-3 border-slate-200 border-t pt-6">
							{HONOR_CERTIFICATES.map((honor) => (
								<Link
									className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 text-sm transition-colors hover:border-primary/30 hover:text-primary"
									href={`#rong-yu-${honor.id}`}
									key={honor.id}
								>
									{honor.id}. {honor.category}
								</Link>
							))}
						</div>
					</div>
				</section>

				<section className="container mx-auto px-4 pt-6 md:pt-8">
					<div>
						{HONOR_CERTIFICATES.map((_, index) => (
							<HonorCard index={index} key={HONOR_CERTIFICATES[index]?.id} />
						))}
					</div>
				</section>
			</main>
		</div>
	);
}
