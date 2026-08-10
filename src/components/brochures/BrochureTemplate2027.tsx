import {
  ArrowRightIcon,
  BadgeCheckIcon,
  BookOpenIcon,
  BrainCircuitIcon,
  Building2Icon,
  CheckCircle2Icon,
  ChevronRightIcon,
  GraduationCapIcon,
  HeartHandshakeIcon,
  type LucideIcon,
  PhoneIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import { PhoneButton, PhoneLink } from "@/components/phone-action";
import { TableOfContents } from "@/components/TableOfContents";
import { Button } from "@/components/ui/button";
import type { Brochure } from "@/lib/brochures";
import { imageUrl } from "@/lib/image-url";
import { SITE_HOTLINE_TEXT, SITE_FULL_NAME } from "@/lib/constants/site";

const catalogueItems = [
  { id: "zi-zhi", label: "品牌规模与资质" },
  { id: "jiao-yan", label: "教学教研体系" },
  { id: "guan-li", label: "教学管理体系" },
  { id: "huan-jing", label: "环境篇" },
  { id: "cheng-nuo", label: "我们的底气与承诺" },
];

const qualifications = [
  {
    label: "品牌规模",
    value: "每年超 5000 名全日制学子的信任之选。",
  },
  {
    label: "质量认证",
    value: "率先引入并通过 ISO9001 国际教学质量体系认证。",
  },
  {
    label: "版权认证",
    value: "全套体系获国家版权局版权保护（国作登字-2025-A-00212287）。",
  },
];

const teachingItems = [
  {
    icon: GraduationCapIcon,
    index: "01",
    title: "师资选拔",
    desc: "选拔率仅 1% 的顶级教研天团。名校教师领衔教研，老师需通过新高考考纲、教学方法、沟通能力与涨分率等六层严苛考核后，才能正式上台。",
    bullets: ["由原成都七中、树德中学等名校特高级教师领衔教研。", "现有 32 位拥有 15 年以上高三教学经验的教研核心成员。", "400 余名全职精英教师中，300 余位毕业于 985、211 知名高校。"],
  },
  {
    icon: BookOpenIcon,
    index: "02",
    title: "教学方法",
    desc: "独家 DSE 高效学习法，拒绝死记硬背与题海盲刷，把提分拆成清晰可执行的三步。",
    bullets: [
      "听得懂：15 年以上高三经验名师将考点化繁为简，确保不同基础都能跟上。",
      "会做题：以一题多解、多题一解与靶向题组提升迁移与实战能力。",
      "做得快：日常练习严格限时，培养考场时间观念与快速答题反应。",
    ],
  },
  {
    icon: BrainCircuitIcon,
    index: "03",
    title: "教学导航",
    desc: "依托 AI 大数据精细把控学习节奏，将 33 年教学经验数字化，用数据拒绝假努力。",
    bullets: ["实时采集学情、周测、月考等多维数据，形成学生状态画像。", "自动识别薄弱点，辅助教师实时调整教学策略与补弱动作。", "依托命题研究中心、APOE 标准体系与 TCI 模型生成定制学习方案。"],
  },
  {
    icon: BadgeCheckIcon,
    index: "04",
    title: "备考体系",
    desc: "33 年打磨出的高效学习模型，让知识、方法、效率、动力、目标、习惯六条线同时运转。",
    bullets: ["知识巩固：构建日清、周测、月考三级闭环，确保基础不断档。", "方法强化：精准训练加微专题补救，围绕薄弱点定向突破。", "效率、动力、目标、习惯协同推进，让执行力与稳定性同步提升。"],
  },
];

const managementItems = [
  {
    icon: BadgeCheckIcon,
    index: "01",
    title: "一人一档",
    desc: "入学即完成学情、心理、家庭三维摸底，定制专属方案，把提分动作建立在真实问题之上。",
    bullets: ["定位弱科、刷题效率、拖延、焦虑与手机依赖等关键问题。", "根治抄笔记不消化、题海盲刷、不建错题本等高三陋习。", "在日考、周考、月考后精算提分点，让路径更清晰。"],
  },
  {
    icon: BookOpenIcon,
    index: "02",
    title: "课堂管理",
    desc: "三步七段高效课堂与五大过关闭环同步执行，坚决杜绝低效假学。",
    bullets: ["思维激活、检查落实、新课讲授、课堂过手、总结强化等标准动作全覆盖。", "早读、课堂、午间、抽背、作业五大过关形成全天候闭环。", "每堂课都以可交付、可检查、可复盘为标准。"],
  },
  {
    icon: UsersIcon,
    index: "03",
    title: "家校共育",
    desc: "《431 特种兵家长群》与透明化管理联动，用高频、专业、可视化反馈终结家长的信息焦虑。",
    bullets: ["每日推送四大军情，覆盖作息、课堂片段、重难点与次日计划。", "每周同步学习诊断报告、学习状态报告、教情问卷报告。", "每月举办高考战略解码直播间，由升学规划专家进行专业指导。"],
  },
  {
    icon: ShieldCheckIcon,
    index: "04",
    title: "情感陪伴",
    desc: "持证学管师陪伴，既管学习，也管高三家庭关系，让高压备考不把情绪耗在家里。",
    bullets: ["先听懂孩子，再把叛逆情绪翻译成合理诉求与沟通语言。", "协助家长少指责、多鼓励，稳定家庭气氛与陪伴方式。", "按适应期、习惯定型期、冲刺减压期分阶段带班执行。"],
  },
];

const environmentItems = [
  {
    title: "图书馆",
    desc: "备考资料、往届真题与专项训练全覆盖，随时查阅。",
  },
  {
    title: "自习馆",
    desc: "督导老师 24 小时陪伴，提供高效率学习与答疑支持。",
  },
  {
    title: "体能馆",
    desc: "专业体能老师指导，增强高三高强度备考的体能储备与免疫力。",
  },
  {
    title: "心能馆",
    desc: "联合省妇女儿童心理健康服务中心，定期开展减压课程。",
  },
];

const guarantees = [
  {
    title: "试学保障",
    desc: "7 天免费试学，入学 7 天内如有任何不满意，可申请全额退学费（不含书本费）。",
  },
  {
    title: "退费保障",
    desc: "学习期间如因任何原因不满意，可按已核销课时比例随时退还余下学费。",
  },
];

function SectionHeading({
  icon: Icon,
  index,
  label,
  title,
  description,
  tone = "default",
}: {
  icon: LucideIcon;
  index?: string;
  label: string;
  title: string;
  description?: string;
  tone?: "default" | "muted" | "accent";
}) {
  const indexToneClass = tone === "accent" ? "text-primary/18" : tone === "muted" ? "text-slate-300" : "text-slate-200";
  const labelToneClass = tone === "accent" ? "bg-primary/8 text-primary" : "bg-slate-100 text-slate-600";

  return (
    <div className="relative mb-10 overflow-hidden">
      {index && <div className={`pointer-events-none absolute -top-4 right-0 font-black text-[72px] leading-none md:text-[96px] ${indexToneClass}`}>{index}</div>}
      <div className="relative max-w-3xl">
        <div className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ${labelToneClass}`}>
          <Icon className="size-4" />
          <span>{label}</span>
        </div>
        <h2 className="font-bold text-3xl text-slate-900 leading-tight md:text-[2rem]">{title}</h2>
        {description ? <p className="mt-4 max-w-2xl text-slate-500 leading-7">{description}</p> : null}
      </div>
    </div>
  );
}

function AccentCard({ eyebrow, title, description, className = "" }: { eyebrow: string; title: string; description: string; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ${className}`}>
      <div className="text-primary text-xs uppercase tracking-[0.22em]">{eyebrow}</div>
      <h3 className="mt-3 font-semibold text-lg text-slate-900">{title}</h3>
      <p className="mt-3 text-slate-600 leading-7">{description}</p>
    </div>
  );
}

function ImagePlaceholder({
  label,
  notes,
  tag = "图片展示",
  ratioClass = "aspect-[4/3]",
  tone = "light",
  src,
  alt,
  objectPosition = "center",
}: {
  label: string;
  notes: string;
  tag?: string;
  ratioClass?: string;
  tone?: "light" | "dark";
  src?: string;
  alt?: string;
  objectPosition?: string;
}) {
  const toneClass = tone === "dark" ? "bg-white/8 text-white" : "bg-slate-100 text-slate-700";
  const noteClass = tone === "dark" ? "text-slate-300" : "text-slate-400";
  const tagClass = tone === "dark" ? "border-white/15 bg-white/6 text-slate-200" : "border-slate-200 bg-white text-slate-500";

  return (
    <div className={`relative overflow-hidden rounded-2xl ${ratioClass}`}>
      {src ? (
        <>
          <Image alt={alt ?? label} className="object-cover" fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" src={imageUrl(src)} style={{ objectPosition }} />
          <div className={`absolute inset-0 ${tone === "dark" ? "bg-slate-950/35" : "bg-slate-950/18"}`} />
        </>
      ) : null}
      <div className={`relative flex h-full items-end px-6 py-6 ${src ? "text-white" : toneClass}`}>
        <div>
          <div className={`inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${tagClass}`}>{tag}</div>
          <div className="mt-4 font-semibold">{label}</div>
          <div className={`mt-2 text-sm leading-6 ${src ? "text-slate-200" : noteClass}`}>{notes}</div>
        </div>
      </div>
    </div>
  );
}

export function BrochureTemplate2027({ brochure }: { brochure: Brochure }) {
  const { year } = brochure;

  return (
    <div className="min-h-screen bg-white">
      <section className="border-slate-800 border-b bg-slate-950 py-16 text-white md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.15fr)_340px]">
            <div>
              <div className="mb-4 text-primary text-sm tracking-[0.24em]">{year} 官方招生简章</div>
              <h1 className="max-w-4xl font-black text-4xl leading-tight tracking-tight md:text-6xl">
                {year} 届{SITE_FULL_NAME}招生简章
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-slate-300 leading-8">
                33 年西南高考教培领航者，用心成就每一份热爱。围绕品牌资质、教学教研、教学管理、校园环境与承诺保障， 用更完整、更正式的简章方式把核心信息一次讲清楚。
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <PhoneButton className="h-11 px-6 text-base">
                  <span className="inline-flex items-center">
                    <PhoneIcon className="mr-2 size-4" />
                    立即电话咨询
                  </span>
                </PhoneButton>
                <Button asChild className="h-11 border-white/20 bg-transparent px-6 text-white hover:border-white/35 hover:bg-white/10 hover:text-white" variant="outline">
                  <PhoneLink>咨询热线：{SITE_HOTLINE_TEXT}</PhoneLink>
                </Button>
              </div>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                {[
                  ["品牌积淀", "33 年"],
                  ["年度全日制学员", "5000+"],
                  ["教研核心成员", "32 位"],
                  ["质量保障", "ISO9001"],
                ].map(([label, value]) => (
                  <div className="py-2" key={label}>
                    <div className="text-slate-400 text-xs">{label}</div>
                    <div className="mt-2 font-bold text-2xl text-primary md:text-3xl">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white/6 p-6 backdrop-blur">
              <div className="pb-4">
                <div className="text-slate-400 text-xs">招生简章目录</div>
                <div className="mt-2 text-lg leading-8">品牌规模与资质、教学教研体系、教学管理体系、环境篇、我们的底气与承诺</div>
              </div>
              <div className="space-y-3 pt-4 text-slate-300 text-sm">
                <p>延续 2026 版的正式简章风格，结构更完整，阅读节奏更清晰。</p>
                <p>本页保留 ISO9001 质量认证、版权认证与 2027 目录核心信息。</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-primary text-sm">
                <SparklesIcon className="size-4" />
                继续下滑查看完整简章
              </div>
              <ImagePlaceholder
                alt="2027 招生简章主视觉"
                label="专注高考冲刺"
                notes="33年教学沉淀，用心成就每一份热爱"
                ratioClass="aspect-[5/4]"
                src="/assets/2027招生简章封面主视觉占位.jpg"
                tag="品牌愿景"
                tone="dark"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
          <TableOfContents
            items={catalogueItems.map((item) => ({
              id: item.id,
              title: item.label,
            }))}
            title="招生简章目录"
          />

          <div className="space-y-20">
            <section className="scroll-mt-48 py-2" id="zi-zhi">
              <SectionHeading
                description="先把品牌底气讲清楚，再谈教学细节。用看得见的办学规模、质量认证与版权沉淀，建立家长的第一层信任。"
                icon={Building2Icon}
                index="01"
                label="品牌规模与资质"
                title="33 年品牌沉淀，先把“为什么值得信任”说明白"
              />
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {qualifications.map((item) => (
                    <AccentCard description={item.value} eyebrow="核心资质" key={item.label} title={item.label} />
                  ))}
                </div>
                <div className="rounded-2xl bg-slate-50 p-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-primary text-sm">
                    <ShieldCheckIcon className="size-4" />
                    认证说明
                  </div>
                  <p className="mt-5 text-slate-600 leading-8">2027 版简章重点保留 ISO9001 国际教学质量体系认证与国家版权认证， 把品牌优势从“口碑表达”进一步升级为“可核验的质量表达”。</p>
                  <PhoneLink className="mt-6 inline-flex items-center gap-2 font-semibold text-primary text-sm hover:underline">
                    联系老师获取校区与班型详情
                    <ArrowRightIcon className="size-4" />
                  </PhoneLink>
                </div>
              </div>
            </section>

            <section className="scroll-mt-48 bg-slate-50/70 px-6 py-10 md:px-8" id="jiao-yan">
              <SectionHeading
                description="好老师，在戴氏。33 年匠心死磕一堂课。从师资、教学方法、学情导航到备考体系，形成完整的教学教研闭环。"
                icon={BookOpenIcon}
                index="02"
                label="教学教研体系"
                title="把提分拆成可以执行、可以追踪、可以复盘的四层能力系统"
                tone="accent"
              />
              <div className="grid gap-6 lg:grid-cols-2">
                {teachingItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]" key={item.title}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-primary text-sm">{item.index}</div>
                          <h3 className="mt-3 font-bold text-2xl text-slate-900">{item.title}</h3>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary">
                          <Icon className="size-5" />
                        </div>
                      </div>
                      <p className="mt-4 text-slate-600 leading-8">{item.desc}</p>
                      <ul className="mt-5 space-y-3">
                        {item.bullets.map((bullet) => (
                          <li className="flex gap-3 text-slate-700 leading-7" key={bullet}>
                            <ChevronRightIcon className="mt-1 size-4 shrink-0 text-primary" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="scroll-mt-48 py-2" id="guan-li">
              <SectionHeading
                description="懂高三，更懂高三家庭。把管理从“严”升级为“有标准、有反馈、有陪伴”的持续系统。"
                icon={UsersIcon}
                index="03"
                label="教学管理体系"
                title="不只盯成绩，更同步管理节奏、情绪、家庭关系与执行力"
              />
              <div className="space-y-8">
                {managementItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div className={`${index > 0 ? "border-slate-200 border-t pt-8" : ""} grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]`} key={item.title}>
                      <div>
                        <div className="text-primary text-sm">{item.index}</div>
                        <div className="mt-3 flex size-11 items-center justify-center rounded-full bg-primary/8 text-primary">
                          <Icon className="size-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-2xl text-slate-900">{item.title}</h3>
                        <p className="mt-4 text-slate-600 leading-8">{item.desc}</p>
                        <ul className="mt-5 grid gap-3">
                          {item.bullets.map((bullet) => (
                            <li className="flex gap-3 text-slate-700 leading-7" key={bullet}>
                              <CheckCircle2Icon className="mt-1 size-4 shrink-0 text-primary" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="scroll-mt-48 bg-slate-50/70 px-6 py-10 md:px-8" id="huan-jing">
              <SectionHeading
                description="两万平独立智慧校园，不只提供一流教室、食堂和住宿，更围绕学习、体能、心理与自习支持，构建完整备考生态圈。"
                icon={Building2Icon}
                index="04"
                label="环境篇"
                title="四馆一体化支持生态圈，让高强度备考真正有环境承托"
                tone="accent"
              />
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {environmentItems.map((item) => (
                    <AccentCard description={item.desc} eyebrow="学习空间" key={item.title} title={item.title} />
                  ))}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <ImagePlaceholder alt="校园环境实拍" label="一流校园环境" notes="宽敞明亮的教室与舒适的住宿环境，为高效备考提供坚实保障" src="/assets/校园环境图占位.jpg" tag="校区实景" />
                  <ImagePlaceholder alt="四馆场景实拍" label="四馆一体空间" notes="图书馆、自习馆、体能馆与心能馆，全方位护航高强度备考" src="/assets/四馆场景图占位.jpg" tag="学习空间" />
                </div>
              </div>
            </section>

            <section className="scroll-mt-48 py-2" id="cheng-nuo">
              <SectionHeading
                description="为了让家长真正放心，承诺不是口号，而是入学体验、退费机制与长期办学口碑共同构成的信任闭环。"
                icon={HeartHandshakeIcon}
                index="05"
                label="我们的底气与承诺"
                title="三十三年护考路，守护一颗父母心"
              />
              <div className="grid gap-6 md:grid-cols-2">
                {guarantees.map((item) => (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6" key={item.title}>
                    <div className="flex items-center gap-2 font-semibold text-slate-900">
                      <CheckCircle2Icon className="size-4 text-primary" />
                      {item.title}
                    </div>
                    <p className="mt-4 text-slate-600 leading-8">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 max-w-3xl text-slate-600 leading-8">
                三十三载砥砺深耕，戴氏高考中心始终坚守“以学子为中心”的教育初心。我们聚焦教学质量的极致突破， 以科学严谨的体系赋能，以满怀温度的真心陪伴，用专业与责任护航每一位学子考入理想学府。
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <PhoneButton className="h-11 px-6">
                  <span className="inline-flex items-center">
                    <PhoneIcon className="mr-2 size-4" />
                    立即电话咨询
                  </span>
                </PhoneButton>
                <PhoneButton className="h-11 px-6" variant="outline">
                  预约老师回电
                </PhoneButton>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
