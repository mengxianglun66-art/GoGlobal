import { Wrench, ShieldCheck, Package, UserCheck } from 'lucide-react';

const reasons = [
  {
    icon: Wrench,
    title: '自己也在做',
    desc: '我们不是纯卖号的。我们自己运营多个INS矩阵，知道什么坑不能踩，能给你真正有用的建议。',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: ShieldCheck,
    title: '售后说到做到',
    desc: '非人为封禁24小时内补发，不推脱不玩文字游戏。我们用政策说话，客户的损失我们负责。',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Package,
    title: '不只卖号',
    desc: '环境、账号、运营，你能遇到的问题我们都能解决，一站式搞定，不用到处找不同供应商。',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: UserCheck,
    title: '不是大公司',
    desc: '每个客户我们都直接对接，没有客服机器人。有事先找人再说，响应快、沟通直接。',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
];

export default function WhyUs() {
  return (
    <section id="network" className="py-24 bg-slate-900">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            为什么选择出海加速器？
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            我们不是最大的，但我们是最懂你的
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="bg-slate-800/60 border border-slate-700 rounded-2xl p-7 hover:bg-slate-800 hover:border-slate-600 transition-all duration-200 group"
            >
              <div className={`w-12 h-12 ${r.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <r.icon size={22} className={r.color} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                <span className={`${r.color} mr-2`}>✓</span>
                {r.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
