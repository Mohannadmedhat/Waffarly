import React from 'react';
import { useWishlist } from '../context/WishlistContext';

interface HeaderProps {
  onOpenOnboarding: () => void;
  onOpenAccount?: () => void;
  onOpenNotifications?: () => void;
  onOpenPriceTracker?: () => void;
  onOpenReferral?: () => void;
  onOpenLuckySpin?: () => void;
  unreadNotifications?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenOnboarding,
  onOpenAccount,
  onOpenNotifications,
  onOpenPriceTracker,
  onOpenReferral,
  onOpenLuckySpin,
  unreadNotifications = true,
}) => {
  const { cartCount, openCart, wishlistItems } = useWishlist();

  return (
    <header className="fixed top-3 left-0 right-0 z-40 px-4 sm:px-6 md:pr-[92px]">
      <div className="max-w-[1360px] mx-auto w-full bg-[#0d1527]/92 backdrop-blur-2xl border border-[#bdc2ff]/15 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex justify-between items-center px-4 sm:px-6 h-[68px] gap-4">
        {/* Profile & User Info */}
        <button
          onClick={onOpenAccount}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
          aria-label="الملف الشخصي"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#222a3d] flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-[#bdc2ff]/60 transition-all shrink-0 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt="أحمد علي"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-[#c5c5d8] text-xs font-body leading-none mb-1">مرحباً،</span>
            <span className="text-[#dae2fd] font-bold font-headline text-sm leading-none group-hover:text-white transition-colors">أحمد علي</span>
          </div>
        </button>

        {/* Brand Title — centered */}
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-[#bdc2ff] font-headline font-black tracking-tight text-xl sm:text-2xl" dir="ltr">
            Waffarly <span className="text-xs font-normal text-[#8899cc] font-body mr-1">وافرلي</span>
          </h1>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Lucky Spin */}
          <button
            onClick={onOpenLuckySpin}
            id="header-luckyspin"
            title="عجلة الحظ اليومية"
            aria-label="عجلة الحظ"
            className="w-10 h-10 rounded-2xl bg-[#8700d0]/20 flex items-center justify-center text-[#e3b5ff] border border-[#e3b5ff]/25 hover:bg-[#8700d0]/40 transition-all active:scale-90 ripple"
          >
            <span className="material-symbols-outlined text-[22px]">casino</span>
          </button>

          {/* Referral Badge */}
          <button
            onClick={onOpenReferral}
            id="header-referral"
            title="ادعُ صديقاً واحصل على 100 ج.م"
            aria-label="برنامج الإحالة"
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#7dffa2]/15 text-[#7dffa2] border border-[#7dffa2]/30 text-xs font-bold hover:bg-[#7dffa2]/25 transition-all active:scale-90 ripple font-headline"
          >
            <span className="material-symbols-outlined text-[18px]">card_giftcard</span>
            <span>اربح 100 ج.م</span>
          </button>

          {/* Price Tracker */}
          <button
            onClick={onOpenPriceTracker}
            id="header-pricetracker"
            title="تتبع الأسعار"
            aria-label="تتبع الأسعار"
            className="w-10 h-10 rounded-2xl bg-[#171f33] flex items-center justify-center text-[#7dffa2] border border-[#7dffa2]/20 hover:bg-[#222a3d] transition-all active:scale-90 ripple"
          >
            <span className="material-symbols-outlined text-[22px]">timeline</span>
          </button>

          {/* Wishlist count */}
          {wishlistItems.length > 0 && (
            <div className="relative">
              <button
                id="header-wishlist"
                title="قائمة المفضلة"
                aria-label="المفضلة"
                className="w-10 h-10 rounded-2xl bg-rose-500/15 flex items-center justify-center text-[#ffb4ab] border border-rose-500/25 hover:bg-rose-500/30 transition-all active:scale-90 ripple"
              >
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
              </button>
              <span className="absolute -top-1 -left-1 w-4.5 h-4.5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center badge-pulse">
                {wishlistItems.length > 9 ? '9+' : wishlistItems.length}
              </span>
            </div>
          )}

          {/* Cart Button */}
          <div className="relative">
            <button
              onClick={openCart}
              id="header-cart"
              title="سلة التسوق"
              aria-label="سلة التسوق"
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all active:scale-90 ripple ${
                cartCount > 0
                  ? 'bg-[#7dffa2]/20 text-[#7dffa2] border border-[#7dffa2]/40 hover:bg-[#7dffa2]/30 shadow-lg shadow-[#7dffa2]/10'
                  : 'bg-[#171f33] text-[#8899cc] border border-white/10 hover:bg-[#222a3d]'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]" style={cartCount > 0 ? { fontVariationSettings: "'FILL' 1" } : {}}>
                shopping_cart
              </span>
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-1 -left-1 w-4.5 h-4.5 rounded-full bg-[#7dffa2] text-[#003918] text-[10px] font-black flex items-center justify-center badge-pulse">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={onOpenNotifications}
              id="header-notifications"
              title="الإشعارات"
              aria-label="مركز الإشعارات"
              className="w-10 h-10 rounded-2xl bg-[#171f33] border border-white/10 flex items-center justify-center text-[#bdc2ff] hover:bg-[#222a3d] transition-all active:scale-90 ripple"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>
            {unreadNotifications && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#7dffa2] animate-pulse" />
            )}
          </div>

          {/* Help / Onboarding */}
          <button
            onClick={onOpenOnboarding}
            id="header-help"
            title="شرح التطبيق"
            aria-label="مساعدة"
            className="hidden sm:flex w-10 h-10 rounded-2xl bg-[#171f33] border border-white/10 items-center justify-center text-[#8899cc] hover:text-[#bdc2ff] hover:bg-[#222a3d] transition-all active:scale-90 ripple"
          >
            <span className="material-symbols-outlined text-[22px]">help_outline</span>
          </button>
        </div>
      </div>
    </header>
  );
};
