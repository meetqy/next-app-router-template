import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
	actions?: ReactNode;
	align?: "center" | "left";
	badge?: ReactNode;
	children?: ReactNode;
	className?: string;
	containerClassName?: string;
	description?: ReactNode;
	descriptionClassName?: string;
	footer?: ReactNode;
	label?: ReactNode;
	title: ReactNode;
	titleClassName?: string;
};

export function PageHero({
	actions,
	align = "center",
	badge,
	children,
	className,
	containerClassName,
	description,
	descriptionClassName,
	footer,
	label,
	title,
	titleClassName,
}: PageHeroProps) {
	const isCenter = align === "center";

	return (
		<section className={cn("bg-white", className)}>
			<div
				className={cn(
					"mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8",
					containerClassName,
				)}
			>
				<div
					className={cn(
						"space-y-4",
						isCenter ? "mx-auto max-w-3xl text-center" : "max-w-4xl",
					)}
				>
					{badge ? (
						<div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-medium text-primary text-sm">
							{badge}
						</div>
					) : null}
					{label ? (
						<p className="font-semibold text-primary text-sm">{label}</p>
					) : null}
					<h1
						className={cn(
							"font-bold text-3xl text-slate-900 md:text-5xl",
							!isCenter && "leading-tight",
							titleClassName,
						)}
					>
						{title}
					</h1>
					{description ? (
						<p
							className={cn(
								"text-base text-slate-600 leading-relaxed md:text-lg",
								isCenter ? "mx-auto max-w-2xl" : "max-w-3xl leading-8",
								descriptionClassName,
							)}
						>
							{description}
						</p>
					) : null}
					{children}
					{actions ? (
						<div
							className={cn(
								"flex flex-col gap-3 sm:flex-row",
								isCenter && "items-center justify-center",
							)}
						>
							{actions}
						</div>
					) : null}
				</div>
				{footer ? <div className="mt-10">{footer}</div> : null}
			</div>
		</section>
	);
}
