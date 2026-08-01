import React, { useState } from 'react';

interface CouponItem {
  id: string;
  store: string;
  code: string;
  discountText: string;
  expireText: string;
}

interface CouponCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CouponCalculatorModal: React.FC<CouponCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [itemPrice, setItemPrice] = useState<number>(10000);
  const [selectedStoreRate, setSelectedStoreRate] = useState<number>(0.05); // 5% cashback
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const coupons: CouponItem[] = [
    { id: 'c-1', store: 'نون (Noon)', code: 'WAFFLE', discountText: 'خصم 10% إضافي', expireText: 'ينتهي خلال 3 أيام' },
    { id: 'c-2', store: 'أمازون (Amazon)', code: 'AMZ15', discountText: 'خصم 15% على الإلكترونيات', expireText: 'نشط الآن' },
    { id: 'c-3', store: 'جوميا (Jumia)', code: 'JUMIA50', discountText: 'كاش باك 50 ج.م مباشر', expireText: 'ينتهي اليوم' },
    { id: 'c-4', store: 'نايكي (Nike)', code: 'NIKE20', discountText: 'خصم 20% على الملابس الرياضية', expireText: 'حصري لوافرلي' },
  ];

  if (!isOpen) return null;

  const estimatedCashback = Math.round(itemPrice * selectedStoreRate);

  const copyCoupon = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
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
            <span className="material-symbols-outlined text-[#e3b5ff] text-2xl">calculate</span>
            <h2 className="font-['Cairo'] font-bold text-lg text-[#dae2fd]">حاسبة التوفير ودليل الكوبونات</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#222a3d] text-[#dae2fd] hover:text-white flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Interactive Calculator Section */}
          <section className="bg-gradient-to-br from-[#171f33] via-[#222a3d] to-[#131b2e] p-5 rounded-2xl border border-[#bdc2ff]/20 shadow-xl space-y-4">
            <h3 className="font-['Cairo'] font-bold text-base text-[#7dffa2] flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">payments</span>
              احسب الكاش باك المتوقع قبل الشراء
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#c5c5d8] block mb-1.5">أدخل سعر المنتج (بالجنيه):</label>
                <input
                  type="number"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(Number(e.target.value) || 0)}
                  className="w-full bg-[#060e20] border border-[#454656]/30 rounded-xl px-4 py-2.5 text-sm text-[#dae2fd] font-bold focus:border-[#bdc2ff]"
                />
              </div>

              <div>
                <label className="text-xs text-[#c5c5d8] block mb-1.5">اختر المتجر:</label>
                <select
                  onChange={(e) => setSelectedStoreRate(Number(e.target.value))}
                  className="w-full bg-[#060e20] border border-[#454656]/30 rounded-xl px-3 py-2.5 text-xs text-[#dae2fd] font-bold focus:border-[#bdc2ff]"
                >
                  <option value={0.05}>نون (5% كاش باك)</option>
                  <option value={0.03}>أمازون (3% كاش باك)</option>
                  <option value={0.08}>جوميا (8% كاش باك)</option>
                  <option value={0.10}>نايكي (10% كاش باك)</option>
                </select>
              </div>
            </div>

            <div className="bg-[#060e20]/80 p-4 rounded-xl flex justify-between items-center border border-white/5">
              <div>
                <span className="text-xs text-[#c5c5d8]">الكاش باك المتوقع استرداده:</span>
                <p className="text-2xl font-black font-['Cairo'] text-[#7dffa2] mt-0.5">
                  <bdi>+{estimatedCashback.toLocaleString('ar-EG')} ج.م</bdi>
                </p>
              </div>
              <span className="bg-[#7dffa2]/15 text-[#7dffa2] px-3 py-1 rounded-full text-xs font-bold">
                توفير فوري
              </span>
            </div>
          </section>

          {/* Active Promo Codes Hub */}
          <section className="space-y-3">
            <h3 className="font-['Cairo'] font-bold text-base text-[#dae2fd] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#bdc2ff] text-lg">sell</span>
              الكوبونات الحصرية المتاحة الآن
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {coupons.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#222a3d] p-4 rounded-2xl border border-white/5 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs text-[#bdc2ff] font-['Cairo']">{c.store}</span>
                      <span className="text-[10px] text-[#c5c5d8] bg-[#131b2e] px-2 py-0.5 rounded-md">{c.expireText}</span>
                    </div>
                    <p className="text-xs font-bold text-[#dae2fd] mt-1">{c.discountText}</p>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="font-mono text-sm font-bold text-[#7dffa2] bg-[#060e20] px-3 py-1 rounded-lg">
                      {c.code}
                    </span>
                    <button
                      onClick={() => copyCoupon(c.code)}
                      className="px-3 py-1 rounded-lg bg-[#bdc2ff] text-[#0013a0] font-bold text-xs active:scale-90 transition-all"
                    >
                      {copiedCode === c.code ? 'تم النسخ! ✓' : 'نسخ الكود'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Close */}
        <div className="p-4 bg-[#171f33] border-t border-[#454656]/20">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#222a3d] text-[#bdc2ff] hover:bg-[#2d3449] font-bold text-sm transition-all"
          >
            إغلاق دليل الكوبونات
          </button>
        </div>
      </div>
    </div>
  );
};
