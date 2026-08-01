import React, { useState } from 'react';

interface ReferralRewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferralRewardsModal: React.FC<ReferralRewardsModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const referralCode = 'WAFFARLY-AHMED-100';
  const referralLink = 'https://waffarly.app/ref/AHMED-100';

  if (!isOpen) return null;

  const copyReferralLink = () => {
    navigator.clipboard?.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] bg-[#0b1326]/85 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto animate-fade-in text-[#dae2fd] cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#131b2e] border border-[#bdc2ff]/25 rounded-3xl w-full max-w-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col my-auto max-h-[90vh] cursor-default custom-scrollbar"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#171f33] border-b border-[#454656]/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#e3b5ff] text-2xl">card_giftcard</span>
            <h2 className="font-['Cairo'] font-bold text-lg text-[#dae2fd]">برنامج مكافآت إحالة الأصدقاء</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#222a3d] text-[#dae2fd] hover:text-white flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Banner Hero */}
          <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-[#8700d0] via-[#2d3fe3] to-[#171f33] shadow-xl text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto text-white">
              <span className="material-symbols-outlined text-3xl">card_giftcard</span>
            </div>
            <h3 className="font-['Cairo'] font-black text-xl sm:text-2xl text-white">احصل على 100 ج.م كاش باك لكل صديق!</h3>
            <p className="text-xs sm:text-sm text-[#dfe0ff] max-w-md mx-auto leading-relaxed">
              شارك رابط الإحالة الخاص بك مع أصدقائك. عند تسجيلهم وإتمام أول عملية شراء عبر وافرلي، سيصلك 100 ج.م مباشر في محفظتك وسيصلهم 50 ج.م هدايا ترحيبية!
            </p>
          </div>

          {/* Referral Code & Copy Box */}
          <div className="bg-[#222a3d] p-4 rounded-2xl border border-white/5 space-y-3">
            <span className="text-xs text-[#c5c5d8] block">رابط الإحالة الخاص بك:</span>
            <div className="flex items-center gap-2 bg-[#060e20] p-2.5 rounded-xl border border-white/10">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="bg-transparent border-none text-xs font-mono text-[#7dffa2] flex-1 px-2 focus:ring-0"
              />
              <button
                onClick={copyReferralLink}
                className="px-4 py-2 bg-gradient-to-r from-[#2d3fe3] to-[#3647ea] text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition-all shrink-0"
              >
                {copiedLink ? 'تم النسخ! ✓' : 'نسخ الرابط'}
              </button>
            </div>
          </div>

          {/* Referral Stats Bento Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-[#171f33] p-4 rounded-2xl border border-white/5">
              <span className="text-[11px] text-[#c5c5d8]">الأصدقاء المنضمون</span>
              <p className="text-2xl font-black font-['Cairo'] text-[#bdc2ff] mt-1">3 أصدقاء</p>
            </div>
            <div className="bg-[#171f33] p-4 rounded-2xl border border-white/5">
              <span className="text-[11px] text-[#c5c5d8]">أرباح المكافآت</span>
              <p className="text-2xl font-black font-['Cairo'] text-[#7dffa2] mt-1">300 ج.م</p>
            </div>
            <div className="bg-[#171f33] p-4 rounded-2xl border border-white/5">
              <span className="text-[11px] text-[#c5c5d8]">مستوى المكافآت</span>
              <p className="text-2xl font-black font-['Cairo'] text-[#e3b5ff] mt-1">بلاتيني</p>
            </div>
          </div>
        </div>

        {/* Footer Close */}
        <div className="p-4 bg-[#171f33] border-t border-[#454656]/20">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#222a3d] text-[#bdc2ff] hover:bg-[#2d3449] font-bold text-sm transition-all"
          >
            إغلاق نافذة المكافآت
          </button>
        </div>
      </div>
    </div>
  );
};
