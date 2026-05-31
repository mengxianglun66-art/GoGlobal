import { XCircle } from 'lucide-react';

const pains = [
  '账号刚买来没几天就封了，卖号的人消息都不回',
  '网络换来换去，IP老是被标记，不知道到底该用什么环境',
  '十几个号莫名其妙全没了，一查发现是关联封禁',
  '找了代运营，钱花了，号也没做起来，对方也不懂国内客户的情况',
  '想自己弄网络，买机场、自建代理，折腾一圈还是不稳定',
];

export default function PainPoints() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            做海外社媒，你是不是也遇到过这些情况？
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {pains.map((pain, i) => (
              <div
                key={i}
                className="flex items-start gap-4 px-8 py-5 hover:bg-red-50/40 transition-colors group"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <XCircle size={20} className="text-red-400 group-hover:text-red-500 transition-colors" />
                </div>
                <p className="text-slate-700 text-base leading-relaxed">{pain}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 px-8 py-6">
            <p className="text-slate-300 text-base leading-relaxed">
              这些问题的根源不是你不会运营，而是没有找对人。
            </p>
            <p className="text-white font-semibold text-base mt-1">
              我们自己也踩过这些坑，所以才做了出海加速器。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
