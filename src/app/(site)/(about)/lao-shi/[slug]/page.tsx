import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	ArticleDetailLayout,
	DetailSidebarCard,
	RelatedLinksCard,
} from "@/components/ArticleDetailLayout";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { PhoneButton } from "@/components/phone-action";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import { imageUrl } from "@/lib/image-url";
import { SITE_BRAND_NAME } from "@/lib/constants/site";
import {
	getTeacherBySlug,
	getTeacherDisplayTitle,
	getRelatedTeachers,
	TEACHERS,
} from "@/lib/constants/teachers";
import { createNoIndexMetadata, createPageMetadata } from "@/lib/seo";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
	return TEACHERS.map((teacher) => ({
		slug: teacher.slug,
	}));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const teacher = getTeacherBySlug(slug);

	if (!teacher) {
		return createNoIndexMetadata("未找到老师");
	}

	return createPageMetadata({
		description: teacher.summary,
		path: `/lao-shi/${teacher.slug}`,
		title: `${teacher.name}老师介绍`,
	});
}

function TeacherSection({ items, title }: { items: string[]; title: string }) {
	if (items.length === 0) {
		return null;
	}

	return (
		<section className="border-slate-200 border-t pt-8">
			<h2 className="border-primary border-l-4 pl-3 font-semibold text-xl text-slate-950">
				{title}
			</h2>
			<ul className="mt-5 space-y-4 text-slate-700 leading-8">
				{items.map((item) => (
					<li className="flex gap-3" key={item}>
						<span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
						<span>{item}</span>
					</li>
				))}
			</ul>
		</section>
	);
}

function TeacherStructuredData({
	teacher,
	url,
}: {
	teacher: (typeof TEACHERS)[0];
	url: string;
}) {
	const siteUrl = new URL(`https://${env.NEXT_PUBLIC_SITE_DOMAIN}`);
	const teacherImageUrl = teacher.image
		? new URL(imageUrl(teacher.image), siteUrl).toString()
		: undefined;
	const pageUrl = new URL(url, siteUrl).toString();

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: teacher.name,
		jobTitle: getTeacherDisplayTitle(teacher),
		description: teacher.summary,
		image: teacherImageUrl,
		url: pageUrl,
		worksFor: {
			"@type": "Organization",
			name: SITE_BRAND_NAME,
			url: siteUrl.toString(),
		},
		knowsAbout: ["高考", "高中教育", "教学研究", "升学指导"],
		honorificPrefix: "老师",
	};

	return <JsonLd data={structuredData} />;
}

export default async function TeacherDetailPage({ params }: PageProps) {
	const { slug } = await params;
	const teacher = getTeacherBySlug(slug);

	if (!teacher) {
		notFound();
	}
	const relatedTeachers = getRelatedTeachers(teacher.slug);

	const profileFacts = [
		teacher.campus ? { label: "所在校区", value: teacher.campus } : null,
		teacher.subject ? { label: "学科方向", value: teacher.subject } : null,
		teacher.education ? { label: "毕业院校", value: teacher.education } : null,
		teacher.experience
			? { label: "教学经历", value: teacher.experience }
			: null,
	].filter((item): item is { label: string; value: string } => Boolean(item));

	return (
		<div className="min-h-screen bg-muted/40">
			<TeacherStructuredData
				teacher={teacher}
				url={`/lao-shi/${teacher.slug}`}
			/>
			<PageHeader
				breadcrumbOnly
				items={[
					{ label: "首页", href: "/" },
					{ label: "教师团队", href: "/lao-shi" },
					{ label: teacher.name, href: `/lao-shi/${teacher.slug}` },
				]}
			/>

			<ArticleDetailLayout
				sidebar={
					<>
						<DetailSidebarCard title="老师信息">
							<p className="font-medium text-primary">
								{getTeacherDisplayTitle(teacher)}
							</p>
							<dl className="mt-4 space-y-3 text-sm leading-7">
								{profileFacts.map((fact) => (
									<div key={fact.label}>
										<dt className="text-muted-foreground">{fact.label}</dt>
										<dd className="font-medium text-slate-900">{fact.value}</dd>
									</div>
								))}
							</dl>
							<div className="mt-5 flex flex-col gap-2">
								<PhoneButton>电话咨询老师安排</PhoneButton>
								<Button asChild variant="outline">
									<Link href="/lao-shi">返回教师团队</Link>
								</Button>
							</div>
						</DetailSidebarCard>

						<RelatedLinksCard
							items={relatedTeachers.map((related) => ({
								href: `/lao-shi/${related.slug}`,
								title: `${related.name}老师 · ${getTeacherDisplayTitle(related)}`,
							}))}
							moreHref="/lao-shi"
							title="相关老师"
						/>
					</>
				}
			>
				<Card className="[--card-spacing:--spacing(6)]">
							<CardHeader className="border-b">
								<CardTitle className="text-center font-bold text-xl leading-relaxed md:text-2xl">
									<h1>{teacher.name}老师介绍</h1>
								</CardTitle>
								<CardDescription className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
									<span>{getTeacherDisplayTitle(teacher)}</span>
									<Separator className="h-4" orientation="vertical" />
									<span>教师团队</span>
									{teacher.campus ? (
										<>
											<Separator className="h-4" orientation="vertical" />
											<span>{teacher.campus}</span>
										</>
									) : null}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-8">
								<p className="rounded-lg bg-muted p-4 text-muted-foreground text-sm leading-7">
									{teacher.summary}
								</p>
								{teacher.image ? (
									<figure className="mx-auto max-w-md overflow-hidden rounded-2xl bg-slate-100">
										<div className="relative aspect-4/5">
											<Image
												alt={`${teacher.name}老师`}
												className="object-cover object-top"
												fill
												priority
												sizes="(max-width: 768px) 100vw, 448px"
												src={imageUrl(teacher.image)}
											/>
										</div>
									</figure>
								) : null}

								<section>
									<p className="font-semibold text-primary text-sm">老师简介</p>
									<h2 className="mt-3 font-bold text-2xl text-slate-950">
										围绕高考提分目标展开教学与陪伴
									</h2>
									<div className="mt-6 space-y-4 text-slate-700 leading-8">
										{teacher.introduction.map((item) => (
											<p key={item}>{item}</p>
										))}
									</div>
								</section>

								<TeacherSection items={teacher.honors} title="荣誉与任职" />
								<TeacherSection
									items={teacher.achievements}
									title="教学成果与经验"
								/>
							</CardContent>
				</Card>
			</ArticleDetailLayout>
		</div>
	);
}
