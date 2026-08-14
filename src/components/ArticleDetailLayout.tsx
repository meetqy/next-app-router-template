import Link from "next/link";
import type { ReactNode } from "react";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export type DetailLink = {
	href: string;
	title: string;
};

type ArticleDetailLayoutProps = {
	children: ReactNode;
	next?: DetailLink | null;
	previous?: DetailLink | null;
	sidebar: ReactNode;
	siblingAriaLabel?: string;
};

export function ArticleDetailLayout({
	children,
	next,
	previous,
	sidebar,
	siblingAriaLabel = "上下篇文章",
}: ArticleDetailLayoutProps) {
	const showSiblingNavigation = next !== undefined || previous !== undefined;

	return (
		<main className="mx-auto w-full max-w-7xl px-4 pt-2 pb-8 sm:px-6 md:pb-12 lg:px-8">
			<div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
				<div className="space-y-5">
					<article>{children}</article>
					{showSiblingNavigation ? (
						<SiblingNavigation
							ariaLabel={siblingAriaLabel}
							next={next ?? null}
							previous={previous ?? null}
						/>
					) : null}
				</div>

				<aside className="space-y-5 lg:sticky lg:top-16 lg:self-start">
					{sidebar}
				</aside>
			</div>
		</main>
	);
}

export function DetailSidebarCard({
	children,
	moreHref,
	title,
}: {
	children: ReactNode;
	moreHref?: string;
	title: string;
}) {
	return (
		<Card>
			<CardHeader className="border-b">
				<CardTitle className="border-primary border-l-4 pl-3">
					{title}
				</CardTitle>
				{moreHref ? (
					<CardAction>
						<Link
							className="text-muted-foreground text-xs hover:text-primary"
							href={moreHref}
						>
							更多+
						</Link>
					</CardAction>
				) : null}
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}

export function RelatedLinksCard({
	items,
	moreHref,
	title,
}: {
	items: DetailLink[];
	moreHref: string;
	title: string;
}) {
	if (items.length === 0) {
		return null;
	}

	return (
		<DetailSidebarCard moreHref={moreHref} title={title}>
			<ul className="divide-y divide-border text-sm">
				{items.map((item) => (
					<li key={item.href}>
						<Link
							className="block truncate py-2 text-muted-foreground hover:text-primary"
							href={item.href}
							title={item.title}
						>
							{item.title}
						</Link>
					</li>
				))}
			</ul>
		</DetailSidebarCard>
	);
}

function SiblingNavigation({
	ariaLabel,
	next,
	previous,
}: {
	ariaLabel: string;
	next: DetailLink | null;
	previous: DetailLink | null;
}) {
	return (
		<Card size="sm">
			<CardContent>
				<nav aria-label={ariaLabel} className="divide-y divide-border text-sm">
					<SiblingNavigationItem item={previous} label="上一篇" />
					<SiblingNavigationItem item={next} label="下一篇" />
				</nav>
			</CardContent>
		</Card>
	);
}

function SiblingNavigationItem({
	item,
	label,
}: {
	item: DetailLink | null;
	label: string;
}) {
	return (
		<p className="flex gap-2 py-2 text-muted-foreground">
			<span className="shrink-0">{label}：</span>
			{item ? (
				<Link
					className="line-clamp-1 text-foreground hover:text-primary"
					href={item.href}
				>
					{item.title}
				</Link>
			) : (
				<span>没有了</span>
			)}
		</p>
	);
}
