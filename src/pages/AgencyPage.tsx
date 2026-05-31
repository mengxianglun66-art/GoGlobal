import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronDown, ChevronUp, ArrowRight, Star, Smartphone, TrendingUp, Globe } from 'lucide-react';

const suitableFor = [
  '有产品、有业务，但不懂海外社媒怎么玩',
  '自己试过运营，但涨粉慢、互动少、不出单',
  '团队在国内，招不到靠谱的海外社媒运营',
  '想测试海外市场，但不想一开始就养一个运营团队',
  '已经有一定基础，想放大规模',
];

const plans = [
  {
    icon: Smartphone,
    title: '基础运营',
    tag: '适合刚起步',
    tagColor: 'bg-blue-100 text-blue-700',
    color: 'border-slate-200',
    headerBg: 'bg-slate-50',
    iconBg: 'bg-blue-500',
    features: ['账号搭建与环境配置', '月度内容规划', '日常发布（每周 5 帖）', '互动回复管理', '基础数据月报'],
    cta: '咨询基础方案',
  },
  {
    icon: TrendingUp,
    title: '进阶增长',
    tag: '适合有基础，需要加速',
    tagColor: 'bg-emerald-100 text-emerald-700',
    color: 'border-emerald-300 ring-1 ring-emerald-200',
    headerBg: 'bg-emerald-50',
    iconBg: 'bg-emerald-500',
    features: [
      '包含基础运营全部服务',
      '内容创作（图片/视频/Reels）',
      '涨粉策略制定与执行',
      '竞品分析报告',
      '数据周报',
    ],
    cta: '咨询进阶方案',
    recommended: true,
  },
  {
    icon: Globe,
    title: '全托管增长',
    tag: '适合品牌方、大卖家',
    tagColor: 'bg-slate-100 text-slate-700',
    color: 'border-slate-200',
    headerBg: 'bg-slate-50',
    iconBg: 'bg-slate-700',
    features: [
      '包含进阶增长全部服务',
      '矩阵账号搭建与管理',
      '广告投放策略与执行',
      'KOL / 红人合作对接',
      '私域转化链路搭建',
      '月度深度复盘与策略调整',
      '专属项目经理一对一',
    ],
    cta: '咨询全托管方案',
  },
];

const steps = [
  { num: '01', title: '初步沟通', desc: '聊聊你的产品和目标' },
  { num: '02', title: '需求分析', desc: '了解账号现状与期望' },
  { num: '03', title: '方案确认', desc: '给出具体方案和报价' },
  { num: '04', title: '签约执行', desc: '开始运营，定期汇报' },
  { num: '05', title: '持续优化', desc: '每月复盘，迭代策略' },
];

const cases = [
  {
    name: '广州服装品牌 · 李女士',
    before: '粉丝 600，帖子互动个位数，不出单。',
    actions: ['重新定位内容风格，从产品图转生活方式穿搭', '每周 5 帖 + 每日互动 + 话题策略'],
    result: '2 个月后粉丝 5000+，月均引流成交 $3000+，续签中。',
    metric: '$3000+/月',
  },
  {
    name: '北京心理咨询师 · 张老师',
    before: '自己发帖，内容不系统，粉丝增长慢。',
    actions: ['内容策略从"科普"转向"用户故事+专业观点"', '设计私信转化话术，引导咨询预约'],
    result: '3 个月粉丝 2800+，私域转化付费客户 17 人，客单价 $200–500。',
    metric: '17 位付费客户',
  },
  {
    name: '深圳 3C 品牌 · 陈先生',
    before: '已有 5 个账号，但缺乏系统运营，ROI 不清晰。',
    actions: ['统一内容矩阵，每个账号定位不同垂类', '广告投放测试，优化受众和素材'],
    result: '6 个月总粉丝 3.2 万，广告 ROAS 从 1.2 提升到 2.8。',
    metric: 'ROAS 2.8x',
  },
];

const reviews = [
  {
    text: '之前找过代运营，发的帖子像机器人，一个月没几个粉。他们做的内容有真实感，互动明显多了。',
    name: '李女士',
    label: '广州 · 服装品牌',
  },
  {
    text: '最满意的是他们懂国内客户的痛点。我不用解释为什么用不了 Google Drive，他们直接给方案。',
    name: '张老师',
    label: '北京 · 心理咨询',
  },
  {
    text: '数据报告很清晰，不是糊弄人的那种。每条帖子表现都能看到，知道钱花在哪了。',
    name: '陈先生',
    label: '深圳 · 3C 卖家',
  },
];

const faqs = [
  {
    q: '你们能保证涨多少粉吗？',
    a: '不保证具体数字（保证数字的通常刷假粉）。我们保证稳定更新、内容质量、数据透明和持续优化。实际增长取决于你的行业、竞争、内容投入等多因素。',
  },
  {
    q: '我的行业比较冷门，你们做过吗？',
    a: '我们更关注你的目标客户画像和增长逻辑。冷门行业往往竞争小，做好内容反而容易出效果。可以先聊聊，我们判断能不能做。',
  },
  {
    q: '需要我提供什么？',
    a: '产品资料、品牌定位、目标客户信息、账号权限。素材我们来做，你只需要把关和反馈。',
  },
  {
    q: '合同和付款方式？',
    a: '月度签约，可按月或季度支付。支持微信、支付宝、USDT。',
  },
  {
    q: '如果中途不满意怎么办？',
    a: '提前沟通，可终止合约。没有长期绑定。我们的续签率说明一切。',
  },
];

export default function AgencyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-slate-900 to-blue-950 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            海外社媒代运营
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            你不用自己研究算法、
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
              做图、写文案、回评论
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto mb-10">
            专注你的产品和业务，海外社媒增长交给我们。
            覆盖 Instagram、TikTok，从内容到获客全程托管。
          </p>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-7 max-w-md mx-auto">
            <p className="text-white/80 text-sm mb-4">
              每个品牌的情况不同，先聊聊你的需求，我们再出方案。
              <br />
              第一通咨询免费，没有强制消费。
            </p>
            <a
              href="/#contact"
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              咨询代运营方案 <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Suitable for */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">代运营适合你，如果你：</h2>
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
            {suitableFor.map((s, i) => (
              <div key={i} className="flex items-start gap-4 px-7 py-5 hover:bg-emerald-50/30 transition-colors group">
                <CheckCircle size={18} className="text-emerald-500 flex-shrink-0 mt-0.5 group-hover:text-emerald-600 transition-colors" />
                <p className="text-slate-700 text-sm leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service plans */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">服务内容</h2>
            <p className="text-slate-500">三个层级，根据你的阶段和目标选择</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.title}
                className={`rounded-2xl border ${plan.color} overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative`}
              >
                {plan.recommended && (
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    最受欢迎
                  </div>
                )}
                <div className={`${plan.headerBg} px-6 pt-7 pb-5`}>
                  <div className={`w-11 h-11 ${plan.iconBg} rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                    <plan.icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{plan.title}</h3>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${plan.tagColor}`}>
                    {plan.tag}
                  </span>
                </div>
                <div className="px-6 py-5 flex-1">
                  <ul className="space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                        <span className={`w-1.5 h-1.5 rounded-full ${plan.iconBg} flex-shrink-0`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 pb-6">
                  <a
                    href="/#contact"
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white text-sm font-semibold py-3 rounded-xl transition-all duration-200"
                  >
                    {plan.cta} <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center">合作流程</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-slate-200" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {steps.map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center mb-3 hover:border-blue-300 hover:shadow-md transition-all">
                    <span className="text-xl font-bold text-blue-600">{s.num}</span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm mb-1">{s.title}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-slate-500 text-sm mt-8">第一步免费，无强制消费。</p>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">代运营案例</h2>
          <div className="space-y-5">
            {cases.map((c) => (
              <div key={c.name} className="rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-all">
                <div className="bg-slate-50 border-b border-slate-200 px-7 py-4 flex items-center justify-between">
                  <p className="font-bold text-slate-900 text-sm">{c.name}</p>
                  <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full">{c.metric}</span>
                </div>
                <div className="p-7 grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">接手前</p>
                    <p className="text-slate-600 text-sm">{c.before}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">我们做了什么</p>
                    <ul className="space-y-1">
                      {c.actions.map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="text-blue-500 font-bold flex-shrink-0">·</span>{a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">结果</p>
                    <p className="text-slate-700 text-sm font-medium">{c.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">用户怎么说</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-all">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={13} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{r.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-slate-900 text-sm font-semibold">{r.name}</p>
                    <p className="text-slate-400 text-xs">{r.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">常见疑问</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 text-sm pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={16} className="text-slate-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-slate-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">你的海外增长，可以更省心</h2>
          <p className="text-slate-400 mb-8">
            聊聊你的产品和目标，我们告诉你代运营能怎么做。
            第一通咨询免费，没有强制消费。
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg mb-8"
          >
            咨询代运营方案 <ArrowRight size={16} />
          </a>
          <div className="pt-6 border-t border-slate-800">
            <p className="text-slate-500 text-sm mb-3">网络和账号也需要帮忙？我们一并解决。</p>
            <div className="flex items-center justify-center gap-6">
              <Link to="/network" className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline">出海专网 →</Link>
              <Link to="/accounts" className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline">账号商店 →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
