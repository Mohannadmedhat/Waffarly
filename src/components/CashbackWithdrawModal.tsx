import React, { useState } from 'react';

interface CashbackWithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CashbackWithdrawModal: React.FC<CashbackWithdrawModalProps> = ({
  isOpen,
  onClose
}) => {
  const [method, setMethod] = useState<'instapay' | 'vodafone' | 'bank' | 'voucher'>('instapay');
  const [amount, setAmount] = useState<string>('540.50');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] bg-[#0b1326]/85 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto animate-fade-in text-[#dae2fd] cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#131b2e] border border-[#bdc2ff]/25 rounded-[36px] p-6 max-w-md w-full shadow-2xl relative space-y-6 cursor-default my-auto max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-['Cairo'] font-bold text-xl text-[#dae2fd]">سحب رصيد الكاش باك</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#171f33] text-[#c5c5d8] hover:text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {isSuccess ? (
          <div className="relative py-10 text-center space-y-5 overflow-hidden animate-fade-in">
            {/* Mini Confetti */}
            {Array.from({ length: 18 }, (_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 30}%`,
                  background: ['#7dffa2', '#bdc2ff', '#e3b5ff', '#ffd700', '#ffb4ab'][i % 5],
                  animationDelay: `${Math.random() * 0.4}s`,
                  animationDuration: `${0.6 + Math.random() * 0.5}s`,
                  width: `${6 + Math.random() * 6}px`,
                  height: `${6 + Math.random() * 6}px`,
                  borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                }}
              />
            ))}
            {/* Animated check */}
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-[#7dffa2]/20 rounded-full animate-pulse" />
              <div className="w-full h-full bg-[#7dffa2]/15 rounded-full border border-[#7dffa2]/40 flex items-center justify-center shadow-xl animate-pop-in">
                <span className="material-symbols-outlined text-6xl text-[#7dffa2]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-headline font-bold text-2xl text-[#dae2fd]">تم طلب السحب بنجاح! 🎉</h3>
              <p className="text-3xl font-headline font-black text-[#7dffa2]">{amount} ج.م</p>
              <p className="text-xs text-[#c5c5d8] max-w-xs mx-auto font-body leading-relaxed">
                سيتم تحويل المبلغ إلى حسابك عبر وسيلة السحب المختارة خلال دقائق معدودة ✨
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleWithdraw} className="space-y-5">
            {/* Amount Selection */}
            <div>
              <label className="text-xs text-[#c5c5d8] block mb-2 font-medium">المبلغ المراد سحبه (المتاح: ٥٤٠.٥٠ ج.م)</label>
              <div className="relative">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#060e20] border border-[#454656]/30 rounded-2xl py-3.5 px-4 font-['Cairo'] font-bold text-xl text-[#7dffa2] text-center"
                />
                <span className="absolute left-4 top-4 text-xs text-[#c5c5d8] font-bold">ج.م</span>
              </div>
            </div>

            {/* Methods */}
            <div>
              <label className="text-xs text-[#c5c5d8] block mb-2 font-medium">اختر طريقة السحب</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMethod('instapay')}
                  className={`p-3 rounded-2xl border text-right transition-all flex items-center gap-2.5 ${
                    method === 'instapay'
                      ? 'bg-[#8700d0]/20 border-[#e3b5ff] text-[#e3b5ff]'
                      : 'bg-[#171f33] border-[#454656]/20 text-[#c5c5d8]'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">bolt</span>
                  <span className="text-xs font-bold">انستا باي (InstaPay)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('vodafone')}
                  className={`p-3 rounded-2xl border text-right transition-all flex items-center gap-2.5 ${
                    method === 'vodafone'
                      ? 'bg-[#8700d0]/20 border-[#e3b5ff] text-[#e3b5ff]'
                      : 'bg-[#171f33] border-[#454656]/20 text-[#c5c5d8]'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">smartphone</span>
                  <span className="text-xs font-bold">محفظة إلكترونية</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('bank')}
                  className={`p-3 rounded-2xl border text-right transition-all flex items-center gap-2.5 ${
                    method === 'bank'
                      ? 'bg-[#8700d0]/20 border-[#e3b5ff] text-[#e3b5ff]'
                      : 'bg-[#171f33] border-[#454656]/20 text-[#c5c5d8]'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">account_balance</span>
                  <span className="text-xs font-bold">حساب بنكي (IBAN)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('voucher')}
                  className={`p-3 rounded-2xl border text-right transition-all flex items-center gap-2.5 ${
                    method === 'voucher'
                      ? 'bg-[#8700d0]/20 border-[#e3b5ff] text-[#e3b5ff]'
                      : 'bg-[#171f33] border-[#454656]/20 text-[#c5c5d8]'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">confirmation_number</span>
                  <span className="text-xs font-bold">قسيمة شراء</span>
                </button>
              </div>
            </div>

            {/* Account input */}
            <div>
              <label className="text-xs text-[#c5c5d8] block mb-1 font-medium">
                {method === 'instapay'
                  ? 'معرف انستا باي (IPA) أو رقم الموبايل'
                  : method === 'vodafone'
                  ? 'رقم المحفظة الإلكترونية'
                  : method === 'bank'
                  ? 'رقم الحساب البنكي / IBAN'
                  : 'البريد الإلكتروني لاستلام القسيمة'}
              </label>
              <input
                type="text"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder={method === 'instapay' ? 'name@instapay' : '010XXXXXXXX'}
                className="w-full bg-[#060e20] border border-[#454656]/30 rounded-2xl py-3 px-4 text-sm text-[#dae2fd] placeholder-[#c5c5d8]/40"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#2d3fe3] to-[#3647ea] text-white font-bold font-['Cairo'] text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">send</span>
              <span>تأكيد طلب السحب الفوري</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
