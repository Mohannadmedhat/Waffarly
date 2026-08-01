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
    <header className="fixed top-3 left-0 right-0 z-40 px-4 sm:px-6 md:pr-[88px]" style={{ maxWidth: '100%' }}>
      <div className="max-w-5xl mx-auto w-full bg-[#0d1527]/92 backdrop-blur-2xl border border-[#bdc2ff]/12 rounded-2xl shadow-xl flex justify-between items-center px-4 sm:px-5 h-15 gap-3"
        style={{ height: '60px' }}
      >
        {/* Profile & User Info */}
        <button
          onClick={onOpenAccount}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          aria-label="الملف الشخصي"
        >
          <div className="w-9 h-9 rounded-full bg-[#222a3d] flex items-center justify-center overflow-hidden border border-[#454656]/30 group-hover:border-[#bdc2ff]/50 transition-all shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNKKxZNunlo4Xl5JGY-2APcUccKP3Dtb2BPgZ0EqQvgA91Yjz-h_sHrLp3-vOEQB7WpX-YgGRDGsR7AB7hfgfR4LYdvD95Hvcv64alI7FYk_zNxU9P0JiVEckeMxSsS-lXnjLZqBVqfysYRqCIh-lF5s9Tj2hNXCQV5WpN_VchWKTWvrkzGSMtmDLoAd76Kf21uJmaLhM7mvjEuObbVo5s3iKSVBGl7dKparX1-CLYBavCwS0wOHYWu40sLQjmjGV3eghdTZ4y3oz4"
              alt="أحمد علي"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-[#c5c5d8] text-[10px] font-body">أهلاً بك،</span>
            <span className="text-[#dae2fd] font-bold font-headline text-[13px] leading-none">أحمد علي</span>
          </div>
        </button>

        {/* Brand Title — centered */}
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-[#bdc2ff] font-headline font-black tracking-tight text-lg sm:text-xl" dir="ltr">
            Waffarly <span className="text-xs font-normal text-[#8899cc]">وافرلي</span>
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Lucky Spin */}
          <button
            onClick={onOpenLuckySpin}
            id="header-luckyspin"
            title="عجلة الحظ اليومية"
            aria-label="عجلة الحظ"
            className="w-9 h-9 rounded-xl bg-[#8700d0]/20 flex items-center justify-center text-[#e3b5ff] border border-[#e3b5ff]/20 hover:bg-[#8700d0]/40 transition-all active:scale-90 ripple"
          >
            <span className="material-symbols-outlined text-[20px]">casino</span>
          </button>

          {/* Referral — hidden on small screens */}
          <button
            onClick={onOpenReferral}
            id="header-referral"
            title="ادعُ صديقاً واحصل على 100 ج.م"
            aria-label="برنامج الإحالة"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#7dffa2]/15 text-[#7dffa2] border border-[#7dffa2]/25 text-[11px] font-bold hover:bg-[#7dffa2]/30 transition-all active:scale-90 ripple"
          >
            <span className="material-symbols-outlined text-[16px]">card_giftcard</span>
            <span>100 ج.م</span>
          </button>

          {/* Price Tracker */}
          <button
            onClick={onOpenPriceTracker}
            id="header-pricetracker"
            title="تتبع الأسعار"
            aria-label="تتبع الأسعار"
            className="w-9 h-9 rounded-xl bg-[#171f33] flex items-center justify-center text-[#7dffa2] hover:bg-[#222a3d] transition-all active:scale-90 ripple"
          >
            <span className="material-symbols-outlined text-[20px]">timeline</span>
          </button>

          {/* Wishlist count — shown only if items exist */}
          {wishlistItems.length > 0 && (
            <div className="relative">
              <button
                id="header-wishlist"
                title="قائمة المفضلة"
                aria-label="المفضلة"
                className="w-9 h-9 rounded-xl bg-rose-500/15 flex items-center justify-center text-[#ffb4ab] hover:bg-rose-500/30 transition-all active:scale-90 ripple"
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
              </button>
              <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center badge-pulse">
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
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90 ripple ${
                cartCount > 0
                  ? 'bg-[#7dffa2]/20 text-[#7dffa2] border border-[#7dffa2]/30 hover:bg-[#7dffa2]/35'
                  : 'bg-[#171f33] text-[#8899cc] hover:bg-[#222a3d]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]" style={cartCount > 0 ? { fontVariationSettings: "'FILL' 1" } : {}}>
                shopping_cart
              </span>
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-[#7dffa2] text-[#003918] text-[9px] font-black flex items-center justify-center badge-pulse">
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
              className="w-9 h-9 rounded-xl bg-[#171f33] flex items-center justify-center text-[#bdc2ff] hover:bg-[#222a3d] transition-all active:scale-90 ripple"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            {unreadNotifications && (
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#7dffa2] animate-pulse" />
            )}
          </div>

          {/* Help / Onboarding */}
          <button
            onClick={onOpenOnboarding}
            id="header-help"
            title="شرح التطبيق"
            aria-label="مساعدة"
            className="hidden sm:flex w-9 h-9 rounded-xl bg-[#171f33] items-center justify-center text-[#8899cc] hover:text-[#bdc2ff] hover:bg-[#222a3d] transition-all active:scale-90 ripple"
          >
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
          </button>
        </div>
      </div>
    </header>
  );
};
