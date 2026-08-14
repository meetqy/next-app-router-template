import Link from "next/link";

export type ArticleListItem = {
	href: string;
	meta?: React.ReactNode;
	title: string;
};

export function ArticleList({ items }: { items: ArticleListItem[] }) {
	return (
		<div className="divide-y divide-slate-200 border-slate-200 border-y">
			{items.map((item) => (
				<Link
					className="group grid gap-1 px-2 py-3 transition-colors hover:bg-slate-100/70 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-3"
					href={item.href}
					key={item.href}
				>
					<h2 className="line-clamp-2 font-medium text-slate-950 text-sm leading-6 transition-colors group-hover:text-primary sm:text-base">
						{item.title}
					</h2>
					{item.meta ? (
						<div className="text-slate-500 text-xs sm:text-right sm:text-sm">
							{item.meta}
						</div>
					) : null}
				</Link>
			))}
		</div>
	);
}
