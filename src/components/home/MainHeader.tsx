import Link from "next/link";
import { PhoneButton } from "@/components/phone-action";
import { SITE_BRAND_NAME } from "@/lib/constants/site";

export function MainHeader() {
	return (
		<header className="sticky top-0 z-50 border-slate-200 border-b bg-white/80 backdrop-blur-md">
			<div className="container mx-auto flex items-center justify-between px-4 py-4">
				<Link className="font-bold text-2xl text-primary" href="/">
					{SITE_BRAND_NAME}
				</Link>

				<nav className="hidden items-center gap-8 font-medium md:flex">
					<Link
						className="text-slate-900 transition-colors hover:text-primary"
						href="/"
					>
						首页
					</Link>
					<Link
						className="text-slate-600 transition-colors hover:text-primary"
						href="#gao-kao-quan-ri-zhi"
					>
						高考全日制
					</Link>
					<Link
						className="text-slate-600 transition-colors hover:text-primary"
						href="#jiao-xue-jiao-yan"
					>
						教学体系
					</Link>
					<Link
						className="text-slate-600 transition-colors hover:text-primary"
						href="#lao-shi-tuan-dui"
					>
						师资团队
					</Link>
					<Link
						className="text-slate-600 transition-colors hover:text-primary"
						href="/jiao-xue-huan-jing"
					>
						教学环境
					</Link>
				</nav>

				<PhoneButton className="px-6">立即咨询</PhoneButton>
			</div>
		</header>
	);
}
