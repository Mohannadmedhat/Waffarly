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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a2238] via-[#151c2e] to-[#111726] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#3647ea]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8700d0]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Main User Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-right">
            {/* Clean Avatar */}
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
                alt="أحمد علي"
                className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl object-cover border-2 border-white/15 shadow-md"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#7dffa2] border-2 border-[#151c2e] rounded-full shadow-sm" title="نشط الآن" />
            </div>

            {/* Profile Info */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h1 className="font-['Cairo'] font-bold text-2xl text-white tracking-wide">أحمد علي</h1>
                <span className="bg-[#8700d0]/20 text-[#e3b5ff] border border-[#e3b5ff]/20 text-xs font-semibold px-3 py-0.5 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                  عضو بلاتيني
                </span>
              </div>

              <p className="text-[#a1b0cb] text-xs font-medium dir-ltr text-center sm:text-right">ahmed.ali@example.com</p>

              {/* Referral Code Box */}
              <div className="pt-1 flex items-center justify-center sm:justify-start gap-2 text-xs">
                <span className="text-[#8c9bb4]">كود الدعوة:</span>
                <button
                  onClick={handleCopyReferral}
                  className="px-3 py-1 rounded-lg bg-[#0b1220] border border-white/10 text-xs font-mono font-bold text-[#7dffa2] hover:bg-[#131d33] transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <span>WAFFAR2026</span>
                  <span className="material-symbols-outlined text-xs text-[#8c9bb4]">{copiedCode ? 'check' : 'content_copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Action */}
          <button
            onClick={() => onOpenReferral && onOpenReferral()}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#3647ea] to-[#8700d0] text-white font-['Cairo'] font-bold text-xs shadow-lg hover:shadow-indigo-500/20 hover:opacity-95 transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0 border border-white/10"
          >
            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>card_giftcard</span>
            <span>شارك الكود واربح 100 ج.م</span>
          </button>
        </div>

        {/* ═══ STATS BENTO ROW ═══ */}
        <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="bg-[#0b1220]/70 backdrop-blur-md border border-white/5 rounded-xl p-3.5 text-center">
            <p className="text-[11px] text-[#8c9bb4] mb-1 font-medium">إجمالي التوفير</p>
            <p className="font-['Cairo'] font-bold text-lg sm:text-xl text-[#7dffa2]"><bdi>500 ج.م</bdi></p>
            <span className="text-[10px] text-[#7dffa2]/80 font-medium block mt-0.5">وفرت 18% هذا الشهر</span>
          </div>

          <div className="bg-[#0b1220]/70 backdrop-blur-md border border-white/5 rounded-xl p-3.5 text-center">
            <p className="text-[11px] text-[#8c9bb4] mb-1 font-medium">رصيد الكاش باك</p>
            <p className="font-['Cairo'] font-bold text-lg sm:text-xl text-[#e3b5ff]"><bdi>1,250 ج.م</bdi></p>
            <span className="text-[10px] text-[#e3b5ff]/80 font-medium block mt-0.5">جاهز للسحب</span>
          </div>

          <div className="bg-[#0b1220]/70 backdrop-blur-md border border-white/5 rounded-xl p-3.5 text-center">
            <p className="text-[11px] text-[#8c9bb4] mb-1 font-medium">الكوبونات المحفوظة</p>
            <p className="font-['Cairo'] font-bold text-lg sm:text-xl text-[#bdc2ff]">8 كوبونات</p>
            <span className="text-[10px] text-[#bdc2ff]/80 font-medium block mt-0.5">عروض نشطة</span>
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
