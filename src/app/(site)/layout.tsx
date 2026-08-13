import "@/styles/globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import Script from "next/script";
import { FloatingToolbar } from "@/components/floating-toolbar";
import { GlobalHeader } from "@/components/global-header";
import { Footer } from "@/components/home/Footer";
import { JsonLd } from "@/components/JsonLd";
import { env } from "@/env";
import { CONTACT_HEADQUARTERS } from "@/lib/constants/contact";
import {
	SITE_BRAND_NAME,
	SITE_FULL_NAME,
	SITE_HOTLINE_TEXT,
} from "@/lib/constants/site";
import { getPublicImageUrl, getSiteUrl } from "@/lib/seo";
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
	openGraph: {
		description: `${SITE_FULL_NAME}官网，提供品牌介绍、总部信息、高考中心、高考复读、高考全日制、招生简章与电话咨询入口。`,
		images: [
			{
				alt: "戴氏教育高考提分主视觉",
				url: getPublicImageUrl("/assets/高考提分解决方案-(4).png"),
			},
		],
		locale: "zh_CN",
		siteName: SITE_BRAND_NAME,
		title: `${SITE_FULL_NAME}官网`,
		type: "website",
		url: "/",
	},
	twitter: {
		card: "summary_large_image",
		description: `${SITE_FULL_NAME}官网，提供品牌介绍、总部信息、高考中心、高考复读、高考全日制、招生简章与电话咨询入口。`,
		images: [getPublicImageUrl("/assets/高考提分解决方案-(4).png")],
		title: `${SITE_FULL_NAME}官网`,
	},
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
				<Script
					id="ttzz"
					src="https://lf1-cdn-tos.bytegoofy.com/goofy/ttzz/push.js?c85c4569b226fdb39e4f45bc961f18c591f3c26992111e3ff0a04eb7671022ea3871f0d6a9220c04b06cd03d5ba8e733fe66d20303562cd119c1d6f449af6378"
				/>
				<JsonLd
					data={{
						"@context": "https://schema.org",
						"@graph": [
							{
								"@type": "Organization",
								address: {
									"@type": "PostalAddress",
									addressCountry: "CN",
									addressLocality: "成都市",
									addressRegion: "四川省",
									streetAddress: CONTACT_HEADQUARTERS.address,
								},
								logo: getPublicImageUrl("/logo.png"),
								name: SITE_BRAND_NAME,
								telephone: SITE_HOTLINE_TEXT,
								url: getSiteUrl().toString(),
							},
							{
								"@type": "WebSite",
								inLanguage: "zh-CN",
								name: `${SITE_BRAND_NAME}官网`,
								url: getSiteUrl().toString(),
							},
						],
					}}
				/>
				<div className="flex min-h-screen flex-col">
					<GlobalHeader />
					<div className="flex-1">{children}</div>
					<Footer />
					<FloatingToolbar />
				</div>
			</body>
			<GoogleAnalytics gaId="G-6ZW8V4ESJH" />
		</html>
	);
}
