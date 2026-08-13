"use client";

import { ChevronDownIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PhoneButton } from "@/components/phone-action";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { imageUrl } from "@/lib/image-url";

export function GlobalHeader() {
	const handlePrimaryTriggerMouseDown = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
	};

	return (
		<header className="sticky top-0 z-80 border-slate-200/80 border-b bg-white/90 backdrop-blur">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex min-h-20 items-center justify-between gap-4 py-3">
					<Link
						className="flex items-center gap-3 text-slate-950 transition-opacity hover:opacity-80"
						href="/"
					>
						<Image
							alt="戴氏教育标志"
							className="h-9 w-auto object-contain sm:h-10 lg:h-12"
							height={974}
							priority
							src={imageUrl("/logo.png")}
							width={3216}
						/>
					</Link>

					<nav
						aria-label="主导航"
						className="hidden items-center gap-1 lg:flex"
					>
						{PRIMARY_LINKS.map((link) =>
							"items" in link ? (
								<DropdownMenu key={`primary-dropdown-${link.label}`}>
									<DropdownMenuTrigger asChild>
										<Button
											className="rounded-full px-4 py-2 font-medium text-slate-700 text-sm hover:bg-slate-100 hover:text-slate-950"
											onMouseDown={handlePrimaryTriggerMouseDown}
											variant="ghost"
										>
											{link.label}
											<ChevronDownIcon className="size-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="center"
										className="w-56"
										onCloseAutoFocus={(event) => {
											event.preventDefault();
										}}
									>
										{link.items.map((item) => (
											<DropdownMenuItem
												asChild
												key={`primary-item-${item.label}`}
											>
												<Link href={item.href}>{item.label}</Link>
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							) : (
								<Link
									className="rounded-full px-4 py-2 font-medium text-slate-700 text-sm transition-colors hover:bg-slate-100 hover:text-slate-950"
									href={link.href}
									key={`primary-link-${link.label}`}
								>
									{link.label}
								</Link>
							),
						)}
					</nav>

					<div className="flex items-center gap-2">
						<div className="hidden items-center sm:flex">
							<PhoneButton
								className="bg-primary hover:bg-primary/90"
								size="lg"
							>
								24 小时免费热线：{SITE_HOTLINE_TEXT}
							</PhoneButton>
						</div>
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
									<SheetTitle className="truncate whitespace-nowrap">
										站点导航
									</SheetTitle>
								<SheetDescription className="truncate whitespace-nowrap">
									查看教师、校区、案例与招生备考资讯
									</SheetDescription>
								</SheetHeader>

								<div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-5">
									<nav
										aria-label="移动端主导航"
										className="flex flex-col gap-4"
									>
										<div className="flex flex-col gap-2">
											<p className="font-medium text-slate-950 text-sm">
												主导航
											</p>
											{PRIMARY_LINKS.map((link) => {
												if ("items" in link) {
													return (
														<div
															className="flex flex-col gap-2"
															key={`mobile-group-${link.label}`}
														>
															<p className="px-3 text-slate-500 text-xs tracking-wide">
																{link.label}
															</p>
															<div className="flex flex-col">
																{link.items.map((item) => (
																	<SheetClose
																		asChild
																		key={`mobile-item-${item.label}`}
																	>
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

												if (link.href.startsWith("tel:")) {
													return null;
												}

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
					</div>
				</div>
			</div>
		</header>
	);
}
