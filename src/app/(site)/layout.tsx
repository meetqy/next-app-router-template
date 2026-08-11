import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { FloatingToolbar } from "@/components/floating-toolbar";
import { GlobalHeader } from "@/components/global-header";
import { Footer } from "@/components/home/Footer";
import { env } from "@/env";
import { SITE_FULL_NAME } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const siteUrl = new URL(`https://${env.NEXT_PUBLIC_SITE_DOMAIN}`);

export const metadata: Metadata = {
	title: {
		default: `${SITE_FULL_NAME}官网`,
		template: `%s | ${SITE_FULL_NAME}官网`,
	},
	description: `${SITE_FULL_NAME}官网，提供品牌介绍、总部信息、高考中心、高考复读、高考全日制、招生简章与电话咨询入口。`,
	metadataBase: siteUrl,
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function SiteLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			className={cn(geist.variable, "font-sans", inter.variable)}
			lang="zh-CN"
		>
			<body className="min-h-screen bg-slate-50 text-slate-950 antialiased">
				<div className="flex min-h-screen flex-col">
					<GlobalHeader />
					<main className="flex-1">{children}</main>
					<Footer />
					<FloatingToolbar />
				</div>
			</body>
		</html>
	);
}
