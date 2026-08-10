import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
