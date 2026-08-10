"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export type TocItem = {
	id: string;
	title: string;
};

interface TableOfContentsProps {
	items: TocItem[];
	title?: string;
	className?: string;
	/**
	 * 额外的链接项，例如“相关家长问答”
	 */
	extraItems?: {
		id: string;
		title: string;
	}[];
}

/**
 * 通用目录组件
 * 修复了在有吸顶菜单的情况下，目录被挡住的问题
 */
export function TableOfContents({
	items,
	title = "目录内容",
	className,
	extraItems,
}: TableOfContentsProps) {
	return (
		<aside className={cn("lg:sticky lg:top-48 lg:self-start", className)}>
			<div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6">
				<div className="mb-4 font-bold text-slate-900 text-sm uppercase tracking-wider">
					{title}
				</div>
				<nav className="flex flex-col gap-y-3.5 text-sm">
					{items.map((item) => (
						<Link
							className="group flex items-center gap-2 text-slate-500 transition-colors hover:text-primary"
							href={`#${item.id}`}
							key={item.id}
						>
							<span className="h-px w-3 bg-slate-300 transition-all group-hover:w-5 group-hover:bg-primary" />
							<span className="flex-1 truncate">{item.title}</span>
						</Link>
					))}
					{extraItems?.map((item) => (
						<Link
							className="group flex items-center gap-2 text-slate-500 transition-colors hover:text-primary"
							href={`#${item.id}`}
							key={item.id}
						>
							<span className="h-px w-3 bg-slate-300 transition-all group-hover:w-5 group-hover:bg-primary" />
							<span className="flex-1 truncate">{item.title}</span>
						</Link>
					))}
				</nav>
			</div>
		</aside>
	);
}
