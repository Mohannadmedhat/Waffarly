import React, { useState, useEffect } from 'react';

interface LuckySpinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Confetti particle component
const Confetti: React.FC = () => {
  const colors = ['#7dffa2', '#bdc2ff', '#e3b5ff', '#ffb4ab', '#ffd700', '#ffffff'];
  const pieces = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${-8 + Math.random() * 20}%`,
            background: colors[i % colors.length],
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${0.6 + Math.random() * 0.6}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
};

export const LuckySpinModal: React.FC<LuckySpinModalProps> = ({ isOpen, onClose }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setWonPrize(null);
      setShowConfetti(false);
      setIsSpinning(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const prizes = [
    { label: '50 ج.م كاش باك', icon: '💰', color: '#7dffa2' },
    { label: 'كوبون خصم 10%', icon: '🎫', color: '#bdc2ff' },
    { label: '100 نقطة وافرلي', icon: '💎', color: '#e3b5ff' },
    { label: '20 ج.م كاش باك', icon: '🪙', color: '#ffb4ab' },
    { label: 'كوبون نون مجاني', icon: '🛍️', color: '#7dffa2' },
    { label: '200 ج.م كاش باك', icon: '🎉', color: '#ffd700' },
  ];

  const spinWheel = () => {
    if (isSpinning || wonPrize) return;
    setIsSpinning(true);
    const extraDegree = Math.floor(Math.random() * 360) + 1440;
    const newRotation = rotation + extraDegree;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const prizeIndex = Math.floor(Math.random() * prizes.length);
      setWonPrize(prizes[prizeIndex].label);
      setShowConfetti(true);
      // Hide confetti after 3s
      setTimeout(() => setShowConfetti(false), 3000);
    }, 3500);
  };

  const wonPrizeData = prizes.find((p) => p.label === wonPrize);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] bg-[#0b1326]/85 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto animate-fade-in text-[#dae2fd] cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#131b2e] border border-[#bdc2ff]/25 rounded-3xl w-full max-w-xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col my-auto max-h-[90vh] cursor-default custom-scrollbar"
      >
        {/* Confetti overlay */}
        {showConfetti && <Confetti />}

        {/* Header */}
        <div className="px-6 py-4 bg-[#171f33] border-b border-[#454656]/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7dffa2] text-2xl animate-float">casino</span>
            <h2 className="font-headline font-bold text-lg text-[#dae2fd]">عجلة الحظ والمكافآت اليومية 🎡</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#222a3d] text-[#dae2fd] hover:text-white flex items-center justify-center transition-all active:scale-90 ripple"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center justify-center space-y-6 overflow-y-auto flex-1 text-center">
          <p className="text-xs text-[#c5c5d8] font-body">أدر عجلة الحظ اليومية لربح رصيد كاش باك إضافي وكوبونات خصم فورية!</p>

          {/* Wheel */}
          <div className="relative w-64 h-64 my-2">
            {/* Pointer */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 text-[#7dffa2] drop-shadow-lg">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                arrow_drop_down
              </span>
            </div>

            {/* Wheel */}
            <div
              className="w-full h-full rounded-full border-4 border-[#bdc2ff]/50 shadow-2xl overflow-hidden transition-all duration-[3500ms] ease-out flex items-center justify-center relative"
              style={{
                transform: `rotate(${rotation}deg)`,
                background: 'conic-gradient(#7dffa2 0% 16%, #bdc2ff 16% 32%, #e3b5ff 32% 50%, #ffb4ab 50% 66%, #7dffa2 66% 82%, #ffd700 82% 100%)',
              }}
            >
              {/* Center cap */}
              <div className="absolute inset-8 rounded-full bg-[#0b1326] border-2 border-[#bdc2ff]/20 flex flex-col items-center justify-center z-10 shadow-inner">
                <span className="text-3xl">{isSpinning ? '🎲' : wonPrize ? wonPrizeData?.icon || '🎉' : '🎯'}</span>
                {!isSpinning && !wonPrize && (
                  <span className="text-[9px] text-[#c5c5d8] mt-1 font-body">اضغط لتدوير</span>
                )}
              </div>

              {/* Segment labels */}
              {prizes.map((prize, idx) => {
                const angle = (idx * 60) + 30; // center of each 60° segment
                const rad = (angle * Math.PI) / 180;
                const r = 80; // radius
                const x = 128 + r * Math.sin(rad);
                const y = 128 - r * Math.cos(rad);
                return (
                  <span
                    key={idx}
                    className="absolute text-[9px] font-black text-white/90"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                      textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                    }}
                  >
                    {prize.icon}
                  </span>
                );
              })}
            </div>

            {/* Glow ring when spinning */}
            {isSpinning && (
              <div className="absolute inset-0 rounded-full animate-pulse" style={{ boxShadow: '0 0 40px rgba(125, 255, 162, 0.4)' }} />
            )}
          </div>

          {/* Winner Result */}
          {wonPrize ? (
            <div className="bg-[#7dffa2]/10 border border-[#7dffa2]/30 p-5 rounded-3xl w-full max-w-sm space-y-3 animate-pop-in">
              <div className="text-4xl">{wonPrizeData?.icon || '🎉'}</div>
              <div>
                <span className="text-xs text-[#7dffa2] font-bold block mb-1">🎊 مبروك! فزت بـ:</span>
                <h3 className="font-headline font-black text-2xl text-white">{wonPrize}</h3>
              </div>
              <p className="text-[11px] text-[#c5c5d8] font-body">تم إضافة المكافأة مباشرة إلى محفظتك!</p>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#2d3fe3] to-[#8700d0] text-white font-bold text-sm ripple active:scale-95 transition-all"
              >
                رائع! اذهب للمحفظة 💰
              </button>
            </div>
          ) : (
            <button
              onClick={spinWheel}
              disabled={isSpinning}
              className="w-full max-w-sm py-4 rounded-2xl bg-gradient-to-r from-[#2d3fe3] via-[#8700d0] to-[#3647ea] text-white font-black text-base shadow-xl shadow-[#2d3fe3]/30 active:scale-95 disabled:opacity-70 transition-all ripple relative overflow-hidden"
            >
              {isSpinning ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري تدوير العجلة...
                </span>
              ) : (
                'أدر العجلة الآن مجاناً! 🎲'
              )}
            </button>
          )}

          {/* Prize list */}
          {!wonPrize && (
            <div className="w-full max-w-sm">
              <p className="text-[10px] text-[#c5c5d8] mb-2 font-body">الجوائز المتاحة:</p>
              <div className="grid grid-cols-3 gap-1.5">
                {prizes.map((prize, idx) => (
                  <div key={idx} className="bg-[#222a3d] rounded-xl p-2 text-center border border-white/5">
                    <div className="text-lg">{prize.icon}</div>
                    <p className="text-[8px] text-[#c5c5d8] leading-tight mt-0.5 font-body">{prize.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!wonPrize && (
          <div className="p-4 bg-[#171f33] border-t border-[#454656]/20">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#222a3d] text-[#bdc2ff] hover:bg-[#2d3449] font-bold text-sm transition-all ripple"
            >
              إغلاق
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
