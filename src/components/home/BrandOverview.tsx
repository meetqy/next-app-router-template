import Link from "next/link";
import { PhoneButton } from "@/components/phone-action";
import { SITE_FULL_NAME } from "@/lib/constants/site";

const BRAND_POINTS = [
  `${SITE_FULL_NAME}是一个做了 30 多年的全国教育品牌，主要做高中阶段的学习辅导和备考服务。`,
  `这里可以了解${SITE_FULL_NAME}的品牌介绍、总部位置、老师团队、招生简章和电话咨询方式。`,
  `家长想了解课程、看环境、问收费，都可以直接联系成都总部，老师会一对一回答问题。`,
];

const BUSINESS_ITEMS = [
  {
    title: "品牌介绍",
    description: `了解${SITE_FULL_NAME}是谁、做了多少年、获得过哪些荣誉，方便家长先建立基本印象。`,
  },
  {
    title: "高考中心",
    description: "了解高考中心主要做什么、适合哪些学生、课程怎么安排、老师怎么带班。",
  },
  {
    title: "复读与全日制",
    description: "了解复读生怎么安排学习、高考生全日制怎么上课，咨询适合孩子的备考方式。",
  },
];

export function BrandOverview() {
  return (
    <section className="bg-white py-18" id="pin-pai-zong-shu">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start">
          <div>
            <div className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 font-medium text-primary text-sm">品牌总述</div>
            <h2 className="mt-5 max-w-3xl font-bold text-3xl text-slate-900 leading-tight md:text-4xl">{SITE_FULL_NAME}是谁？这里可以一站式了解品牌、总部、高考中心和招生信息。</h2>
            <p className="mt-5 max-w-3xl text-base text-slate-600 leading-8 md:text-lg">
              如果您正在为孩子挑学校、看课程、问收费、考虑复读或全日制备考，可以从这里先认识${SITE_FULL_NAME}，再进一步看高考中心、复读和全日制这些具体内容。
            </p>

            <div className="mt-8 space-y-4">
              {BRAND_POINTS.map((point) => (
                <div className="flex items-start gap-3" key={point}>
                  <div className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
                  <p className="text-slate-700 leading-7">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PhoneButton className="h-12 rounded-full px-7 text-base">先打电话咨询老师</PhoneButton>
              <Link
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 px-7 font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                href="/zhao-sheng-jian-zhang"
              >
                查看招生简章
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 md:p-8">
            <p className="font-semibold text-primary text-sm">{SITE_FULL_NAME}主要做哪些事</p>
            <div className="mt-4 text-2xl text-slate-900 leading-tight md:text-3xl">
              <span className="font-bold">认识戴氏</span>
              <span className="mx-2 text-slate-300">{">"}</span>
              <span className="font-bold">了解高考中心</span>
              <span className="mx-2 text-slate-300">{">"}</span>
              <span className="font-bold">咨询老师</span>
            </div>

            <div className="mt-8 space-y-6">
              {BUSINESS_ITEMS.map((item) => (
                <div className="border-slate-200 border-b pb-6 last:border-b-0 last:pb-0" key={item.title}>
                  <h3 className="font-semibold text-lg text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-slate-600 leading-7">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-white px-5 py-4 text-slate-600 text-sm leading-7">
              {SITE_FULL_NAME}总部在成都，家长想了解课程、看环境、问收费，都可以直接打总部电话，老师会一对一为您解答。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
