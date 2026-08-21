import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MobileHeaderMenu } from "@/components/mobile-header-menu";
import { PhoneButton } from "@/components/phone-action";
import { PRIMARY_LINKS, SITE_HOTLINE_TEXT } from "@/lib/constants/site";
import { imageUrl } from "@/lib/image-url";

export function GlobalHeader() {
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
								<details className="group relative" key={`primary-dropdown-${link.label}`}>
									<summary className="flex cursor-pointer list-none items-center gap-2 rounded-full px-4 py-2 font-medium text-slate-700 text-sm transition-colors hover:bg-slate-100 hover:text-slate-950 [&::-webkit-details-marker]:hidden">
										{link.label}
										<ChevronDownIcon className="size-4 transition-transform group-open:rotate-180" />
									</summary>
									<div className="absolute top-full left-1/2 z-100 mt-2 w-56 -translate-x-1/2 rounded-lg bg-white p-1 text-slate-950 shadow-md ring-1 ring-slate-950/10">
										{link.items.map((item) => (
											<Link
												className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
												href={item.href}
												key={`primary-item-${item.label}`}
											>
												{item.label}
											</Link>
										))}
									</div>
								</details>
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
						<MobileHeaderMenu />
					</div>
				</div>
			</div>
		</header>
	);
}
