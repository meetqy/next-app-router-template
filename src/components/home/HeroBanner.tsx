import Image from "next/image";
import Link from "next/link";
import { PhoneButton } from "@/components/phone-action";
import { SITE_FULL_NAME } from "@/lib/constants/site";

export function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-144 w-full md:h-168">
        <Image alt="戴氏教育高考提分主视觉" className="object-cover" fill priority sizes="100vw" src="/assets/高考提分解决方案-(4).png" />
      </div>
      <div className="absolute inset-0 bg-slate-950/55" />
      <div className="absolute inset-0">
        <div className="container mx-auto flex h-full items-center justify-end px-4">
          <div className="max-w-3xl text-white">
            <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 font-medium text-sm backdrop-blur-sm">{SITE_FULL_NAME}</div>
            <h1 className="mt-6 font-bold text-4xl leading-tight md:text-6xl">{SITE_FULL_NAME.replace("成都", "")}官网</h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-100 leading-8 md:text-2xl md:leading-10">
              {SITE_FULL_NAME}官网入口，主要为高考生、复读生及家长提供品牌介绍、总部地址、招生简章和电话咨询服务。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PhoneButton className="h-12 rounded-full px-7 text-base">立即电话咨询</PhoneButton>
              <Link
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 font-medium text-base text-white transition-colors hover:bg-white/15"
                href="#zong-bu-ru-kou"
              >
                查看总部地址
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-slate-100 text-sm">
              <span className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5">全国品牌</span>
              <span className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5">总部在成都</span>
              <span className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5">可直接电话咨询</span>
              <span className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5">欢迎家长到访</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
