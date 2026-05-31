import { TrendingUp, Users, Shield } from 'lucide-react';

const cases = [
  {
    icon: TrendingUp,
    tag: '跨境电商',
    title: '深圳3C卖家，做美区INS引流',
    background:
      '之前找过三个号商，买了20多个号，不到一个月全封了。',
    steps: [
      '先帮他配置了独享住宅IP环境',
      '提供5个美区老号，全部在专用环境下养了一周才开始发帖',
      '教他内容节奏：先发生活类内容养号，两周后再插产品帖',
    ],
    result: '6个月后，5个号全部存活，总粉丝 3.2万，日均引流独立站 UV 200+，月销售额稳定 $15k。',
    metrics: [
      { label: '号存活率', value: '100%' },
      { label: '总粉丝', value: '3.2万' },
      { label: '月销售额', value: '$15k' },
    ],
    color: 'from-blue-500 to-blue-600',
    lightBg: 'bg-blue-50',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    icon: Users,
    tag: '个人IP',
    title: '北京心理咨询师，海外知识付费',
    background:
      '想做海外华人心灵成长内容，但完全不懂技术，注册账号都卡在手机验证那一步。',
    steps: [
      '提供带邮箱验证的INS老号，到手就能用',
      '配置了稳定的网络环境，手把手教她怎么用',
      '给了内容模板和发布节奏建议',
    ],
    result: '3个月粉丝从0到2800，私域转化付费客户17人，客单价 $200–500。',
    metrics: [
      { label: '3个月粉丝', value: '2,800' },
      { label: '付费客户', value: '17人' },
      { label: '客单价', value: '$200-500' },
    ],
    color: 'from-emerald-500 to-emerald-600',
    lightBg: 'bg-emerald-50',
    tagColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: Shield,
    tag: '矩阵运营',
    title: '广州5人团队，30+账号矩阵',
    background:
      '做多个垂类INS号矩阵，需要30+账号同时运营。之前用公共机场，三天两头被封。',
    steps: [
      '搭建了多IP环境，每个账号独立IP，完全隔离',
      '分批供应账号，每批5个，养好再上新',
      '提供环境维护支持，出现问题随时处理',
    ],
    result: '32个账号稳定运行至今8个月，封号率不到5%。矩阵总粉丝超50万，月广告分成收入 ¥2万+。',
    metrics: [
      { label: '封号率', value: '<5%' },
      { label: '总粉丝', value: '50万+' },
      { label: '月广告收入', value: '¥2万+' },
    ],
    color: 'from-amber-500 to-orange-500',
    lightBg: 'bg-amber-50',
    tagColor: 'bg-amber-100 text-amber-700',
  },
];

export default function Cases() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">他们是怎么解决的</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            真实客户案例，不同背景，一样的结果
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div key={c.title} className="bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col">
              {/* Header */}
              <div className={`bg-gradient-to-r ${c.color} p-6`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {c.tag}
                  </span>
                  <c.icon size={20} className="text-white/70" />
                </div>
                <h3 className="text-white font-bold text-lg leading-snug">{c.title}</h3>
              </div>

              <div className="p-6 flex-1 flex flex-col gap-4">
                {/* Background */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">客户背景</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{c.background}</p>
                </div>

                {/* Steps */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">我们的做法</p>
                  <ul className="space-y-2">
                    {c.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-xs flex items-center justify-center font-bold mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div className={`${c.lightBg} rounded-xl p-4`}>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">结果</p>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="font-bold text-slate-900 text-base leading-tight">{m.value}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed border-t border-slate-200/60 pt-3">
                    {c.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
