import type { NextConfig } from "next";
import "./src/env.js";

const isProductionBuild = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
	...(isProductionBuild ? { output: "export" } : {}),
	trailingSlash: false,
	images: {
		loader: "custom",
		loaderFile: "./src/lib/tencent-image-loader.ts",
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.dai-shi.cn",
				pathname: "/site-assets/**",
			},
		],
	},
};

export default nextConfig;
