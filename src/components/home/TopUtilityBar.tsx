import Link from "next/link";
import { SITE_HOTLINE_TEL, SITE_HOTLINE_TEXT } from "@/lib/constants/site";

export function TopUtilityBar() {
	return (
		<div className="border-slate-200 border-b bg-slate-50 py-2">
			<div className="container mx-auto flex items-center justify-between px-4 text-slate-600 text-sm">
				<div className="flex gap-4">
					<Link
						className="transition-colors hover:text-primary"
						href="/#xin-wen"
					>
						考试资讯
					</Link>
					<Link
						className="transition-colors hover:text-primary"
						href="/xiao-qu-cha-xun"
					>
						校区查询
					</Link>
					<Link
						className="transition-colors hover:text-primary"
						href="/jia-zhang-fu-wu/jia-zhang-wen-ti"
					>
						常见问题
					</Link>
				</div>
				<Link
					className="transition-colors hover:text-primary"
					href={SITE_HOTLINE_TEL}
				>
					24 小时热线：{SITE_HOTLINE_TEXT}
				</Link>
			</div>
		</div>
	);
}
