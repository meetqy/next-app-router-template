"use client";

import { ArrowUpIcon, PhoneIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { PhoneLink } from "@/components/phone-action";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FloatingToolbar() {
	const [showBackToTop, setShowBackToTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowBackToTop(window.scrollY > 400);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div className="fixed right-6 bottom-24 z-50 flex flex-col gap-3">
			{/* 立即咨询按钮 */}
			<PhoneLink className="group flex items-center justify-center">
				<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg transition-all hover:scale-105 hover:bg-primary/90">
					<div className="flex flex-col items-center">
						<PhoneIcon className="size-6" />
						<span className="mt-1 font-bold text-[10px] leading-none">
							咨询
						</span>
					</div>
				</div>
				{/* 悬浮文字提示 */}
				<div className="absolute right-16 hidden whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-sm text-white shadow-xl group-hover:block">
					立即咨询热线
					<div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-slate-900" />
				</div>
			</PhoneLink>

			{/* 返回顶部按钮 */}
			<Button
				className={cn(
					"h-14 w-14 rounded-2xl bg-white text-slate-600 shadow-lg transition-all hover:bg-slate-50 hover:text-primary",
					!showBackToTop && "pointer-events-none translate-y-10 opacity-0",
				)}
				onClick={scrollToTop}
				size="icon"
				variant="outline"
			>
				<div className="flex flex-col items-center">
					<ArrowUpIcon className="size-6" />
					<span className="mt-1 font-bold text-[10px] leading-none">顶部</span>
				</div>
			</Button>
		</div>
	);
}
