import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { env } from "@/env";
import { cn } from "@/lib/utils";

export type PageBreadcrumbItem = {
	href: string;
	label: string;
};

type SharedPageHeaderProps = {
	className?: string;
	containerClassName?: string;
	items: PageBreadcrumbItem[];
};

type BreadcrumbOnlyPageHeaderProps = SharedPageHeaderProps & {
	actions?: never;
	badge?: never;
	breadcrumbOnly: true;
	description?: never;
	title?: never;
};

type StandardPageHeaderProps = SharedPageHeaderProps & {
	actions?: ReactNode;
	badge?: ReactNode;
	breadcrumbOnly?: false;
	description?: ReactNode;
	title: ReactNode;
};

type PageHeaderProps =
	| BreadcrumbOnlyPageHeaderProps
	| StandardPageHeaderProps;

const DEFAULT_CONTAINER_CLASS_NAME =
	"mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

export function PageHeader(props: PageHeaderProps) {
	const { className, containerClassName, items } = props;
	const siteUrl = `https://${env.NEXT_PUBLIC_SITE_DOMAIN}`;
	const sharedContainerClassName = cn(
		DEFAULT_CONTAINER_CLASS_NAME,
		containerClassName,
	);

	return (
		<section
			className={cn(props.breadcrumbOnly ? "bg-transparent" : "bg-white", className)}
		>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: items.map((item, index) => ({
						"@type": "ListItem",
						position: index + 1,
						name: item.label,
						item: new URL(item.href, siteUrl).toString(),
					})),
				}}
			/>
			<Breadcrumb className={cn("pt-4 pb-2", sharedContainerClassName)}>
				<BreadcrumbList>
					{items.map((item, index) => (
						<Fragment key={item.href}>
							{index > 0 ? <BreadcrumbSeparator /> : null}
							<BreadcrumbItem className="min-w-0">
								{index < items.length - 1 ? (
									<BreadcrumbLink asChild>
										<Link className="truncate" href={item.href}>
											{item.label}
										</Link>
									</BreadcrumbLink>
								) : (
									<BreadcrumbPage className="truncate">
										{item.label}
									</BreadcrumbPage>
								)}
							</BreadcrumbItem>
						</Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>

			{props.breadcrumbOnly ? null : (
				<div className={cn(sharedContainerClassName, "py-12 md:py-16")}>
					<StandardHeaderContent {...props} />
				</div>
			)}
		</section>
	);
}

function StandardHeaderContent({
	actions,
	badge,
	description,
	title,
}: StandardPageHeaderProps) {
	return (
		<div className="mx-auto max-w-3xl space-y-4 text-center">
			{badge ? (
				<div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-medium text-primary text-sm">
					{badge}
				</div>
			) : null}
			<h1 className="font-bold text-3xl text-slate-900 md:text-5xl">
				{title}
			</h1>
			{description ? (
				<p className="mx-auto max-w-2xl text-base text-slate-600 leading-relaxed md:text-lg">
					{description}
				</p>
			) : null}
			{actions ? (
				<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
					{actions}
				</div>
			) : null}
		</div>
	);
}
