import { BookOpen, Send, MessageSquare, Mail } from 'lucide-react';

export default function BottomCTA() {
  const contacts = [
    { icon: Send, label: 'Telegram', value: '@goglobal', href: 'https://t.me/goglobal' },
    { icon: MessageSquare, label: '微信', value: 'GoGlobal_Support', href: '#contact' },
    { icon: Mail, label: '邮箱', value: 'hello@goglobal.cc', href: 'mailto:hello@goglobal.cc' },
  ];

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          先搞定环境，再搞定增长
        </h2>
        <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          别急着买号，先把环境搞对。
          先看看我们整理的指南里说的坑，你可能已经踩过好几个。
        </p>

        {/* CTA Card */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-8 mb-10 shadow-2xl">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen size={20} className="text-white" />
            </div>
            <p className="text-white font-semibold text-base text-left">
              《国内做INS最容易封号的7个坑及解决方案》
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-10 py-4 rounded-xl transition-all duration-200 text-base shadow-lg hover:-translate-y-0.5 hover:shadow-blue-500/40"
          >
            免费领取 →
          </a>
          <p className="text-blue-300/60 text-sm mt-4">扫码加微信 / 点 Telegram 链接即可领取</p>
        </div>

        {/* Contact methods */}
        <div>
          <p className="text-slate-400 text-sm mb-5 font-medium uppercase tracking-wider">或者直接联系</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-6 py-3 hover:shadow-md hover:border-slate-300 transition-all duration-200 w-full sm:w-auto"
              >
                <c.icon size={16} className="text-blue-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-slate-400 text-xs">{c.label}</p>
                  <p className="text-slate-800 text-sm font-semibold">{c.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
