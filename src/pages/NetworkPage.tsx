import { useState } from 'react';
import { Link } from 'react-router-dom';
import { XCircle, Wifi, Users, Building2, ChevronDown, ChevronUp, ArrowRight, Star } from 'lucide-react';

const painPoints = [
  '公共机场/共享节点：一个IP被成百上千人用，平台早就标记了',
  '机房IP：数据中心IP段被平台重点风控，一登就验证',
  '同IP多账号：一个IP登多个号，触发关联封禁，一死死一串',
  '自己搭代理：技术门槛高，维护麻烦，出问题没人管',
];

const plans = [
  {
    icon: Wifi,
    title: '个人运营方案',
    tag: '1–3 个账号',
    tagColor: 'bg-blue-100 text-blue-700',
    color: 'border-blue-200',
    headerBg: 'bg-blue-50',
    iconBg: 'bg-blue-500',
    features: ['独享住宅 IP', '指纹浏览器环境配置', '基础使用指导', '稳定性监控'],
    cta: '咨询个人方案',
  },
  {
    icon: Users,
    title: '小团队矩阵方案',
    tag: '5–15 个账号',
    tagColor: 'bg-cyan-100 text-cyan-700',
    color: 'border-cyan-300 ring-1 ring-cyan-200',
    headerBg: 'bg-cyan-50',
    iconBg: 'bg-cyan-500',
    features: ['多个独享住宅 IP', '账号环境完全隔离', '防关联配置', '定期环境安全检查', '异常告警通知'],
    cta: '咨询团队方案',
    recommended: true,
  },
  {
    icon: Building2,
    title: '大型团队/代运营方案',
    tag: '20+ 账号',
    tagColor: 'bg-slate-100 text-slate-700',
    color: 'border-slate-200',
    headerBg: 'bg-slate-50',
    iconBg: 'bg-slate-700',
    features: [
      '4G/5G 移动代理 IP 池',
      '静态住宅 IP + 动态切换',
      '无限账号环境隔离',
      '专属技术维护',
      '7×24 小时响应',
      '可根据业务定制',
    ],
    cta: '咨询定制方案',
  },
];

const comparisonRows = [
  { label: '适用账号数', values: ['1–3 个', '5–15 个', '20+ 个'] },
  { label: 'IP 类型', values: ['独享住宅 IP', '多独享 IP', '代理池+专线'] },
  { label: '环境隔离', values: ['单环境', '完全隔离', '无限隔离'] },
  { label: '防关联', values: ['✓', '✓', '✓'] },
  { label: '使用难度', values: ['低', '中', '低（托管）'] },
  { label: '技术维护', values: ['基础指导', '定期检查', '7×24 专属'] },
];

const faqs = [
  {
    q: '为什么不直接公开价格？',
    a: '每个人的账号数量、运营场景不同，需要的配置不一样。我们不想给你一个"一刀切"的方案，然后你用着不合适。聊一下你的情况，我们帮你选最划算的配置。',
  },
  {
    q: '我买了账号再找你们配环境来得及吗？',
    a: '最好先配环境再买号。如果你已经有号了，我们也可以帮你迁移到安全环境里，不会有账号损失。',
  },
  {
    q: '技术复杂吗？我自己搞得定吗？',
    a: '个人方案我们会提供详细配置指南，照着做就行，不需要技术背景。团队方案和大型方案我们直接远程帮你搞定，完全不需要你操心技术。',
  },
  {
    q: '环境出问题怎么办？',
    a: '个人方案提供基础维护支持，团队和大型方案 7×24 小时响应。我们长期维护，不是卖完不管的那种。',
  },
];

const caseStudies = [
  {
    name: '深圳 3C 卖家 · 陈先生',
    before: '公共机场 + 20 个号，一周内封了 18 个。',
    after: '独享住宅 IP 方案，5 个号稳定运营 6 个月，0 封号。',
  },
  {
    name: '广州矩阵团队 · 刘先生',
    before: '自建代理，维护累死，动不动断线。',
    after: '全套托管，32 个号 8 个月封号率 <5%，终于能专注做内容。',
  },
];

const reviews = [
  {
    text: '以前我觉得网络随便买个机场就行了，结果坑死。换成他们的方案后，账号真的稳了。',
    name: '王先生',
    label: '义乌 · 小商品卖家',
  },
  {
    text: '最怕技术问题，但他们把环境弄好以后，基本不用管了，省心。',
    name: '张女士',
    label: '成都 · 个人IP',
  },
];

export default function NetworkPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block bg-cyan-500/20 border border-cyan-400/30 text-cyan-200 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            出海专网方案
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            在国内做海外社媒，
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              90% 的封号问题出在网络环境上
            </span>
          </h1>
          <p className="text-blue-100/70 text-lg max-w-xl mx-auto mb-10">
            你花时间买号、做内容、投广告，结果因为 IP 不干净全白费。
            我们帮你把环境这一关彻底解决。
          </p>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-7 max-w-md mx-auto">
            <p className="text-white/80 text-sm mb-4">
              你的账号数量、运营场景不同，方案也不同。
              <br />
              直接咨询，我们给你出具体配置和报价。
            </p>
            <a
              href="/#contact"
              className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              咨询我的方案 <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Why public won't work */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            为什么你之前的环境总出问题？
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="divide-y divide-slate-100">
              {painPoints.map((p, i) => (
                <div key={i} className="flex items-start gap-4 px-8 py-5 hover:bg-red-50/30 transition-colors group">
                  <XCircle size={18} className="text-red-400 group-hover:text-red-500 flex-shrink-0 mt-0.5 transition-colors" />
                  <p className="text-slate-700 text-sm leading-relaxed">{p}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-900 px-8 py-5">
              <p className="text-white font-semibold">
                你需要的不是"能上外网"，而是"平台认为你是一个真实海外用户"。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">我们提供三种方案</h2>
            <p className="text-slate-500">根据账号规模和运营方式，选择最适合你的配置</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <div key={plan.title} className={`rounded-2xl border ${plan.color} overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative`}>
                {plan.recommended && (
                  <div className="absolute top-4 right-4 bg-cyan-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    最受欢迎
                  </div>
                )}
                <div className={`${plan.headerBg} px-6 pt-7 pb-5`}>
                  <div className={`w-11 h-11 ${plan.iconBg} rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                    <plan.icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{plan.title}</h3>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${plan.tagColor}`}>
                    适用：{plan.tag}
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
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold py-3 rounded-xl transition-all duration-200"
                  >
                    {plan.cta} <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">方案对比</h2>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-500">对比项目</th>
                    <th className="text-center px-4 py-4 text-sm font-semibold text-blue-600">个人方案</th>
                    <th className="text-center px-4 py-4 text-sm font-semibold text-cyan-600">小团队方案</th>
                    <th className="text-center px-4 py-4 text-sm font-semibold text-slate-700">大型方案</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonRows.map((row) => (
                    <tr key={row.label} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">{row.label}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className="text-center px-4 py-4 text-sm text-slate-600">
                          {v === '✓' ? <span className="text-emerald-500 font-bold text-base">✓</span> : v}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-blue-50/50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">价格</td>
                    <td colSpan={3} className="text-center px-4 py-4 text-sm text-blue-600 font-semibold">
                      <a href="/#contact" className="hover:underline">不确定选哪个？直接问我们 →</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">用了我们的网络方案后</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {caseStudies.map((c) => (
              <div key={c.name} className="rounded-2xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <p className="font-semibold text-slate-900 text-sm">{c.name}</p>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded mt-0.5 flex-shrink-0">之前</span>
                    <p className="text-slate-600 text-sm">{c.before}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mt-0.5 flex-shrink-0">现在</span>
                    <p className="text-slate-700 text-sm font-medium">{c.after}</p>
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
          <div className="grid md:grid-cols-2 gap-5">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={13} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center flex-shrink-0">
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
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            别让环境问题毁了你的账号和努力
          </h2>
          <p className="text-slate-400 mb-8">把环境搞对，后面的事才会顺。</p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg mb-8"
          >
            咨询出海专网方案 <ArrowRight size={16} />
          </a>
          <div className="pt-6 border-t border-slate-800">
            <p className="text-slate-500 text-sm mb-3">环境搞好了，还需要账号？</p>
            <Link to="/accounts" className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline">
              查看账号商店 →
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky floating CTA */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <a
          href="/#contact"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-2xl hover:-translate-y-0.5 transition-all duration-200 text-sm shadow-blue-600/30"
        >
          咨询方案 <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}
