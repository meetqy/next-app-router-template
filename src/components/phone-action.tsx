import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SITE_HOTLINE_TEL } from "@/lib/constants/site";

type PhoneLinkProps = Omit<ComponentProps<typeof Link>, "href">;

export function PhoneLink({ children, ...props }: PhoneLinkProps) {
	return (
		<Link href={SITE_HOTLINE_TEL} {...props}>
			{children}
		</Link>
	);
}

type PhoneButtonProps = Omit<ComponentProps<typeof Button>, "asChild"> & {
	children: ReactNode;
	linkClassName?: string;
};

export function PhoneButton({
	children,
	linkClassName,
	...buttonProps
}: PhoneButtonProps) {
	return (
		<Button asChild {...buttonProps}>
			<Link className={linkClassName} href={SITE_HOTLINE_TEL}>
				{children}
			</Link>
		</Button>
	);
}
