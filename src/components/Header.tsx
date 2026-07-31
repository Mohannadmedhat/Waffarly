import React from 'react';

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
  return (
    <header className="fixed top-3 left-0 right-0 z-40 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="w-full bg-[#131b2e]/90 backdrop-blur-2xl border border-[#bdc2ff]/15 rounded-2xl shadow-xl flex justify-between items-center px-5 h-16">
        {/* Profile & User Info */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onOpenAccount}>
          <div className="w-10 h-10 rounded-full bg-[#222a3d] flex items-center justify-center overflow-hidden border border-[#454656]/30 group-hover:border-[#bdc2ff] transition-all">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNKKxZNunlo4Xl5JGY-2APcUccKP3Dtb2BPgZ0EqQvgA91Yjz-h_sHrLp3-vOEQB7WpX-YgGRDGsR7AB7hfgfR4LYdvD95Hvcv64alI7FYk_zNxU9P0JiVEckeMxSsS-lXnjLZqBVqfysYRqCIh-lF5s9Tj2hNXCQV5WpN_VchWKTWvrkzGSMtmDLoAd76Kf21uJmaLhM7mvjEuObbVo5s3iKSVBGl7dKparX1-CLYBavCwS0wOHYWu40sLQjmjGV3eghdTZ4y3oz4"
              alt="أحمد علي"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[#c5c5d8] text-xs font-['IBM_Plex_Arabic']">أهلاً بك،</span>
            <span className="text-[#dae2fd] font-bold font-['Cairo'] text-sm">أحمد علي</span>
          </div>
        </div>

        {/* Brand Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-[#bdc2ff] font-['Cairo'] font-black tracking-tight text-xl sm:text-2xl dir-ltr bidi-ltr">
            Waffarly <span className="text-xs font-normal text-[#c5c5d8]">وافرلي</span>
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Lucky Spin Wheel Button */}
          <button
            onClick={onOpenLuckySpin}
            title="عجلة الحظ اليومية 🎡"
            className="w-10 h-10 rounded-xl bg-[#8700d0]/20 flex items-center justify-center text-[#e3b5ff] border border-[#e3b5ff]/20 hover:bg-[#8700d0]/40 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">casino</span>
          </button>

          {/* Referral Button */}
          <button
            onClick={onOpenReferral}
            title="ادعُ صديقاً واحصل على 100 ج.م"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#7dffa2]/15 text-[#7dffa2] border border-[#7dffa2]/30 text-xs font-bold hover:bg-[#7dffa2]/30 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-base">card_giftcard</span>
            <span>100 ج.م هدية</span>
          </button>

          {/* Price Tracker Button */}
          <button
            onClick={onOpenPriceTracker}
            title="تتبع الأسعار وقائمة المفضلة"
            className="w-10 h-10 rounded-xl bg-[#171f33] flex items-center justify-center text-[#7dffa2] hover:bg-[#222a3d] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">timeline</span>
          </button>

          {/* Onboarding info button */}
          <button
            onClick={onOpenOnboarding}
            title="شرح التطبيق"
            className="w-10 h-10 rounded-xl bg-[#171f33] flex items-center justify-center text-[#bdc2ff] hover:bg-[#222a3d] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">help_outline</span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            title="مركز الإشعارات والتنبيهات"
            className="w-10 h-10 rounded-xl bg-[#171f33] flex items-center justify-center text-[#bdc2ff] hover:bg-[#222a3d] transition-all active:scale-95 relative"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {unreadNotifications && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#7dffa2] animate-pulse"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
