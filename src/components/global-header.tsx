"use client";

import { ChevronDownIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PhoneButton, PhoneLink } from "@/components/phone-action";
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
import {
	PRIMARY_LINKS,
	SITE_BRAND_NAME,
	SITE_HOTLINE_TEXT,
	UTILITY_LINKS,
} from "@/lib/constants/site";

export function GlobalHeader() {
	const handlePrimaryTriggerMouseDown = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
	};

	return (
		<header className="sticky top-0 z-80 border-slate-200/80 border-b bg-white/90 backdrop-blur">
			<div className="border-slate-200/80 border-b bg-slate-50/95">
				<div className="mx-auto flex min-h-10 w-full max-w-7xl items-center justify-between gap-3 px-4 py-2 text-slate-600 text-sm sm:px-6 lg:px-8">
					<nav
						aria-label="辅助导航"
						className="flex min-w-0 items-center gap-x-3 gap-y-1"
					>
						<Link
							className="font-medium text-slate-800 transition-colors hover:text-slate-950"
							href="/"
						>
							{SITE_BRAND_NAME}
						</Link>
						{UTILITY_LINKS.map((link) => (
							<Link
								className="hidden transition-colors hover:text-slate-950 lg:inline-flex"
								href={link.href}
								key={`utility-${link.label}`}
							>
								{link.label}
							</Link>
						))}
					</nav>
					<PhoneLink className="shrink-0 whitespace-nowrap text-right text-slate-500 text-xs transition-colors hover:text-slate-950 sm:text-sm">
						24 小时免费热线：{SITE_HOTLINE_TEXT}
					</PhoneLink>
				</div>
			</div>
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
							src="/logo.png"
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
							<PhoneButton className="bg-primary hover:bg-primary/90" size="lg">
								立即咨询
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
										查看课程、校区和升学相关信息
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

										<div className="flex flex-col gap-2 border-slate-200 border-t pt-4">
											<p className="font-medium text-slate-950 text-sm">
												快捷入口
											</p>
											{UTILITY_LINKS.map((link) => (
												<SheetClose
													asChild
													key={`mobile-utility-${link.label}`}
												>
													<Link
														className="rounded-2xl px-3 py-3 text-slate-600 text-sm transition-colors hover:bg-slate-100 hover:text-slate-950"
														href={link.href}
													>
														{link.label}
													</Link>
												</SheetClose>
											))}
										</div>
									</nav>
								</div>

								<SheetFooter className="border-slate-200 border-t bg-slate-50/80">
									<PhoneButton
										className="w-full bg-primary hover:bg-primary/90"
										linkClassName="w-full"
										size="lg"
									>
										立即咨询
									</PhoneButton>
									<PhoneLink className="text-center text-slate-500 text-sm transition-colors hover:text-slate-950">
										24 小时免费热线：{SITE_HOTLINE_TEXT}
									</PhoneLink>
								</SheetFooter>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
}
