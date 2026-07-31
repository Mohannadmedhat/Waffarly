import React, { useState } from 'react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [lang, setLang] = useState<'AR' | 'EN'>('AR');

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-[#0b1326]/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-fade-in text-[#dae2fd] cursor-pointer"
    >
      {/* Centered Desktop-Optimized Card Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#131b2e] border border-[#bdc2ff]/25 rounded-[36px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[520px] cursor-default"
      >
        {/* Background Ambient Glows inside Card */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[60%] bg-[#2d3fe3]/20 rounded-full blur-[90px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[60%] bg-[#8700d0]/20 rounded-full blur-[90px]"></div>
        </div>

        {/* Right Column: Visual Preview (2 Cols on desktop) */}
        <div className="relative z-10 md:w-1/2 bg-[#171f33]/80 p-6 md:p-10 flex flex-col justify-center items-center border-b md:border-b-0 md:border-l border-[#454656]/20">
          {step === 1 && (
            <div className="w-full flex flex-col items-center text-center animate-fade-in">
              <div className="relative w-full aspect-square max-w-[240px] flex items-center justify-center">
                {/* Floating Element 1 */}
                <div className="absolute top-2 right-2 w-16 h-16 glass-card rounded-2xl rotate-12 flex items-center justify-center border border-white/10 shadow-2xl">
                  <span className="material-symbols-outlined text-2xl text-[#7dffa2]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    payments
                  </span>
                </div>
                {/* Floating Element 2 */}
                <div className="absolute bottom-4 left-2 w-14 h-14 glass-card rounded-2xl -rotate-6 flex items-center justify-center border border-white/10 shadow-2xl">
                  <span className="material-symbols-outlined text-xl text-[#e3b5ff]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    qr_code_scanner
                  </span>
                </div>

                {/* Central Main Piggy Card */}
                <div className="w-48 h-48 relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#2d3fe3] to-[#8700d0] rounded-[40px] opacity-30 blur-2xl"></div>
                  <div className="relative w-full h-full glass-card rounded-[40px] flex items-center justify-center overflow-hidden border border-white/10 shadow-2xl">
                    <div className="p-5 bg-[#0b1326]/50 backdrop-blur-md rounded-full border border-[#bdc2ff]/20">
                      <span className="material-symbols-outlined text-5xl text-[#bdc2ff]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        savings
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-xs text-[#7dffa2] font-bold mt-4 bg-[#7dffa2]/10 px-3 py-1 rounded-full border border-[#7dffa2]/20">
                توفير فوري وكاش باك حقيقي
              </span>
            </div>
          )}

          {step === 2 && (
            <div className="w-full flex flex-col items-center animate-fade-in space-y-3">
              {/* Comparison Card Preview */}
              <div className="w-full bg-[#131b2e] rounded-2xl p-4 shadow-xl border border-[#454656]/30 text-right">
                <div className="flex gap-3 items-center mb-3">
                  <div className="w-12 h-12 bg-[#2d3449] rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl text-[#bdc2ff]">headphones</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-[9px] font-bold text-[#e3b5ff] bg-[#8700d0]/20 px-2 py-0.5 rounded-full inline-block">
                      الأكثر بحثاً
                    </span>
                    <h3 className="text-xs font-bold text-[#dae2fd]">سماعة عازلة للضوضاء</h3>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-[#7dffa2]/10 rounded-xl border border-[#7dffa2]/20">
                    <span className="text-xs text-[#c5c5d8]">أمازون</span>
                    <span className="text-xs font-bold text-[#7dffa2]">4,250 ج.م</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#060e20] rounded-xl">
                    <span className="text-xs text-[#c5c5d8]">نون</span>
                    <span className="text-xs font-bold text-[#dae2fd]">4,600 ج.م</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="w-full flex flex-col items-center text-center animate-fade-in space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#8700d0]/20 flex items-center justify-center text-[#e3b5ff] border border-[#e3b5ff]/30 shadow-2xl">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  account_balance_wallet
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 w-full">
                <div className="p-2.5 rounded-xl bg-[#060e20] border border-[#bdc2ff]/10 text-center">
                  <span className="material-symbols-outlined text-[#7dffa2] text-lg mb-1 block">payments</span>
                  <p className="text-[10px] font-bold">كاش باك نقد</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#060e20] border border-[#bdc2ff]/10 text-center">
                  <span className="material-symbols-outlined text-[#e3b5ff] text-lg mb-1 block">confirmation_number</span>
                  <p className="text-[10px] font-bold">قسائم شراء</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#060e20] border border-[#bdc2ff]/10 text-center">
                  <span className="material-symbols-outlined text-[#bdc2ff] text-lg mb-1 block">account_balance</span>
                  <p className="text-[10px] font-bold">تحويل بنكي</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Left Column: Text & Nav Actions (2 Cols on desktop) */}
        <div className="relative z-10 md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
          {/* Top Actions */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setLang(lang === 'AR' ? 'EN' : 'AR')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#222a3d] border border-[#454656]/30 text-[#c5c5d8] hover:text-white text-xs font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-sm">language</span>
              <span>{lang === 'AR' ? 'EN' : 'العربية'}</span>
            </button>

            <button
              onClick={onClose}
              className="text-[#c5c5d8] hover:text-white text-xs font-medium transition-colors bg-[#222a3d]/50 px-3 py-1.5 rounded-full"
            >
              تخطي الشرح ✕
            </button>
          </div>

          {/* Text Content per Step */}
          <div className="my-auto space-y-4">
            {step === 1 && (
              <div className="space-y-3 animate-fade-in">
                <h1 className="font-['Cairo'] font-black text-2xl sm:text-3xl text-[#dae2fd] leading-tight">
                  وفّر فلوسك في كل <br />
                  <span className="text-[#7dffa2]">عملية شراء</span>
                </h1>
                <p className="text-[#c5c5d8] text-sm leading-relaxed">
                  استمتع بتجربة تسوق ذكية مع عروض حصرية وتنبيهات فورية لأفضل الأسعار في مصر والخليج.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3 animate-fade-in">
                <h1 className="font-['Cairo'] font-black text-2xl sm:text-3xl text-[#bdc2ff] leading-tight">
                  قارن الأسعار <br />
                  في ثوانٍ معدودة
                </h1>
                <p className="text-[#c5c5d8] text-sm leading-relaxed">
                  وفّر وقتك ومجهودك. تطبيق وافرلي يقارن لك أسعار المنتجات بين أكبر المتاجر (أمازون، نون، جوميا).
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3 animate-fade-in">
                <h1 className="font-['Cairo'] font-black text-2xl sm:text-3xl text-[#dae2fd] leading-tight">
                  احصل على الكاش باك <br />
                  في محفظتك فوراً
                </h1>
                <p className="text-[#c5c5d8] text-sm leading-relaxed">
                  اربح كاش باك حقيقي عند التسوق واسحبه مباشر لحسابك البنكي أو كقسائم شراء متاجر.
                </p>
              </div>
            )}
          </div>

          {/* Bottom Footer Controls */}
          <div className="pt-6 border-t border-[#454656]/20 flex flex-col gap-4">
            {/* Step Indicators */}
            <div className="flex gap-2">
              <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-[#bdc2ff]' : 'w-2 bg-[#bdc2ff]/20'}`}></div>
              <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-[#bdc2ff]' : 'w-2 bg-[#bdc2ff]/20'}`}></div>
              <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 3 ? 'w-8 bg-[#bdc2ff]' : 'w-2 bg-[#bdc2ff]/20'}`}></div>
            </div>

            {/* Next / Prev Buttons */}
            <div className="flex items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-[#c5c5d8] font-bold text-xs hover:text-white px-3 py-2 rounded-xl bg-[#222a3d] transition-all"
                >
                  السابق
                </button>
              ) : (
                <div className="w-12"></div>
              )}

              <button
                onClick={() => {
                  if (step < 3) {
                    setStep(step + 1);
                  } else {
                    onClose();
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#2d3fe3] to-[#3647ea] px-6 py-3 rounded-2xl font-bold text-white text-sm shadow-lg shadow-[#2d3fe3]/30 active:scale-95 transition-all"
              >
                <span>{step === 3 ? 'ابدأ الاستخدام الآن' : 'التالي'}</span>
                <span className="material-symbols-outlined text-base">arrow_back</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
