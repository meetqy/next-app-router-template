import Link from "next/link";

export function AdmissionsEntry() {
	return (
		<section
			className="bg-primary py-20 text-primary-foreground"
			id="zhao-sheng-jian-zhang"
		>
			<div className="container mx-auto px-4 text-center">
				<h2 className="mb-6 font-bold text-3xl md:text-5xl">想看招生简章？</h2>
				<p className="mx-auto mb-10 max-w-2xl text-xl opacity-90">
					里面写清楚了课程安排、收费方式、报名流程和什么时候入学，家长可以先下载一份看看。
				</p>
				<Link
					className="inline-block rounded-full bg-white px-10 py-4 font-bold text-lg text-primary transition-colors hover:bg-slate-100"
					href="/zhao-sheng-jian-zhang"
				>
					查看招生简章
				</Link>
			</div>
		</section>
	);
}
