import Link from "next/link";
import type { Metadata } from "next";
import { PageTopNav } from "@/components/PageTopNav";
import { PhoneButton } from "@/components/phone-action";
import { TeacherCard } from "@/components/teachers/TeacherCard";
import { SITE_FULL_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import { TEACHERS } from "@/lib/constants/teachers";
import { createPageMetadata } from "@/lib/seo";

// 提取所有校区名称
const campuses = Array.from(
	new Set(TEACHERS.map((t) => t.campus).filter(Boolean) as string[]),
);
const allCampuses = ["全部", ...campuses];
const CAMPUS_PARAM_KEY = "xiaoqu";

type PageProps = {
	searchParams?: Promise<{
		[CAMPUS_PARAM_KEY]?: string | string[];
	}>;
};

export async function generateMetadata({
	searchParams,
}: PageProps): Promise<Metadata> {
	const resolvedSearchParams = await searchParams;
	const campusFromParams = resolvedSearchParams?.[CAMPUS_PARAM_KEY];
	const currentCampus =
		typeof campusFromParams === "string"
			? campusFromParams
			: campusFromParams?.[0];
	const selectedCampus =
		currentCampus && campuses.includes(currentCampus) ? currentCampus : "全部";
	const path =
		selectedCampus === "全部"
			? "/lao-shi"
			: `/lao-shi?${CAMPUS_PARAM_KEY}=${encodeURIComponent(selectedCampus)}`;

	return createPageMetadata({
		description:
			selectedCampus === "全部"
				? `查看${SITE_FULL_NAME}核心老师的教学背景、教研方向与代表性成果。`
				: `查看${selectedCampus}老师团队的教学背景、学科方向与代表性成果。`,
		path,
		title: selectedCampus === "全部" ? "老师团队" : `${selectedCampus}老师团队`,
	});
}

function getCampusHref(campus: string) {
	if (campus === "全部") {
		return "/lao-shi";
	}

	return {
		pathname: "/lao-shi",
		query: {
			[CAMPUS_PARAM_KEY]: campus,
		},
	};
}

export default async function TeachersPage({ searchParams }: PageProps) {
	const resolvedSearchParams = await searchParams;
	const campusFromParams = resolvedSearchParams?.[CAMPUS_PARAM_KEY];
	const currentCampus =
		typeof campusFromParams === "string"
			? campusFromParams
			: campusFromParams?.[0];
	const selectedCampus =
		currentCampus && campuses.includes(currentCampus) ? currentCampus : "全部";

	// 筛选老师
	const filteredTeachers = TEACHERS.filter((teacher) => {
		if (selectedCampus === "全部") return true;
		return teacher.campus === selectedCampus;
	});

	return (
		<div className="min-h-screen bg-slate-50">
			<PageTopNav
				items={[
					{ label: "首页", href: "/" },
					{ label: "老师团队", href: "/lao-shi" },
				]}
			/>
			<main className="pb-16">
				<section className="bg-white">
					<div className="container mx-auto px-4 py-10 md:py-14">
						<p className="font-semibold text-primary text-sm">老师团队</p>
						<h1 className="mt-3 max-w-4xl font-bold text-4xl text-slate-950 leading-tight md:text-5xl">
							核心老师介绍与教学履历
						</h1>
						<p className="mt-5 max-w-4xl text-lg text-slate-600 leading-8">
							这里集中展示{SITE_FULL_NAME}
							核心老师的教学背景、教研方向与代表性成果，方便家长和学生更直观了解师资实力。
						</p>
						<div className="mt-8">
							<PhoneButton className="h-12 rounded-xl px-6 font-semibold">
								电话咨询老师安排：{SITE_HOTLINE_TEXT}
							</PhoneButton>
						</div>
					</div>
				</section>

				<section className="container mx-auto px-4 pt-6 md:pt-8">
					{/* 校区筛选标签 */}
					<div className="mb-8 flex flex-wrap gap-3">
						{allCampuses.map((campus) => (
							<Link
								aria-current={selectedCampus === campus ? "page" : undefined}
								className={`rounded-full px-5 py-2 font-medium text-sm transition-colors ${
									selectedCampus === campus
										? "bg-primary text-white"
										: "border border-slate-200 bg-white text-slate-700 hover:border-primary/30"
								}`}
								href={getCampusHref(campus)}
								key={campus}
							>
								{campus}
							</Link>
						))}
					</div>

					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{filteredTeachers.map((teacher) => (
							<TeacherCard key={teacher.slug} teacher={teacher} />
						))}
					</div>

					{filteredTeachers.length === 0 && (
						<div className="py-16 text-center text-slate-500">
							暂无该校区的老师信息
						</div>
					)}
				</section>
			</main>
		</div>
	);
}
