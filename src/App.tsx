import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Truck, 
  Container, 
  Anchor, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  FileText, 
  PhoneCall, 
  ChevronRight, 
  Menu, 
  X,
  ArrowRight,
  BarChart3,
  AlertTriangle,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const NAV_LINKS = [
  { name: "核心业务", href: "#services" },
  { name: "运营流程", href: "#process" },
  { name: "管理制度", href: "#management" },
  { name: "应急预案", href: "#emergency" },
  { name: "服务质量", href: "#quality" },
];

const MANAGEMENT_MODULES = [
  {
    id: "mod1",
    title: "企业服务能力",
    content: "深耕公路集装箱运输20载，我们以稳定的资源与成熟的经验，为客户提供“一诺必达”的专业服务。",
    color: "bg-blue-50 text-blue-600",
    details: [
      {
        label: "管理经验",
        value: "多年物流运营背景，岗位分工清晰，确保项目稳健导入。",
        bullets: [
          "成立于2006年，总部位于深圳盐田",
          "主要从事全国范围内公路集装箱长短途运输及报关、仓储相关配套服务",
          "具备成熟的物流管理经验、稳定的车辆及司机资源、信息化调度管理能力",
          "服务理念为“一诺必达、专业用心，24小时提供最优质的服务”"
        ]
      },
      {
        label: "车辆资源",
        value: "自有厢式车、自备柜及货柜车，满足多样化车型需求。",
        bullets: [
          "自有厢式车、自备柜及货柜车资源，驾驶员经培训后上岗",
          "吨车自备柜业务围绕接单准备、派车复核、装车离厂、在途跟踪、到仓卸货和回单归档实施标准化管理",
          "进口业务以“提重还空”为核心，出口业务围绕提空柜、工厂装货、报关衔接、还重柜、资料整理实施标准化管理",
          "满足不同车型、柜型和时效需求"
        ]
      },
      {
        label: "保险保障",
        value: "全额物流责任险，可针对高价值货物提供专项加保。",
        bullets: [
          "为运输业务投保物流责任保险",
          "可按货值增加临时高价值货物投保安排",
          "针对冷藏/温控货物，可根据客户产品价值和运输要求增加保险安排",
          "高价值货物可按项目申请单次临时投保，降低运输风险和客户损失"
        ]
      },
    ]
  },
  {
    id: "mod2",
    title: "作业标准化",
    content: "建立吨车自备柜、码头柜进出口标准作业程序（SOP），确保每一个环节都有章可循。",
    color: "bg-cyan-50 text-cyan-600",
    details: [
      {
        label: "码头柜出口",
        value: "提空柜检查 → 工厂装货 → 报关衔接 → 还重柜 → 资料整理。",
        bullets: [
          "接单与订舱资料：核对Booking、柜型、截关时间、装货地址、报关资料，单证不齐不得进入派车",
          "提空柜：检查柜体清洁、破损、异味、漏水、柜门开闭状态，不合格柜体不得装货",
          "工厂装货：监控货物包装、数量、重心、封柜和铅封记录，封号应与资料一致",
          "报关衔接：确认司机本、司机纸、报关资料移交和放行状态",
          "还重柜：按预约窗口还柜，取得码头签收或系统状态，错过截关立即升级处理",
          "资料整理：设备交接单、提柜单回联、Booking、报关资料按客户装订归档，当日移交财务和单证，账不过夜"
        ]
      },
      {
        label: "码头柜进口",
        value: "船舶动态确认 → 提柜资料核对 → 码头提柜 → 卸货安排 → 空柜返还。",
        bullets: [
          "船舶动态确认：确认到港时间、可提柜时间、港区和船公司要求，到港异常及时调整派车计划",
          "提柜资料核对：核对柜号、提柜单、设备交接单、船公司和港区信息，信息不一致暂停提柜",
          "码头提柜：按预约时间提柜，检查柜体外观和封条状态，柜体异常要求码头开具证明",
          "运输至工厂/仓库：按路线执行并反馈到达、卸货、离厂节点，延误影响免租期时提前预警",
          "空柜返还：按客户或船公司要求返还空柜并取得交接资料，港区拥堵或返空延误及时同步客户"
        ]
      },
      {
        label: "特殊业务",
        value: "机场提货、冷藏温控、高价值货物及多点装卸专项控制。",
        bullets: [
          "机场提货：按机场现场要求提货，提醒驾驶员核对外包装和数量，异常即时拍照并汇报",
          "冷藏/温控货物：确认温控要求、车辆条件、装卸等待时间和保险条款，可根据客户产品价值和运输要求增加保险安排",
          "高价值货物：运输前确认货值、路线、车辆、停车点和临时投保需求，可按项目申请单次临时投保",
          "多点装卸：接单阶段确认各点顺序、时间窗口、费用承担和联系人，多点产生费用应提前确认",
          "异地报关/转关：核查司机本、IC卡、准载证、载货清单等资料，资料缺失不得出车或进场操作"
        ]
      },
    ]
  },
  {
    id: "mod3",
    title: "安全生产管理",
    content: "安全是运营的底线。实行“出车前检查 + 过程监控 + 现场安全”全方位管理体系。",
    color: "bg-orange-50 text-orange-600",
    details: [
      {
        label: "驾驶员管理",
        value: "准入审核、季度安全培训、事故后专项复训。",
        bullets: [
          "安全驾驶培训：酒后禁驾、疲劳驾驶防控、雨天/涉水/隧道/铁路道口行车要求，入职及季度复训",
          "现场作业培训：停放、熄火、三角木、监装监卸、封条和柜体检查，项目导入及月度抽查",
          "异常处理培训：货损货差、车辆故障、交通事故、盗抢、压夜、返空处理，半年演练或案例复盘",
          "重点客户或特殊业务应进行专项操作交底"
        ]
      },
      {
        label: "车辆检查",
        value: "机油、制动、轮胎、灯光、方向等每日出车前必检。",
        bullets: [
          "机油/冷却水/刹车油/燃料：确认充足，无漏油、漏水现象，不足或泄漏时不得出车",
          "皮带与发电设备：检查风扇皮带、冷气机和发电机皮带松紧程度，异常需维修确认",
          "轮胎与轮毂：轮胎气压正常，轮毂螺丝无松动，存在明显磨损或松动时处理后出车",
          "灯光/喇叭/雨刮：设备齐全且工作良好，夜间或雨天必须恢复后出车",
          "制动与方向：刹车和方向有效，仪表无异常报警，存在故障立即停运报修"
        ]
      },
      {
        label: "行车安全",
        value: "严禁酒驾疲劳驾驶，涉水路段及特殊地形专项指引。",
        bullets: [
          "车辆起步：发动前拉紧手制动、变速杆置于空档；起步前观察前后左右行人和障碍物",
          "行车过程：集中精神驾驶，不吸烟、饮食、闲谈；严禁酒后驾驶、熄火滑行、强行超车",
          "涉水路段：先了解水情，水面超过轮胎三分之二以上不得通过；涉水后低速轻踏制动恢复制动效果",
          "铁路/隧道/高架：铁路道口提前减速观察，严禁抢行；注意限高标识并准确通过",
          "途中停车：选择安全位置，不影响其他车辆；检修时靠右停放、开启警示灯、摆放危险标志并熄火",
          "过夜停车：车辆在外过夜或带货过夜，应停放在安全有保障的单位或停车场，车尾对尾或车尾对墙，防止货物被盗"
        ]
      },
    ]
  },
  {
    id: "mod4",
    title: "可视化运营",
    content: "依托GPS与信息化系统，实现运输全过程可视化管理，让每一票货物都实时可见。",
    color: "bg-purple-50 text-purple-600",
    details: [
      {
        label: "实时监控",
        value: "车辆位置、在途状态、异常停留实时预警。",
        bullets: [
          "订单基础信息：客户、订单号、柜号、柜型、装卸地址、联系人、时间窗口，建立运输任务唯一标识",
          "派车信息：车辆、驾驶员、电话、候命地点、取单时间，保证资源匹配和责任落实",
          "运输节点：到厂、装货、离厂、到仓、签收、返空/还柜时间，支撑时效控制和客户查询",
          "异常信息：异常类型、原因、处理措施、客户同步、费用影响，支撑复盘和结算",
          "单证资料：提柜单、设备交接单、签收单、费用票据、照片，保证可追溯和可审核"
        ]
      },
      {
        label: "数据透明",
        value: "节点报表、异常记录、项目KPI统计定时推送。",
        bullets: [
          "节点反馈及时率≥95%：到厂、离厂、到仓、签收等节点按要求反馈的比例，保证运输透明",
          "单证完整率≥98%：按单完整回收并归档的运输任务比例，支撑费用结算和客户审核",
          "异常响应启动30分钟内：发现异常至调度启动处理并同步相关方的时间，降低客户风险感知",
          "客户投诉回复24小时内：投诉收到至首次正式回复的时间，提升服务感知",
          "费用确认留痕率100%：压夜、返空、高速、多点等费用取得客户确认的比例，减少结算争议"
        ]
      },
      {
        label: "信息安全",
        value: "严格的数据访问权限管理，确保客户资料安全。",
        bullets: [
          "订单资料、客户信息、司机信息、报关资料、费用资料和影像记录均属于公司运营数据，按岗位权限访问和保存",
          "对客户提供的项目资料不得擅自外传",
          "对投标、审厂或客户审核所需资料，应由指定窗口统一提供",
          "公司持续推进流程化、规范化管理，并通过质量管理体系相关认证，提高服务一致性与可审核性"
        ]
      },
    ]
  }
];

const FORMS_TEMPLATES = [
  { name: "订单受理登记表", desc: "识别时效、地址、柜型及特殊要求" },
  { name: "车辆出车检查表", desc: "机油、制动、轮胎等安全项确认" },
  { name: "突发事件首报表", desc: "时间、地点、原因、影响十要素记录" },
  { name: "复盘记录表", desc: "原因分析、响应评价、整改措施" },
];

const EMERGENCY_LEVELS = [
  {
    id: "level-1",
    level: "一级响应",
    title: "重大突发事件",
    criteria: "人员受伤、重大事故、火灾、严重货损、影响船期或重大费用损失。",
    goal: "保障安全，控制损失，统一口径。",
    action: "立即上报，运营负责人介入，报警报保险。",
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20"
  },
  {
    id: "level-2",
    level: "二级响应",
    title: "中度突发事件",
    criteria: "车辆故障、严重延误、提不到柜、压夜、一般货损货差。",
    goal: "查明原因，制定替代方案，快速恢复。",
    action: "调度主管跟进，30分钟内同步客户。",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20"
  },
  {
    id: "level-3",
    level: "三级响应",
    title: "一般突发事件",
    criteria: "一般等待、轻微信息偏差、单证小错误、短时系统异常。",
    goal: "现场修正，记录留痕，避免扩大。",
    action: "当班调度处理并记录。",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  }
];

const EMERGENCY_ROLES = [
  { role: "应急总负责人", task: "统一指挥重大事件处理，决策一级响应与重大事项回复。" },
  { role: "调度中心", task: "接收上报，核实事实，协调换车/维修/改约，同步客户。" },
  { role: "驾驶员/现场人员", task: "第一时间控制现场，保护安全，拍照留证，配合救援。" },
  { role: "单证/财务/保险", task: "核查资料，协助沟通，核实费用，对接理赔。" },
];

const SERVICES = [
  {
    title: "集装箱运输",
    description: "日常客户运输任务，全过程节点控制与订单流转标准。",
    longDescription: "嘉亨物流的核心业务，专注于深港及珠三角地区的集装箱公路运输。我们拥有完善的调度系统，确保每一票业务都能实时跟踪，实现全生命周期的订单管理。",
    features: ["24小时全天候调度", "GPS全程实时监控", "节点反馈及时率 ≥95%", "专业单证闭环处理"],
    icon: <Container className="w-8 h-8" />,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "吨车自备柜",
    description: "工厂与仓库间的高效运输，严格的现场执行与时效控制。",
    longDescription: "针对工厂与仓库之间的频繁调拨需求，提供定制化的自备柜运输方案。通过优化装卸流程与标准化作业程序（SOP），显著降低客户的综合物流成本。",
    features: ["快速周转响应", "灵活的资源匹配", "装卸现场标准化作业", "成本优化方案定制"],
    icon: <Truck className="w-8 h-8" />,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "码头柜进出口",
    description: "进出口提还柜业务，精准的单证与港区节点控制。",
    longDescription: "专业的码头提还柜服务，深度熟悉盐田、蛇口等各大港区的操作流程。精准衔接报关与船期，确保货物进出口的高效流转。",
    features: ["港区节点精准控制", "规避滞箱费风险", "报关衔接无缝顺畅", "船舶动态实时确认"],
    icon: <Anchor className="w-8 h-8" />,
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "配套运输服务",
    description: "转关、报关、交仓等特殊流程识别与全方位配套支持。",
    longDescription: "提供物流链条上的全方位增值服务，包括转关、报关、交仓及特殊货物（如冷藏、高价值货物）的专项处理，为客户提供一站式物流解决方案。",
    features: ["一站式报关服务", "特殊货物专项控制", "仓储与交仓衔接", "全方位增值配套"],
    icon: <Zap className="w-8 h-8" />,
    color: "bg-purple-50 text-purple-600",
  },
];

const KPIS = [
  { label: "节点反馈及时率", value: "≥95%", desc: "保证运输全过程透明可追溯" },
  { label: "单证完整率", value: "≥98%", desc: "支撑高效费用结算与合规" },
  { label: "异常响应启动", value: "<30min", desc: "快速介入，降低客户损失" },
  { label: "客户投诉回复", value: "<24h", desc: "持续优化，提升服务感知" },
];

const PHONE_CONTACTS = [
  { role: "负责人", name: "李小姐", phone: "13928498835" },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [wechatOpen, setWechatOpen] = useState(false);
  const [phonesOpen, setPhonesOpen] = useState(false);
  const [selectedManagementDetail, setSelectedManagementDetail] = useState<{
    mod: typeof MANAGEMENT_MODULES[0];
    detail: typeof MANAGEMENT_MODULES[0]['details'][0];
  } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-md border-b border-slate-200 py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Container className="text-white w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">嘉亨物流</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button size="sm" className="rounded-full px-6" onClick={() => setWechatOpen(true)}>
              联系我们
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-display font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button size="lg" className="w-full rounded-xl mt-4" onClick={() => setWechatOpen(true)}>
                联系我们
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider">
                专业集装箱运输专家
              </Badge>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.1] mb-8">
                物流，<span className="text-slate-400">重新定义。</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 mb-10 leading-relaxed">
                深圳嘉亨物流有限公司，以标准化手册为基石，通过全生命周期管理与卓越的应急机制，为您的全球贸易保驾护航。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="rounded-full px-8 h-12 text-base" onClick={() => setWechatOpen(true)}>
                  立即咨询 <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 h-12 text-base"
                  render={
                    <a
                      href="https://www.notion.so/34175644446880b7bae9c9a63d6fedf8?source=copy_link"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  了解运营手册
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Abstract Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50 animate-pulse delay-1000" />
          </div>
        </section>

        {/* Services Section (Bento Grid) */}
        <section id="services" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">核心业务领域</h2>
              <p className="text-slate-500 text-lg">全方位的物流解决方案，覆盖从工厂到码头的每一个环节。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map((service, idx) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card 
                    className="h-full border-none shadow-sm hover:shadow-md transition-all group overflow-hidden bg-white cursor-pointer"
                    onClick={() => setSelectedService(service)}
                  >
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                        {service.description}
                      </p>
                      <div className="flex items-center text-sm font-semibold text-slate-900 group-hover:translate-x-1 transition-transform">
                        查看详情 <ChevronRight className="ml-1 w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Service Detail Modal */}
            <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
              <DialogContent className="sm:max-w-[700px] w-[95vw] rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
                {selectedService && (
                  <div className="flex flex-col relative">
                    <div className={`p-12 ${selectedService.color} flex items-center justify-between`}>
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                          {React.cloneElement(selectedService.icon as React.ReactElement, { size: 24 })}
                        </div>
                        <DialogTitle className="text-[28px] font-display font-bold leading-tight">{selectedService.title}</DialogTitle>
                      </div>
                    </div>
                    <div className="p-12 bg-white">
                      <DialogDescription className="text-slate-500 text-sm leading-relaxed mb-8">
                        {selectedService.longDescription}
                      </DialogDescription>
                      
                      <div className="space-y-6">
                        <h4 className="font-bold text-slate-900 text-lg">核心优势</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedService.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                              <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <span className="text-slate-700 text-sm font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">全生命周期管理</h2>
                <p className="text-slate-500 text-lg mb-10">
                  从订单受理到单证闭环，我们建立了一套严密的控制链条，确保每一个节点都精准无误。
                </p>
                
                <div className="space-y-6">
                  {[
                    { title: "订单受理", desc: "统一受理，信息完整，审核明确。", icon: <FileText className="w-5 h-5" /> },
                    { title: "调度派车", desc: "资源匹配，时效优先，发车复核。", icon: <Truck className="w-5 h-5" /> },
                    { title: "在途跟踪", desc: "实时动态，节点反馈，异常预警。", icon: <Clock className="w-5 h-5" /> },
                    { title: "交付确认", desc: "单证流转，费用确认，业务闭环。", icon: <CheckCircle2 className="w-5 h-5" /> },
                  ].map((item, i) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                        <p className="text-slate-500 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden relative">
                  <img 
                    src="https://picsum.photos/seed/logistics-tech/800/800" 
                    alt="Logistics Technology" 
                    className="w-full h-full object-cover mix-blend-multiply opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  
                  {/* Floating UI Elements */}
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[200px]"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">实时状态</span>
                    </div>
                    <p className="text-xs font-bold">粤B·88888 已到达装货点</p>
                  </motion.div>

                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-10 left-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">反馈率</p>
                        <p className="text-lg font-bold">98.5%</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Management System Section */}
        <section id="management" className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-24">
              <Badge className="mb-6 bg-blue-600 text-white border-none px-4 py-1 rounded-full">运营管理体系</Badge>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">标准化管理，体系化运营</h2>
              <p className="text-slate-500 text-xl md:text-2xl max-w-3xl leading-relaxed">
                嘉亨物流通过《运输服务质量与运营管理制度汇编》，将20年的行业经验转化为可执行、可审计的标准。
              </p>
            </div>

            <Tabs defaultValue="mod1" className="w-full">
              <TabsList className="w-full justify-start bg-transparent border-b border-slate-200 rounded-none h-auto p-0 mb-16 overflow-x-auto scrollbar-hide">
                {MANAGEMENT_MODULES.map((mod) => (
                  <TabsTrigger 
                    key={mod.id} 
                    value={mod.id}
                    className="rounded-none border-b-4 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-10 py-6 text-lg md:text-xl font-bold transition-all text-slate-400 data-[state=active]:text-slate-900"
                  >
                    {mod.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {MANAGEMENT_MODULES.map((mod) => (
                <TabsContent key={mod.id} value={mod.id} className="mt-0 focus-visible:outline-none">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5">
                      <h3 className="text-3xl md:text-4xl font-display font-bold mb-8 leading-tight">{mod.title}</h3>
                      <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-12">
                        {mod.content}
                      </p>
                      <Button
                        size="lg"
                        className="rounded-full px-10 h-14 text-lg"
                        render={
                          <a
                            href="https://www.notion.so/3417564444688014a094eee3ee6e08ad?source=copy_link"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        }
                      >
                        阅读完整规范
                      </Button>
                    </div>
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {mod.details.map((detail, idx) => (
                        <Card
                          key={idx}
                          className="border-none shadow-sm bg-white rounded-[2rem] hover:shadow-md transition-shadow cursor-pointer overflow-hidden group"
                          onClick={() => setSelectedManagementDetail({ mod, detail })}
                        >
                          <div className={`h-2 ${mod.color.split(' ')[0]}`} />
                          <CardContent className="p-10">
                            <div className={`w-12 h-12 rounded-xl ${mod.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                              <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3">{detail.label}</h4>
                            <p className="text-slate-500 leading-relaxed text-sm">{detail.value}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Management Detail Dialog */}
            <Dialog open={!!selectedManagementDetail} onOpenChange={(open) => !open && setSelectedManagementDetail(null)}>
              <DialogContent className="sm:max-w-[640px] w-[95vw] rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
                {selectedManagementDetail && (
                  <div className="flex flex-col relative">
                    <div className={`p-12 ${selectedManagementDetail.mod.color.split(' ')[0]} ${selectedManagementDetail.mod.color.split(' ')[1]} flex items-center justify-between`}>
                      <DialogTitle className="text-[28px] font-display font-bold leading-tight">
                        {selectedManagementDetail.detail.label}
                      </DialogTitle>
                    </div>
                    <div className="p-12 bg-white">
                      <ul className="space-y-4">
                        {((selectedManagementDetail.detail as any).bullets || [selectedManagementDetail.detail.value]).map((item: string, i: number) => (
                          <li key={i} className="flex gap-3 text-slate-600 text-base leading-relaxed">
                            <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${selectedManagementDetail.mod.color.split(' ')[1].replace('text-', 'bg-')}`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Bidding Support: Document Checklist */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20">
              <Badge className="mb-6 bg-slate-100 text-slate-900 border-none px-4 py-1 rounded-full">合规与审计</Badge>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight text-slate-900">助力您的业务审核</h2>
              <p className="text-slate-500 text-xl md:text-2xl max-w-3xl leading-relaxed">
                我们深知客户对合规与质量的严苛要求。嘉亨物流提供完整的投标资料清单与现场审核接待支持。
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: "企业基础资料", value: "营业执照、道路运输许可证、组织架构、企业简介及资质证明。" },
                { label: "质量与安全管理", value: "质量管理体系认证、TAPA安全认证资料、驾驶员安全培训记录。" },
                { label: "标准化运营方案", value: "接单流程、在途跟踪机制、异常处理预案、单证归档与财务协同。" },
                { label: "项目执行保障", value: "KPI服务承诺、车辆资源安排、应急响应资源、信息化反馈机制。" },
              ].map((item) => (
                <div key={item.label} className="p-12 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
                  <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{item.label}</h4>
                  <p className="text-slate-500 text-lg leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bidding Support: Operational Forms */}
        <section className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight text-slate-900">标准化运营表单</h2>
                <p className="text-slate-500 text-xl leading-relaxed">
                  每一项业务动作都通过标准化表单进行记录与留痕，确保管理过程的可追溯性。
                </p>
              </div>
              <Button variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg bg-white">
                <FileText className="mr-2 w-5 h-5" /> 下载表单样例
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {FORMS_TEMPLATES.map((form) => (
                <div key={form.name} className="p-10 rounded-[2.5rem] bg-white shadow-sm border border-transparent hover:border-blue-200 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-slate-900">{form.name}</h4>
                  <p className="text-slate-500 leading-relaxed">{form.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Section - Detailed */}
        <section id="emergency" className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6 border-white/20 text-white/80 rounded-full px-4 py-1">
                运输突发事件应急响应与处置预案 V1.0
              </Badge>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">安全第一，快速响应，分级管理</h2>
              <p className="max-w-2xl mx-auto text-slate-400 text-lg">
                嘉亨物流建立了一套严谨的应急组织体系，确保在交通事故、车辆故障、货损货差等突发状况下，实现损失最小化与服务连续性。
              </p>
              <div className="mt-8 flex justify-center">
                <Button
                  variant="outline"
                  className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white px-8 h-12 text-base"
                  render={
                    <a
                      href="https://www.notion.so/341756444468803cb6f3c4858cd4d55f?source=copy_link"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  查看完整应急预案
                </Button>
              </div>
            </div>

            {/* Response Levels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {EMERGENCY_LEVELS.map((item) => (
                <div key={item.id} className={`p-8 rounded-3xl bg-white/5 border ${item.border} backdrop-blur-sm flex flex-col`}>
                  <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-6`}>
                    <ShieldAlert className={item.color} />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest ${item.color} mb-2 block`}>{item.level}</span>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <div className="space-y-4 flex-grow">
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">判定标准</p>
                      <p className="text-slate-300 text-sm">{item.criteria}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">响应动作</p>
                      <p className="text-slate-300 text-sm">{item.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reporting Timeline */}
            <div className="bg-white/5 rounded-[2rem] p-8 md:p-12 border border-white/10 mb-20">
              <h3 className="text-2xl font-display font-bold mb-10 text-center">信息报告时限要求</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {[
                  { time: "10min", label: "现场首报", desc: "驾驶员确认安全后完成首报", icon: <PhoneCall className="w-5 h-5" /> },
                  { time: "15min", label: "调度核实", desc: "调度完成基础事实核实", icon: <CheckCircle2 className="w-5 h-5" /> },
                  { time: "30min", label: "客户同步", desc: "二级及以上异常同步客户", icon: <Zap className="w-5 h-5" /> },
                  { time: "1h", label: "重大升级", desc: "一级响应报保险或外部机构", icon: <AlertTriangle className="w-5 h-5" /> },
                ].map((step, i) => (
                  <div key={step.label} className="relative z-10">
                    <div className="text-4xl font-display font-bold text-blue-500 mb-2">{step.time}</div>
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      {step.icon} {step.label}
                    </h4>
                    <p className="text-sm text-slate-400">{step.desc}</p>
                  </div>
                ))}
                {/* Connecting Line (Desktop) */}
                <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-white/10 -z-0" />
              </div>
            </div>

            {/* Roles & Responsibilities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              <div className="flex flex-col">
                <h3 className="text-2xl font-display font-bold mb-8">应急组织架构与职责</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                  {EMERGENCY_ROLES.map((role) => (
                    <div key={role.role} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex flex-col h-full">
                      <h4 className="font-bold text-white mb-2">{role.role}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{role.task}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col">
                <Accordion type="single" collapsible className="w-full" defaultValue="principles">
                  <AccordionItem value="principles" className="border-white/10 bg-blue-600/5 rounded-[2rem] px-6 mb-6 overflow-hidden border">
                    <AccordionTrigger className="text-xl font-bold hover:no-underline flex items-center gap-2 py-6">
                      <ShieldAlert className="text-blue-500" /> 应急处置原则
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <ul className="space-y-4 text-sm text-slate-300">
                        <li className="flex gap-3">
                          <span className="text-blue-500 font-bold">01</span>
                          <span><strong>人员安全优先：</strong>优先保障生命安全，再处理货、车、资。</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-blue-500 font-bold">02</span>
                          <span><strong>快速响应：</strong>调度在规定时限内完成核实、升级与同步。</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-blue-500 font-bold">03</span>
                          <span><strong>统一口径：</strong>对外沟通基于事实，由指定人员统一输出。</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-blue-500 font-bold">04</span>
                          <span><strong>证据留存：</strong>照片、视频、GPS、单证等资料同步留存。</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-1" className="border-white/10 px-6">
                    <AccordionTrigger className="text-lg hover:no-underline">专项应急处置流程</AccordionTrigger>
                    <AccordionContent className="text-slate-400 space-y-4 pb-6">
                      <p><strong>交通事故：</strong>现场安全控制 → 报警留证 → 信息上报 → 调度处置 → 后续处理。</p>
                      <p><strong>货损货差：</strong>暂停装卸 → 拍照记录 → 核实责任 → 客户确认。</p>
                      <p><strong>运输延误：</strong>确认节点 → 预计恢复时间 → 评估船期影响 → 同步替代方案。</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-white/10 px-6">
                    <AccordionTrigger className="text-lg hover:no-underline">保险理赔与费用确认</AccordionTrigger>
                    <AccordionContent className="text-slate-400 pb-6">
                      我们建立了透明的费用确认机制（压夜、返空、高速等）及完善的保险理赔资料清单，确保客户利益得到最大程度保障。
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
          
          {/* Background Glow */}
          <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
          <div className="absolute -top-48 -left-48 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]" />
        </section>

        {/* Standardized Operations Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-6 bg-white/10 text-white border-none">标准化作业程序 (SOP)</Badge>
                  <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">嘉亨物流运营手册</h2>
                  <p className="text-slate-400 text-lg mb-8">
                    我们不仅提供运输，更提供一套经过实战检验的标准化作业体系。从吨车自备柜到码头柜进出口，每一项业务都有章可循。
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <h4 className="font-bold mb-1">吨车自备柜 SOP</h4>
                      <p className="text-xs text-slate-500">涵盖接单、装车、在途、卸货及回单全过程。</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <h4 className="font-bold mb-1">码头柜进出口 SOP</h4>
                      <p className="text-xs text-slate-500">精准控制提还柜时间窗口，规避滞箱费风险。</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative w-64 h-80 bg-white rounded-2xl shadow-2xl p-8 text-slate-900 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="w-10 h-1 bg-slate-200 mb-6" />
                    <h3 className="font-display font-bold text-xl mb-4">运营流程与应急管理手册</h3>
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-slate-100 rounded" />
                      <div className="h-2 w-5/6 bg-slate-100 rounded" />
                      <div className="h-2 w-4/6 bg-slate-100 rounded" />
                      <div className="h-2 w-full bg-slate-100 rounded" />
                    </div>
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>Ver 2026.03</span>
                        <Container className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 right-10 w-64 h-64 border border-white rounded-full" />
                <div className="absolute top-20 right-20 w-64 h-64 border border-white rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Quality Section */}
        <section id="quality" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">服务质量承诺</h2>
                <p className="text-slate-500 text-lg">
                  数据驱动服务，我们用可量化的指标定义卓越。
                </p>
              </div>
              <Button variant="outline" className="rounded-full">查看完整质量报告</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {KPIS.map((kpi, i) => (
                <div key={kpi.label} className="text-center md:text-left">
                  <p className="text-4xl md:text-5xl font-display font-bold mb-2 text-slate-900">{kpi.value}</p>
                  <h4 className="font-bold text-slate-900 mb-2">{kpi.label}</h4>
                  <p className="text-slate-500 text-sm">{kpi.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto bg-slate-100 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">准备好开始您的运输任务了吗？</h2>
              <p className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto">
                联系我们的专业团队，获取定制化的物流解决方案。我们全天候为您提供支持。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="rounded-full px-10 h-14 text-lg" onClick={() => setWechatOpen(true)}>
                  联系我们
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg bg-white" onClick={() => setPhonesOpen(true)}>
                  <PhoneCall className="mr-2 w-5 h-5" /> 咨询电话
                </Button>
              </div>
            </div>
            
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200/30 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <Container className="text-white w-5 h-5" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight">嘉亨物流</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                深圳市嘉亨物流有限公司，专业的集装箱运输运营流程与应急管理专家。
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-6">核心业务</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-slate-900 transition-colors">集装箱运输</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">吨车自备柜</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">码头柜进出口</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">配套运输服务</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-6">公司信息</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-slate-900 transition-colors">关于我们</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">运营手册</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">服务质量</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">加入我们</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-6">联系我们</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li className="flex flex-col">
                  <span className="text-slate-900 font-medium">散货专线</span>
                  <span>2528 0588</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-900 font-medium">集装箱自备柜</span>
                  <span>8263 1258</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-900 font-medium">传真</span>
                  <span>2528 0577</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-900 font-medium">公司地址</span>
                  <span className="text-xs">深圳市盐田区东海道244号鹏广达时代广场写字楼C栋1706A</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 gap-4">
            <p className="text-xs text-slate-400">
              © 2026 深圳市嘉亨物流有限公司. 保留所有权利。
            </p>
            <div className="flex gap-6 text-xs text-slate-400">
              <a href="#" className="hover:text-slate-900 transition-colors">隐私政策</a>
              <a href="#" className="hover:text-slate-900 transition-colors">使用条款</a>
              <a href="#" className="hover:text-slate-900 transition-colors">粤ICP备XXXXXXXX号</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WeChat QR Code Dialog */}
      <Dialog open={wechatOpen} onOpenChange={setWechatOpen}>
        <DialogContent className="sm:max-w-[360px] w-[90vw] rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl text-center">
          <DialogHeader className="pt-10 pb-2">
            <DialogTitle className="text-2xl font-display font-bold">添加微信咨询</DialogTitle>
            <DialogDescription className="text-slate-500 px-6">
              扫描二维码添加嘉亨物流客服微信，获取定制化物流方案
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pb-10 px-6">
            <img
              src="./wechat-qr.jpg"
              alt="微信二维码"
              className="w-56 h-56 rounded-2xl shadow-md object-cover bg-slate-100"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Phone Contacts Dialog */}
      <Dialog open={phonesOpen} onOpenChange={setPhonesOpen}>
        <DialogContent className="sm:max-w-[420px] w-[90vw] rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
          <DialogHeader className="pt-10 pb-4 text-center">
            <DialogTitle className="text-2xl font-display font-bold">联系电话</DialogTitle>
            <DialogDescription className="text-slate-500 px-6">
              点击号码可直接拨打，工作时间随时为您服务
            </DialogDescription>
          </DialogHeader>
          <div className="pb-10 px-6">
            <div className="space-y-3">
              {PHONE_CONTACTS.map((contact) => (
                <a
                  key={contact.role}
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <PhoneCall className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">
                        {contact.name ? `${contact.role} · ${contact.name}` : contact.role}
                      </p>
                      <p className="text-sm text-slate-500">{contact.phone}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
