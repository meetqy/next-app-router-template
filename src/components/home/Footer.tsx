import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { PhoneLink } from "@/components/phone-action";
import { CONTACT_HEADQUARTERS } from "@/lib/constants/contact";
import { SITE_BRAND_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";

const FOOTER_LINK_GROUPS = [
	{
		align: "text-left",
		links: [
			{ href: "/lao-shi", label: "教师团队" },
			{ href: "/xiao-qu-cha-xun", label: "校区查询" },
			{ href: "/zi-liao-ku", label: "资讯中心" },
		],
		title: "快速入口",
	},
	{
		align: "text-center",
		links: [
			{ href: "/sheng-xue-xi-bao", label: "升学案例" },
			{ href: "/ti-fen-an-li", label: "提分案例" },
		],
		title: "案例展示",
	},
	{
		align: "text-center",
		links: [
			{ href: "/jiao-xue-huan-jing", label: "教学环境" },
			{ href: "/rong-yu-zi-zhi", label: "荣誉资质" },
			{ href: "/lian-xi-wo-men", label: "联系我们" },
			{ href: "/guan-fang-he-yan", label: "官网核验" },
		],
		title: "了解戴氏",
	},
	{
		align: "text-right",
		links: [
			{
				href: "/zi-liao-ku/fen-lei/zhao-sheng-ke-cheng",
				label: "招生课程",
			},
			{
				href: "/zi-liao-ku/fen-lei/fei-yong-fu-wu",
				label: "费用服务",
			},
			{
				href: "/zi-liao-ku/fen-lei/sheng-xue-zheng-ce",
				label: "升学政策",
			},
			{
				href: "/zi-liao-ku/fen-lei/jia-zhang-wen-da",
				label: "家长问答",
			},
		],
		title: "资讯分类",
	},
] as const;

export function Footer() {
	return (
		<footer className="bg-slate-950 text-white">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid gap-8 border-white/10 border-b py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(420px,0.85fr)] lg:items-center lg:gap-16 lg:py-12">
					<div className="max-w-2xl">
						<p className="font-semibold text-red-400 text-sm tracking-wider">
							成都戴氏教育高考中心
						</p>
						<h2 className="mt-3 font-bold text-2xl tracking-tight sm:text-3xl">
							三代人的选择，三十年的信任！
						</h2>
					</div>

					<div className="border-white/10 border-t pt-7 lg:border-t-0 lg:border-l lg:py-2 lg:pl-12">
						<p className="text-slate-400 text-sm">24 小时免费热线</p>
						<PhoneLink className="mt-2 flex w-fit items-center gap-3 font-bold text-2xl tracking-wide transition-colors hover:text-red-400 sm:text-3xl">
							<Phone aria-hidden="true" className="size-6 text-red-400" />
							{SITE_HOTLINE_TEXT}
						</PhoneLink>
						<a
							className="mt-4 flex items-start gap-2 text-slate-400 text-sm leading-6 transition-colors hover:text-white"
							href={CONTACT_HEADQUARTERS.mapHref}
							rel="noopener noreferrer"
							target="_blank"
						>
							<MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red-400" />
							<span>{CONTACT_HEADQUARTERS.address}</span>
							<ArrowUpRight aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
						</a>
					</div>
				</div>

				<nav
					aria-label="页脚导航"
					className="grid grid-cols-2 gap-x-6 gap-y-8 py-9 md:grid-cols-4 md:py-10"
				>
					{FOOTER_LINK_GROUPS.map((group) => (
						<div className={group.align} key={group.title}>
							<h3 className="font-semibold text-sm text-white">{group.title}</h3>
							<ul className="mt-4 space-y-2.5 text-slate-400 text-sm">
								{group.links.map((link) => (
									<li key={link.href}>
										<Link
											className="transition-colors hover:text-white"
											href={link.href}
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>

				<div className="flex flex-col gap-2 border-white/10 border-t py-5 text-slate-500 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm">
					<p>© 2026 {SITE_BRAND_NAME} 版权所有</p>
					<a
						className="w-fit transition-colors hover:text-slate-300"
						href="https://beian.miit.gov.cn/"
						rel="noopener noreferrer"
						target="_blank"
					>
						蜀ICP备2021012513号-7
					</a>
				</div>
			</div>
		</footer>
	);
}
