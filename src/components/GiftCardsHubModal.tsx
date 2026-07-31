import React, { useState } from 'react';

interface GiftCard {
  id: string;
  brand: string;
  logo: string;
  cashbackRate: string;
  denominations: number[];
  category: string;
}

interface GiftCardsHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GiftCardsHubModal: React.FC<GiftCardsHubModalProps> = ({ isOpen, onClose }) => {
  const [selectedCard, setSelectedCard] = useState<GiftCard | null>(null);
  const [selectedDenom, setSelectedDenom] = useState<number>(250);

  if (!isOpen) return null;

  const giftCards: GiftCard[] = [
    {
      id: 'gc-amz',
      brand: 'بطاقة هدايا أمازون مصر (Amazon)',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIL-d8YhS_J9nI8x4h-B6k2x04U-y35L2W3w4fE8X1Jk5M8P9Q6-y0w1v0',
      cashbackRate: '5% كاش باك فوري',
      denominations: [100, 250, 500, 1000],
      category: 'تسوق عام',
    },
    {
      id: 'gc-noon',
      brand: 'بطاقة هدايا نون (Noon)',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuEo90X_h7k_s6J0V5L2n3K8q0P9O8m2N1L0K4J8I7H6G5F4E3D2C1B0',
      cashbackRate: '7% كاش باك فوري',
      denominations: [150, 300, 500, 1500],
      category: 'إلكترونيات وأزياء',
    },
    {
      id: 'gc-[#00a]',
      brand: 'بطاقة بلايستيشن (PlayStation Store)',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6',
      cashbackRate: '10% كاش باك فوري',
      denominations: [200, 500, 1000],
      category: 'ألعاب وترفيه',
    },
    {
      id: 'gc-carrefour',
      brand: 'بطاقة كارفور مصر (Carrefour)',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6',
      cashbackRate: '4% كاش باك فوري',
      denominations: [250, 500, 1000, 2000],
      category: 'سوبرماركت',
    },
  ];

  const handlePurchase = (card: GiftCard) => {
    const cb = Math.round(selectedDenom * 0.07);
    alert(`تم شراء ${card.brand} بقيمة ${selectedDenom} ج.م بنجاح!\nتم إيداع ${cb} ج.م كاش باك فوري في محفظتك.`);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-[#0b1326]/85 backdrop-blur-2xl flex flex-col justify-center items-center p-4 animate-fade-in text-[#dae2fd] cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#131b2e] border border-[#bdc2ff]/20 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] cursor-default"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#171f33] border-b border-[#454656]/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#e3b5ff] text-2xl">card_giftcard</span>
            <h2 className="font-['Cairo'] font-bold text-lg text-[#dae2fd]">بطاقات الهدايا وقسائم الشراء الرقمية</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#222a3d] text-[#dae2fd] hover:text-white flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Banner */}
          <div className="bg-gradient-to-r from-[#2d3fe3] via-[#8700d0] to-[#131b2e] p-5 rounded-2xl border border-white/10 text-center space-y-1">
            <h3 className="font-['Cairo'] font-black text-xl text-white">اشترِ بطاقة هدايا واحصل على كاش باك فوري!</h3>
            <p className="text-xs text-[#dfe0ff]">احصل على أجهزة ومشتريات أو أهدها لأصدقائك واسترد نسبة كاش باك تصل إلى 10% فورياً.</p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {giftCards.map((card) => (
              <div
                key={card.id}
                className="bg-[#222a3d] p-5 rounded-2xl border border-white/5 space-y-4 flex flex-col justify-between hover:border-[#bdc2ff]/30 transition-all"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-['Cairo'] font-bold text-sm text-[#dae2fd]">{card.brand}</h4>
                    <span className="bg-[#7dffa2]/15 text-[#7dffa2] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#7dffa2]/20">
                      {card.cashbackRate}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#c5c5d8] mt-1">الفئة: {card.category}</p>
                </div>

                {/* Denominations Selector */}
                <div className="space-y-2">
                  <span className="text-[11px] text-[#c5c5d8] block">اختر قيمة البطاقة (بالجنيه):</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {card.denominations.map((denom) => (
                      <button
                        key={denom}
                        onClick={() => setSelectedDenom(denom)}
                        className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                          selectedDenom === denom
                            ? 'bg-[#bdc2ff] text-[#0013a0] border-[#bdc2ff]'
                            : 'bg-[#131b2e] text-[#c5c5d8] border-white/5'
                        }`}
                      >
                        {denom}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handlePurchase(card)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#2d3fe3] to-[#3647ea] text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">shopping_bag</span>
                  <span>شراء الآن واستلام الكاش باك</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Close */}
        <div className="p-4 bg-[#171f33] border-t border-[#454656]/20">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#222a3d] text-[#bdc2ff] hover:bg-[#2d3449] font-bold text-sm transition-all"
          >
            إغلاق متجر البطاقات
          </button>
        </div>
      </div>
    </div>
  );
};
