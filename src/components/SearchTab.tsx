import React, { useState, useMemo } from 'react';
import { DealItem } from '../types';
import { mockSearchDeals } from '../data/mockData';
import { useWishlist } from '../context/WishlistContext';

interface SearchTabProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectDeal: (deal: DealItem) => void;
  onOpenComparison?: () => void;
}

export const SearchTab: React.FC<SearchTabProps> = ({
  searchQuery,
  setSearchQuery,
  onSelectDeal,
  onOpenComparison,
}) => {
  const { wishlistIds, toggleWishlist: ctxToggle, addToCart, isInCart } = useWishlist();
  const [activeSort, setActiveSort] = useState<'cheapest' | 'price-desc' | 'cashback' | 'wishlist'>('cheapest');
  const [selectedStoreFilter, setSelectedStoreFilter] = useState<string>('all');
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(100000);
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  const displayQuery = searchQuery || 'Sony WH-1000XM5';

  const handleToggleWishlist = (deal: DealItem, e: React.MouseEvent) => {
    e.stopPropagation();
    ctxToggle({
      id: deal.id,
      title: deal.title,
      price: deal.price,
      originalPrice: deal.originalPrice,
      currency: deal.currency,
      store: deal.store,
      storeLogo: deal.storeLogo,
      productImage: deal.productImage,
      cashbackAmount: deal.cashbackAmount,
      couponCode: deal.couponCode,
      discountPercentage: deal.discountPercentage,
    });
  };

  const handleAddToCart = (deal: DealItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: deal.id,
      title: deal.title,
      price: deal.price,
      originalPrice: deal.originalPrice,
      currency: deal.currency,
      store: deal.store,
      storeLogo: deal.storeLogo,
      productImage: deal.productImage,
      cashbackAmount: deal.cashbackAmount,
      couponCode: deal.couponCode,
      discountPercentage: deal.discountPercentage,
    });
  };

  // Real-time Sort, Store Filter, Price Filter, Wishlist Computation
  const sortedAndFilteredDeals = useMemo(() => {
    let result = [...mockSearchDeals];

    // Search query text filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.store.toLowerCase().includes(q) ||
          (d.subtitle && d.subtitle.toLowerCase().includes(q))
      );
    }

    // Store filter
    if (selectedStoreFilter !== 'all') {
      result = result.filter((d) => d.store.toLowerCase().includes(selectedStoreFilter.toLowerCase()));
    }

    // Price range filter
    result = result.filter((d) => d.price >= priceMin && d.price <= priceMax);

    // Wishlist filter
    if (activeSort === 'wishlist') {
      result = result.filter((d) => wishlistIds.has(d.id));
    } else {
      // Sorting logic
      result.sort((a, b) => {
        if (activeSort === 'cheapest') return a.price - b.price;
        if (activeSort === 'price-desc') return b.price - a.price;
        if (activeSort === 'cashback') return b.cashbackAmount - a.cashbackAmount;
        return 0;
      });
    }

    return result;
  }, [searchQuery, activeSort, selectedStoreFilter, priceMin, priceMax, wishlistIds]);

  return (
    <div className="pt-24 pb-28 px-4 sm:px-6 max-w-6xl mx-auto space-y-5 animate-fade-in">

      {/* Search Header Bar & AI Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        <div className="md:col-span-2 space-y-3">
          <div className="flex gap-2">
            {/* Search Bar Input */}
            <div className="relative group flex-1">
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <span className="material-symbols-outlined text-[#bdc2ff]">search</span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن موبايل، سماعة، لابتوب، أجهزة منزلية..."
                className="w-full bg-[#060e20] border border-[#454656]/30 rounded-2xl py-3.5 pr-12 pl-10 text-[#dae2fd] placeholder-[#c5c5d8]/40 focus:border-[#bdc2ff] font-['IBM_Plex_Arabic'] text-sm shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 left-3 flex items-center text-[#c5c5d8] hover:text-white"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              )}
            </div>
            <button
              onClick={() => onOpenComparison && onOpenComparison()}
              className="px-4 py-3.5 rounded-2xl bg-[#7dffa2]/15 text-[#7dffa2] border border-[#7dffa2]/30 font-bold text-xs hover:bg-[#7dffa2]/30 transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
            >
              <span className="material-symbols-outlined text-base">compare</span>
              <span className="hidden sm:inline">مقارنة</span>
            </button>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[#c5c5d8] text-xs mb-1">
              <span className="material-symbols-outlined text-sm">search</span>
              <span>نتائج ({sortedAndFilteredDeals.length} عرض):</span>
            </div>
            <h2 className="font-['Cairo'] font-black text-2xl sm:text-3xl text-[#bdc2ff] leading-tight">
              <bdi className="bidi-isolate">{displayQuery}</bdi>
            </h2>
          </div>
        </div>

        {/* AI Smart Advice Banner */}
        <div className="p-4 rounded-2xl bg-[#8700d0]/15 border border-[#8700d0]/30 flex items-center gap-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-[#8700d0] flex items-center justify-center shrink-0 text-white shadow-md">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>magic_button</span>
          </div>
          <div>
            <p className="text-[#e3b5ff] font-bold text-xs">نصيحة ذكية من وافرلي</p>
            <p className="text-[#c5c5d8] text-[11px] leading-relaxed mt-0.5">
              السعر الحالي أقل بنسبة 15% من المتوسط. وقت مثالي للشراء الآن!
            </p>
          </div>
        </div>
      </div>

      {/* Sort + Store Filter Bar */}
      <div className="bg-[#131b2e]/80 p-3.5 rounded-2xl border border-white/10 shadow-lg space-y-3">
        {/* Sort Buttons */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar flex-wrap">
          {[
            { id: 'cheapest', label: 'الأرخص', icon: 'arrow_downward' },
            { id: 'price-desc', label: 'الأعلى سعراً', icon: 'arrow_upward' },
            { id: 'cashback', label: 'أعلى كاش باك', icon: 'account_balance_wallet' },
            { id: 'wishlist', label: `المفضلة (${wishlistIds.size})`, icon: 'favorite' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveSort(btn.id as typeof activeSort)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl shrink-0 text-xs font-bold transition-all active:scale-95 ${
                activeSort === btn.id
                  ? btn.id === 'wishlist'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-md'
                    : 'bg-[#bdc2ff] text-[#0013a0] shadow-md'
                  : 'bg-[#222a3d] text-[#c5c5d8] hover:bg-[#2d3449]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{btn.icon}</span>
              <span>{btn.label}</span>
            </button>
          ))}

          {/* Price Filter Toggle */}
          <button
            onClick={() => setShowPriceFilter(!showPriceFilter)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl shrink-0 text-xs font-bold transition-all active:scale-95 ${
              showPriceFilter ? 'bg-[#bdc2ff]/20 text-[#bdc2ff] border border-[#bdc2ff]/40' : 'bg-[#222a3d] text-[#c5c5d8] hover:bg-[#2d3449]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>نطاق السعر</span>
          </button>
        </div>

        {/* Price Range Filter (Expandable) */}
        {showPriceFilter && (
          <div className="bg-[#0b1326]/60 rounded-xl p-4 border border-white/5 space-y-3 animate-fade-in">
            <div className="flex justify-between text-xs text-[#c5c5d8] font-bold">
              <span>من: <span className="text-[#7dffa2]">{priceMin.toLocaleString('ar-EG')} ج.م</span></span>
              <span>إلى: <span className="text-[#7dffa2]">{priceMax.toLocaleString('ar-EG')} ج.م</span></span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[#c5c5d8] shrink-0">0</span>
              <input
                type="range"
                min={0}
                max={100000}
                step={500}
                value={priceMin}
                onChange={(e) => setPriceMin(Math.min(Number(e.target.value), priceMax - 500))}
                className="flex-1 accent-[#bdc2ff] h-1"
              />
              <input
                type="range"
                min={0}
                max={100000}
                step={500}
                value={priceMax}
                onChange={(e) => setPriceMax(Math.max(Number(e.target.value), priceMin + 500))}
                className="flex-1 accent-[#7dffa2] h-1"
              />
              <span className="text-[10px] text-[#c5c5d8] shrink-0">100k</span>
            </div>
            <button
              onClick={() => { setPriceMin(0); setPriceMax(100000); }}
              className="text-[11px] text-[#c5c5d8] hover:text-white underline"
            >
              إعادة ضبط النطاق
            </button>
          </div>
        )}

        {/* Store Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-bold text-[11px] text-[#c5c5d8] ml-1">المتجر:</span>
          {[
            { id: 'all', label: 'الكل' },
            { id: 'amazon', label: 'أمازون' },
            { id: 'noon', label: 'نون' },
            { id: 'jumia', label: 'جوميا' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedStoreFilter(s.id)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all active:scale-95 ${
                selectedStoreFilter === s.id
                  ? 'bg-[#7dffa2] text-[#003918]'
                  : 'bg-[#222a3d] text-[#c5c5d8] hover:bg-[#2d3449]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Grid */}
      {sortedAndFilteredDeals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedAndFilteredDeals.map((deal) => {
            const inWishlist = wishlistIds.has(deal.id);
            return (
              <div
                key={deal.id}
                className="bg-[#131b2e] rounded-3xl p-5 border border-[#454656]/20 hover:border-[#bdc2ff]/40 transition-all shadow-xl flex flex-col space-y-4 group cursor-pointer"
                onClick={() => onSelectDeal(deal)}
              >
                {/* Product Image Header */}
                <div className="relative h-44 w-full bg-[#171f33] rounded-2xl p-3 flex items-center justify-center overflow-hidden border border-white/5">
                  <img
                    src={deal.productImage}
                    alt={deal.title}
                    className="h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Store Logo */}
                  <div className="absolute top-2.5 right-2.5 w-10 h-10 bg-white rounded-xl p-1.5 shadow-lg flex items-center justify-center">
                    <img src={deal.storeLogo} alt={deal.store} className="w-full h-full object-contain" />
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => handleToggleWishlist(deal, e)}
                    className={`wishlist-btn absolute top-2.5 left-2.5 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg ${
                      inWishlist
                        ? 'bg-rose-500 text-white'
                        : 'bg-[#222a3d]/80 text-[#c5c5d8] hover:text-rose-400 hover:bg-[#222a3d]'
                    }`}
                    aria-label={inWishlist ? 'إزالة من المفضلة' : 'أضف للمفضلة'}
                  >
                    <span
                      className="material-symbols-outlined text-base"
                      style={inWishlist ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      favorite
                    </span>
                  </button>

                  {/* Best Value / Discount Badge */}
                  {deal.isBestValue ? (
                    <div className="absolute bottom-2.5 left-2.5 bg-[#7dffa2] text-[#00622e] px-2.5 py-1 rounded-xl text-[10px] font-black flex items-center gap-1 shadow-lg">
                      <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      <span>{deal.badgeText || 'أفضل قيمة'}</span>
                    </div>
                  ) : deal.discountPercentage ? (
                    <div className="absolute bottom-2.5 left-2.5 bg-[#ffb4ab]/20 text-[#ffb4ab] border border-[#ffb4ab]/30 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                      خصم {deal.discountPercentage}%
                    </div>
                  ) : null}
                </div>

                {/* Product Titles */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold font-['Cairo'] text-[#dae2fd] text-sm leading-snug flex-1">{deal.title}</h3>
                    <span className="text-[10px] font-bold text-[#bdc2ff] bg-[#222a3d] px-2 py-0.5 rounded-md shrink-0">{deal.store}</span>
                  </div>
                  <p className="text-[#c5c5d8] text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-[#7dffa2]">local_shipping</span>
                    {deal.deliveryText}
                  </p>
                </div>

                {/* Price Row */}
                <div className="flex justify-between items-baseline pt-2 border-t border-white/5">
                  <div>
                    <span className="text-[10px] text-[#c5c5d8] block">السعر الحالي:</span>
                    <span className="text-[#7dffa2] font-['Cairo'] font-black text-xl">
                      <bdi>{deal.price.toLocaleString('ar-EG')} {deal.currency}</bdi>
                    </span>
                  </div>
                  {deal.originalPrice && (
                    <span className="text-[#c5c5d8] text-xs line-through">
                      <bdi>{deal.originalPrice.toLocaleString('ar-EG')} {deal.currency}</bdi>
                    </span>
                  )}
                </div>

                {/* Cashback & Coupon Badges */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#222a3d] p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                    <span className="text-[#c5c5d8] text-[11px] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[#e3b5ff] text-sm">account_balance_wallet</span>
                      كاش باك
                    </span>
                    <span className="text-[#e3b5ff] font-bold text-xs"><bdi>+{deal.cashbackAmount} {deal.currency}</bdi></span>
                  </div>
                  {deal.couponCode ? (
                    <div className="bg-[#222a3d] p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                      <span className="text-[#c5c5d8] text-[11px] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[#7dffa2] text-sm">sell</span>
                        كوبون
                      </span>
                      <span className="text-[#7dffa2] font-bold text-xs font-mono">{deal.couponCode}</span>
                    </div>
                  ) : (
                    <div className="bg-[#222a3d] p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                      <span className="text-[#c5c5d8] text-[11px] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[#ffb4ab] text-sm">percent</span>
                        خصم
                      </span>
                      <span className="text-[#ffb4ab] font-bold text-xs">-{deal.discountPercentage || 15}%</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleAddToCart(deal, e)}
                    className={`flex-1 py-3 rounded-2xl font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 ripple ${
                      isInCart(deal.id)
                        ? 'bg-[#7dffa2]/20 text-[#7dffa2] border border-[#7dffa2]/30'
                        : 'bg-[#222a3d] text-[#bdc2ff] hover:bg-[#2d3449]'
                    }`}
                    aria-label="أضف للسلة"
                  >
                    <span className="material-symbols-outlined text-base" style={isInCart(deal.id) ? { fontVariationSettings: "'FILL' 1" } : {}}>
                      shopping_cart
                    </span>
                    <span>{isInCart(deal.id) ? 'في السلة' : 'أضف للسلة'}</span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onSelectDeal(deal); }}
                    className={`flex-1 py-3 rounded-2xl font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 ripple ${
                      deal.isBestValue
                        ? 'bg-gradient-to-r from-[#2d3fe3] to-[#8700d0] text-white shadow-lg shadow-[#2d3fe3]/20'
                        : 'bg-[#222a3d] text-[#c5c5d8] hover:bg-[#2d3449]'
                    }`}
                    aria-label="عرض التفاصيل"
                  >
                    <span className="material-symbols-outlined text-base">info</span>
                    <span>التفاصيل</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : activeSort === 'wishlist' && wishlistIds.size === 0 ? (
        /* Empty Wishlist State */
        <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
          <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-rose-400">favorite</span>
          </div>
          <h3 className="font-bold font-['Cairo'] text-lg text-[#dae2fd]">قائمة المفضلة فارغة</h3>
          <p className="text-[#c5c5d8] text-sm max-w-xs">اضغط على القلب ❤️ على أي عرض لإضافته لمفضلتك وتجديه هنا في أي وقت</p>
          <button
            onClick={() => setActiveSort('cheapest')}
            className="px-6 py-2.5 bg-[#222a3d] text-[#bdc2ff] rounded-2xl text-sm font-bold hover:bg-[#2d3449] transition-all"
          >
            تصفح العروض
          </button>
        </div>
      ) : (
        <div className="bg-[#131b2e] p-8 rounded-3xl text-center space-y-3 border border-white/5">
          <span className="material-symbols-outlined text-4xl text-[#c5c5d8]">search_off</span>
          <h3 className="font-bold text-base text-[#dae2fd]">لا توجد نتائج تطابق التصفية الحالية</h3>
          <p className="text-xs text-[#c5c5d8]">جرب اختيار متجر آخر أو تغيير نطاق السعر.</p>
        </div>
      )}

      {/* Price Alert Floating Button */}
      <button
        onClick={() => setIsAlertActive(!isAlertActive)}
        title="تنشيط تنبيه انخفاض السعر"
        className={`fixed bottom-24 left-6 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(125,255,162,0.3)] z-40 active:scale-90 transition-all ${
          isAlertActive ? 'bg-[#7dffa2] text-[#003918]' : 'bg-[#222a3d] text-[#7dffa2] border border-[#7dffa2]/30'
        }`}
      >
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          notifications_active
        </span>
      </button>
    </div>
  );
};
