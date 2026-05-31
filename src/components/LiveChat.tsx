import { useState } from 'react';
import { MessageCircle, Send, QrCode, X } from 'lucide-react';

const CONTACTS = {
  telegram: { label: 'Telegram', value: '@goglobal', icon: Send, href: 'https://t.me/goglobal' },
  wechat: { label: '微信', value: 'Momumu0924', icon: QrCode, href: '#contact' },
};

export default function LiveChat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-40 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-4 min-w-[200px]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-slate-900">联系客服</p>
              <button onClick={() => setOpen(false)} className="text-slate-300 hover:text-slate-500 transition-colors">
                <X size={14} />
              </button>
            </div>
            <div className="space-y-2">
              {Object.values(CONTACTS).map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <c.icon size={15} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{c.label}</p>
                    <p className="text-sm font-semibold text-slate-800">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-blue-500 hover:bg-blue-400 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 shadow-blue-500/30"
        aria-label="在线客服"
      >
        <MessageCircle size={24} />
      </button>
    </>
  );
}
