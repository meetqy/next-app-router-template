import {
  ArrowRightIcon,
  BookOpenCheckIcon,
  BrainCircuitIcon,
  Building2Icon,
  CheckCircle2Icon,
  HeartHandshakeIcon,
  LayoutGridIcon,
  type LucideIcon,
  NotebookTabsIcon,
  RocketIcon,
  SchoolIcon,
  ShieldCheckIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react";
import { PhoneButton, PhoneLink } from "@/components/phone-action";
import { TableOfContents } from "@/components/TableOfContents";
import { Button } from "@/components/ui/button";
import type { Brochure } from "@/lib/brochures";
import { SITE_HOTLINE_TEXT, SITE_FULL_NAME } from "@/lib/constants/site";

const catalogueItems = [
  { id: "pin-pai", label: "品牌简介" },
  { id: "shi-zi", label: "师资简介" },
  { id: "dse", label: "DSE 高效学习法" },
  { id: "cheng-nuo", label: "双重承诺" },
  { id: "ti-xi", label: "六大备考体系" },
  { id: "xue-qing", label: "智能学情导航" },
  { id: "fen-ban", label: "5+X 科学分班" },
  { id: "ming-ti", label: "命题研究与内部资料" },
  { id: "guan-li", label: "65 特色管理标准" },
  { id: "ke-tang", label: "三步七段高效课堂" },
  { id: "jia-xiao", label: "431 特种兵家长群" },
  { id: "xiao-qu", label: "四大全日制校区" },
  { id: "si-guan", label: "阳光学习 四馆赋能" },
  { id: "shi-ming", label: "我们的使命" },
];

const teacherStandards = [
  "高三教学经验 8 年以上",
  "新高考考纲考点全盘过关",
  "新高考教学方法讲课考核过关",
  "新高考教学沟通能力考核过关",
  "全科教学流程培训考试 100 分以上",
  "大型考试学科涨分率达到升星标准",
];

const dseSteps = [
  {
    title: "听得懂",
    desc: "从基础概念到高阶拓展逐步深入，让不同基础的学生都能听懂、跟上。",
  },
  {
    title: "会做题",
    desc: "通过靶向训练、一题多解与多题一解，建立解题迁移与实战能力。",
  },
  {
    title: "做得快",
    desc: "借助限时训练和技巧优化，形成考场答题节奏与快速反应。",
  },
];

const sixSystems = [
  {
    title: "备考知识巩固体系",
    desc: "每日过关、知识回顾、周考、月考层层递进，让知识链条不断档。",
  },
  {
    title: "备考方法体系",
    desc: "精准练配合微专题补救，针对失分点做专项突破。",
  },
  {
    title: "备考效率体系",
    desc: "时间分割与周计划清算同步推进，减少拖延，提升执行效率。",
  },
  {
    title: "备考动力体系",
    desc: "主题班会与日周月表彰并行，持续激发学生状态与目标感。",
  },
  {
    title: "备考目标体系",
    desc: "核心知识目标与目标规划书双线推进，学习路径更清晰。",
  },
  {
    title: "备考习惯体系",
    desc: "预习、优生养成、错题整理共同构成长期稳定的学习闭环。",
  },
];

const assessments = ["考试心理和行为测评", "学习能力测评", "学习倦怠测评", "学习拖延测评", "心理症状自我评估测评", "自控力测评"];

const internalMaterials = [
  {
    subject: "语文教研组",
    focus: "高考高频考点与近三年考点考分分析双向细目表。",
  },
  {
    subject: "数学教研组",
    focus: "学科题型、解题思路、通法模型与技巧拓展。",
  },
  {
    subject: "英语教研组",
    focus: "学科难度系数、题型难度系数与板块把控策略。",
  },
  {
    subject: "历史教研组",
    focus: "客观题技巧、主观题技巧与高考答题策略。",
  },
  {
    subject: "化学教研组",
    focus: "高考热点难点、立意方向与载体突破策略。",
  },
  {
    subject: "地理教研组",
    focus: "核心素养导向下的长效能力培养与本质理解。",
  },
];

const managementRules = [
  {
    title: "学习目标管理",
    desc: "帮助孩子明确目标、规划路径，知道为谁学、怎么学。",
  },
  {
    title: "学习动力管理",
    desc: "双班主任 24 小时陪伴，持续激活学习内驱力。",
  },
  {
    title: "知识过关管理",
    desc: "当天知识当天过关，过关检查有记录，不把问题留到第二天。",
  },
  {
    title: "考后反思管理",
    desc: "周考、月考与大型诊断考后逐项复盘，查漏补短。",
  },
  {
    title: "教情问卷管理",
    desc: "让学生真实反馈课堂理解度与满意度，持续优化教学执行。",
  },
  {
    title: "优生养成管理",
    desc: "课堂记录、错题整理、反思应用同步推进，形成个性化复习资料。",
  },
];

const classroomSteps = [
  {
    title: "课前深析学情",
    desc: "通过预习检查、状态激发与执行规定，先把课堂状态拉满。",
  },
  {
    title: "课中精讲精练",
    desc: "考点讲授、典例拆解、限时过手同步进行，强化当堂消化。",
  },
  {
    title: "课后全程护航",
    desc: "回忆复盘、重点梳理、作业布置一体完成，形成闭环。",
  },
  {
    title: "思维激活",
    desc: "重视趣味引导与思想发动，不超过 5 分钟快速进入学习状态。",
  },
  {
    title: "检查落实",
    desc: "预习检查、表扬惩罚、执行规定同步推进，严爱结合。",
  },
  {
    title: "新课讲授",
    desc: "围绕考点、技巧与讲练结合展开，把重难点讲透。",
  },
  {
    title: "课堂过手",
    desc: "知识题型限时过关，教师巡视点拨，确保方法落地。",
  },
  {
    title: "强化总结",
    desc: "通过回忆复盘和易错提示强化记忆，提升提取效率。",
  },
  {
    title: "作业布置",
    desc: "明确要求、分层布置，让学生有收获感，也有执行标准。",
  },
];

const parentUpdates = [
  {
    time: "07:00",
    title: "战略简报",
    desc: "发布高效学习作息表、考勤清单与早读状态。",
  },
  {
    time: "12:30",
    title: "战地快讯",
    desc: "同步上午课堂片段、课堂笔记、测试与批改情况。",
  },
  {
    time: "19:00",
    title: "军情分析",
    desc: "反馈今日授课重难点与课堂过关表现。",
  },
  {
    time: "22:00",
    title: "夜航情报",
    desc: "汇总当日抽背结果，并同步次日学习计划。",
  },
];

const campusScenes = [
  {
    title: "教室",
    desc: "配备完善教学设施与宽敞明亮学习空间，营造高浓度学习氛围。",
  },
  {
    title: "食堂",
    desc: "由专业厨师定制营养均衡、口味多样的餐食方案。",
  },
  {
    title: "住宿",
    desc: "干净整洁、安全舒适，让学生在高压备考中也能休息好。",
  },
  {
    title: "校区总览",
    desc: "多校区协同运转，形成成熟稳定的全日制学习支持体系。",
  },
];

const growthSpaces = [
  {
    title: "图书馆",
    desc: "提供备考资料、往届真题、专项训练与必背考点，学习资源完整覆盖。",
  },
  {
    title: "自习馆",
    desc: "提供专注学习环境，配备督导老师提供持续陪伴与答疑。",
  },
  {
    title: "体能馆",
    desc: "科学配置体能训练项目，增强学生体能、免疫力与作息稳定性。",
  },
  {
    title: "心能馆",
    desc: "联合心理服务中心开展减压课程，培养抗压能力与学习内驱力。",
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

function ImagePlaceholder({
  label,
  notes,
  tag = "图片展示",
  ratioClass = "aspect-16/10",
  tone = "light",
  align = "center",
  className = "",
}: {
  label: string;
  notes: string;
  tag?: string;
  ratioClass?: string;
  tone?: "light" | "dark";
  align?: "center" | "left";
  className?: string;
}) {
  const toneClass = tone === "dark" ? "bg-white/8 text-white" : "bg-slate-100 text-slate-700";
  const noteClass = tone === "dark" ? "text-slate-300" : "text-slate-400";
  const tagClass = tone === "dark" ? "border-white/15 bg-white/6 text-slate-200" : "border-slate-200 bg-white text-slate-500";
  const alignClass = align === "left" ? "items-end justify-start text-left" : "items-center justify-center text-center";

  return (
    <div className={`flex ${ratioClass} ${alignClass} rounded-lg px-6 py-6 ${toneClass} ${className}`}>
      <div>
        <div className={`inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${tagClass}`}>{tag}</div>
        <div className="mt-4 font-semibold">{label}</div>
        <div className={`mt-2 text-sm leading-6 ${noteClass}`}>{notes}</div>
      </div>
    </div>
  );
}

export function BrochureTemplate2026({ brochure }: { brochure: Brochure }) {
  const { year } = brochure;

  return (
    <div className="min-h-screen bg-white">
      <section className="border-slate-800 border-b bg-slate-950 py-16 text-white md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.15fr)_320px]">
            <div>
              <div className="mb-4 text-primary text-sm tracking-[0.24em]">{year} 官方招生简章</div>
              <h1 className="max-w-4xl font-black text-4xl leading-tight tracking-tight md:text-6xl">{year} 届招生简章</h1>
              <p className="mt-6 max-w-3xl text-lg text-slate-300 leading-8">
                {SITE_FULL_NAME}，32 年口碑保障，行业领先教育品牌。 围绕教学教研、学情导航、课堂管理、家校沟通与校区环境， 以一份更像正式简章的方式，把核心信息讲清楚。
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <PhoneButton className="h-11 px-6 text-base">立即电话咨询</PhoneButton>
                <Button asChild className="h-11 border-white/20 bg-transparent px-6 text-white hover:border-white/35 hover:bg-white/10 hover:text-white" variant="outline">
                  <PhoneLink>咨询热线：{SITE_HOTLINE_TEXT}</PhoneLink>
                </Button>
              </div>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                {[
                  ["品牌积淀", "32 年"],
                  ["年度全日制学员", "3000+"],
                  ["专职精英教师", "400+"],
                  ["教学空间", "20000㎡+"],
                ].map(([label, value]) => (
                  <div className="py-2" key={label}>
                    <div className="text-slate-400 text-xs">{label}</div>
                    <div className="mt-2 font-bold text-2xl text-primary md:text-3xl">{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-white/6 p-6 backdrop-blur">
              <div className="pb-4">
                <div className="text-slate-400 text-xs">招生简章目录</div>
                <div className="mt-2 text-lg leading-8">品牌、师资、教学法、承诺、体系、学情、分班、命题、管理、课堂、家校、校区、四馆、使命</div>
              </div>
              <div className="space-y-3 pt-4 text-slate-300 text-sm">
                <p>适合希望一次看清教学体系、管理细则与校区支持的家长与学生。</p>
                <p>页面文案已按 2026 招生简章目录顺序重排，并补回当前页面遗漏的目录项。</p>
              </div>
              <div className="mt-6 flex items-center text-primary text-sm">继续下滑查看</div>
              <ImagePlaceholder align="left" className="mt-8" label="专注高考冲刺" notes="32年教学沉淀，用心成就每一份热爱" tag="品牌愿景" tone="dark" />
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
            <section className="scroll-mt-48 py-2" id="pin-pai">
              <SectionHeading icon={SchoolIcon} label="品牌简介" title="32 年专注高考，全日制教学与管理同步深耕" />
              <div className="space-y-6 text-slate-600 leading-8">
                <p>戴氏高考中心是西南地区较早专注高考文化培训的机构，自 1993 年成立以来，持续围绕高考提分、全日制管理、升学规划与学情研究迭代方法。</p>
                <p>学校不仅拥有成熟的 DSE 教学法，还配备教学面积超两万平的学习空间、高三教学经验 15 年以上的教研核心成员，以及 400 余名专职精英教师。</p>
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    ["办学定位", "高考全日制中心"],
                    ["教研核心", "15 年以上高三经验"],
                    ["质量保障", "ISO9001 教学体系认证"],
                  ].map(([label, value]) => (
                    <div className="py-1" key={label}>
                      <div className="text-slate-400 text-xs">{label}</div>
                      <div className="mt-2 font-semibold text-slate-900">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="scroll-mt-48 bg-slate-50/70 px-6 py-10 md:px-8" id="shi-zi">
              <SectionHeading icon={ShieldCheckIcon} label="师资简介" title="深耕教研，专攻考点，优中选精层层过关" />
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div>
                  <p className="mb-8 text-slate-600 leading-8">所有授课老师都必须通过新高考教学培训六层通关考核后，才能正式上岗授课，确保对新高考要求、授课逻辑和课堂执行都有统一高标准。</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {teacherStandards.map((item, index) => (
                      <div className="flex gap-4" key={item}>
                        <div className="w-8 shrink-0 font-semibold text-primary leading-7">{String(index + 1).padStart(2, "0")}</div>
                        <div className="text-slate-700 leading-7">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <ImagePlaceholder label="名师领衔" notes="高三教学经验丰富的教研核心成员" ratioClass="aspect-[4/5]" tag="师资力量" />
              </div>
            </section>

            <section className="scroll-mt-48 py-2" id="dse">
              <SectionHeading icon={RocketIcon} label="DSE 高效学习法" title="先理解，后破题，再提速" />
              <div className="grid gap-8 md:grid-cols-3">
                {dseSteps.map((step, index) => (
                  <div className="py-1" key={step.title}>
                    <div className="text-primary text-sm">{`0${index + 1}`}</div>
                    <h3 className="mt-3 font-bold text-slate-900 text-xl">{step.title}</h3>
                    <p className="mt-3 text-slate-600 leading-7">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="scroll-mt-48 py-2" id="cheng-nuo">
              <SectionHeading icon={CheckCircle2Icon} label="双重承诺" title="三十二年护考路，守护一颗父母心" />
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
                  <div className="font-semibold text-slate-900">承诺一：七天免费试学</div>
                  <div className="text-slate-600 leading-7">入学七天内如不满意，可申请全额退学费。</div>
                </div>
                <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
                  <div className="font-semibold text-slate-900">承诺二：按比例退费</div>
                  <div className="text-slate-600 leading-7">学习期间如果不满意，可按已核销课时比例退费，余多少退多少。</div>
                </div>
              </div>
              <PhoneLink className="mt-6 inline-flex items-center gap-2 font-semibold text-primary text-sm hover:underline">
                联系老师了解试学与退费细则
                <ArrowRightIcon className="size-4" />
              </PhoneLink>
            </section>

            <section className="scroll-mt-48 bg-slate-50/70 px-6 py-10 md:px-8" id="ti-xi">
              <SectionHeading icon={LayoutGridIcon} label="六大备考体系" title="有体系，更有底气" />
              <div className="space-y-6">
                {sixSystems.map((item, index) => (
                  <div className="grid gap-4 md:grid-cols-[40px_220px_minmax(0,1fr)]" key={item.title}>
                    <div className="font-semibold text-primary leading-7">{index + 1}</div>
                    <div className="font-semibold text-slate-900 leading-7">{item.title}</div>
                    <div className="text-slate-600 leading-7">{item.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="scroll-mt-48 py-2" id="xue-qing">
              <SectionHeading icon={BrainCircuitIcon} label="智能学情导航" title="科学测评先行，个性化备考方案后置" />
              <div>
                <p className="mb-8 text-slate-600 leading-8">
                  每一位学员入学前均通过专业学情测评，基于学科图谱与六大学习能力测评系统，打造个性化备考方案。每份方案都需经过学科组长、教研组长、教研总监三轮验收。
                </p>
                <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {assessments.map((item) => (
                    <div className="text-slate-700" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="scroll-mt-48 py-2" id="fen-ban">
              <SectionHeading icon={TargetIcon} label="5+X 科学分班" title="新高考定制班型，覆盖不同升学路径" />
              <div className="space-y-4">
                {[
                  "结合主流目标院校和专业对应选科组合，科学设立 5+X 新高考班型。",
                  "为学生提供更聚焦的学习环境、教学资源和管理动作。",
                  "围绕不同目标路径制定教学节奏，助力学生更高效实现升学目标。",
                ].map((item) => (
                  <div className="text-slate-600 leading-7" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="scroll-mt-48 bg-slate-50/70 px-6 py-10 md:px-8" id="ming-ti">
              <SectionHeading icon={BookOpenCheckIcon} label="命题研究与内部资料" title="32 年命题研究，更懂新高考每 1 分的价值" />
              <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
                <ImagePlaceholder align="left" label="深耕教研" notes="依托32年真题研究数据，提炼高频考点" ratioClass="aspect-[4/5]" tag="教研实力" />
                <div>
                  <p className="mb-8 text-slate-600 leading-8">命题研究中心依托 32 年真题研究数据，通过 APOE 标准体系提炼高频考点与易错题型，并通过 TCI 模型形成针对性的全套学习方案。</p>
                  <div className="space-y-6">
                    {internalMaterials.map((item) => (
                      <div className="grid gap-3 md:grid-cols-[160px_minmax(0,1fr)]" key={item.subject}>
                        <div className="font-semibold text-slate-900">{item.subject}</div>
                        <div className="text-slate-600 leading-7">{item.focus}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="scroll-mt-48 py-2" id="guan-li">
              <SectionHeading icon={NotebookTabsIcon} label="65 特色管理标准" title="从目标到执行，把管理做成持续提分的基础设施" />
              <div className="space-y-6">
                {managementRules.map((item) => (
                  <div className="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)]" key={item.title}>
                    <div className="font-semibold text-slate-900 leading-7">{item.title}</div>
                    <div className="text-slate-600 leading-7">{item.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="scroll-mt-48 bg-slate-50/70 px-6 py-10 md:px-8" id="ke-tang">
              <SectionHeading icon={TargetIcon} label="三步七段高效课堂" title="把课堂拆成可执行、可检查、可复盘的标准动作" />
              <div className="space-y-6">
                {classroomSteps.map((item) => (
                  <div className="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)]" key={item.title}>
                    <div className="font-semibold text-slate-900 leading-7">{item.title}</div>
                    <div className="text-slate-600 leading-7">{item.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="scroll-mt-48 py-2" id="jia-xiao">
              <SectionHeading icon={UsersIcon} label="431 特种兵家长群" title="您无需成为教育专家，只需选择专家" />
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div>
                  <div className="space-y-6">
                    {parentUpdates.map((item) => (
                      <div className="grid gap-3 md:grid-cols-[90px_160px_minmax(0,1fr)]" key={`${item.time}-${item.title}`}>
                        <div className="font-semibold text-primary">{item.time}</div>
                        <div className="font-semibold text-slate-900">{item.title}</div>
                        <div className="text-slate-600 leading-7">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-slate-600 leading-8">每周同步学习诊断报告、学习状态报告、教情问卷报告；每月举办高考战略解码直播间，用更透明的方式缓解家长信息焦虑。</p>
                </div>
                <ImagePlaceholder label="家校共育" notes="透明化管理，缓解家长信息焦虑" ratioClass="aspect-[4/5]" tag="家校沟通" />
              </div>
            </section>

            <section className="scroll-mt-48 py-2" id="xiao-qu">
              <SectionHeading icon={Building2Icon} label="四大全日制校区" title="智慧教育成长基地，支撑高强度备考生活" />
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <ImagePlaceholder label="明亮教室" notes="提供一流的教学设施与学习空间" ratioClass="aspect-[3/2]" tag="校区实景" />
                  <ImagePlaceholder label="营养食堂" notes="定制营养均衡的餐食方案" ratioClass="aspect-[3/2]" tag="校区实景" />
                  <ImagePlaceholder label="舒适住宿" notes="安全整洁的宿舍环境，保障充足休息" ratioClass="aspect-[3/2]" tag="校区实景" />
                  <ImagePlaceholder label="多校区协同" notes="成熟稳定的全日制学习支持体系" ratioClass="aspect-[3/2]" tag="校区实景" />
                </div>
                <div className="space-y-6">
                  {campusScenes.map((item) => (
                    <div className="grid gap-3 md:grid-cols-[120px_minmax(0,1fr)]" key={item.title}>
                      <div className="font-semibold text-slate-900 leading-7">{item.title}</div>
                      <div className="text-slate-600 leading-7">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="scroll-mt-48 bg-slate-50/70 px-6 py-10 md:px-8" id="si-guan">
              <SectionHeading icon={Building2Icon} label="阳光学习 四馆赋能" title="多场馆协同，促进学生全面健康成长" />
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <ImagePlaceholder label="沉浸式图书馆" notes="学习资源完整覆盖，随时查阅" ratioClass="aspect-[3/2]" tag="学习空间" />
                  <ImagePlaceholder label="专属自习馆" notes="督导老师全程陪伴，高效学习" ratioClass="aspect-[3/2]" tag="学习空间" />
                  <ImagePlaceholder label="专业体能馆" notes="科学运动训练，增强备考体能" ratioClass="aspect-[3/2]" tag="学习空间" />
                  <ImagePlaceholder label="阳光心能馆" notes="联合心理专家，培养抗压能力" ratioClass="aspect-[3/2]" tag="学习空间" />
                </div>
                <div className="space-y-6">
                  {growthSpaces.map((item) => (
                    <div className="grid gap-3 md:grid-cols-[120px_minmax(0,1fr)]" key={item.title}>
                      <div className="font-semibold text-slate-900 leading-7">{item.title}</div>
                      <div className="text-slate-600 leading-7">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="scroll-mt-48 py-2" id="shi-ming">
              <SectionHeading icon={HeartHandshakeIcon} label="我们的使命" title="以专业护航成长，以责任兑现结果" />
              <div>
                <p className="max-w-3xl text-slate-600 leading-8">
                  32
                  年来，戴氏高考中心坚守教育初心，深耕教学领域，聚焦教学质量，以专业陪伴无数学子成长。我们坚持用匠心打磨每一堂课，以真心呵护每一份梦想，在时光中沉淀责任，于坚守中铸就口碑，助力每一位学员考入理想中的大学。
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <PhoneButton className="h-11 px-6">{SITE_HOTLINE_TEXT}</PhoneButton>
                  <PhoneButton className="h-11 px-6" variant="outline">
                    预约老师回电
                  </PhoneButton>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
