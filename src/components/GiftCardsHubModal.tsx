import React, { useState } from 'react';

interface GiftCard {
  id: string;
  brand: string;
  logo: string;
  cashbackRate: string;
  denominations: number[];
  category: string;
  bgColor: string;
  icon: string;
}

interface GiftCardsHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GiftCardsHubModal: React.FC<GiftCardsHubModalProps> = ({ isOpen, onClose }) => {
  const [selectedCard, setSelectedCard] = useState<GiftCard | null>(null);
  const [selectedDenom, setSelectedDenom] = useState<number>(250);
  const [purchasedToast, setPurchasedToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const giftCards: GiftCard[] = [
    {
      id: 'gc-amz',
      brand: 'بطاقة هدايا أمازون مصر (Amazon)',
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=300&auto=format&fit=crop&q=80',
      cashbackRate: '5% كاش باك فوري',
      denominations: [100, 250, 500, 1000],
      category: 'تسوق عام',
      bgColor: 'from-[#ff9900]/20 to-[#131b2e]',
      icon: 'shopping_bag',
    },
    {
      id: 'gc-noon',
      brand: 'بطاقة هدايا نون (Noon)',
      logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&auto=format&fit=crop&q=80',
      cashbackRate: '7% كاش باك فوري',
      denominations: [150, 300, 500, 1500],
      category: 'إلكترونيات وأزياء',
      bgColor: 'from-[#feee00]/20 to-[#131b2e]',
      icon: 'devices',
    },
    {
      id: 'gc-ps',
      brand: 'بطاقة بلايستيشن (PlayStation Store)',
      logo: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&auto=format&fit=crop&q=80',
      cashbackRate: '10% كاش باك فوري',
      denominations: [200, 500, 1000],
      category: 'ألعاب وترفيه',
      bgColor: 'from-[#00439c]/20 to-[#131b2e]',
      icon: 'sports_esports',
    },
    {
      id: 'gc-carrefour',
      brand: 'بطاقة كارفور مصر (Carrefour)',
      logo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=300&auto=format&fit=crop&q=80',
      cashbackRate: '4% كاش باك فوري',
      denominations: [250, 500, 1000, 2000],
      category: 'سوبرماركت ومشتريات',
      bgColor: 'from-[#002f6c]/20 to-[#131b2e]',
      icon: 'shopping_cart',
    },
  ];

  const handlePurchase = (card: GiftCard) => {
    const cb = Math.round(selectedDenom * 0.07);
    setPurchasedToast(`تم شراء ${card.brand} بقيمة ${selectedDenom} ج.م بنجاح! وتم إيداع ${cb} ج.م كاش باك فوري 🎉`);
    setTimeout(() => {
      setPurchasedToast(null);
      onClose();
    }, 2000);
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
        <div className="px-6 py-4 bg-[#171f33] border-b border-white/10 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#7dffa2]/20 border border-[#7dffa2]/30 flex items-center justify-center text-[#7dffa2]">
              <span className="material-symbols-outlined text-lg">card_giftcard</span>
            </div>
            <h2 className="font-headline font-bold text-lg text-white">مركز بطاقات الهدايا والكوبونات المباشرة</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#222a3d] text-[#c5c5d8] hover:text-white flex items-center justify-center transition-all active:scale-90"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {purchasedToast && (
            <div className="bg-[#7dffa2]/20 border border-[#7dffa2]/40 text-[#7dffa2] p-4 rounded-2xl text-xs font-bold font-headline flex items-center gap-2 shadow-lg animate-fade-in">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span>{purchasedToast}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {giftCards.map((card) => (
              <div
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className={`bg-gradient-to-br ${card.bgColor} rounded-3xl p-5 border transition-all cursor-pointer group shadow-xl flex flex-col justify-between space-y-4 ${
                  selectedCard?.id === card.id
                    ? 'border-[#7dffa2] ring-2 ring-[#7dffa2]/30 scale-102'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={card.logo} alt={card.brand} className="w-12 h-12 rounded-2xl object-cover border border-white/10 shadow-md shrink-0" />
                    <div>
                      <h3 className="font-headline font-bold text-sm text-white group-hover:text-[#7dffa2] transition-colors">{card.brand}</h3>
                      <p className="text-[11px] text-[#c5c5d8] font-body">{card.category}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10 font-headline">
                  <span className="text-xs font-bold text-[#7dffa2] bg-[#7dffa2]/15 px-3 py-1 rounded-xl border border-[#7dffa2]/30">
                    {card.cashbackRate}
                  </span>
                  <span className="text-xs text-[#bdc2ff] font-bold">من 100 ج.م</span>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Card Denomination Selector */}
          {selectedCard && (
            <div className="bg-[#171f33] p-5 rounded-3xl border border-[#7dffa2]/30 space-y-4 animate-fade-in shadow-xl">
              <div className="flex justify-between items-center">
                <h4 className="font-headline font-bold text-sm text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#7dffa2]">verified</span>
                  اختر قيمة البطاقة لـ ({selectedCard.brand})
                </h4>
                <span className="text-xs text-[#7dffa2] font-bold font-headline">
                  كاش باك متوقع: {Math.round(selectedDenom * 0.07)} ج.م
                </span>
              </div>

              <div className="flex gap-2.5 flex-wrap">
                {selectedCard.denominations.map((denom) => (
                  <button
                    key={denom}
                    onClick={() => setSelectedDenom(denom)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-headline font-bold transition-all active:scale-95 ${
                      selectedDenom === denom
                        ? 'bg-[#7dffa2] text-[#003918] shadow-lg shadow-[#7dffa2]/20'
                        : 'bg-[#0b1326] text-[#c5c5d8] hover:bg-[#222a3d] border border-white/10'
                    }`}
                  >
                    {denom} ج.م
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePurchase(selectedCard)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#2d3fe3] via-[#8700d0] to-[#3647ea] text-white font-headline font-bold text-xs shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 ripple"
              >
                <span className="material-symbols-outlined text-base">shopping_cart</span>
                <span>شراء البطاقة الآن واستلام الكاش باك فوراً</span>
              </button>
            </div>
          )}
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
