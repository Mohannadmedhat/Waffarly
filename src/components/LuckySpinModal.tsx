import React, { useState } from 'react';

interface LuckySpinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LuckySpinModal: React.FC<LuckySpinModalProps> = ({ isOpen, onClose }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<string | null>(null);

  if (!isOpen) return null;

  const prizes = [
    '50 ج.م كاش باك',
    'كوبون خصم 10%',
    '100 نقطة وافرلي',
    '20 ج.م كاش باك',
    'كوبون نون مجاني',
    '200 ج.م كاش باك',
  ];

  const spinWheel = () => {
    if (isSpinning || wonPrize) return;
    setIsSpinning(true);
    const extraDegree = Math.floor(Math.random() * 360) + 1440; // 4 full spins + random angle
    const newRotation = rotation + extraDegree;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const prizeIndex = Math.floor(Math.random() * prizes.length);
      setWonPrize(prizes[prizeIndex]);
    }, 3500);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-[#0b1326]/85 backdrop-blur-2xl flex flex-col justify-center items-center p-4 animate-fade-in text-[#dae2fd] cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#131b2e] border border-[#bdc2ff]/20 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] cursor-default"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#171f33] border-b border-[#454656]/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7dffa2] text-2xl">casino</span>
            <h2 className="font-['Cairo'] font-bold text-lg text-[#dae2fd]">عجلة الحظ والمكافآت اليومية 🎡</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#222a3d] text-[#dae2fd] hover:text-white flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center justify-center space-y-6 overflow-y-auto flex-1 text-center">
          <p className="text-xs text-[#c5c5d8]">أدر عجلة الحظ اليومية لربح رصيد كاش باك إضافي وكوبونات خصم فورية!</p>

          {/* Interactive Wheel graphic */}
          <div className="relative w-64 h-64 my-2">
            {/* Pointer Indicator */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 text-[#7dffa2] drop-shadow-lg">
              <span className="material-symbols-outlined text-3xl">arrow_drop_down</span>
            </div>

            {/* Wheel Canvas Container */}
            <div
              className="w-full h-full rounded-full border-4 border-[#bdc2ff] shadow-2xl overflow-hidden transition-all duration-[3500ms] ease-out flex items-center justify-center relative bg-gradient-to-tr from-[#8700d0] via-[#2d3fe3] to-[#7dffa2]"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                <div className="grid grid-cols-2 gap-4 p-4 text-center">
                  <span className="bg-black/30 p-2 rounded-xl">🎁 50 ج.م</span>
                  <span className="bg-black/30 p-2 rounded-xl">⚡ 10%</span>
                  <span className="bg-black/30 p-2 rounded-xl">💎 100 نقطة</span>
                  <span className="bg-black/30 p-2 rounded-xl">🎉 200 ج.م</span>
                </div>
              </div>
            </div>
          </div>

          {/* Winner Result Box */}
          {wonPrize ? (
            <div className="bg-[#7dffa2]/15 border border-[#7dffa2]/30 p-4 rounded-2xl w-full max-w-sm space-y-2 animate-bounce">
              <span className="text-xs text-[#7dffa2] font-bold">مبروك! لقد فزت بـ:</span>
              <h3 className="font-['Cairo'] font-black text-2xl text-white">{wonPrize}</h3>
              <p className="text-[11px] text-[#c5c5d8]">تم إضافة المكافأة مباشرة إلى محفظتك!</p>
            </div>
          ) : (
            <button
              onClick={spinWheel}
              disabled={isSpinning}
              className="w-full max-w-sm py-4 rounded-2xl bg-gradient-to-r from-[#2d3fe3] via-[#8700d0] to-[#3647ea] text-white font-black text-base shadow-xl shadow-[#2d3fe3]/30 active:scale-95 disabled:opacity-50 transition-all"
            >
              {isSpinning ? 'جاري تدوير العجلة...' : 'أدر العجلة الآن مجاناً! 🎲'}
            </button>
          )}
        </div>

        {/* Footer Close */}
        <div className="p-4 bg-[#171f33] border-t border-[#454656]/20">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#222a3d] text-[#bdc2ff] hover:bg-[#2d3449] font-bold text-sm transition-all"
          >
            إغلاق عجلة الحظ
          </button>
        </div>
      </div>
    </div>
  );
};
