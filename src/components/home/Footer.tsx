import Link from "next/link";
import { PhoneLink } from "@/components/phone-action";
import { CONTACT_CHANNELS } from "@/lib/constants/contact";
import { SITE_BRAND_NAME, SITE_HOTLINE_TEXT } from "@/lib/constants/site";

export function Footer() {
	return (
		<footer className="bg-slate-900 py-10 text-white md:py-12">
			<div className="container mx-auto px-4">
				<div className="mb-8 grid gap-8 md:grid-cols-4">
					<div className="col-span-1 md:col-span-1">
						<h3 className="mb-6 font-bold text-2xl">{SITE_BRAND_NAME}</h3>
						<p className="text-slate-400 text-sm leading-relaxed">
							专注个性化教学与高考备考服务，围绕教学、管理、陪伴与规划，为学生提供更系统的成长支持。
						</p>
					</div>

					<div>
						<h4 className="mb-6 font-bold text-slate-500 text-sm uppercase tracking-widest">
							核心项目
						</h4>
						<ul className="space-y-4 text-slate-400">
							<li>
								<Link
									className="transition-colors hover:text-white"
									href="/#gao-kao-quan-ri-zhi"
								>
									高考全日制
								</Link>
							</li>
							<li>
								<Link
									className="transition-colors hover:text-white"
									href="/#jiao-xue-jiao-yan"
								>
									教学教研
								</Link>
							</li>
							<li>
								<Link
									className="transition-colors hover:text-white"
									href="/#lao-shi-tuan-dui"
								>
									师资团队
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="mb-6 font-bold text-slate-500 text-sm uppercase tracking-widest">
							帮助中心
						</h4>
						<ul className="space-y-4 text-slate-400">
							<li>
								<Link
									className="transition-colors hover:text-white"
									href="/jia-zhang-fu-wu/jia-zhang-wen-ti"
								>
									家长问答
								</Link>
							</li>
							<li>
								<Link
									className="transition-colors hover:text-white"
									href="/xiao-qu-cha-xun"
								>
									校区查询
								</Link>
							</li>
							<li>
								<Link
									className="transition-colors hover:text-white"
									href="/zhao-sheng-jian-zhang"
								>
									招生简章
								</Link>
							</li>
							<li>
								<Link
									className="transition-colors hover:text-white"
									href="/#xin-wen"
								>
									考试资讯
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="mb-6 font-bold text-slate-500 text-sm uppercase tracking-widest">
							联系我们
						</h4>
						<ul className="space-y-4 text-slate-400">
							{CONTACT_CHANNELS.some((item) => item.label === "咨询热线") ? (
								<li>
									<PhoneLink className="transition-colors hover:text-white">
										咨询热线：{SITE_HOTLINE_TEXT}
									</PhoneLink>
								</li>
							) : null}
							{CONTACT_CHANNELS.filter(
								(item) => item.label !== "咨询热线" && item.href,
							).map((item) => (
								<li key={item.label}>
									<a
										className="transition-colors hover:text-white"
										href={item.href}
										rel="noopener noreferrer"
										target="_blank"
									>
										{item.label}：{item.value}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="border-white/10 border-t pt-5 text-center text-slate-500 text-xs md:text-sm">
					<p className="mb-1.5">© 2026 {SITE_BRAND_NAME} 版权所有</p>
					<p>
						<a
							className="transition-colors hover:text-slate-300"
							href="https://beian.miit.gov.cn/"
							rel="noopener noreferrer"
							target="_blank"
						>
							蜀ICP备2021012513号-7
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
