import { ShoppingBag, Wifi, TrendingUp, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: ShoppingBag,
    title: '账号供应',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-100',
    features: ['INS / TikTok 各地区账号', '老号 / 粉号可选', '24小时非人为封禁包补', '配套养号指导'],
    cta: '查看账号',
    href: '#store',
  },
  {
    icon: Wifi,
    title: '网络方案',
    color: 'bg-cyan-500',
    lightColor: 'bg-cyan-50',
    textColor: 'text-cyan-600',
    borderColor: 'border-cyan-100',
    features: ['独享住宅 IP', '账号环境隔离', '防关联封禁配置', '持续维护支持'],
    cta: '咨询方案',
    href: '#network',
  },
  {
    icon: TrendingUp,
    title: '代运营服务',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-100',
    features: ['账号搭建与定位', '内容策划制作', '日常发布运营', '增长获客转化'],
    cta: '咨询代运营',
    href: '#contact',
  },
];

export default function Services() {
  return (
    <section id="store" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">我们能做什么</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            从网络环境到账号供应再到运营增长，每一步都能帮你搞定
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className={`rounded-2xl border ${s.borderColor} bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col`}
            >
              <div className={`${s.lightColor} px-8 pt-8 pb-6`}>
                <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                  <s.icon size={22} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{s.title}</h3>
              </div>

              <div className="px-8 py-6 flex-1">
                <ul className="space-y-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-slate-600 text-sm">
                      <span className={`w-1.5 h-1.5 rounded-full ${s.color} flex-shrink-0`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-8 pb-8">
                <a
                  href={s.href}
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm ${s.lightColor} ${s.textColor} hover:opacity-80 transition-opacity border ${s.borderColor}`}
                >
                  {s.cta} <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-6 py-3">
            <span className="text-slate-500 text-sm">三步解决海外社媒问题：</span>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="text-blue-600">先搞环境</span>
              <ArrowRight size={12} className="text-slate-400" />
              <span className="text-cyan-600">再买账号</span>
              <ArrowRight size={12} className="text-slate-400" />
              <span className="text-emerald-600">然后运营增长</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
