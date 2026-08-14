import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { PhoneButton } from "@/components/phone-action";
import { TeacherCard } from "@/components/teachers/TeacherCard";
import { SITE_FULL_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import { TEACHERS } from "@/lib/constants/teachers";
import { createPageMetadata } from "@/lib/seo";
import { TeacherDirectory } from "./TeacherDirectory";

export const metadata: Metadata = createPageMetadata({
	description: `查看${SITE_FULL_NAME}核心教师的教学背景、教研方向与代表性成果。`,
	path: "/lao-shi",
	title: "教师团队",
});

export default function TeachersPage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<main className="pb-16">
				<PageHeader
					actions={
						<PhoneButton className="h-12 rounded-xl px-6 font-semibold">
							电话咨询老师安排：{SITE_HOTLINE_TEXT}
						</PhoneButton>
					}
					badge="教师团队"
					description={
						<>
							这里集中展示{SITE_FULL_NAME}
							核心老师的教学背景、教研方向与代表性成果，方便家长和学生更直观了解师资实力。
						</>
					}
					items={[
						{ label: "首页", href: "/" },
						{ label: "教师团队", href: "/lao-shi" },
					]}
					title="核心老师介绍与教学履历"
				/>

				<section className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 md:pt-8 lg:px-8">
					<Suspense fallback={<TeacherDirectoryFallback />}>
						<TeacherDirectory />
					</Suspense>
				</section>
			</main>
		</div>
	);
}

function TeacherDirectoryFallback() {
	return (
		<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{TEACHERS.map((teacher) => (
				<TeacherCard key={teacher.slug} teacher={teacher} />
			))}
		</div>
	);
}
