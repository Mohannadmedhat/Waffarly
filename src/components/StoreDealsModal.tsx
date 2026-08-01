import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';

interface StoreDeal {
  id: string;
  storeName: string;
  storeLogo: string;
  category: string;
  cashbackRate: string;
  promoCode: string;
  discountDesc: string;
  rating: number;
  validUntil: string;
  bgColor: string;
}

interface StoreDealsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: () => void;
}

const mockStoreDeals: StoreDeal[] = [
  {
    id: 'sd-amazon',
    storeName: 'أمازون مصر (Amazon.eg)',
    storeLogo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=300&auto=format&fit=crop&q=80',
    category: 'إلكترونيات وأجهزة منزلية',
    cashbackRate: 'حتى 12% كاش باك فوري',
    promoCode: 'AMZWAFFAR15',
    discountDesc: 'خصم إضافي 15% على اللابتوبات والسماعات الذكية عند الدفع بالفيزا.',
    rating: 4.9,
    validUntil: 'نهاية الشهر',
    bgColor: 'from-[#ff9900]/20 to-[#131b2e]',
  },
  {
    id: 'sd-noon',
    storeName: 'نون (Noon.com)',
    storeLogo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&auto=format&fit=crop&q=80',
    category: 'أزياء ومستحضرات تجميل',
    cashbackRate: 'حتى 15% كاش باك فوري',
    promoCode: 'NOONWAF20',
    discountDesc: 'كوبون توفير 20% + كاش باك مباشر يودع فورياً في محفظتك.',
    rating: 4.8,
    validUntil: 'خلال 3 أيام',
    bgColor: 'from-[#feee00]/20 to-[#131b2e]',
  },
  {
    id: 'sd-jumia',
    storeName: 'جوميا مصر (Jumia)',
    storeLogo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=300&auto=format&fit=crop&q=80',
    category: 'سوبرماركت ومستلزمات يومية',
    cashbackRate: 'حتى 10% كاش باك فوري',
    promoCode: 'JUMIAW10',
    discountDesc: 'خصومات الأسبوع الكبير على الأغذية والمنظفات المنزلية.',
    rating: 4.6,
    validUntil: 'ينتهي اليوم',
    bgColor: 'from-[#f68b1e]/20 to-[#131b2e]',
  },
  {
    id: 'sd-carrefour',
    storeName: 'كارفور مصر (Carrefour)',
    storeLogo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&auto=format&fit=crop&q=80',
    category: 'سلع غذائية ومفروشات',
    cashbackRate: 'حتى 8% كاش باك فوري',
    promoCode: 'CARREFOUR50',
    discountDesc: 'خصم 50 ج.م على المشتريات الأكثر من 500 ج.م مع كاش باك مضاعف.',
    rating: 4.7,
    validUntil: 'نهاية الأسبوع',
    bgColor: 'from-[#002f6c]/20 to-[#131b2e]',
  },
];

export const StoreDealsModal: React.FC<StoreDealsModalProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const handleCopyCode = (code: string) => {
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
        className="bg-[#131b2e] border border-[#bdc2ff]/25 rounded-3xl w-full max-w-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col my-auto max-h-[90vh] cursor-default custom-scrollbar"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#171f33] border-b border-white/10 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#7dffa2]/20 border border-[#7dffa2]/30 flex items-center justify-center text-[#7dffa2]">
              <span className="material-symbols-outlined text-lg">storefront</span>
            </div>
            <h2 className="font-headline font-bold text-lg text-white">دليل الكاش باك وكوبونات المتاجر الشريكة</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#222a3d] text-[#c5c5d8] hover:text-white flex items-center justify-center transition-all active:scale-90"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {/* Toast Notification */}
          {copiedCode && (
            <div className="bg-[#7dffa2]/20 border border-[#7dffa2]/40 text-[#7dffa2] p-3.5 rounded-2xl text-xs font-bold font-headline flex items-center gap-2 shadow-lg animate-fade-in">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span>تم نسخ كود الكوبون ({copiedCode})! استخدمه عند إتمام الشراء لتفعيل الخصم 🚀</span>
            </div>
          )}

          {/* Store Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockStoreDeals.map((store) => (
              <div
                key={store.id}
                className={`bg-gradient-to-br ${store.bgColor} rounded-3xl p-5 border border-white/10 hover:border-[#bdc2ff]/40 transition-all shadow-xl space-y-4 flex flex-col justify-between group`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={store.storeLogo} alt={store.storeName} className="w-12 h-12 rounded-2xl object-cover border border-white/10 shadow-md shrink-0" />
                      <div>
                        <h3 className="font-headline font-bold text-base text-white group-hover:text-[#7dffa2] transition-colors">{store.storeName}</h3>
                        <p className="text-[11px] text-[#c5c5d8] font-body">{store.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#7dffa2] text-xs font-bold font-headline bg-[#7dffa2]/10 px-2.5 py-1 rounded-xl">
                      <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span>{store.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#c5c5d8] font-body leading-relaxed">{store.discountDesc}</p>

                  <div className="bg-[#0b1326]/70 p-3 rounded-2xl border border-white/5 space-y-1 font-headline">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-[#c5c5d8]">نسبة الاسترداد:</span>
                      <span className="text-xs font-bold text-[#7dffa2]">{store.cashbackRate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-[#c5c5d8]">الصلاحية:</span>
                      <span className="text-xs text-[#e3b5ff]">{store.validUntil}</span>
                    </div>
                  </div>
                </div>

                {/* Promo Code & Action */}
                <div className="flex gap-2 pt-2 border-t border-white/10">
                  <button
                    onClick={() => handleCopyCode(store.promoCode)}
                    className="flex-1 py-2.5 rounded-xl bg-[#0b1326] border border-white/10 hover:bg-[#222a3d] text-[#bdc2ff] hover:text-white font-headline font-bold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 ripple"
                  >
                    <span className="material-symbols-outlined text-base">content_copy</span>
                    <span>{copiedCode === store.promoCode ? 'تم النسخ ✓' : store.promoCode}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onSelectProduct) onSelectProduct();
                      onClose();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2d3fe3] to-[#8700d0] text-white font-headline font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1 ripple"
                  >
                    <span>تسوق الآن ⚡</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#171f33] border-t border-white/10 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-[#0b1326] text-[#c5c5d8] hover:text-white font-headline font-bold text-xs transition-all border border-white/10"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
