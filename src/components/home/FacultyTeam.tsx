import Link from "next/link";
import { TeacherCard } from "@/components/teachers/TeacherCard";
import { TEACHERS } from "@/lib/constants/teachers";

const HOME_TEACHERS = TEACHERS.slice(0, 8);

export function FacultyTeam() {
	return (
		<section className="bg-slate-50 py-20" id="lao-shi-tuan-dui">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-16 text-center">
					<h2 className="mb-4 font-bold text-3xl text-slate-900 md:text-4xl">
						孩子的老师是什么样的
					</h2>
					<p className="mx-auto max-w-2xl text-slate-600">
						由经验丰富的学科骨干老师和教学带头人组成，长期稳定带班，熟悉每个阶段孩子的学习问题。
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
					{HOME_TEACHERS.map((teacher) => (
						<TeacherCard key={teacher.slug} teacher={teacher} />
					))}
				</div>
				<div className="mt-10 text-center">
					<Link
						className="font-semibold text-primary transition-opacity hover:opacity-80"
						href="/lao-shi"
					>
						查看全部老师详情
					</Link>
				</div>
			</div>
		</section>
	);
}
