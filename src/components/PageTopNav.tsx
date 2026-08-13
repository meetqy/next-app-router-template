import Link from "next/link";
import { Fragment } from "react";
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

type PageTopNavProps = {
	items: PageBreadcrumbItem[];
	/** 传入容器类名可让返回栏与页面主体对齐，默认沿用全屏 container */
	containerClassName?: string;
};

export function PageTopNav({
	containerClassName = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
	items,
}: PageTopNavProps) {
	const siteUrl = `https://${env.NEXT_PUBLIC_SITE_DOMAIN}`;

	return (
		<>
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
			<Breadcrumb className={cn("py-3", containerClassName)}>
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
		</>
	);
}
