import React, { useState, useEffect } from 'react';
import { mockNearbyDeals, mockSearchDeals } from '../data/mockData';
import { NavTab } from '../types';

interface HomeTabProps {
  onSearch: (query: string) => void;
  setActiveTab: (tab: NavTab) => void;
  onOpenWithdraw: () => void;
  onSelectProduct: (productId: string) => void;
  onOpenNearbyModal?: () => void;
  onOpenCouponCalc?: () => void;
  onOpenReferral?: () => void;
  onOpenLuckySpin?: () => void;
  onOpenComparison?: () => void;
  onOpenGiftCards?: () => void;
}

// Trending products mock data
const trendingItems = [
  { id: 'tr-1', name: 'آيفون 15 Pro', searches: '12.4k', trend: '+18%', emoji: '📱', color: '#7dffa2' },
  { id: 'tr-2', name: 'سوني WH-1000XM5', searches: '8.7k', trend: '+12%', emoji: '🎧', color: '#bdc2ff' },
  { id: 'tr-3', name: 'لابتوب جيمنج', searches: '6.2k', trend: '+9%', emoji: '💻', color: '#e3b5ff' },
  { id: 'tr-4', name: 'سامسونج S24', searches: '5.9k', trend: '+7%', emoji: '📲', color: '#ffb4ab' },
  { id: 'tr-5', name: 'آير فرايير', searches: '4.5k', trend: '+22%', emoji: '🍳', color: '#7dffa2' },
  { id: 'tr-6', name: 'ساعة أبل', searches: '3.8k', trend: '+5%', emoji: '⌚', color: '#bdc2ff' },
];

// Expiring deals (countdown)
const expiringDeals = [
  { id: 'ex-1', title: 'سوني WH-1000XM5', store: 'أمازون', discount: '25%', hoursLeft: 3, cashback: '420 ج.م' },
  { id: 'ex-2', title: 'آيفون 15 128GB', store: 'نون', discount: '12%', hoursLeft: 7, cashback: '850 ج.م' },
  { id: 'ex-3', title: 'ماك بوك Air M2', store: 'جوميا', discount: '18%', hoursLeft: 1, cashback: '1,200 ج.م' },
];

const getGreeting = () => {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'صباح الخير ☀️';
  if (h >= 12 && h < 17) return 'مساء النور 🌤️';
  if (h >= 17 && h < 21) return 'مساء الخير 🌙';
  return 'ليلة سعيدة 🌟';
};

export const HomeTab: React.FC<HomeTabProps> = ({
  onSearch,
  setActiveTab,
  onOpenWithdraw,
  onSelectProduct,
  onOpenNearbyModal,
  onOpenCouponCalc,
  onOpenReferral,
  onOpenLuckySpin,
  onOpenComparison,
  onOpenGiftCards,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [countdown, setCountdown] = useState({ h: 3, m: 24, s: 17 });

  // Live countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 23, m: 59, s: 59 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setActiveTab('search');
    }
  };

  return (
    <div className="pt-24 pb-28 px-4 sm:px-6 max-w-6xl mx-auto space-y-6 animate-fade-in">

      {/* ═══ NEW: Daily Welcome Banner ═══ */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d1526] via-[#131b2e] to-[#0d1526] border border-[#bdc2ff]/20 p-5 flex items-center justify-between gap-4 shadow-xl">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #bdc2ff 0%, transparent 60%)' }}
        />
        <div className="relative z-10 space-y-1">
          <p className="text-[#c5c5d8] text-sm font-medium">{getGreeting()} يا أحمد 👋</p>
          <h2 className="font-['Cairo'] font-black text-xl text-[#dae2fd]">
            وفّرت اليوم <span className="text-[#7dffa2]">120.50 ج.م</span> 🎉
          </h2>
          <p className="text-[#c5c5d8] text-xs">إجمالي توفيرك منذ الانضمام: <span className="text-[#e3b5ff] font-bold">5,420 ج.م</span></p>
        </div>
        <div className="relative z-10 shrink-0 flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2d3fe3] to-[#8700d0] flex items-center justify-center shadow-xl">
            <span className="text-2xl">💰</span>
          </div>
          <button
            onClick={onOpenWithdraw}
            className="text-[10px] font-bold px-3 py-1 rounded-xl bg-[#7dffa2] text-[#003918] active:scale-95 transition-all"
          >
            سحب الآن
          </button>
        </div>
      </section>

      {/* Hero Dashboard Grid Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Cashback Balance Hero Card (2 Cols) */}
        <section className="md:col-span-2 relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-[#2d3fe3] via-[#8700d0] to-[#222a3d] shadow-2xl shadow-[#2d3fe3]/20 flex flex-col justify-between">
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-[#c6caff]/90 text-sm font-medium mb-1">رصيد الكاش باك المتاح</p>
              <h2 className="text-4xl sm:text-5xl font-black font-['Cairo'] text-white tracking-tight">
                <bdi className="bidi-isolate">540.50 ج.م</bdi>
              </h2>
              <p className="text-xs text-[#c6caff]/80 mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#7dffa2]">check_circle</span>
                متاح للسحب المباشر إلى حسابك البنكي أو المحفظة الإلكترونية
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 shrink-0">
              <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                account_balance_wallet
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={onOpenWithdraw}
              className="flex-1 bg-white text-[#2d3fe3] hover:bg-slate-100 font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-xl">add_circle</span>
              سحب الرصيد
            </button>
            <button
              onClick={() => setActiveTab('wallet')}
              className="flex-1 bg-black/20 text-white font-bold py-3.5 rounded-2xl text-sm backdrop-blur-sm border border-white/10 active:scale-95 transition-all hover:bg-black/30 flex items-center justify-center gap-1"
            >
              <span>تفاصيل المحفظة</span>
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </button>
          </div>
        </section>

        {/* Savings Analysis Card (1 Col) */}
        <section className="bg-[#222a3d]/60 border border-[#454656]/30 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-['Cairo'] font-bold text-lg text-[#7dffa2]">تحليلات التوفير</h3>
            <span className="text-[10px] bg-[#7dffa2]/10 text-[#7dffa2] px-2.5 py-1 rounded-md font-bold">مُحدث الآن</span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[#c5c5d8] text-xs">إجمالي التوفير هذا العام</span>
              <h4 className="text-3xl font-black font-['Cairo'] text-[#dae2fd] mt-0.5">
                <bdi className="bidi-isolate">3,450 ج.م</bdi>
              </h4>
            </div>
            <div className="flex items-end gap-1.5 h-12">
              <div className="w-full bg-[#7dffa2]/20 rounded-t-lg h-4" />
              <div className="w-full bg-[#7dffa2]/30 rounded-t-lg h-6" />
              <div className="w-full bg-[#7dffa2]/40 rounded-t-lg h-10" />
              <div className="w-full bg-[#7dffa2]/60 rounded-t-lg h-8" />
              <div className="w-full bg-[#7dffa2] rounded-t-lg h-12" />
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#454656]/20">
            <p className="text-xs text-[#c5c5d8] italic">"أنت توفر أكثر بنسبة 15% عن مستخدمي منطقتك!"</p>
          </div>
        </section>
      </div>

      {/* Centered Search Bar & Quick Tags */}
      <div className="space-y-3">
        <form onSubmit={handleSearchSubmit} className="relative group">
          <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
            <span className="material-symbols-outlined text-[#bdc2ff]">search</span>
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="وفّرلي ... (بحث عن ايفون 15، سماعة سوني، لابتوب جيمنج)"
            className="w-full bg-[#060e20] border border-[#bdc2ff]/20 rounded-2xl py-4 pr-14 pl-12 text-[#dae2fd] placeholder-[#c5c5d8]/40 focus:border-[#bdc2ff] font-['IBM_Plex_Arabic'] text-base transition-all shadow-inner"
          />
          <div className="absolute inset-y-0 left-3 flex items-center">
            <button
              type="submit"
              className="w-9 h-9 bg-[#bdc2ff]/15 text-[#bdc2ff] hover:bg-[#bdc2ff] hover:text-[#0b1326] rounded-xl flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined text-xl">mic</span>
            </button>
          </div>
        </form>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#c5c5d8] text-xs">الأكثر بحثاً:</span>
          {['آيفون 15', 'سوني WH-1000XM5', 'لابتوب جيمنج'].map((term) => (
            <button
              key={term}
              onClick={() => { onSearch(term); setActiveTab('search'); }}
              className="px-3 py-1 rounded-full bg-[#222a3d] border border-white/5 text-[#dae2fd] hover:bg-[#bdc2ff]/20 hover:border-[#bdc2ff]/40 transition-all"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ NEW: Trending Products Section ═══ */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-['Cairo'] font-bold text-xl flex items-center gap-2 text-[#dae2fd]">
            <span className="material-symbols-outlined text-[#ffb4ab]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            الأكثر بحثاً الآن
            <span className="text-[10px] font-normal bg-[#ffb4ab]/15 text-[#ffb4ab] px-2 py-0.5 rounded-full">مباشر 🔴</span>
          </h3>
          <button onClick={() => setActiveTab('search')} className="text-[#bdc2ff] text-sm font-medium hover:underline">
            عرض الكل
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {trendingItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => { onSearch(item.name); setActiveTab('search'); }}
              className="shrink-0 bg-[#131b2e] border border-[#454656]/20 hover:border-[#bdc2ff]/40 rounded-2xl p-4 flex flex-col items-center gap-2 w-28 transition-all active:scale-95 group shadow-lg"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${item.color}18` }}>
                  {item.emoji}
                </div>
                <div className="absolute -top-1.5 -right-1.5 text-[9px] font-black bg-[#222a3d] border border-[#454656]/40 text-[#c5c5d8] px-1 py-0.5 rounded-md leading-none">
                  #{idx + 1}
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#dae2fd] text-center leading-tight line-clamp-2">{item.name}</span>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[9px] text-[#c5c5d8]">{item.searches} بحث</span>
                <span className="text-[9px] font-bold" style={{ color: item.color }}>{item.trend} ↑</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ═══ NEW: Expiring Deals Section ═══ */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-['Cairo'] font-bold text-xl flex items-center gap-2 text-[#dae2fd]">
            <span className="material-symbols-outlined text-[#ffb4ab]" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
            عروض تنتهي قريباً
          </h3>
          <div className="flex items-center gap-1.5 text-[#ffb4ab] text-xs font-bold bg-[#ffb4ab]/10 border border-[#ffb4ab]/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab] animate-pulse" />
            {String(countdown.h).padStart(2, '0')}:{String(countdown.m).padStart(2, '0')}:{String(countdown.s).padStart(2, '0')}
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {expiringDeals.map((deal) => (
            <div
              key={deal.id}
              onClick={() => setActiveTab('search')}
              className="shrink-0 w-52 bg-[#131b2e] border border-[#ffb4ab]/20 hover:border-[#ffb4ab]/50 rounded-2xl p-4 cursor-pointer transition-all active:scale-95 group shadow-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#ffb4ab]/15 text-[#ffb4ab]">
                  خصم {deal.discount}
                </span>
                <span className="text-[10px] text-[#c5c5d8] flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[10px]">schedule</span>
                  {deal.hoursLeft}س
                </span>
              </div>
              <div>
                <p className="font-bold text-[#dae2fd] text-sm leading-snug">{deal.title}</p>
                <p className="text-[#c5c5d8] text-xs mt-0.5">{deal.store}</p>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <span className="text-[10px] text-[#c5c5d8]">كاش باك:</span>
                <span className="text-[#7dffa2] font-bold text-xs">{deal.cashback}</span>
              </div>
              {/* Progress bar for urgency */}
              <div className="h-1 bg-[#222a3d] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#ffb4ab] to-[#ff6b4a] animate-pulse"
                  style={{ width: `${Math.min(100, (deal.hoursLeft / 24) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Suggestions Bento Grid */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-['Cairo'] font-bold text-xl flex items-center gap-2 text-[#dae2fd]">
            <span className="material-symbols-outlined text-[#e3b5ff]">auto_awesome</span>
            مقترحات ذكية
          </h3>
          <button onClick={() => setActiveTab('assistant')} className="text-[#bdc2ff] text-sm font-medium hover:underline">
            عرض الكل
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Large Card: Smart AI */}
          <div
            onClick={() => setActiveTab('search')}
            className="col-span-2 md:col-span-1 relative rounded-3xl overflow-hidden h-52 border border-[#454656]/20 hover:border-[#bdc2ff]/40 transition-all cursor-pointer group shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
              alt="اختيار ذكي"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-[#131b2e]/70 to-[#131b2e]/20" />
            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
              <div className="w-10 h-10 bg-[#bdc2ff]/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#bdc2ff] border border-[#bdc2ff]/30">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <div>
                <h4 className="font-bold font-['Cairo'] text-lg leading-tight text-[#dae2fd]">اختيار ذكي بالذكاء الاصطناعي</h4>
                <p className="text-[#c5c5d8] text-xs mt-1">أفضل العروض بناءً على سلوكك وميزانيتك</p>
              </div>
            </div>
          </div>

          {/* Small Card 2: Price Tracker */}
          <div
            onClick={() => setActiveTab('wallet')}
            className="relative rounded-3xl overflow-hidden h-52 border border-[#454656]/20 hover:border-[#bdc2ff]/40 transition-all cursor-pointer group shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80"
              alt="تتبع الأسعار"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-[#131b2e]/80 to-[#131b2e]/40" />
            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
              <div className="w-10 h-10 bg-[#7dffa2]/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#7dffa2] border border-[#7dffa2]/30">
                <span className="material-symbols-outlined">trending_down</span>
              </div>
              <div>
                <h4 className="font-bold font-['Cairo'] text-base leading-tight text-[#dae2fd]">تتبع الأسعار الذكي</h4>
                <p className="text-[#c5c5d8] text-xs mt-1">نبّهني لما ينخفض السعر</p>
              </div>
            </div>
          </div>

          {/* Small Card 3: Gift Cards */}
          <div
            onClick={onOpenGiftCards}
            className="relative rounded-3xl overflow-hidden h-52 border border-[#454656]/20 hover:border-[#bdc2ff]/40 transition-all cursor-pointer group shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80"
              alt="بطاقات الهدايا"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-[#131b2e]/80 to-[#131b2e]/40" />
            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
              <div className="w-10 h-10 bg-[#e3b5ff]/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#e3b5ff] border border-[#e3b5ff]/30">
                <span className="material-symbols-outlined">card_giftcard</span>
              </div>
              <div>
                <h4 className="font-bold font-['Cairo'] text-base leading-tight text-[#dae2fd]">بطاقات الهدايا الرقمية</h4>
                <p className="text-[#c5c5d8] text-xs mt-1">اشترِ كارت هدايا واسترد حتى 10%</p>
              </div>
            </div>
          </div>

          {/* Small Card 4: Referral Program */}
          <div
            onClick={onOpenReferral}
            className="relative rounded-3xl overflow-hidden h-52 border border-[#454656]/20 hover:border-[#bdc2ff]/40 transition-all cursor-pointer group shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
              alt="إحالة الأصدقاء"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-[#131b2e]/80 to-[#131b2e]/40" />
            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
              <div className="w-10 h-10 bg-[#bdc2ff]/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#bdc2ff] border border-[#bdc2ff]/30">
                <span className="material-symbols-outlined">group_add</span>
              </div>
              <div>
                <h4 className="font-bold font-['Cairo'] text-base leading-tight text-[#dae2fd]">برنامج إحالة الأصدقاء</h4>
                <p className="text-[#c5c5d8] text-xs mt-1">احصل على 100 ج.م لكل صديق ينضم</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lucky Spin Wheel Interactive Banner */}
      <section
        onClick={() => onOpenLuckySpin && onOpenLuckySpin()}
        className="bg-gradient-to-r from-[#8700d0] via-[#2d3fe3] to-[#131b2e] rounded-3xl p-6 border border-[#e3b5ff]/30 shadow-2xl cursor-pointer hover:scale-[1.01] transition-all flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-3xl shadow-lg shrink-0">
            🎲
          </div>
          <div>
            <div className="inline-flex items-center gap-1 bg-[#7dffa2]/20 text-[#7dffa2] border border-[#7dffa2]/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-1">
              مكافأة يومية مجانية
            </div>
            <h3 className="font-['Cairo'] font-black text-xl text-white">عجلة الحظ اليومية 🎡</h3>
            <p className="text-xs text-[#dfe0ff] mt-0.5">أدر العجلة الآن واحصل على رصيد كاش باك فوري يصل لـ 200 ج.م!</p>
          </div>
        </div>
        <button className="px-6 py-3 rounded-2xl bg-white text-[#2d3fe3] font-black text-xs shadow-xl shrink-0 active:scale-95 transition-all">
          أدر العجلة الآن! 🎲
        </button>
      </section>

      {/* Nearby Deals Grid */}
      <section>
        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={onOpenNearbyModal}>
          <h3 className="font-['Cairo'] font-bold text-xl text-[#dae2fd] flex items-center gap-2">
            <span>عروض قريبة منك</span>
            <span className="text-xs text-[#bdc2ff] font-normal hover:underline">(استكشاف الخريطة الكاملة)</span>
          </h3>
          <div className="flex items-center gap-1 text-[#c5c5d8] text-xs bg-[#171f33] px-3 py-1 rounded-full border border-white/5">
            <span className="material-symbols-outlined text-sm text-[#7dffa2]">location_on</span>
            القاهرة، المعادي
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mockNearbyDeals.map((deal) => (
            <div
              key={deal.id}
              onClick={onOpenNearbyModal}
              className="bg-[#131b2e] rounded-3xl overflow-hidden flex flex-col shadow-lg border border-[#454656]/20 hover:border-[#bdc2ff]/40 transition-all cursor-pointer group"
            >
              <div className="relative h-36">
                <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-[#7dffa2] text-[#00622e] px-3 py-1 rounded-xl text-xs font-bold shadow-xl">
                  {deal.discountText}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-sm text-[#dae2fd]">{deal.title}</h4>
                  <div className="flex items-center gap-1 text-[#7dffa2] text-xs shrink-0">
                    <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    {deal.rating}
                  </div>
                </div>
                <p className="text-[#c5c5d8] text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">map</span>
                  {deal.distance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
