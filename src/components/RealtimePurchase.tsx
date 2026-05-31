import { useState, useEffect } from 'react';

const samplePurchases = [
  { flag: '🇺🇸', label: 'INS 美国新号', price: '¥29' },
  { flag: '🇪🇺', label: 'INS 欧洲新号', price: '¥19' },
  { flag: '🇹🇼', label: 'INS 台湾老号', price: '¥59' },
  { flag: '🇺🇸', label: 'TK 美国新号', price: '¥19' },
  { flag: '🇹🇼', label: 'TK 台湾老号', price: '¥22' },
  { flag: '🇭🇰', label: 'FB 香港老号', price: '¥22' },
  { flag: '🇧🇷', label: 'INS 巴西新号', price: '¥19' },
  { flag: '🌐', label: 'X 老号', price: '¥149' },
];

const names = ['陈先生', '王先生', '张女士', '刘先生', '李女士', '赵先生', '周女士', '黄先生'];

export default function RealtimePurchase() {
  const [visible, setVisible] = useState(false);
  const [purchase, setPurchase] = useState(samplePurchases[0]);
  const [name, setName] = useState(names[0]);

  useEffect(() => {
    const show = () => {
      const idx = Math.floor(Math.random() * samplePurchases.length);
      setPurchase(samplePurchases[idx]);
      setName(names[Math.floor(Math.random() * names.length)]);
      setVisible(true);
      setTimeout(() => setVisible(false), 6000);
    };

    // Show first one after 3s
    const first = setTimeout(show, 3000);
    // Then every 20-40s
    const interval = setInterval(() => {
      show();
    }, 20000 + Math.random() * 20000);

    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 left-4 z-40 max-w-[280px] animate-[fadeIn_0.5s_ease-out]">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">{name[0]}</span>
        </div>
        <div>
          <p className="text-xs text-slate-500">
            <span className="font-semibold text-slate-800">{name}</span> 刚刚购买了
          </p>
          <p className="text-sm font-semibold text-slate-900">
            {purchase.flag} {purchase.label}
          </p>
          <p className="text-xs text-blue-600 font-bold">{purchase.price}</p>
        </div>
      </div>
    </div>
  );
}
