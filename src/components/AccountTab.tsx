import React, { useState } from 'react';

interface AccountTabProps {
  onOpenOnboarding: () => void;
  onOpenWithdraw: () => void;
  onOpenNotifications?: () => void;
  onOpenPriceTracker?: () => void;
  onOpenCouponCalc?: () => void;
  onOpenReferral?: () => void;
  onOpenSupport?: () => void;
  onOpenGiftCards?: () => void;
}

export const AccountTab: React.FC<AccountTabProps> = ({
  onOpenOnboarding,
  onOpenWithdraw,
  onOpenNotifications,
  onOpenPriceTracker,
  onOpenCouponCalc,
  onOpenReferral,
  onOpenSupport,
  onOpenGiftCards,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyReferral = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText('WAFFAR2026');
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const menuSections = [
    {
      title: 'الخدمات المالية والتوفير',
      items: [
        {
          id: 'withdraw',
          title: 'سحب رصيد الكاش باك',
          subtitle: 'حسّابك المالي وتحويل الأرباح لحسابك البنكي أو المحفظة',
          icon: 'account_balance_wallet',
          iconBg: 'bg-[#7dffa2]/15 text-[#7dffa2]',
          badge: '1,250 ج.م',
          badgeStyle: 'bg-[#7dffa2]/20 text-[#7dffa2]',
          action: onOpenWithdraw,
        },
        {
          id: 'coupons',
          title: 'مركز الكوبونات وحاسبة التوفير',
          subtitle: 'حسّاب الخصم وتفعيل الأكواد المباشرة',
          icon: 'confirmation_number',
          iconBg: 'bg-[#e3b5ff]/15 text-[#e3b5ff]',
          badge: '8 نشطة',
          badgeStyle: 'bg-[#e3b5ff]/20 text-[#e3b5ff]',
          action: onOpenCouponCalc,
        },
        {
          id: 'giftcards',
          title: 'بطاقات الهدايا وقسائم المتاجر',
          subtitle: 'شراء واستبدال بطاقات نون وأمازون وجوميا',
          icon: 'card_giftcard',
          iconBg: 'bg-[#bdc2ff]/15 text-[#bdc2ff]',
          action: onOpenGiftCards,
        },
      ],
    },
    {
      title: 'الأدوات والتتبع الذكي',
      items: [
        {
          id: 'tracker',
          title: 'تتبع الأسعار وقائمة المفضلة',
          subtitle: 'مراقبة هبوط الأسعار والمنتجات المحفوظة',
          icon: 'timeline',
          iconBg: 'bg-[#7dffa2]/15 text-[#7dffa2]',
          badge: '12 منتج',
          badgeStyle: 'bg-[#222a3d] text-[#c5c5d8]',
          action: onOpenPriceTracker,
        },
        {
          id: 'notifications',
          title: 'مركز الإشعارات والتنبيهات الحية',
          subtitle: 'تنبيهات فورية عند وصول العروض لخصمك المحدد',
          icon: 'notifications',
          iconBg: 'bg-[#bdc2ff]/15 text-[#bdc2ff]',
          badge: '3 جديدة',
          badgeStyle: 'bg-[#ffb4ab]/20 text-[#ffb4ab]',
          action: onOpenNotifications,
        },
      ],
    },
    {
      title: 'المكافآت والدعم الفني',
      items: [
        {
          id: 'referral',
          title: 'دعوة الأصدقاء ومكافآت 100 ج.م',
          subtitle: 'اربح 100 ج.م عن كل صديق يسجل باستخدام كودك',
          icon: 'group_add',
          iconBg: 'bg-[#e3b5ff]/15 text-[#e3b5ff]',
          badge: '+100 ج.م',
          badgeStyle: 'bg-gradient-to-r from-[#8700d0] to-[#2d3fe3] text-white',
          action: onOpenReferral,
        },
        {
          id: 'support',
          title: 'الدعم الفني وتتبع الشكاوى',
          subtitle: 'خدمة العملاء على مدار 24 ساعة ومتابعة الطلبات',
          icon: 'support_agent',
          iconBg: 'bg-[#7dffa2]/15 text-[#7dffa2]',
          action: onOpenSupport,
        },
        {
          id: 'guide',
          title: 'دليل استخدام وافرلي والأسئلة الشائعة',
          subtitle: 'تعلم كيف تعظم توفيرك وتستخدم الخصومات الذكية',
          icon: 'help_outline',
          iconBg: 'bg-[#bdc2ff]/15 text-[#bdc2ff]',
          action: onOpenOnboarding,
        },
      ],
    },
  ];

  return (
    <div className="pt-24 pb-32 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 animate-fade-in text-[#dae2fd]">
      
      {/* ═══ PROFILE HERO CARD ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#171f33] via-[#1e263a] to-[#131b2e] rounded-[36px] p-6 sm:p-8 border border-[#bdc2ff]/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Decorative Ambient Lighting */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#8700d0]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#2d3fe3]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* User Info Header */}
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-right">
            {/* Avatar with Glow Ring */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#2d3fe3] via-[#8700d0] to-[#7dffa2] p-1 shadow-xl shadow-[#8700d0]/25 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNKKxZNunlo4Xl5JGY-2APcUccKP3Dtb2BPgZ0EqQvgA91Yjz-h_sHrLp3-vOEQB7WpX-YgGRDGsR7AB7hfgfR4LYdvD95Hvcv64alI7FYk_zNxU9P0JiVEckeMxSsS-lXnjLZqBVqfysYRqCIh-lF5s9Tj2hNXCQV5WpN_VchWKTWvrkzGSMtmDLoAd76Kf21uJmaLhM7mvjEuObbVo5s3iKSVBGl7dKparX1-CLYBavCwS0wOHYWu40sLQjmjGV3eghdTZ4y3oz4"
                  alt="أحمد علي"
                  className="w-full h-full object-cover rounded-[22px]"
                />
              </div>
              <span className="absolute -bottom-2 -left-2 bg-[#7dffa2] text-[#003918] text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-[#131b2e] shadow-md">
                نشط الآن
              </span>
            </div>

            {/* Profile Details */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="font-['Cairo'] font-black text-2xl text-[#dae2fd]">أحمد علي</h1>
                <span className="bg-[#8700d0]/25 text-[#e3b5ff] border border-[#e3b5ff]/30 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                  عضو بلاتيني
                </span>
              </div>
              <p className="text-[#c5c5d8] text-xs dir-ltr text-center sm:text-right font-mono">ahmed.ali@example.com</p>

              {/* Referral Code Quick Copy Pill */}
              <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[11px] text-[#c5c5d8]">كود الدعوة الخاص بك:</span>
                <button
                  onClick={handleCopyReferral}
                  className="px-2.5 py-1 rounded-xl bg-[#060e20] border border-[#bdc2ff]/20 text-xs font-mono font-bold text-[#7dffa2] hover:bg-[#222a3d] transition-all flex items-center gap-1 active:scale-95"
                >
                  <span>WAFFAR2026</span>
                  <span className="material-symbols-outlined text-xs">{copiedCode ? 'check' : 'content_copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Reward Action Button */}
          <button
            onClick={() => onOpenReferral && onOpenReferral()}
            className="w-full md:w-auto px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#8700d0] via-[#3647ea] to-[#2d3fe3] text-white font-['Cairo'] font-bold text-xs shadow-xl shadow-[#8700d0]/30 hover:opacity-95 transition-all active:scale-95 flex items-center justify-center gap-2.5 shrink-0 border border-white/10"
          >
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>card_giftcard</span>
            <span>شارك الكود واربح 100 ج.م</span>
          </button>
        </div>

        {/* ═══ STATS BENTO ROW ═══ */}
        <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="bg-[#0b1326]/60 backdrop-blur-md border border-white/5 rounded-2xl p-3.5 text-center">
            <p className="text-[11px] text-[#c5c5d8] mb-1">إجمالي التوفير</p>
            <p className="font-['Cairo'] font-black text-xl text-[#7dffa2]"><bdi>500 ج.م</bdi></p>
            <span className="text-[9px] text-[#7dffa2]/80 font-bold block mt-0.5">وفرت 18% هذا الشهر</span>
          </div>

          <div className="bg-[#0b1326]/60 backdrop-blur-md border border-white/5 rounded-2xl p-3.5 text-center">
            <p className="text-[11px] text-[#c5c5d8] mb-1">رصيد الكاش باك</p>
            <p className="font-['Cairo'] font-black text-xl text-[#e3b5ff]"><bdi>1,250 ج.م</bdi></p>
            <span className="text-[9px] text-[#e3b5ff]/80 font-bold block mt-0.5">جاهز للسحب المباشر</span>
          </div>

          <div className="bg-[#0b1326]/60 backdrop-blur-md border border-white/5 rounded-2xl p-3.5 text-center">
            <p className="text-[11px] text-[#c5c5d8] mb-1">الكوبونات المحفوظة</p>
            <p className="font-['Cairo'] font-black text-xl text-[#bdc2ff]">8 كوبونات</p>
            <span className="text-[9px] text-[#bdc2ff]/80 font-bold block mt-0.5">صالة العروض النشطة</span>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIZED MENU SECTIONS ═══ */}
      {menuSections.map((section, idx) => (
        <section key={idx} className="space-y-3">
          <h3 className="font-['Cairo'] font-bold text-sm text-[#bdc2ff] px-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8700d0]" />
            {section.title}
          </h3>

          <div className="grid grid-cols-1 gap-2.5">
            {section.items.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full p-4 rounded-2xl bg-[#131b2e] border border-[#454656]/20 hover:border-[#bdc2ff]/40 hover:bg-[#171f33] transition-all flex items-center justify-between group text-right shadow-md active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${item.iconBg}`}>
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-['Cairo'] font-bold text-sm text-[#dae2fd] group-hover:text-white transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[#c5c5d8] text-xs mt-0.5">{item.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {item.badge && (
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-xl shadow-sm ${item.badgeStyle}`}>
                      {item.badge}
                    </span>
                  )}
                  <span className="material-symbols-outlined text-base text-[#c5c5d8] group-hover:text-white group-hover:-translate-x-1 transition-all">
                    arrow_back_ios
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      ))}

      {/* ═══ LOGOUT BUTTON ═══ */}
      <section className="pt-2">
        <button
          onClick={() => alert('تم تسجيل الخروج بنجاح')}
          className="w-full py-4 rounded-2xl bg-[#ffb4ab]/10 border border-[#ffb4ab]/20 text-[#ffb4ab] font-['Cairo'] font-bold text-sm hover:bg-[#ffb4ab]/20 transition-all flex items-center justify-center gap-2 active:scale-98 shadow-lg"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          <span>تسجيل الخروج</span>
        </button>
      </section>

    </div>
  );
};
