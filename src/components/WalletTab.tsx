import React, { useState, useEffect } from 'react';
import { mockTransactions } from '../data/mockData';

interface WalletTabProps {
  onOpenWithdraw: () => void;
  onOpenCouponCalc?: () => void;
  onOpenGiftCards?: () => void;
  onOpenLuckySpin?: () => void;
}

// Cashback distribution data for pie chart
const cashbackSources = [
  { label: 'أمازون', value: 38, color: '#7dffa2', lightColor: '#7dffa2' },
  { label: 'نون', value: 27, color: '#bdc2ff', lightColor: '#bdc2ff' },
  { label: 'جوميا', value: 21, color: '#e3b5ff', lightColor: '#e3b5ff' },
  { label: 'كوبونات', value: 14, color: '#ffb4ab', lightColor: '#ffb4ab' },
];

// CSS conic-gradient pie chart: compute stop positions from values
const buildConicGradient = () => {
  let stops: string[] = [];
  let cumulative = 0;
  cashbackSources.forEach((src) => {
    const start = cumulative;
    const end = cumulative + src.value;
    stops.push(`${src.color} ${start}% ${end}%`);
    cumulative = end;
  });
  return `conic-gradient(${stops.join(', ')})`;
};

const txTypeLabels: Record<string, string> = {
  all: 'الكل',
  cashback: 'كاش باك',
  bill: 'فواتير',
  voucher: 'قسائم',
  withdrawal: 'سحب',
};

export const WalletTab: React.FC<WalletTabProps> = ({
  onOpenWithdraw,
  onOpenCouponCalc,
  onOpenGiftCards,
  onOpenLuckySpin,
}) => {
  const [txFilter, setTxFilter] = useState<string>('all');
  const [showAllTx, setShowAllTx] = useState(false);
  const [withdrawToast, setWithdrawToast] = useState(false);

  const filteredTx = mockTransactions.filter(
    (tx) => txFilter === 'all' || tx.type === txFilter
  );
  const visibleTx = showAllTx ? filteredTx : filteredTx.slice(0, 4);

  const handleWithdraw = () => {
    onOpenWithdraw();
    setWithdrawToast(true);
    setTimeout(() => setWithdrawToast(false), 3000);
  };

  return (
    <div className="pt-24 pb-28 px-4 sm:px-6 max-w-6xl mx-auto space-y-6 animate-fade-in">

      {/* Withdraw Toast */}
      {withdrawToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] bg-[#131b2e] border border-[#7dffa2]/30 text-[#7dffa2] text-xs font-bold px-5 py-2.5 rounded-2xl shadow-2xl animate-fade-in flex items-center gap-2">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          جاري معالجة طلب السحب...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left Column: Wallet Hero & Quick Actions */}
        <div className="space-y-6">
          {/* Wallet Hero Card */}
          <section className="relative">
            <div className="w-full rounded-[32px] overflow-hidden p-6 relative bg-gradient-to-br from-[#2d3fe3] via-[#8700d0] to-[#2d3449] shadow-2xl">
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #bdc2ff 0%, transparent 40%)' }}
              />
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="font-['Cairo'] font-bold text-[#dfe0ff]/80 text-sm mb-1">الرصيد المتاح</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black font-['Cairo'] text-white tracking-tight">1,250</span>
                  <span className="text-lg font-bold text-[#dfe0ff]">ج.م</span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 w-full bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                  <div className="text-center border-l border-white/10">
                    <p className="text-[10px] text-[#dfe0ff] font-medium mb-0.5">إجمالي التوفير</p>
                    <p className="text-[#7dffa2] font-bold text-base">5,420 ج.م</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-[#dfe0ff] font-medium mb-0.5">نقاط وافرلي</p>
                    <p className="text-[#e3b5ff] font-bold text-base">850 نقطة</p>
                  </div>
                </div>

                <button
                  onClick={handleWithdraw}
                  className="w-full mt-5 bg-white text-[#2d3fe3] hover:bg-slate-100 font-bold py-3 rounded-2xl text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
                >
                  <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                  سحب الرصيد البنكي
                </button>
              </div>
            </div>
          </section>

          {/* Quick Actions Grid */}
          <section className="grid grid-cols-3 gap-3">
            <button
              onClick={() => onOpenCouponCalc && onOpenCouponCalc()}
              className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#222a3d] border border-[#454656]/20 hover:bg-[#2d3449] transition-all group active:scale-95"
            >
              <div className="w-10 h-10 rounded-xl bg-[#bdc2ff]/15 flex items-center justify-center mb-1.5 text-[#bdc2ff]">
                <span className="material-symbols-outlined text-xl">confirmation_number</span>
              </div>
              <span className="text-[11px] font-semibold text-[#c5c5d8]">كوبونات</span>
            </button>

            <button
              onClick={() => onOpenGiftCards && onOpenGiftCards()}
              className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#222a3d] border border-[#454656]/20 hover:bg-[#2d3449] transition-all group active:scale-95"
            >
              <div className="w-10 h-10 rounded-xl bg-[#7dffa2]/15 flex items-center justify-center mb-1.5 text-[#7dffa2]">
                <span className="material-symbols-outlined text-xl">card_giftcard</span>
              </div>
              <span className="text-[11px] font-semibold text-[#c5c5d8]">بطاقات هدايا</span>
            </button>

            <button
              onClick={() => onOpenLuckySpin && onOpenLuckySpin()}
              className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#222a3d] border border-[#454656]/20 hover:bg-[#2d3449] transition-all group active:scale-95"
            >
              <div className="w-10 h-10 rounded-xl bg-[#e3b5ff]/15 flex items-center justify-center mb-1.5 text-[#e3b5ff]">
                <span className="material-symbols-outlined text-xl">casino</span>
              </div>
              <span className="text-[11px] font-semibold text-[#c5c5d8]">عجلة الحظ</span>
            </button>
          </section>

          {/* ═══ NEW: Cashback Distribution Pie Chart ═══ */}
          <section className="bg-[#131b2e] border border-[#454656]/20 rounded-3xl p-5 space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
              <h3 className="font-['Cairo'] font-bold text-base text-[#dae2fd]">توزيع الكاش باك</h3>
              <span className="text-[10px] bg-[#7dffa2]/10 text-[#7dffa2] px-2.5 py-1 rounded-md font-bold">هذا الشهر</span>
            </div>

            {/* Pie Chart (CSS conic-gradient) */}
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <div
                  className="w-24 h-24 rounded-full shadow-xl"
                  style={{ background: buildConicGradient() }}
                />
                <div className="absolute inset-3 rounded-full bg-[#131b2e] flex flex-col items-center justify-center">
                  <span className="text-[10px] text-[#c5c5d8]">إجمالي</span>
                  <span className="text-xs font-black text-[#7dffa2]">655 ج.م</span>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                {cashbackSources.map((src) => (
                  <div key={src.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: src.color }} />
                      <span className="text-[11px] text-[#c5c5d8]">{src.label}</span>
                    </div>
                    <span className="text-[11px] font-bold" style={{ color: src.color }}>{src.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bar chart mini visualization */}
            <div className="space-y-1.5 pt-1 border-t border-white/5">
              {cashbackSources.map((src) => (
                <div key={src.label} className="flex items-center gap-2">
                  <span className="text-[10px] text-[#c5c5d8] w-12 text-right shrink-0">{src.label}</span>
                  <div className="flex-1 h-1.5 bg-[#222a3d] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${src.value}%`, background: src.color }}
                    />
                  </div>
                  <span className="text-[10px] font-bold w-8 shrink-0" style={{ color: src.color }}>{src.value}%</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Transactions & Price Pulse (2 Cols) */}
        <div className="md:col-span-2 space-y-6">
          {/* Price Pulse Section */}
          <section className="space-y-4">
            <h2 className="font-['Cairo'] font-bold text-xl text-[#dae2fd]">نبض الأسعار</h2>
            <div className="p-5 rounded-[28px] bg-[#131b2e] border border-[#454656]/20 relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-[#dae2fd] text-base">توقع ذكي</h3>
                  <p className="text-xs text-[#c5c5d8] mt-0.5">أسعار الموبايلات ستنخفض قريباً بنسبة 10-15%</p>
                </div>
                <span className="material-symbols-outlined text-[#e3b5ff] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  magic_button
                </span>
              </div>

              <div className="h-16 w-full pt-2">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                  <path d="M0 35 Q 20 5, 40 25 T 80 10 T 100 30" fill="none" stroke="#7dffa2" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                  <linearGradient id="line-grad-wallet" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#7dffa2" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#7dffa2" stopOpacity="0" />
                  </linearGradient>
                  <path d="M0 35 Q 20 5, 40 25 T 80 10 T 100 30 L 100 40 L 0 40 Z" fill="url(#line-grad-wallet)" />
                </svg>
              </div>
            </div>
          </section>

          {/* ═══ UPGRADED: Transaction History with Filters ═══ */}
          <section className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h2 className="font-['Cairo'] font-bold text-xl text-[#dae2fd]">سجل المعاملات</h2>
              <div className="flex items-center gap-1.5 text-[10px] text-[#c5c5d8]">
                <span className="material-symbols-outlined text-xs text-[#7dffa2]">receipt_long</span>
                {mockTransactions.length} معاملة
              </div>
            </div>

            {/* Transaction Type Filter */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
              {Object.keys(txTypeLabels).map((type) => (
                <button
                  key={type}
                  onClick={() => setTxFilter(type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all active:scale-95 ${
                    txFilter === type
                      ? 'bg-[#bdc2ff] text-[#0013a0]'
                      : 'bg-[#222a3d] text-[#c5c5d8] hover:bg-[#2d3449]'
                  }`}
                >
                  {txTypeLabels[type]}
                </button>
              ))}
            </div>

            {/* Transactions List */}
            <div className="space-y-3">
              {visibleTx.length === 0 ? (
                <div className="py-10 text-center space-y-2">
                  <span className="material-symbols-outlined text-3xl text-[#c5c5d8]">receipt_long</span>
                  <p className="text-[#c5c5d8] text-sm">لا توجد معاملات في هذا التصنيف</p>
                </div>
              ) : (
                visibleTx.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-4 rounded-3xl bg-[#171f33] border border-[#454656]/15 flex items-center justify-between hover:bg-[#222a3d] transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white p-2 flex items-center justify-center shrink-0 shadow-inner">
                        <img src={tx.logo} alt={tx.storeName} className="w-full h-full object-contain rounded-md" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#dae2fd] text-sm mb-0.5">
                          <bdi className="bidi-isolate">{tx.storeName}</bdi>
                        </h4>
                        <p className="text-[11px] text-[#c5c5d8] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[10px]">schedule</span>
                          <bdi className="bidi-isolate">{tx.date}</bdi>
                        </p>
                      </div>
                    </div>

                    <div className="text-left flex flex-col items-end gap-1">
                      <p className={`font-bold font-['Cairo'] text-base ${tx.amount > 0 ? 'text-[#7dffa2]' : 'text-[#ffb4ab]'}`}>
                        <bdi className="bidi-isolate">
                          {tx.amount > 0 ? `+${tx.amount.toFixed(2)}` : `${tx.amount.toFixed(2)}`} {tx.currency}
                        </bdi>
                      </p>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          tx.status === 'available' || tx.status === 'completed'
                            ? 'bg-[#05e777]/15 text-[#7dffa2]'
                            : tx.status === 'pending'
                            ? 'bg-[#8700d0]/15 text-[#e3b5ff]'
                            : 'bg-[#454656]/20 text-[#c5c5d8]'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          tx.status === 'available' || tx.status === 'completed' ? 'bg-[#7dffa2]' :
                          tx.status === 'pending' ? 'bg-[#e3b5ff] animate-pulse' : 'bg-[#c5c5d8]'
                        }`} />
                        {tx.statusText}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Show More / Less Button */}
            {filteredTx.length > 4 && (
              <button
                onClick={() => setShowAllTx(!showAllTx)}
                className="w-full py-3 rounded-2xl bg-[#222a3d] text-[#bdc2ff] text-sm font-bold hover:bg-[#2d3449] transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">
                  {showAllTx ? 'expand_less' : 'expand_more'}
                </span>
                {showAllTx ? 'عرض أقل' : `عرض كل المعاملات (${filteredTx.length})`}
              </button>
            )}

            {/* Summary Stats Row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { label: 'إجمالي الكاش باك', value: '+655.50', color: '#7dffa2', icon: 'trending_up' },
                { label: 'إجمالي المدفوع', value: '-350.00', color: '#ffb4ab', icon: 'trending_down' },
                { label: 'صافي التوفير', value: '305.50', color: '#bdc2ff', icon: 'savings' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#131b2e] border border-[#454656]/20 rounded-2xl p-3.5 text-center shadow-lg">
                  <span className="material-symbols-outlined text-lg" style={{ color: stat.color, fontVariationSettings: "'FILL' 1" }}>
                    {stat.icon}
                  </span>
                  <p className="font-black font-['Cairo'] text-sm mt-1" style={{ color: stat.color }}>
                    <bdi>{stat.value} ج.م</bdi>
                  </p>
                  <p className="text-[9px] text-[#c5c5d8] mt-0.5 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
