import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: '账号买了能活多久？',
    a: '正常情况下可以长期使用。封号90%是环境问题导致，用我们的出海专网方案，能大幅降低封号概率。',
  },
  {
    q: '什么情况不补发账号？',
    a: '1. 账号已正常使用超过24小时\n2. 已发布内容后封禁\n3. 已修改密码/邮箱等关键资料后封禁\n4. 明显违规操作（如批量关注、发垃圾信息）导致的封禁',
  },
  {
    q: '出海专网怎么收费？',
    a: '根据你的账号数量和使用需求定制。个人方案 ¥99/月起，团队方案 ¥399/月起。联系客服获取具体方案和报价。',
  },
  {
    q: '增长服务有保证吗？',
    a: '我们不承诺具体粉丝数（承诺数字的多半是刷的假粉），但我们承诺稳定运营、持续增长，并提供月度数据报告。',
  },
  {
    q: '你们和淘宝/闲鱼上卖号的有什么不同？',
    a: '他们卖完就结束，我们提供后续的配套服务。账号、网络、运营，你遇到的问题我们都能解决。',
  },
  {
    q: '支持什么付款方式？',
    a: '微信支付、支付宝、USDT（TRC-20）。',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">常见问题</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            你想知道的，都在这里
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 text-sm pr-4">{faq.q}</span>
                {open === i ? (
                  <ChevronUp size={16} className="text-slate-400 flex-shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-slate-400 flex-shrink-0" />
                )}
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 whitespace-pre-line">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
