import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, Shield, CheckCircle, ArrowRight, ChevronDown, MessageCircle, X, Copy, ShoppingBag } from 'lucide-react';
import RealtimePurchase from '../components/RealtimePurchase';

// ─── Types ────────────────────────────────────────────────────
type PlatformKey = 'instagram' | 'tiktok' | 'facebook' | 'twitter' | 'threads' | 'youtube';

type RegionRow = {
  flag: string;
  region: string;
  type: string;
  note: string;
  originalPrice: number;
  salePrice: number;
  stock: number | 'ample';
  hot?: boolean;
  scarce?: boolean;
};

type PlatformTab = {
  key: PlatformKey;
  label: string;
  emoji: string;
  categories: {
    key: string;
    label: string;
    view: 'card' | 'table';
    rows: RegionRow[];
  }[];
};

// ─── Data ──────────────────────────────────────────────────────
const platformTabs: PlatformTab[] = [
  {
    key: 'instagram',
    label: 'Instagram',
    emoji: '📱',
    categories: [
      {
        key: 'new',
        label: '新号',
        view: 'card',
        rows: [
          { flag: '🌐', region: '随机地区', type: '超值首选', note: '随机分配 · 性价比之王', originalPrice: 39, salePrice: 18, stock: 'ample', hot: true },
          { flag: '🇺🇸', region: '美国 US', type: '新号', note: '1–30天 · 带邮箱 · 2FA', originalPrice: 49, salePrice: 29, stock: 38, hot: true },
          { flag: '🇪🇺', region: '欧洲 EU', type: '新号', note: '1–30天 · 带邮箱 · 2FA', originalPrice: 49, salePrice: 29, stock: 56, hot: true },
          { flag: '🇯🇵', region: '日本 JP', type: '新号', note: '1–30天 · 带邮箱 · 2FA', originalPrice: 69, salePrice: 49, stock: 12 },
          { flag: '🇹🇼', region: '台湾 TW', type: '新号', note: '1–30天 · 带邮箱 · 2FA', originalPrice: 39, salePrice: 25, stock: 22 },
          { flag: '🇰🇷', region: '韩国 KR', type: '新号', note: '1–30天 · 带邮箱 · 2FA', originalPrice: 49, salePrice: 29, stock: 15 },
          { flag: '🇸🇬', region: '新加坡 SG', type: '新号', note: '1–30天 · 带邮箱 · 2FA', originalPrice: 59, salePrice: 39, stock: 30 },
          { flag: '🇧🇷', region: '巴西 BR', type: '新号', note: '1–30天 · 带邮箱 · 2FA', originalPrice: 29, salePrice: 19, stock: 89, hot: true },
        ],
      },
      {
        key: 'aged',
        label: '老号',
        view: 'card',
        rows: [
          { flag: '🇺🇸', region: '美国 US', type: '2–3个月', note: '带邮箱', originalPrice: 39, salePrice: 29, stock: 42 },
          { flag: '🇺🇸', region: '美国 US', type: '4–5个月', note: '带邮箱', originalPrice: 69, salePrice: 49, stock: 18 },
          { flag: '🇺🇸', region: '美国 US', type: '6–7个月', note: '带原邮箱', originalPrice: 89, salePrice: 69, stock: 34, hot: true },
          { flag: '🇪🇺', region: '欧洲 EU', type: '2–3个月', note: '带邮箱', originalPrice: 29, salePrice: 19, stock: 38 },
          { flag: '🇪🇺', region: '欧洲 EU', type: '3–4个月', note: '带邮箱', originalPrice: 39, salePrice: 29, stock: 38 },
          { flag: '🇹🇼', region: '台湾 TW', type: '1–3年', note: '老贴号', originalPrice: 79, salePrice: 59, stock: 8 },
          { flag: '🇯🇵', region: '日本 JP', type: '1年+', note: '带邮箱', originalPrice: 129, salePrice: 99, stock: 3, scarce: true },
          { flag: '🇸🇬', region: '新加坡 SG', type: '1–3年', note: '带邮箱', originalPrice: 99, salePrice: 69, stock: 5, scarce: true },
          { flag: '🌐', region: '随机国家', type: '6个月+', note: '带邮箱', originalPrice: 69, salePrice: 49, stock: 12 },
        ],
      },
      {
        key: 'followers',
        label: '粉号',
        view: 'card',
        rows: [
          { flag: '📱', region: '随机地区', type: '1,000+ 粉丝', note: '真实活跃', originalPrice: 399, salePrice: 299, stock: 8 },
          { flag: '📱', region: '随机地区', type: '5,000+ 粉丝', note: '真实活跃', originalPrice: 599, salePrice: 449, stock: 4, scarce: true },
          { flag: '📱', region: '随机地区', type: '10,000+ 粉丝', note: '真实活跃', originalPrice: 799, salePrice: 599, stock: 3, scarce: true },
          { flag: '📱', region: '随机地区', type: '50,000+ 粉丝', note: '真实活跃', originalPrice: 1999, salePrice: 1499, stock: 1, scarce: true },
        ],
      },
      {
        key: 'verified',
        label: '验证号',
        view: 'card',
        rows: [
          { flag: '✅', region: '随机地区', type: '邮箱验证号', note: '邮箱+手机 · 2FA', originalPrice: 299, salePrice: 239, stock: 5, scarce: true },
          { flag: '✅', region: '美国 US', type: '完整验证号', note: '全验证', originalPrice: 399, salePrice: 299, stock: 3, scarce: true },
        ],
      },
      {
        key: 'taiwan',
        label: '🇹🇼 台湾',
        view: 'card',
        rows: [
          { flag: '🇹🇼', region: '台湾 TW', type: 'INS 新号', note: '台湾IP · 1–30天', originalPrice: 39, salePrice: 25, stock: 22 },
          { flag: '🇹🇼', region: '台湾 TW', type: 'INS 老号 1–3年', note: '带邮箱', originalPrice: 79, salePrice: 59, stock: 8 },
          { flag: '🇹🇼', region: '台湾 TW', type: 'INS 老贴号', note: '有帖文历史', originalPrice: 129, salePrice: 99, stock: 5, scarce: true },
          { flag: '🇹🇼', region: '台湾 TW', type: 'INS 精选老号', note: '2023–26年激活', originalPrice: 388, salePrice: 260, stock: 2, scarce: true },
          { flag: '🇹🇼', region: '台湾 TW', type: 'INS+Threads 套组', note: '带资料+2FA', originalPrice: 29, salePrice: 16, stock: 2, scarce: true },
        ],
      },
    ],
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    emoji: '🎵',
    categories: [
      {
        key: 'all',
        label: '全部',
        view: 'card',
        rows: [
          { flag: '🇺🇸', region: '美国 US', type: '新号 <1月', note: '可切地区', originalPrice: 39, salePrice: 19, stock: 'ample' },
          { flag: '🇺🇸', region: '美国 US', type: '老号 1–2年', note: '带邮箱', originalPrice: 99, salePrice: 69, stock: 15, hot: true },
          { flag: '🇪🇺', region: '欧洲 EU', type: '新号 <1月', note: '可切地区', originalPrice: 29, salePrice: 15, stock: 'ample' },
          { flag: '🇹🇼', region: '台湾 TW', type: '老号 近2年', note: '带邮箱', originalPrice: 39, salePrice: 22, stock: 19, hot: true },
          { flag: '🇯🇵', region: '日本 JP', type: '老号 1–2年', note: '带邮箱', originalPrice: 39, salePrice: 22, stock: 36 },
          { flag: '🇸🇬', region: '新加坡 SG', type: '老号 1年+', note: '带邮箱', originalPrice: 39, salePrice: 25, stock: 17 },
          { flag: '🇰🇷', region: '韩国 KR', type: '老号 1年+', note: '带邮箱', originalPrice: 39, salePrice: 25, stock: 9 },
          { flag: '🇹🇭', region: '泰国 TH', type: '老号 8月+', note: '带邮箱', originalPrice: 29, salePrice: 15, stock: 37 },
          { flag: '🇵🇭', region: '菲律宾 PH', type: '老号 8月+', note: '带邮箱', originalPrice: 29, salePrice: 15, stock: 19 },
          { flag: '🇲🇾', region: '马来西亚 MY', type: '老号 1年+', note: '带邮箱', originalPrice: 29, salePrice: 15, stock: 21 },
          { flag: '🇻🇳', region: '越南 VN', type: '老号 8月+', note: '带邮箱', originalPrice: 19, salePrice: 10, stock: 15 },
          { flag: '🌐', region: '随机地区', type: '新号 <1月', note: '随机分配', originalPrice: 19, salePrice: 9, stock: 'ample' },
        ],
      },
    ],
  },
  {
    key: 'facebook',
    label: 'Facebook',
    emoji: '📘',
    categories: [
      {
        key: 'all',
        label: '全部',
        view: 'card',
        rows: [
          { flag: '🇻🇳', region: '越南 VN', type: '新号 15天–2月', note: '带Cookie', originalPrice: 29, salePrice: 15, stock: 44, hot: true },
          { flag: '🇺🇸', region: '美国 US', type: '耐用号 2025注册', note: 'Cookie+2FA', originalPrice: 79, salePrice: 49, stock: 18 },
          { flag: '🇹🇼', region: '台湾 TW', type: '个人号 旧号', note: '带邮箱', originalPrice: 39, salePrice: 25, stock: 39, hot: true },
          { flag: '🇹🇼', region: '台湾 TW', type: '老号 2008–23年', note: '高权重', originalPrice: 199, salePrice: 149, stock: 5, scarce: true },
          { flag: '🇭🇰', region: '香港 HK', type: '老号 3月+', note: '带邮箱', originalPrice: 35, salePrice: 22, stock: 60, hot: true },
          { flag: '🇯🇵', region: '日本 JP', type: '耐用号 约2020年', note: '高稳定', originalPrice: 99, salePrice: 65, stock: 3, scarce: true },
          { flag: '🇸🇬', region: '新加坡 SG', type: '老号 5月+', note: '带邮箱', originalPrice: 39, salePrice: 24, stock: 10 },
          { flag: '🇰🇷', region: '韩国 KR', type: '老号 4月+', note: '带邮箱', originalPrice: 39, salePrice: 23, stock: 29 },
          { flag: '🌐', region: '随机国家', type: '各种', note: '最低价格', originalPrice: 29, salePrice: 15, stock: 'ample' },
        ],
      },
    ],
  },
  {
    key: 'twitter',
    label: 'Twitter / X',
    emoji: '🐦',
    categories: [
      {
        key: 'all',
        label: '全部',
        view: 'card',
        rows: [
          { flag: '🌐', region: '全球', type: '新号 2023年+', note: '已开2FA', originalPrice: 59, salePrice: 29, stock: 25 },
          { flag: '🌐', region: '全球', type: '老号 2009–23年', note: '高权重', originalPrice: 199, salePrice: 149, stock: 6, scarce: true, hot: true },
          { flag: '🌐', region: '全球', type: '粉号 500–1000粉', note: '带互动历史', originalPrice: 399, salePrice: 299, stock: 4, scarce: true },
          { flag: '🇯🇵', region: '日本 JP', type: '老号 1K粉 09–19年', note: '高权重+粉丝', originalPrice: 129, salePrice: 79, stock: 16 },
        ],
      },
    ],
  },
  {
    key: 'threads',
    label: 'Threads',
    emoji: '💬',
    categories: [
      {
        key: 'all',
        label: '全部',
        view: 'card',
        rows: [
          { flag: '🇹🇼', region: '台湾 TW', type: '新号', note: '绑INS+2FA', originalPrice: 19, salePrice: 10, stock: 33, hot: true },
          { flag: '🇭🇰', region: '香港 HK', type: '新号', note: '绑INS+2FA', originalPrice: 19, salePrice: 10, stock: 28 },
          { flag: '🇯🇵', region: '日本 JP', type: '新号', note: '绑INS+2FA', originalPrice: 19, salePrice: 10, stock: 28 },
          { flag: '🌐', region: '随机地区', type: '新号', note: '绑INS', originalPrice: 15, salePrice: 8, stock: 'ample' },
        ],
      },
    ],
  },
  {
    key: 'youtube',
    label: 'YouTube',
    emoji: '📹',
    categories: [
      {
        key: 'all',
        label: '全部',
        view: 'card',
        rows: [
          { flag: '📹', region: '全球', type: '频道号', note: '频道已开通 · 可直发', originalPrice: 89, salePrice: 59, stock: 10, hot: true },
          { flag: '📹', region: '全球', type: '老号 1年+', note: '稳定耐用', originalPrice: 199, salePrice: 149, stock: 5, scarce: true },
        ],
      },
    ],
  },
];

// ─── Spotlight strip ──────────────────────────────────────────
const spotlightItems = [
  { flag: '🌐', label: 'INS 随机地区', price: 18, orig: 39, stock: 'ample' as const, plat: 'instagram' as PlatformKey },
  { flag: '🇪🇺', label: 'INS 欧洲新号', price: 29, orig: 49, stock: 56, plat: 'instagram' as PlatformKey },
  { flag: '🇹🇼', label: 'INS 台湾老号', price: 59, orig: 79, stock: 8, plat: 'instagram' as PlatformKey },
  { flag: '🇺🇸', label: 'TK 美国新号', price: 19, orig: 39, stock: 'ample' as const, plat: 'tiktok' as PlatformKey },
  { flag: '🇹🇼', label: 'TK 台湾老号', price: 22, orig: 39, stock: 19, plat: 'tiktok' as PlatformKey },
  { flag: '🇭🇰', label: 'FB 香港老号', price: 22, orig: 35, stock: 60, plat: 'facebook' as PlatformKey },
  { flag: '🌐', label: 'X 老号', price: 149, orig: 199, stock: 6, plat: 'twitter' as PlatformKey },
  { flag: '🇹🇼', label: 'Threads 台湾', price: 10, orig: 19, stock: 33, plat: 'threads' as PlatformKey },
  { flag: '📹', label: 'YT 频道号', price: 59, orig: 89, stock: 10, plat: 'youtube' as PlatformKey },
];

// ─── Order flow type ──────────────────────────────────────────
type OrderState = 'idle' | 'confirm' | 'checkout' | 'success';

// ─── Price display ────────────────────────────────────────────
function PriceDisplay({ orig, sale, red }: { orig: number; sale: number; red?: boolean }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className={`text-xl font-extrabold ${red ? 'text-red-500' : 'text-slate-900'}`}>¥{sale}</span>
      <span className="text-sm text-slate-300 line-through">¥{orig}</span>
    </div>
  );
}

function StockBadge({ stock }: { stock: number | 'ample' }) {
  if (stock === 'ample') return <span className="text-emerald-600 text-xs font-medium">库存充足</span>;
  if (stock <= 3) return <span className="text-red-500 text-xs font-bold">仅剩 {stock} 个</span>;
  if (stock <= 10) return <span className="text-amber-500 text-xs font-semibold">{stock} 个</span>;
  return <span className="text-slate-400 text-xs">{stock} 个</span>;
}

// ─── Card background map ──────────────────────────────────────
const cardBgMap: Record<string, string> = {
  '随机地区': 'from-rose-50 to-orange-50 border-rose-200',
  '美国 US': 'from-blue-50 to-indigo-50',
  '欧洲 EU': 'from-cyan-50 to-teal-50',
  '日本 JP': 'from-pink-50 to-red-50',
  '台湾 TW': 'from-emerald-50 to-green-50',
  '韩国 KR': 'from-violet-50 to-purple-50',
  '新加坡 SG': 'from-amber-50 to-yellow-50',
  '巴西 BR': 'from-lime-50 to-emerald-50',
  'Global': 'from-slate-50 to-gray-50',
};

// ─── Product Card ─────────────────────────────────────────────
function ProductCard({ row, onBuy }: { row: RegionRow; onBuy: (r: RegionRow) => void }) {
  const isRandom = row.flag === '🌐' && row.salePrice === 18;
  const isHotDeal = row.hot && !isRandom;
  const isScarce = row.scarce;
  const bgGradient = cardBgMap[row.region] || cardBgMap['Global'];
  
  return (
    <div className={`group relative rounded-2xl border-2 p-5 transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 ${
      isRandom
        ? 'bg-gradient-to-br ' + bgGradient + ' border-rose-300 shadow-[0_4px_16px_-4px_rgba(244,63,94,0.2)]'
        : isHotDeal
          ? 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:border-orange-300'
          : isScarce
            ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 hover:border-amber-300'
            : 'bg-gradient-to-br ' + bgGradient + ' border-slate-200/80 hover:border-slate-300'
    }`}>
      {row.flag && <div className="text-2xl mb-2.5 leading-none">{row.flag}</div>}
      <div className="mb-0.5">
        <span className={`font-bold text-sm ${isRandom ? 'text-rose-800' : isHotDeal ? 'text-orange-800' : 'text-slate-800'}`}>{row.region}</span>
      </div>
      <p className={`text-xs mb-1 ${isRandom ? 'text-rose-600 font-semibold' : isHotDeal ? 'text-orange-600 font-medium' : 'text-slate-400'}`}>{row.type}</p>
      <p className={`text-[11px] leading-relaxed mb-4 ${isRandom ? 'text-rose-500' : isHotDeal ? 'text-orange-500' : 'text-slate-400'}`}>{row.note}</p>

      <div className={`border-t mb-3 ${isRandom ? 'border-rose-200' : isHotDeal ? 'border-orange-200' : 'border-slate-100'}`} />

      <div className="flex items-end justify-between">
        <div>
          <PriceDisplay orig={row.originalPrice} sale={row.salePrice} red={isRandom || isHotDeal} />
          <StockBadge stock={row.stock} />
        </div>
        <button
          onClick={() => onBuy(row)}
          className={`text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 ${
            isRandom
              ? 'bg-rose-500 text-white hover:bg-rose-400 shadow-sm hover:shadow-md'
              : isHotDeal
                ? 'bg-orange-500 text-white hover:bg-orange-400 shadow-sm hover:shadow-md'
                : 'bg-slate-800 text-white hover:bg-blue-600 hover:shadow-md'
          }`}
        >
          立即购买
        </button>
      </div>

      {isRandom && (
        <>
          <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full shadow-sm">
            超值
          </span>
          <span className="absolute top-3 left-3 text-[9px] font-bold bg-rose-500/10 text-rose-600 px-1.5 py-0.5 rounded-full border border-rose-200">
            🔥 低至¥18
          </span>
        </>
      )}
      {isHotDeal && (
        <span className="absolute top-3 right-3 text-[9px] font-bold bg-orange-500 text-white px-1.5 py-0.5 rounded-full border border-orange-400 shadow-sm">
          火爆
        </span>
      )}
      {isScarce && (
        <span className="absolute top-3 right-3 text-[9px] font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded-full border border-amber-400 shadow-sm">
          稀缺
        </span>
      )}
    </div>
  );
}

// ─── Product Table ─────────────────────────────────────────────
function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

// ─── Checkout Modal ────────────────────────────────────────────
function CheckoutModal({
  product,
  state,
  onClose,
  onConfirm,
  onPay,
  onDone,
}: {
  product: RegionRow | null;
  state: OrderState;
  onClose: () => void;
  onConfirm: (qty: number) => void;
  onPay: (email: string) => void;
  onDone: () => void;
}) {
  const [qty, setQty] = useState(1);
  const [email, setEmail] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('微信支付');

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 p-8 relative animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>

        {state === 'confirm' && (
          <>
            <div className="text-4xl mb-3">{product.flag}</div>
            <h3 className="text-lg font-bold text-slate-900 mb-0.5">{product.region} · {product.type}</h3>
            <p className="text-sm text-slate-400 mb-6">{product.note}</p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-extrabold text-slate-900">¥{product.salePrice}</span>
              <span className="text-base text-slate-300 line-through">¥{product.originalPrice}</span>
            </div>

            <div className="mb-6">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">购买数量</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center font-semibold text-lg text-slate-900">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(99, qty + 1))}
                  className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-sm text-slate-500 mb-6">
              小计：<span className="font-bold text-slate-900">¥{product.salePrice * qty}</span>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-6">
              <p className="text-xs text-amber-700">
                ⚡ 建议搭配出海专网使用，封号率降低 90% 。{' '}
                <Link to="/network" className="font-semibold underline">了解详情</Link>
              </p>
            </div>

            <button
              onClick={() => onConfirm(qty)}
              className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all duration-200 text-sm"
            >
              去支付 · ¥{product.salePrice * qty}
            </button>
          </>
        )}

        {state === 'checkout' && (
          <>
            <h3 className="text-lg font-bold text-slate-900 mb-1">结算</h3>
            <p className="text-xs text-slate-400 mb-6">填写信息完成支付</p>

            <div className="bg-slate-50 rounded-xl p-4 mb-5">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">{product.flag} {product.region} · {product.type}</span>
                <span className="font-semibold text-slate-900">×{qty}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900">
                <span>合计</span>
                <span>¥{product.salePrice * qty}</span>
              </div>
            </div>

            <div className="mb-5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                邮箱 <span className="text-slate-300 normal-case">（可选 — 用于接收账号信息备份）</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-slate-400 transition-colors placeholder:text-slate-300"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">账号信息会直接显示在屏幕上，邮箱仅做备份。</p>
            </div>

            <div className="mb-5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">支付方式</label>
              <div className="flex flex-wrap gap-2">
                {['微信支付', '支付宝', 'USDT (TRC-20)'].map(m => (
                  <button
                    key={m}
                    onClick={() => setSelectedPayment(m)}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                      selectedPayment === m
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'border-slate-200 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onPay(email)}
              className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all duration-200 text-sm"
            >
              支付 ¥{product.salePrice * qty}
            </button>
          </>
        )}

        {state === 'success' && (
          <>
            <div className="text-center mb-1">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={24} className="text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">支付成功</h3>
              <p className="text-xs text-slate-400 mt-0.5">订单号 ORD-20260531-{String(Math.floor(Math.random() * 100000)).padStart(5, '0')}</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 mt-5 mb-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">账号信息</p>
              <div className="space-y-2 text-sm">
                {[
                  ['账号', 'uendiagolli34588'],
                  ['密码', 'MfPVGSyA'],
                  ['绑定邮箱', 'malakaiartlett@onet.pl'],
                  ['邮箱密码', 'dlise@342345'],
                  ['邮箱登录', 'https://konto.onet.pl/'],
                  ['2FA密钥', 'KJHG-KJHG-KJHG-2134'],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-slate-100">
                    <span className="text-slate-400 text-xs">{label}</span>
                    <span className="text-slate-800 font-medium text-xs flex items-center gap-1.5">
                      {value}
                      <button
                            onClick={() => copyToClipboard(value)}
                            className="text-slate-300 hover:text-slate-500 transition-colors"
                          >
                        <Copy size={12} />
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-5">
              <p className="text-xs text-blue-700 font-medium mb-1">⚡ 快速开始</p>
              <ol className="text-xs text-blue-600 space-y-0.5 list-decimal list-inside">
                <li>立即登录并修改密码和邮箱</li>
                <li>建议在出海专网环境下登录，封号风险降低 90%</li>
                <li>前3天先养号，不要直接发帖或操作</li>
              </ol>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onDone}
                className="flex-1 bg-slate-900 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all duration-200 text-sm"
              >
                继续购物
              </button>
              <button
                onClick={onDone}
                className="flex-1 border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl text-sm text-center hover:bg-slate-50 transition-all duration-200"
              >
                <ShoppingBag size={13} className="inline mr-1" />我的订单
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Scroll to top on mount ───────────────────────────────────
function useScrollToTop(deps: unknown[]) {
  const prev = useRef(deps);
  useEffect(() => {
    const changed = deps.some((d, i) => d !== prev.current[i]);
    if (changed) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      prev.current = deps;
    }
  }, deps);
}

// ─── Main component ────────────────────────────────────────────
export default function AccountsPage() {
  const [activePlatform, setActivePlatform] = useState<PlatformKey>('instagram');
  const [activeCategory, setActiveCategory] = useState<string>('new');
  const [showMore, setShowMore] = useState(false);
  const [orderState, setOrderState] = useState<OrderState>('idle');
  const [selectedProduct, setSelectedProduct] = useState<RegionRow | null>(null);
  const [_qty, _setQty] = useState(1);

  useScrollToTop([activePlatform, activeCategory]);

  const primaryPlatforms = platformTabs.slice(0, 4);
  const morePlatforms = platformTabs.slice(4);

  const currentTab = platformTabs.find(p => p.key === activePlatform)!;
  const currentCategory = currentTab.categories.find(c => c.key === activeCategory) ?? currentTab.categories[0];

  function switchPlatform(key: PlatformKey) {
    setActivePlatform(key);
    const tab = platformTabs.find(p => p.key === key)!;
    setActiveCategory(tab.categories[0].key);
    setShowMore(false);
  }

  function handleBuy(row: RegionRow) {
    setSelectedProduct(row);
    setOrderState('confirm');
    _setQty(1);
  }

  function handleConfirm(qty: number) {
    _setQty(qty);
    setOrderState('checkout');
  }

  function handlePay(_email: string) {
    setOrderState('success');
  }

  function handleDone() {
    setOrderState('idle');
    setSelectedProduct(null);
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* ─── Warning banner ─── */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm flex-shrink-0">
            <AlertTriangle size={15} />
            90% 的封号是因为 IP 不干净
          </div>
          <p className="text-amber-600 text-sm">
            还没有稳定环境？
            <Link to="/network" className="font-semibold underline underline-offset-2 hover:text-amber-800 ml-1">
              先了解出海专网 → 封号更少，账号更稳
            </Link>
          </p>
        </div>
      </div>

      {/* ─── Header ─── */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-8">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">账号商店</h1>
            <p className="text-slate-400 text-sm">全球地区 · 精选账号 · 非人为封禁 24 小时补发</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            每日补货
          </div>
        </div>
      </div>

      {/* ─── Platform tabs ─── */}
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <div className="flex flex-wrap gap-2 items-center">
          {primaryPlatforms.map(pl => (
            <button
              key={pl.key}
              onClick={() => switchPlatform(pl.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activePlatform === pl.key
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
              }`}
            >
              <span className="mr-1">{pl.emoji}</span>{pl.label}
            </button>
          ))}
          <div className="relative">
            <button
              onClick={() => setShowMore(!showMore)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                morePlatforms.some(p => p.key === activePlatform)
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
              }`}
            >
              更多 <ChevronDown size={14} className={`transition-transform ${showMore ? 'rotate-180' : ''}`} />
            </button>
            {showMore && (
              <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-lg py-1.5 z-20 min-w-[160px]">
                {morePlatforms.map(pl => (
                  <button
                    key={pl.key}
                    onClick={() => switchPlatform(pl.key)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 ${
                      activePlatform === pl.key ? 'text-blue-600 font-semibold' : 'text-slate-600'
                    }`}
                  >
                    {pl.emoji} {pl.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Category sub-tabs ─── */}
      {currentTab.categories.length > 1 && (
        <div className="max-w-6xl mx-auto px-6 mb-6">
          <div className="flex gap-1.5 flex-wrap">
            {currentTab.categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                  activeCategory === cat.key
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── Content area ─── */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-slate-900 font-bold text-base">
            {currentTab.emoji} {currentTab.label} · {currentCategory.label}
          </span>
          <span className="text-slate-300 text-xs">（{currentCategory.rows.length} 件商品）</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentCategory.rows.map((row, i) => (
            <div key={i} className="animate-[fadeIn_0.3s_ease-out]" style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}>
              <ProductCard row={row} onBuy={handleBuy} />
            </div>
          ))}
        </div>
      </div>

      {/* ─── Spotlight strip ─── */}
      <div className="bg-slate-50 border-y border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">全平台速览</h2>
            <p className="text-sm text-slate-400 mt-0.5">点击任意卡片直接跳转对应平台</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2.5">
            {spotlightItems.map((item, i) => (
              <button
                key={i}
                onClick={() => switchPlatform(item.plat)}
                className="bg-white rounded-xl border border-slate-200 p-3 text-left hover:border-slate-300 hover:shadow-sm transition-all duration-200 group"
              >
                <div className="text-lg mb-1">{item.flag}</div>
                <p className="font-semibold text-slate-700 text-xs leading-tight mb-1.5 group-hover:text-blue-600 transition-colors">{item.label}</p>
                <p className={`font-bold text-sm ${item.price <= 19 ? 'text-red-500' : 'text-blue-600'}`}>¥{item.price}</p>
                <p className="text-slate-300 text-xs line-through">¥{item.orig}</p>
                <div className="mt-1">
                  {item.stock === 'ample'
                    ? <span className="text-emerald-600 text-xs font-medium">充足</span>
                    : typeof item.stock === 'number' && item.stock <= 10
                      ? <span className="text-amber-500 text-xs font-semibold">{item.stock}</span>
                      : <span className="text-slate-400 text-xs">{item.stock}</span>
                  }
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Purchase notice ─── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-5">
            <Shield size={17} className="text-slate-600" />
            <h2 className="font-bold text-slate-900">购买须知</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-5">
            {[
              '收到账号后请立即修改密码和绑定邮箱',
              '非人为封禁 24 小时内免费补发',
              '以下情况不补发：已发帖后封禁 / 修改关键资料后封禁 / 违规操作封禁',
              '建议每个账号使用独立 IP，避免关联封禁',
            ].map((n, i) => (
              <div key={i} className="flex items-start gap-3 text-slate-500 text-sm">
                <CheckCircle size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{n}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 pt-4 flex flex-wrap gap-4">
            <Link to="/network" className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-semibold">
              了解出海专网 — 封号率降低 90% <ArrowRight size={13} />
            </Link>
            <a href="/#contact" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-600 text-sm font-semibold">
              <MessageCircle size={13} /> 联系客服
            </a>
          </div>
        </div>
      </div>

      {/* ─── Cross-sell CTA ─── */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">有账号没环境？</h2>
            <p className="text-slate-300 text-sm max-w-md">
              出海专网已帮 200+ 客户把封号率降到个位数。先稳环境再买号，账号活得更久，ROI 更高。
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/network"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              了解出海专网 <ArrowRight size={14} />
            </Link>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm border border-white/20"
            >
              联系客服
            </a>
          </div>
        </div>
      </div>

      {/* ─── Realtime purchase popup ─── */}
      <RealtimePurchase />

      {/* ─── Checkout modal ─── */}
      {orderState !== 'idle' && (
        <CheckoutModal
          product={selectedProduct}
          state={orderState}
          onClose={() => setOrderState('idle')}
          onConfirm={handleConfirm}
          onPay={handlePay}
          onDone={handleDone}
        />
      )}
    </div>
  );
}
