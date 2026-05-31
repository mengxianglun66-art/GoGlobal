import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
            <Zap size={12} className="text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-slate-300 text-sm font-semibold">出海加速器</span>
            <span className="text-slate-500 text-xs tracking-widest">GoGlobal</span>
          </div>
        </div>

        <p className="text-slate-500 text-sm">© 2026 GoGlobal. All rights reserved.</p>

        <div className="flex items-center gap-5">
          <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">隐私政策</a>
          <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">退款政策</a>
        </div>
      </div>
    </footer>
  );
}
