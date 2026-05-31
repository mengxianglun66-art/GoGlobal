import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, DollarSign, Shield, CheckCircle, XCircle, ChevronDown, ChevronUp, ArrowRight, Star } from 'lucide-react';

const pains = [
  '帖子发了，粉丝不涨，不知道问题出在哪',
  '想投广告，但受众怎么选、素材怎么测、预算怎么分，完全没头绪',
  '花了几千美金试投放，ROI 一塌糊涂，也不知道怎么优化',
  '平台规则天天变，生怕哪天号又没了，但没人告诉你红线在哪',
  '看了很多出海教程，讲的是海外本地做法，国内客户根本用不了',
];

const services = [
  {
    icon: TrendingUp,
    title: '获客策略指导',
    iconBg: 'bg-blue-500',
    lightBg: 'bg-blue-50',
    borderColor: 'border-blue-100',
    points: [
      '你的产品适合什么平台、什么打法',
      '内容方向和账号定位怎么定',
      '竞品在怎么做，你该怎么差异化',
      '根据产品和目标，给你可落地的策略',
    ],
  },
  {
    icon: DollarSign,
    title: '广告投放陪跑',
    iconBg: 'bg-emerald-500',
    lightBg: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
    points: [
      '帮你搭建广告账户，制定投放策略',
      '受众测试、素材优化、数据分析',
      'ROI 提升，持续复盘调整',
      '不是帮你开个户就不管了，全程带着跑',
    ],
  },
  {
    icon: Shield,
    title: '平台规则与账号安全',
    iconBg: 'bg-amber-500',
    lightBg: 'bg-amber-50',
    borderColor: 'border-amber-100',
    points: [
      '内容审核红线在哪，什么行为触发风控',
      '账号被限制了怎么申诉、怎么恢复',
      '多账号矩阵怎么操作才合规',
      '政策变了，第一时间同步和解读',
    ],
    wide: true,
  },
];

const modes = [
  {
    title: '单次策略指导',
    points: [
      '1–2 小时深度沟通，聊透你的产品和目标',
      '给出获客策略建议、平台选择、内容方向',
      '后续可升级为长期陪跑',
    ],
  },
  {
    title: '长期陪跑',
    points: [
      '按月合作，定期复盘',
      '投放计划一起制定和优化',
      '平台政策变动第一时间同步解读',
      '遇到问题随时沟通，不是交个方案就失联',
    ],
    recommended: true,
  },
];

const suitableFor = [
  { yes: true, text: '有产品、正在做出海，但增长遇到瓶颈，需要方向和策略' },
  { yes: true, text: '想投广告，但自己不会，也不想被代理公司坑' },
  { yes: true, text: '团队在国内，搞不清海外平台规则，总是踩雷' },
  { yes: true, text: '已经有一定基础，想放大，需要有人带着走' },
  { yes: false, text: '不适合：想买粉凑数、想做灰产、想一夜暴富的' },
];

const cases = [
  {
    name: '深圳 3C 品牌 · 陈先生',
    pain: '有 5 个 INS 号，自己投广告花了 $3000，ROI 不到 1.2。',
    what: '重新定位受众和兴趣标签，陪跑 3 个月每周复盘数据，指导搭建私信转化流程。',
    result: '6 个月后 ROAS 稳定在 2.8，月销售额 $15k。',
    metric: 'ROAS 2.8x',
  },
  {
    name: '北京心理咨询师 · 张老师',
    pain: '想做海外华人心理内容，不知道什么内容能火，不知道怎么把粉丝转化成付费客户。',
    what: '分析用户画像，确定内容方向和节奏，指导私信转化话术。',
    result: '3 个月粉丝 2800+，私域转化 17 个付费客户。',
    metric: '17 位付费客户',
  },
  {
    name: '义乌小商品卖家 · 王先生',
    pain: '账号频繁被封，不知道平台规则红线在哪。',
    what: '梳理运营流程找出触发风控的点，重新配置发布节奏，政策变化第一时间同步。',
    result: '账号稳定运营至今超过 1 年，不再无故封号。',
    metric: '1年零封号',
  },
];

const reviews = [
  {
    text: '之前自己投广告纯属盲投，烧了三千刀没效果。跟着他们的策略走，每一笔预算花在哪儿、为什么花、回报多少都清清楚楚。',
    name: '陈先生',
    label: '深圳 · 3C 卖家',
  },
  {
    text: '最值的是平台规则这块。之前什么都不懂，动不动被封号，现在知道红线在哪，一年没出过事。',
    name: '王先生',
    label: '义乌 · 小商品卖家',
  },
  {
    text: '他们不是给你一个通用方案就完事了，是真的根据你的产品来想策略。我做的心理内容比较小众，他们给的建议都很落地。',
    name: '张老师',
    label: '北京 · 心理咨询师',
  },
];

const faqs = [
  {
    q: '增长服务和代运营有什么不同？',
    a: '代运营帮你发帖执行，增长服务帮你想策略、看方向、带着你做。你或者你的团队来执行，我们帮你少走弯路。',
  },
  {
    q: '我没有团队，一个人能做吗？',
    a: '可以。策略和方向对了，一个人也能跑起来。我们告诉你怎么做，你来做，遇到问题随时找我们。',
  },
  {
    q: '能保证效果吗？',
    a: '坦白说不能保证具体数字——平台和市场都在变。但我们保证策略是自己实战验证过的，不拿你当实验品。投放陪跑的目标是让你的 ROI 持续提升，不是烧完预算就结束。',
  },
  {
    q: '怎么收费？',
    a: '单次指导和长期陪跑价格不同，根据你的需求来定。先聊聊，给你报价，你觉得合适再合作。',
  },
  {
    q: '你们的经验哪里来的？',
    a: '我们自己就在运营海外社媒矩阵，踩过坑、烧过钱、测过各种打法。给你的建议是实战出来的，不是网上扒的。',
  },
];

export default function GrowthPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-80 h-80 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            增长服务
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            账号有了，环境稳了，
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
              但怎么涨粉、怎么投广告、怎么不被封——
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
            这些不是发发帖子就能解决的。
          </p>
          <p className="text-blue-200/70 text-base max-w-xl mx-auto mb-10">
            我们提供获客策略、投放陪跑和平台规则指导，
            帮你在海外增长上少走弯路、少烧冤枉钱。
          </p>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-7 max-w-md mx-auto">
            <p className="text-white/80 text-sm mb-5">
              先聊聊你的产品和目标，我们再看能怎么帮你。
            </p>
            <a
              href="/#contact"
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              聊聊我的情况 <ArrowRight size={16} />
            </a>
            <p className="text-slate-400 text-xs mt-3">第一次沟通免费，能帮到你再合作</p>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            是不是也这样？
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100">
              {pains.map((p, i) => (
                <div key={i} className="flex items-start gap-4 px-7 py-5 hover:bg-orange-50/30 transition-colors group">
                  <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-orange-200 transition-colors">
                    <span className="text-orange-500 text-xs font-bold">·</span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{p}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-900 px-7 py-5">
              <p className="text-white font-semibold text-sm">
                这些问题，缺的不是执行力，是方向和经验。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">我们提供什么</h2>
            <p className="text-slate-500">三块核心服务，覆盖出海增长的关键难点</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {services.filter(s => !s.wide).map((s) => (
              <div key={s.title} className={`rounded-2xl border ${s.borderColor} overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                <div className={`${s.lightBg} px-6 pt-6 pb-5`}>
                  <div className={`w-11 h-11 ${s.iconBg} rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                    <s.icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                </div>
                <div className="px-6 py-5">
                  <ul className="space-y-2.5">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <span className={`w-1.5 h-1.5 rounded-full ${s.iconBg} flex-shrink-0 mt-1.5`} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            {services.filter(s => s.wide).map((s) => (
              <div key={s.title} className={`md:col-span-2 rounded-2xl border ${s.borderColor} overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                <div className={`${s.lightBg} px-6 pt-6 pb-5`}>
                  <div className={`w-11 h-11 ${s.iconBg} rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                    <s.icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                </div>
                <div className="px-6 py-5">
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                    {s.points.map((pt) => (
                      <div key={pt} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <span className={`w-1.5 h-1.5 rounded-full ${s.iconBg} flex-shrink-0 mt-1.5`} />
                        {pt}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 pt-4 border-t border-amber-100 text-sm text-amber-700 font-medium">
                    我们自己每天在运营矩阵，规则变化第一时间知道，实战经验直接给你。
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modes */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">怎么合作</h2>
            <p className="text-slate-500">不是标准套餐，根据你的情况来定。先聊聊，能帮到你再合作。</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {modes.map((m) => (
              <div key={m.title} className={`rounded-2xl border overflow-hidden ${m.recommended ? 'border-blue-300 ring-1 ring-blue-200' : 'border-slate-200'} bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative`}>
                {m.recommended && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">推荐</div>
                )}
                <div className={`px-6 pt-6 pb-4 ${m.recommended ? 'bg-blue-50' : 'bg-slate-50'} border-b border-slate-100`}>
                  <h3 className="text-lg font-bold text-slate-900">{m.title}</h3>
                </div>
                <div className="px-6 py-5">
                  <ul className="space-y-2.5">
                    {m.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <CheckCircle size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 pb-6">
                  <a href="/#contact" className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold py-3 rounded-xl transition-all duration-200">
                    咨询这个方式 <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">适合谁</h2>
          <div className="bg-slate-50 rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
            {suitableFor.map((s, i) => (
              <div key={i} className={`flex items-start gap-4 px-7 py-4 ${s.yes ? 'hover:bg-emerald-50/30' : 'bg-red-50/20'} transition-colors`}>
                {s.yes
                  ? <CheckCircle size={17} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  : <XCircle size={17} className="text-red-400 flex-shrink-0 mt-0.5" />
                }
                <p className={`text-sm leading-relaxed ${s.yes ? 'text-slate-700' : 'text-slate-500'}`}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">他们是怎么走过来的</h2>
          <div className="space-y-5">
            {cases.map((c) => (
              <div key={c.name} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-all">
                <div className="bg-slate-50 border-b border-slate-200 px-7 py-4 flex items-center justify-between">
                  <p className="font-bold text-slate-900 text-sm">{c.name}</p>
                  <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">{c.metric}</span>
                </div>
                <div className="p-7 grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">痛点</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{c.pain}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">我们做了什么</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{c.what}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">结果</p>
                    <p className="text-slate-700 text-sm font-medium leading-relaxed">{c.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">用户怎么说</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-all">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={13} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400 flex items-center justify-center flex-shrink-0">
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
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">常见疑问</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
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
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            方向不对，烧再多钱也白费
          </h2>
          <p className="text-slate-400 mb-8">
            先聊聊你的产品和目标，我们帮你看清该怎么打。
            <br />
            第一次沟通免费，能帮到你再合作。
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg mb-8"
          >
            聊聊我的情况 <ArrowRight size={16} />
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

      {/* Sticky floating CTA */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <a
          href="/#contact"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-2xl hover:-translate-y-0.5 transition-all duration-200 text-sm shadow-emerald-600/30"
        >
          聊聊我的情况 <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}
