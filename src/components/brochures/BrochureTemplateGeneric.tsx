import type { Brochure } from "@/lib/brochures";

export function BrochureTemplateGeneric({ brochure }: { brochure: Brochure }) {
	return (
		<div className="min-h-screen bg-white py-12 md:py-20">
			<article className="container mx-auto max-w-4xl px-4">
				<header className="mb-12 border-b pb-12">
					<h1 className="mb-6 font-bold text-4xl text-slate-900 md:text-5xl">
						{brochure.title}
					</h1>
					<div className="flex items-center gap-4 text-slate-500">
						<span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
							通用模版
						</span>
						<time>{brochure.year}-01-01</time>
					</div>
				</header>
				<div className="prose prose-slate prose-lg max-w-none">
					<div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
						{brochure.content}
					</div>
				</div>
			</article>
		</div>
	);
}
