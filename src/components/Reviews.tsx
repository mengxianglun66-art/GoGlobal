import { Star } from 'lucide-react';

const reviews = [
  {
    text: '之前淘宝买了三次号，每次都撑不过一周。这边买的号活到现在三个月了，还帮我把环境弄好了，真的是懂行的人。',
    name: '陈先生',
    label: '深圳 · 跨境电商卖家',
  },
  {
    text: '最打动我的是售后。有一个号第三天出了点问题，问了一下直接就给补了，没有推脱。这在号商里太难得了。',
    name: '王先生',
    label: '义乌 · 外贸小团队',
  },
  {
    text: '我什么都不懂，连怎么下载APP都不会。他们一步步教我，从注册到发帖，现在我的号已经3000多粉了。',
    name: '张女士',
    label: '成都 · 个人IP',
  },
  {
    text: '之前自己搞网络环境，买节点、配代理，花了两周还是不稳定。他们的方案一步到位，省了我太多时间。钱花得值。',
    name: '刘先生',
    label: '杭州 · 出海创业者',
  },
  {
    text: '代运营找了他们两个月，粉丝从600涨到5000多，关键是来的客户很精准，已经开始出单了。准备续签。',
    name: '李女士',
    label: '广州 · 服装品牌主理人',
  },
];

export default function Reviews() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">用户怎么说</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            来自真实客户的反馈，每一条都有据可查
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="break-inside-avoid bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-all duration-200 hover:border-slate-200"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mb-4">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
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
  );
}
