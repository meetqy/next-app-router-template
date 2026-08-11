import "@/styles/globals.css";

import type { Metadata } from "next";
import { env } from "@/env";

export const metadata: Metadata = {
	metadataBase: new URL(`https://${env.NEXT_PUBLIC_SITE_DOMAIN}`),
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function UrlsLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="zh-CN">
			<body className="min-h-screen bg-white text-slate-950 antialiased">
				{children}
			</body>
		</html>
	);
}
