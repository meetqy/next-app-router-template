"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TeacherCard } from "@/components/teachers/TeacherCard";
import { TEACHERS } from "@/lib/constants/teachers";

const CAMPUS_PARAM_KEY = "xiaoqu";
const campuses = Array.from(
	new Set(TEACHERS.map((teacher) => teacher.campus).filter(Boolean) as string[]),
);
const allCampuses = ["全部", ...campuses];

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

export function TeacherDirectory() {
	const searchParams = useSearchParams();
	const campusFromParams = searchParams.get(CAMPUS_PARAM_KEY);
	const selectedCampus =
		campusFromParams && campuses.includes(campusFromParams)
			? campusFromParams
			: "全部";
	const filteredTeachers = TEACHERS.filter(
		(teacher) => selectedCampus === "全部" || teacher.campus === selectedCampus,
	);

	return (
		<>
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
		</>
	);
}
