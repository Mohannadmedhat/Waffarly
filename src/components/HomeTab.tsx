import React, { useState, useEffect } from 'react';
import { mockNearbyDeals } from '../data/mockData';
import { NavTab } from '../types';
import { useWishlist } from '../context/WishlistContext';

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

// Expiring deals (countdown) — with full data for wishlist/cart
const expiringDeals = [
  {
    id: 'ex-1',
    title: 'سوني WH-1000XM5',
    store: 'أمازون',
    storeLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    discount: '25%',
    hoursLeft: 3,
    cashback: '420 ج.م',
    cashbackAmount: 420,
    price: 3150,
    originalPrice: 4200,
    currency: 'ج.م',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=85',
  },
  {
    id: 'ex-2',
    title: 'آيفون 15 Pro 128GB',
    store: 'نون',
    storeLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Noon_logo_2022.png',
    discount: '12%',
    hoursLeft: 7,
    cashback: '850 ج.م',
    cashbackAmount: 850,
    price: 42500,
    originalPrice: 48000,
    currency: 'ج.م',
    productImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=85',
  },
  {
    id: 'ex-3',
    title: 'ماك بوك Air M2',
    store: 'جوميا',
    storeLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Jumia-logo.png',
    discount: '18%',
    hoursLeft: 1,
    cashback: '1,200 ج.م',
    cashbackAmount: 1200,
    price: 41000,
    originalPrice: 50000,
    currency: 'ج.م',
    productImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=85',
  },
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
  const { toggleWishlist, addToCart, isInWishlist, isInCart } = useWishlist();
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
    <div className="pt-28 pb-28 px-4 sm:px-8 max-w-[1360px] mx-auto space-y-8 animate-fade-in">

      {/* ═══ NEW: Daily Welcome Banner ═══ */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d1526] via-[#131b2e] to-[#0d1526] border border-[#bdc2ff]/20 p-6 sm:p-7 flex items-center justify-between gap-6 shadow-xl">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #bdc2ff 0%, transparent 60%)' }}
        />
        <div className="relative z-10 space-y-1.5">
          <p className="text-[#c5c5d8] text-sm sm:text-base font-medium">{getGreeting()} يا أحمد 👋</p>
          <h2 className="font-headline font-black text-2xl sm:text-3xl text-[#dae2fd]">
            وفّرت اليوم <span className="text-[#7dffa2]">120.50 ج.م</span> 🎉
          </h2>
          <p className="text-[#c5c5d8] text-xs sm:text-sm">إجمالي توفيرك منذ الانضمام: <span className="text-[#e3b5ff] font-bold">5,420 ج.م</span></p>
        </div>
        <div className="relative z-10 shrink-0 flex flex-col items-center gap-2.5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2d3fe3] to-[#8700d0] flex items-center justify-center shadow-xl border border-white/15">
            <span className="text-3xl">💰</span>
          </div>
          <button
            onClick={onOpenWithdraw}
            className="text-xs font-bold px-4 py-1.5 rounded-xl bg-[#7dffa2] text-[#003918] active:scale-95 transition-all shadow-md font-headline"
          >
            سحب الآن
          </button>
        </div>
      </section>

      {/* Hero Dashboard Grid Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Cashback Balance Hero Card (2 Cols) */}
        <section className="md:col-span-2 relative overflow-hidden rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-[#2d3fe3] via-[#8700d0] to-[#222a3d] shadow-2xl shadow-[#2d3fe3]/20 flex flex-col justify-between">
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-[#c6caff]/90 text-base font-medium mb-1">رصيد الكاش باك المتاح</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-headline text-white tracking-tight">
                <bdi className="bidi-isolate">540.50 ج.م</bdi>
              </h2>
              <p className="text-xs sm:text-sm text-[#c6caff]/85 mt-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#7dffa2]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                متاح للسحب المباشر إلى حسابك البنكي أو المحفظة الإلكترونية
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0 shadow-lg">
              <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                account_balance_wallet
              </span>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={onOpenWithdraw}
              className="flex-1 bg-white text-[#2d3fe3] hover:bg-slate-100 font-bold py-4 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg font-headline ripple"
            >
              <span className="material-symbols-outlined text-xl">add_circle</span>
              سحب الرصيد البنكي
            </button>
            <button
              onClick={() => setActiveTab('wallet')}
              className="flex-1 bg-black/20 text-white font-bold py-4 rounded-2xl text-sm sm:text-base backdrop-blur-sm border border-white/15 active:scale-95 transition-all hover:bg-black/30 flex items-center justify-center gap-2 font-headline ripple"
            >
              <span>تفاصيل المحفظة</span>
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
          </div>
        </section>

        {/* Savings Analysis Card (1 Col) */}
        <section className="bg-[#222a3d]/60 border border-[#454656]/30 rounded-3xl p-7 flex flex-col justify-between shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-headline font-bold text-xl text-[#7dffa2]">تحليلات التوفير</h3>
            <span className="text-xs bg-[#7dffa2]/15 text-[#7dffa2] px-3 py-1 rounded-lg font-bold">مُحدث الآن</span>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[#c5c5d8] text-xs sm:text-sm">إجمالي التوفير هذا العام</span>
              <h4 className="text-3xl sm:text-4xl font-black font-headline text-[#dae2fd] mt-1">
                <bdi className="bidi-isolate">3,450 ج.م</bdi>
              </h4>
            </div>
            <div className="flex items-end gap-2 h-16">
              <div className="w-full bg-[#7dffa2]/20 rounded-t-xl h-6" />
              <div className="w-full bg-[#7dffa2]/30 rounded-t-xl h-9" />
              <div className="w-full bg-[#7dffa2]/40 rounded-t-xl h-14" />
              <div className="w-full bg-[#7dffa2]/60 rounded-t-xl h-11" />
              <div className="w-full bg-[#7dffa2] rounded-t-xl h-16" />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#454656]/20">
            <p className="text-xs sm:text-sm text-[#c5c5d8] italic font-body">"أنت توفر أكثر بنسبة 15% عن مستخدمي منطقتك!"</p>
          </div>
        </section>
      </div>

      {/* Centered Search Bar & Quick Tags */}
      <div className="space-y-3">
        <form onSubmit={handleSearchSubmit} className="relative group">
          <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
            <span className="material-symbols-outlined text-[#bdc2ff] text-2xl">search</span>
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="وفّرلي ... (بحث عن ايفون 15، سماعة سوني، لابتوب جيمنج...)"
            className="w-full bg-[#060e20] border border-[#bdc2ff]/25 rounded-2xl py-4.5 pr-16 pl-14 text-[#dae2fd] placeholder-[#c5c5d8]/40 focus:border-[#bdc2ff] font-body text-base sm:text-lg transition-all shadow-inner"
          />
          <div className="absolute inset-y-0 left-3 flex items-center">
            <button
              type="submit"
              className="w-10 h-10 bg-[#bdc2ff]/15 text-[#bdc2ff] hover:bg-[#bdc2ff] hover:text-[#0b1326] rounded-xl flex items-center justify-center transition-all active:scale-90"
            >
              <span className="material-symbols-outlined text-2xl">mic</span>
            </button>
          </div>
        </form>

        <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
          <span className="text-[#c5c5d8] font-bold">الأكثر بحثاً:</span>
          {['آيفون 15 Pro', 'سوني WH-1000XM5', 'لابتوب جيمنج', 'ماك بوك Air'].map((term) => (
            <button
              key={term}
              onClick={() => { onSearch(term); setActiveTab('search'); }}
              className="px-3.5 py-1.5 rounded-full bg-[#222a3d] border border-white/8 text-[#dae2fd] hover:bg-[#bdc2ff]/20 hover:border-[#bdc2ff]/40 transition-all font-body active:scale-95"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ NEW: Trending Products Section ═══ */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-headline font-bold text-xl sm:text-2xl flex items-center gap-2 text-[#dae2fd]">
            <span className="material-symbols-outlined text-[#ffb4ab]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            الأكثر بحثاً الآن
            <span className="text-xs font-normal bg-[#ffb4ab]/15 text-[#ffb4ab] px-3 py-0.5 rounded-full font-headline">مباشر 🔴</span>
          </h3>
          <button onClick={() => setActiveTab('search')} className="text-[#bdc2ff] text-sm font-bold hover:underline font-headline">
            عرض الكل
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-3 stagger-children">
          {trendingItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => { onSearch(item.name); setActiveTab('search'); }}
              className="shrink-0 bg-[#131b2e] border border-[#454656]/20 hover:border-[#bdc2ff]/50 rounded-2xl p-4 flex flex-col items-center gap-3 w-36 sm:w-40 md:w-44 transition-all active:scale-95 group shadow-lg"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/5" style={{ background: `${item.color}18` }}>
                  {item.emoji}
                </div>
                <div className="absolute -top-2 -right-2 text-[10px] font-black bg-[#222a3d] border border-[#454656]/40 text-[#c5c5d8] px-1.5 py-0.5 rounded-md leading-none shadow-md">
                  #{idx + 1}
                </div>
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#dae2fd] text-center leading-tight line-clamp-2 font-headline group-hover:text-white transition-colors">{item.name}</span>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[10px] text-[#c5c5d8] font-body">{item.searches} بحث</span>
                <span className="text-xs font-bold font-headline" style={{ color: item.color }}>{item.trend} ↑</span>
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

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 stagger-children">
          {expiringDeals.map((deal) => {
            const inWishlist = isInWishlist(deal.id);
            const inCart    = isInCart(deal.id);
            return (
              <div
                key={deal.id}
                className="shrink-0 w-64 bg-[#131b2e] border border-[#ffb4ab]/20 hover:border-[#ffb4ab]/50 rounded-2xl overflow-hidden cursor-pointer transition-all group shadow-lg"
              >
                {/* Product image */}
                <div className="relative h-32 bg-[#171f33] overflow-hidden">
                  <img
                    src={deal.productImage}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] to-transparent" />

                  {/* Discount badge */}
                  <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#ffb4ab] text-[#4a0000]">
                    خصم {deal.discount}
                  </span>

                  {/* Hours left badge */}
                  <span className="absolute top-2.5 left-2.5 text-[10px] text-[#ffb4ab] flex items-center gap-0.5 bg-[#131b2e]/80 backdrop-blur-sm px-2 py-0.5 rounded-lg font-bold">
                    <span className="material-symbols-outlined text-[10px]">schedule</span>
                    {deal.hoursLeft === 1 ? 'آخر ساعة!' : `${deal.hoursLeft}س`}
                  </span>

                  {/* Wishlist Heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist({
                        id: deal.id, title: deal.title, price: deal.price,
                        originalPrice: deal.originalPrice, currency: deal.currency,
                        store: deal.store, storeLogo: deal.storeLogo,
                        productImage: deal.productImage, cashbackAmount: deal.cashbackAmount,
                      });
                    }}
                    className={`wishlist-btn absolute bottom-2.5 left-2.5 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg ${
                      inWishlist ? 'bg-rose-500 text-white' : 'bg-[#222a3d]/80 text-[#c5c5d8] hover:text-rose-400'
                    }`}
                    aria-label={inWishlist ? 'إزالة من المفضلة' : 'أضف للمفضلة'}
                  >
                    <span className="material-symbols-outlined text-sm" style={inWishlist ? { fontVariationSettings: "'FILL' 1" } : {}}>
                      favorite
                    </span>
                  </button>
                </div>

                {/* Card body */}
                <div className="p-3.5 space-y-2.5" onClick={() => setActiveTab('search')}>
                  <div>
                    <p className="font-bold text-[#dae2fd] text-sm leading-snug font-headline">{deal.title}</p>
                    <p className="text-[#c5c5d8] text-xs mt-0.5">{deal.store}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[#7dffa2] font-headline font-black text-base">{deal.price.toLocaleString('ar-EG')} {deal.currency}</span>
                      <span className="text-[#8899cc] text-[10px] line-through mr-1.5">{deal.originalPrice.toLocaleString('ar-EG')}</span>
                    </div>
                    <span className="text-[10px] text-[#e3b5ff] font-bold">كاش باك {deal.cashback}</span>
                  </div>

                  {/* Progress bar for urgency */}
                  <div className="h-1 bg-[#222a3d] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#ffb4ab] to-[#ff6b4a] animate-pulse"
                      style={{ width: `${Math.min(100, (deal.hoursLeft / 24) * 100)}%` }}
                    />
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        id: deal.id, title: deal.title, price: deal.price,
                        originalPrice: deal.originalPrice, currency: deal.currency,
                        store: deal.store, storeLogo: deal.storeLogo,
                        productImage: deal.productImage, cashbackAmount: deal.cashbackAmount,
                      });
                    }}
                    className={`w-full py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 ripple transition-all active:scale-95 ${
                      inCart
                        ? 'bg-[#7dffa2]/20 text-[#7dffa2] border border-[#7dffa2]/30'
                        : 'bg-[#ffb4ab]/15 text-[#ffb4ab] hover:bg-[#ffb4ab]/25 border border-[#ffb4ab]/20'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm" style={inCart ? { fontVariationSettings: "'FILL' 1" } : {}}>
                      {inCart ? 'check_circle' : 'shopping_cart'}
                    </span>
                    {inCart ? 'في السلة ✓' : 'أضف للسلة'}
                  </button>
                </div>
              </div>
            );
          })}
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
          {/* Card 1: AI Recommendation */}
          <div
            onClick={() => setActiveTab('search')}
            className="col-span-2 md:col-span-1 relative rounded-3xl overflow-hidden h-52 border border-[#8700d0]/30 hover:border-[#e3b5ff]/60 transition-all cursor-pointer group shadow-xl bg-[#131b2e]"
          >
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=85"
              alt="اختيار ذكي"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-[#0b1326]/75 to-transparent" />
            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-11 h-11 bg-[#8700d0]/25 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#e3b5ff] border border-[#e3b5ff]/30 shadow-lg">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#8700d0]/30 text-[#e3b5ff] border border-[#e3b5ff]/30 backdrop-blur-md">
                  توصية AI ✨
                </span>
              </div>
              <div>
                <h4 className="font-bold font-headline text-lg leading-tight text-[#dae2fd] group-hover:text-white transition-colors">
                  اختيار ذكي بالذكاء الاصطناعي
                </h4>
                <p className="text-[#c5c5d8] text-xs mt-1 leading-relaxed">أفضل العروض والخصومات المخصصة لميزانيتك</p>
              </div>
            </div>
          </div>

          {/* Card 2: Price Tracker */}
          <div
            onClick={() => setActiveTab('wallet')}
            className="relative rounded-3xl overflow-hidden h-52 border border-[#7dffa2]/30 hover:border-[#7dffa2]/60 transition-all cursor-pointer group shadow-xl bg-[#131b2e]"
          >
            <img
              src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&auto=format&fit=crop&q=85"
              alt="تتبع الأسعار"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-35 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-[#0b1326]/80 to-transparent" />
            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-11 h-11 bg-[#7dffa2]/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#7dffa2] border border-[#7dffa2]/30 shadow-lg">
                  <span className="material-symbols-outlined text-xl">trending_down</span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#7dffa2]/20 text-[#7dffa2] border border-[#7dffa2]/30 backdrop-blur-md">
                  تنبيه هبوط
                </span>
              </div>
              <div>
                <h4 className="font-bold font-headline text-base leading-tight text-[#dae2fd] group-hover:text-white transition-colors">
                  تتبع الأسعار الذكي
                </h4>
                <p className="text-[#c5c5d8] text-xs mt-1">نبّهني فور هبوط سعر أي منتج</p>
              </div>
            </div>
          </div>

          {/* Card 3: Gift Cards */}
          <div
            onClick={onOpenGiftCards}
            className="relative rounded-3xl overflow-hidden h-52 border border-[#bdc2ff]/30 hover:border-[#bdc2ff]/60 transition-all cursor-pointer group shadow-xl bg-[#131b2e]"
          >
            <img
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=85"
              alt="بطاقات الهدايا"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-[#0b1326]/80 to-transparent" />
            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-11 h-11 bg-[#bdc2ff]/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#bdc2ff] border border-[#bdc2ff]/30 shadow-lg">
                  <span className="material-symbols-outlined text-xl">card_giftcard</span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#bdc2ff]/20 text-[#bdc2ff] border border-[#bdc2ff]/30 backdrop-blur-md">
                  كاش باك 10%
                </span>
              </div>
              <div>
                <h4 className="font-bold font-headline text-base leading-tight text-[#dae2fd] group-hover:text-white transition-colors">
                  بطاقات الهدايا الرقمية
                </h4>
                <p className="text-[#c5c5d8] text-xs mt-1">بطاقات نون وأمازون وجوميا</p>
              </div>
            </div>
          </div>

          {/* Card 4: Referral */}
          <div
            onClick={onOpenReferral}
            className="relative rounded-3xl overflow-hidden h-52 border border-[#ffb4ab]/30 hover:border-[#ffb4ab]/60 transition-all cursor-pointer group shadow-xl bg-[#131b2e]"
          >
            <img
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=85"
              alt="إحالة الأصدقاء"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-[#0b1326]/80 to-transparent" />
            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-11 h-11 bg-[#ffb4ab]/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#ffb4ab] border border-[#ffb4ab]/30 shadow-lg">
                  <span className="material-symbols-outlined text-xl">group_add</span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#ffb4ab]/20 text-[#ffb4ab] border border-[#ffb4ab]/30 backdrop-blur-md">
                  +100 ج.م لك ولصديقك
                </span>
              </div>
              <div>
                <h4 className="font-bold font-headline text-base leading-tight text-[#dae2fd] group-hover:text-white transition-colors">
                  برنامج إحالة الأصدقاء
                </h4>
                <p className="text-[#c5c5d8] text-xs mt-1">اربح 100 ج.م عن كل صديق ينضم</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lucky Spin Wheel Interactive Banner */}
      <section
        onClick={() => onOpenLuckySpin && onOpenLuckySpin()}
        className="bg-gradient-to-r from-[#8700d0] via-[#2d3fe3] to-[#131b2e] rounded-3xl p-6 border border-[#e3b5ff]/30 shadow-2xl cursor-pointer hover:scale-[1.01] transition-all flex flex-col sm:flex-row justify-between items-center gap-4 ripple"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-3xl shadow-lg shrink-0 border border-white/15">
            🎲
          </div>
          <div>
            <div className="inline-flex items-center gap-1 bg-[#7dffa2]/20 text-[#7dffa2] border border-[#7dffa2]/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-1">
              مكافأة يومية مجانية
            </div>
            <h3 className="font-headline font-black text-xl text-white">عجلة الحظ اليومية 🎡</h3>
            <p className="text-xs text-[#dfe0ff] mt-0.5 font-body">أدر العجلة الآن واحصل على رصيد كاش باك فوري يصل لـ 200 ج.م!</p>
          </div>
        </div>
        <button className="px-6 py-3 rounded-2xl bg-white text-[#2d3fe3] font-headline font-black text-xs shadow-xl shrink-0 active:scale-95 transition-all">
          أدر العجلة الآن! 🎲
        </button>
      </section>

      {/* Nearby Deals Grid */}
      <section>
        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={onOpenNearbyModal}>
          <h3 className="font-headline font-bold text-xl text-[#dae2fd] flex items-center gap-2">
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
              <div className="relative h-40 bg-[#171f33] overflow-hidden">
                <img
                  src={deal.imageUrl}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-[#7dffa2] text-[#003918] px-3 py-1 rounded-xl text-xs font-black shadow-xl font-headline">
                  {deal.discountText}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-sm text-[#dae2fd] font-headline">{deal.title}</h4>
                  <div className="flex items-center gap-1 text-[#7dffa2] text-xs shrink-0 font-bold">
                    <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    {deal.rating}
                  </div>
                </div>
                <p className="text-[#c5c5d8] text-xs flex items-center gap-1 font-body">
                  <span className="material-symbols-outlined text-xs text-[#bdc2ff]">location_on</span>
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
