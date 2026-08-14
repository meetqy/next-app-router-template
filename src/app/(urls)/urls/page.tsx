import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { getSiteUrls, URLS_PER_PAGE } from "@/lib/site-urls";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	description: "戴氏高考网站全部公开页面 URL 的分页文本目录。",
	path: "/urls",
	title: "URL 目录",
});

export default function UrlsPage() {
	const totalUrls = getSiteUrls().length;
	const totalPages = Math.ceil(totalUrls / URLS_PER_PAGE);
	const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

	return (
		<>
			<PageHeader
				breadcrumbOnly
				items={[
					{ href: "/", label: "首页" },
					{ href: "/urls", label: "URL 目录" },
				]}
			/>
			<main className="container mx-auto px-4 py-10 sm:py-14">
				<header>
					<p className="font-medium text-primary text-sm">站点索引</p>
					<h1 className="mt-2 font-bold text-3xl text-slate-950 sm:text-4xl">
						URL 目录
					</h1>
					<p className="mt-4 text-slate-600">
						共 {totalUrls} 条页面 URL，每个文本文件最多包含 {URLS_PER_PAGE}
						条。
					</p>
				</header>

				<section className="mt-10 rounded-2xl bg-slate-50 p-6 sm:p-8">
					<h2 className="font-semibold text-slate-950 text-xl">分页文件</h2>
					<div className="mt-4">
						{pages.map((pageNumber) => {
							const start = (pageNumber - 1) * URLS_PER_PAGE + 1;
							const end = Math.min(pageNumber * URLS_PER_PAGE, totalUrls);

							return (
								<Link
									className="flex items-center justify-between gap-4 border-slate-200 border-b py-4 text-slate-900 transition-colors last:border-b-0 hover:text-primary"
									href={`/urls/${pageNumber}/index.txt`}
									key={pageNumber}
								>
									<span className="font-medium">
										/urls/{pageNumber}/index.txt
									</span>
									<span className="text-slate-500 text-sm">
										第 {start}–{end} 条
									</span>
								</Link>
							);
						})}
					</div>
				</section>
			</main>
		</>
	);
}
