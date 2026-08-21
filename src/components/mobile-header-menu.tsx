"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { PhoneButton } from "@/components/phone-action";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { PRIMARY_LINKS, SITE_HOTLINE_TEXT } from "@/lib/constants/site";

export function MobileHeaderMenu() {
	return (
		<Sheet>
			<div className="lg:hidden">
				<SheetTrigger asChild>
					<Button aria-label="打开菜单" size="icon" variant="ghost">
						<MenuIcon />
					</Button>
				</SheetTrigger>
			</div>
			<SheetContent
				className="w-[88vw] max-w-sm border-slate-200 bg-white p-0 lg:hidden"
				side="right"
			>
				<SheetHeader className="gap-1 border-slate-200 border-b pr-12">
					<SheetTitle className="truncate whitespace-nowrap">站点导航</SheetTitle>
					<SheetDescription className="truncate whitespace-nowrap">
						查看教师、校区、案例与招生备考资讯
					</SheetDescription>
				</SheetHeader>

				<div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-5">
					<nav aria-label="移动端主导航" className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<p className="font-medium text-slate-950 text-sm">主导航</p>
							{PRIMARY_LINKS.map((link) => {
								if ("items" in link) {
									return (
										<div className="flex flex-col gap-2" key={`mobile-group-${link.label}`}>
											<p className="px-3 text-slate-500 text-xs tracking-wide">{link.label}</p>
											<div className="flex flex-col">
												{link.items.map((item) => (
													<SheetClose asChild key={`mobile-item-${item.label}`}>
														<Link
															className="rounded-2xl px-3 py-3 font-medium text-slate-700 text-sm transition-colors hover:bg-slate-100 hover:text-slate-950"
															href={item.href}
														>
															{item.label}
														</Link>
													</SheetClose>
												))}
											</div>
										</div>
									);
								}

								if (link.href.startsWith("tel:")) return null;

								return (
									<SheetClose asChild key={`mobile-link-${link.label}`}>
										<Link
											className="rounded-2xl px-3 py-3 font-medium text-slate-700 text-sm transition-colors hover:bg-slate-100 hover:text-slate-950"
											href={link.href}
										>
											{link.label}
										</Link>
									</SheetClose>
								);
							})}
						</div>
					</nav>
				</div>

				<SheetFooter className="border-slate-200 border-t bg-slate-50/80">
					<PhoneButton
						className="w-full bg-primary hover:bg-primary/90"
						linkClassName="w-full"
						size="lg"
					>
						24 小时免费热线：{SITE_HOTLINE_TEXT}
					</PhoneButton>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
