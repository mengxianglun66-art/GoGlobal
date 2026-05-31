import { BookOpen, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700 rounded-full blur-3xl opacity-30" />
      </div>

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm font-medium px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          专注国内出海社媒，深耕三年
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          海外搞钱的黄金时代
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
            别卡在账号和环境上
          </span>
        </h1>

        <p className="text-base md:text-lg text-blue-100/70 leading-relaxed mb-12 max-w-2xl mx-auto">
          Instagram / TikTok / Facebook 账号供应 · 网络方案 · 代运营，我们帮你搞定
        </p>

        <div id="guide" className="max-w-xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen size={20} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-white/60 text-xs font-medium uppercase tracking-wider">免费领取</p>
              <p className="text-white font-semibold text-sm leading-snug">
                《国内做INS最容易封号的7个坑及解决方案》
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all duration-200 text-base shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
          >
            免费领取 →
          </a>

          <div className="mt-4 flex items-center justify-center gap-2 text-blue-200/70 text-sm">
            <Users size={14} />
            <span>已有 <strong className="text-white">2,300+</strong> 国内卖家领取</span>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-2 text-white/30 text-xs animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          向下探索
        </div>
      </div>
    </section>
  );
}
