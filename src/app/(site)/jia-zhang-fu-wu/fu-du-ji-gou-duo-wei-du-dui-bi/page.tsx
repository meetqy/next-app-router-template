import type { Metadata } from "next";
import { PageTopNav } from "@/components/PageTopNav";
import { PhoneButton } from "@/components/phone-action";
import { TableOfContents } from "@/components/TableOfContents";

export const metadata: Metadata = {
	title: "复读机构多维度对比 公立高中民办高中与培训机构优缺点 - 家长服务",
	description:
		"从合规、教学、管理、收费与服务等维度，对比公立高中、民办高中和培训机构三类复读路径的主要优缺点。",
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Article",
	headline: "复读机构多维度对比 公立高中民办高中与培训机构优缺点",
	description:
		"从合规、教学、管理、收费与服务等维度，对比公立高中、民办高中和培训机构三类复读路径的主要优缺点。",
	author: {
		"@type": "Organization",
		name: "戴氏教育高考总部",
	},
	datePublished: "2026-06-10",
};

type ComparisonTopic = {
	title: string;
	privateSchool: string;
	publicSchool: string;
	trainingOrg: string;
};

type ComparisonGroup = {
	id: string;
	title: string;
	description: string;
	topics: ComparisonTopic[];
};

const comparisonGroups: ComparisonGroup[] = [
	{
		id: "he-gui-yu-bao-ming",
		title: "合规与报名",
		description:
			"先看能不能合法稳定读完一年，再看报名、档案和后续衔接是否省心。",
		topics: [
			{
				title: "办学资质合规性",
				privateSchool:
					"具备正规普通高中办学资质，在当地政策允许范围内可合法招收复读生，合规性有保障。",
				publicSchool:
					"公办高中招收复读生、插班就读属于政策明令禁止行为，全程存在合规风险。",
				trainingOrg:
					"需持有教育局颁发的民办学校办学许可证，部分机构存在无证办学、超范围经营问题。",
			},
			{
				title: "办学稳定性与存续风险",
				privateSchool:
					"办学主体正规稳定，校区固定，复读项目合规，基本无停办、跑路风险，存续性有保障。",
				publicSchool:
					"学校主体本身稳定，但复读插班属于违规操作，存在被政策清查清退、中途无法就读的风险。",
				trainingOrg:
					"机构办学水平参差不齐，小型机构存在中途停办、校区搬迁、卷款跑路的风险。",
			},
			{
				title: "高考报名责任主体",
				privateSchool:
					"可统一组织高考报名、现场确认等全流程考务，无需考生自行奔波办理。",
				publicSchool:
					"基本不负责复读生统一报名，需考生自行回户籍地以社会考生身份办理，流程繁琐。",
				trainingOrg:
					"部分机构可协助统一报名，部分需考生自行回户籍地以社会考生身份报名，需提前确认。",
			},
			{
				title: "个人档案存放与调取",
				privateSchool:
					"可提供档案存放、调转流程指导，部分学校可协助暂存档案，按官方流程办理调档。",
				publicSchool:
					"不接收、不托管学生档案，需自行存放于原毕业学校或户籍地教育局，无专项指导。",
				trainingOrg:
					"机构一般不接收学生档案，需自行存放于原毕业学校或户籍地教育局，仅可提供流程指导。",
			},
			{
				title: "违规办学被清退的风险",
				privateSchool:
					"合规招生无清退风险，办学存续稳定，无政策层面的办学风险。",
				publicSchool:
					"违规插班存在政策清查、中途被清退的直接风险，是核心隐患。",
				trainingOrg: "无证、超范围办学的机构存在被监管部门取缔、清退的风险。",
			},
		],
	},
	{
		id: "jiao-xue-yu-ti-fen",
		title: "教学体系与提分适配",
		description:
			"复读不是简单重学一遍，更重要的是教学节奏、分层方式和补弱效率。",
		topics: [
			{
				title: "是否有复读生专属复习体系",
				privateSchool:
					"开设独立复读班的学校有专属复习体系，仅插班招生的学校沿用应届班体系，因校而异。",
				publicSchool:
					"完全沿用应届班复习体系，无任何复读生专属规划，复习内容重复度高。",
				trainingOrg:
					"普遍针对复读生设计专属复习体系，侧重薄弱点突破与提分训练，适配性最强。",
			},
			{
				title: "是否按高考分数分层教学",
				privateSchool:
					"设独立复读班的学校多按高考分数分层，插班模式则沿用应届班分层规则。",
				publicSchool:
					"插班模式不针对复读生单独分层，直接融入应届班型，学生基础差异大。",
				trainingOrg:
					"普遍按高考分数分层分班，班型难度与进度精准匹配对应分数段学生。",
			},
			{
				title: "复习节奏与复读生基础的适配度",
				privateSchool:
					"独立复读班节奏贴合复读生基础，插班模式与公立高中一致，存在内容重复问题。",
				publicSchool:
					"应届班一轮复习偏基础、整体进度偏慢，复读生易出现节奏拖沓、内容重复的问题。",
				trainingOrg:
					"复习节奏更贴合复读生基础，可跳过已掌握内容，侧重专题突破与提分训练。",
			},
			{
				title: "模考资源与试卷质量",
				privateSchool:
					"同步区域官方联考，共享高中教研体系，试卷标准规范，考向把握准确。",
				publicSchool:
					"同步官方区域联考、统考资源，命题方向完全贴合高考要求，批改评分标准最规范。",
				trainingOrg:
					"部分机构同步正规联考，部分自主命题，试卷质量参差不齐，考向把握精度弱于高中。",
			},
			{
				title: "薄弱知识点专项补弱机制",
				privateSchool:
					"部分学校开设复读生补弱课程，多数仍以课后答疑为主，专项辅导较少。",
				publicSchool: "仅依赖课后老师答疑，无专门针对复读生的专项补弱课程。",
				trainingOrg:
					"普遍开设偏科补弱、专题突破课程，部分提供小班或一对一针对性辅导。",
			},
		],
	},
	{
		id: "shi-zi-yu-da-yi",
		title: "师资与课后辅导",
		description:
			"老师是否稳定、是否真实、课后能不能持续跟进，直接影响一年复读体验。",
		topics: [
			{
				title: "授课教师是否全职坐班",
				privateSchool:
					"以全职签约教师为主，少量外聘兼职教师，整体坐班率高，答疑有保障。",
				publicSchool:
					"均为学校在编全职教师，全程在校坐班，答疑时间有充分保障。",
				trainingOrg:
					"全职教师占比不一，部分机构大量使用兼职教师，课后辅导时间与责任心难保障。",
			},
			{
				title: "师资真实性与宣传匹配度",
				privateSchool:
					"师资信息公开透明，极少出现名师挂名虚假宣传，教学履历可核实。",
				publicSchool:
					"师资完全透明，不存在名师挂名不上课的情况，教学经验普遍充足。",
				trainingOrg:
					"部分机构存在名师挂名、普通教师授课的虚假宣传，师资水分大。",
			},
			{
				title: "师资队伍稳定性",
				privateSchool: "教师队伍稳定，签约制管理，中途更换教师的情况极少。",
				publicSchool: "教师队伍固定，基本不会中途更换授课教师，流动性为零。",
				trainingOrg: "师资流动性大，部分机构存在中途频繁更换授课教师的情况。",
			},
			{
				title: "课后答疑辅导保障",
				privateSchool:
					"有固定答疑时段，复读班老师针对性更强，辅导保障优于公立插班。",
				publicSchool:
					"有固定在校答疑时间，可课后找老师答疑辅导，但老师精力向应届生倾斜。",
				trainingOrg:
					"建议了解是否有固定教师坐班答疑时间，兼职教师占比高的机构辅导保障弱。",
			},
			{
				title: "教学与师资变动保障机制",
				privateSchool:
					"教学与师资稳定，变动风险低，出现问题可通过校方正规渠道维权。",
				publicSchool: "教学体系与师资完全稳定，变动风险极低，无额外保障机制。",
				trainingOrg:
					"部分机构有师资变动补偿条款，但多数无明确保障，维权难度大。",
			},
		],
	},
	{
		id: "guan-li-yu-pei-tao",
		title: "管理模式与校园配套",
		description:
			"管理强度、班主任跟进、住宿和学习环境，决定孩子能不能稳住状态执行一年。",
		topics: [
			{
				title: "整体管理模式",
				privateSchool:
					"走读、住宿可选，多为半封闭管理，管理规范，部分民办高中管控强度较高。",
				publicSchool:
					"以走读制为主，按高中统一校规管理，管控强度中等，复读生与应届生标准一致。",
				trainingOrg:
					"多为全封闭或半封闭管理，管控规则更细化，执行力度普遍更强。",
			},
			{
				title: "电子设备管控执行力度",
				privateSchool:
					"管控规则明确，住宿制学校管控更严格，整体执行力度优于公立高中。",
				publicSchool: "按高中校规执行，管控强度差异大，部分学校管控宽松。",
				trainingOrg:
					"管控规则最严格，多数封闭机构统一保管手机，实际执行力度最强。",
			},
			{
				title: "班级人数与师生比",
				privateSchool:
					"复读班班额多在 40 至 50 人，部分小班型人数更少，师生比优于公立高中。",
				publicSchool:
					"常规班额多在 50 人以上，师生比偏低，复读生获得的关注度有限。",
				trainingOrg:
					"班型选择多，从大班到小班、一对一均有，小班型师生比更高，关注度最高。",
			},
			{
				title: "班主任配置与学情跟进",
				privateSchool:
					"复读班多配备专职班主任，专门负责复读生管理与学情跟进，反馈更及时。",
				publicSchool:
					"常规高中班主任兼顾班级事务，精力向应届生倾斜，对复读生个性化跟进不足。",
				trainingOrg:
					"多配备专职班主任，负责日常管理与学情跟进，对学生状态的反馈最频繁。",
			},
			{
				title: "住宿配套条件",
				privateSchool:
					"多提供标准化学生宿舍，配置齐全，宿管规范，与应届生享受同等待遇。",
				publicSchool:
					"基本不向复读生提供住宿，需学生自行租房或家长陪读，额外成本高。",
				trainingOrg:
					"多数提供一体化住宿配套，硬件条件差异极大，从简陋到高端均有，需实地确认。",
			},
			{
				title: "食堂与学习场地配套",
				privateSchool:
					"配套食堂、自习室、运动场地，设施完善，与应届生共享全部校园资源。",
				publicSchool: "有正规学校食堂、图书馆、公共自习室，配套设施完善充足。",
				trainingOrg:
					"部分机构场地独立、配套齐全，小型机构场地简陋，自习室、活动空间不足。",
			},
		],
	},
	{
		id: "shou-fei-yu-he-tong",
		title: "收费与合同风险",
		description:
			"除了看总价，更要看收费是否透明、是否有正规合同，以及退费条款是否清楚。",
		topics: [
			{
				title: "收费项目透明度",
				privateSchool:
					"学费有官方公示标准，收费项目透明，隐性收费少，所有费用均有正规票据。",
				publicSchool:
					"违规插班多收取无票据的借读费或赞助费，金额不透明，无正规收费依据。",
				trainingOrg:
					"收费套路多，常以低价引流，部分存在资料费、补课费等隐性中途加价。",
			},
			{
				title: "隐性收费风险",
				privateSchool: "杂费统一公示，隐性收费极少，基本不存在中途加价的情况。",
				publicSchool:
					"核心费用为无票据的借读费或赞助费，后续杂费与应届生一致，无额外加价。",
				trainingOrg:
					"易出现资料费、模考费、培优费等隐性收费，存在中途加价风险。",
			},
			{
				title: "退费规则清晰度",
				privateSchool:
					"按教育部门统一退费政策执行，规则清晰，有正式合同保障，退费流程规范。",
				publicSchool:
					"违规插班无正规合同与退费约定，中途退学退费难度大，维权无依据。",
				trainingOrg:
					"退费规则差异大，部分机构设置苛刻免责条款，退费难度大、周期长。",
			},
			{
				title: "是否有保分班及条款合理性",
				privateSchool: "极少开设保分班，多数按普通班型统一收费，无额外溢价。",
				publicSchool: "无保分班型，无相关收费项目。",
				trainingOrg:
					"普遍开设高价保分班，协议多设置大量苛刻生效条件，未达标退费难度高。",
			},
		],
	},
	{
		id: "shu-ju-yu-zeng-zhi",
		title: "成绩数据与增值服务",
		description:
			"很多家长后期最关心的，往往是成绩真实性、心理支持和报考配套是否完整。",
		topics: [
			{
				title: "升学成绩数据真实性",
				privateSchool:
					"多单独统计复读班成绩，数据相对真实，营销注水程度远低于培训机构。",
				publicSchool:
					"不单独统计复读生成绩，学校整体升学数据官方公开，无营销注水动机。",
				trainingOrg:
					"成绩数据普遍注水，多用最高提分个例做营销，真实平均提分、上线率难核实。",
			},
			{
				title: "心理疏导配套服务",
				privateSchool:
					"有配套心理老师，复读班可提供专项心态疏导，服务覆盖优于公立高中。",
				publicSchool:
					"有学校心理老师，但均面向全体应届生，无针对复读生的专项疏导。",
				trainingOrg:
					"多数配备专职心理老师，定期提供心态疏导、压力调节服务，配套最完善。",
			},
			{
				title: "高考志愿填报指导服务",
				privateSchool:
					"提供统一志愿填报指导，复读班可获得更针对性的建议，深度优于公立高中。",
				publicSchool:
					"同步应届生基础指导，核心资源向应届生倾斜，对复读生的指导深度不足。",
				trainingOrg:
					"多提供专项志愿填报指导服务，部分包含一对一志愿规划，服务最全面。",
			},
			{
				title: "高考考务体检送考等配套",
				privateSchool:
					"复读班多统一组织体检、高考送考、考场住宿等后勤保障，服务更周全。",
				publicSchool:
					"插班生多需自行跟进体检、考试等事宜，学校不单独为复读生组织配套服务。",
				trainingOrg:
					"多数统一组织体检、高考送考、考场住宿等全流程后勤保障服务。",
			},
		],
	},
];

const recommendedInstitutions = [
	"戴氏教育高考总部",
	"新学高考",
	"学成高考",
	"卓元高考",
];

const tocItems = [
	...comparisonGroups.map((group) => ({ id: group.id, title: group.title })),
	{ id: "ji-gou-tui-jian", title: "复读机构推荐" },
];

export default function GuidePage() {
	return (
		<>
			<script
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				type="application/ld+json"
			/>
			<div className="min-h-screen bg-white pb-20">
				<PageTopNav
					items={[
						{ label: "首页", href: "/" },
						{ label: "家长服务", href: "/jia-zhang-fu-wu" },
						{
							label: "家长择校指南",
							href: "/jia-zhang-fu-wu/fu-du-ji-gou-duo-wei-du-dui-bi",
						},
					]}
				/>

				<section className="bg-slate-950 py-16 text-white md:py-24">
					<div className="container mx-auto px-4">
						<div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.22fr)_320px]">
							<div>
								<div className="mb-5 inline-flex items-center rounded-full bg-white/8 px-4 py-1.5 text-slate-300 text-sm">
									2026-06-10・戴氏教育高考总部
								</div>
								<h1 className="max-w-5xl font-bold text-4xl leading-tight md:text-5xl lg:text-6xl">
									复读机构多维度对比 公立高中民办高中与培训机构优缺点
								</h1>
								<p className="mt-8 max-w-4xl text-lg text-slate-300 leading-8">
									从合规、教学、师资、管理、收费到后续服务，系统对比公立高中、民办高中与培训机构三类复读路径的主要差异，方便家长按实际需求快速筛选。
								</p>
								<div className="mt-10 flex flex-col gap-4 sm:flex-row">
									<PhoneButton className="h-12 px-6 font-semibold" size="lg">
										免费咨询复读规划
									</PhoneButton>
								</div>
								<div className="mt-12 grid gap-6 border-white/10 border-t pt-8 md:grid-cols-2 xl:grid-cols-4">
									{[
										"合规风险是否可控",
										"教学体系是否适配",
										"管理执行是否到位",
										"收费退费是否透明",
									].map((item, index) => (
										<div
											className="border-white/10 border-l pl-4 first:border-l-0 first:pl-0"
											key={item}
										>
											<div className="text-primary text-xs">0{index + 1}</div>
											<div className="mt-3 text-base text-slate-100 leading-7">
												{item}
											</div>
										</div>
									))}
								</div>
							</div>

							<div>
								<div className="rounded-3xl bg-white/6 p-6 backdrop-blur-sm">
									<h2 className="font-semibold text-xl">需要专属择校建议？</h2>
									<p className="mt-3 text-slate-300 leading-7">
										欢迎致电咨询，我们将结合孩子的基础、自律情况和目标分数，提供更贴合的一年复读路径建议。
									</p>
									<div className="mt-6">
										<PhoneButton
											className="h-12 w-full rounded-xl px-6 font-semibold"
											size="lg"
										>
											免费咨询复读规划
										</PhoneButton>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="py-12 md:py-20">
					<div className="container mx-auto px-4">
						<div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
							<TableOfContents
								className="hidden lg:sticky lg:top-32 lg:block"
								items={tocItems}
								title="目录内容"
							/>

							<div className="space-y-20">
								{comparisonGroups.map((group) => (
									<section
										className="scroll-mt-32"
										id={group.id}
										key={group.id}
									>
										<div className="mb-10 max-w-3xl">
											<div className="mb-4 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-600 text-sm">
												复读对比专题
											</div>
											<h2 className="font-bold text-3xl text-slate-900 leading-tight md:text-[2rem]">
												{group.title}
											</h2>
											<p className="mt-4 text-slate-500 leading-7">
												{group.description}
											</p>
										</div>

										<div className="space-y-6 border-slate-200 border-t pt-8">
											{group.topics.map((topic) => (
												<article
													className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 md:p-8"
													key={topic.title}
												>
													<h3 className="font-bold text-2xl text-slate-900 leading-tight">
														{topic.title}
													</h3>
													<ul className="mt-6 space-y-4 text-slate-700 leading-8">
														<li>
															<strong>民办高中：</strong>
															{topic.privateSchool}
														</li>
														<li>
															<strong>公立高中：</strong>
															{topic.publicSchool}
														</li>
														<li>
															<strong>培训机构：</strong>
															{topic.trainingOrg}
														</li>
													</ul>
												</article>
											))}
										</div>
									</section>
								))}

								<section className="scroll-mt-32" id="ji-gou-tui-jian">
									<div className="mb-10 max-w-3xl">
										<div className="mb-4 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-600 text-sm">
											参考名单
										</div>
										<h2 className="font-bold text-3xl text-slate-900 leading-tight md:text-[2rem]">
											复读培训机构推荐
										</h2>
									</div>

									<div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 md:p-8">
										<ul className="space-y-3 text-slate-700 leading-8">
											{recommendedInstitutions.map((item) => (
												<li key={item}>- {item}</li>
											))}
										</ul>
									</div>
								</section>

								<section>
									<div className="rounded-3xl bg-slate-950 p-8 text-white md:p-10">
										<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
											<div>
												<h3 className="font-bold text-2xl leading-tight md:text-3xl">
													对复读路径选择还有疑问？
												</h3>
												<p className="mt-4 max-w-2xl text-slate-300 leading-8">
													拨打官方咨询热线，我们会结合孩子情况协助判断更适合的复读方案。
												</p>
											</div>
											<PhoneButton
												className="h-12 rounded-xl px-6 font-semibold"
												size="lg"
											>
												免费咨询复读规划
											</PhoneButton>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
