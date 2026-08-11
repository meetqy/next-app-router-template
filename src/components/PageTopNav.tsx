import { PhoneIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { JsonLd } from "@/components/JsonLd";
import { PhoneLink } from "@/components/phone-action";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { env } from "@/env";
import { SITE_HOTLINE_TEXT } from "@/lib/constants/site";
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
	containerClassName = "container mx-auto px-4",
	items,
}: PageTopNavProps) {
	const siteUrl = `https://${env.NEXT_PUBLIC_SITE_DOMAIN}`;

	return (
		<div className="w-full border-slate-200/80 border-b bg-white">
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
			<div
				className={cn(
					"flex min-h-10 items-center justify-between gap-4 py-2",
					containerClassName,
				)}
			>
				<Breadcrumb className="min-w-0">
					<BreadcrumbList className="flex-nowrap overflow-hidden">
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
				<PhoneLink className="flex shrink-0 items-center gap-2 font-semibold text-primary text-sm transition-opacity hover:opacity-80">
					<PhoneIcon className="size-4" />
					<span className="hidden sm:inline">{SITE_HOTLINE_TEXT}</span>
					<span className="sm:hidden">拨打电话</span>
				</PhoneLink>
			</div>
		</div>
	);
}
