import React from 'react';
import { useWishlist } from '../context/WishlistContext';

interface ProductComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProductComparisonModal: React.FC<ProductComparisonModalProps> = ({ isOpen, onClose }) => {
  const { toggleWishlist, addToCart, isInWishlist, isInCart } = useWishlist();
  if (!isOpen) return null;

  const compareProducts = [
    {
      id: 'p1',
      name: 'سوني WH-1000XM5 (أسود)',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=85',
      bestPrice: '14,500 ج.م',
      originalPrice: '17,200 ج.م',
      cashback: '+435 ج.م',
      bestStore: 'أمازون (Amazon)',
      rating: 4.8,
      battery: '30 ساعة تشغيل متواصل',
      noiseCancelling: 'إلغاء ضوضاء فائق (HD QN1)',
      weight: '250 جرام',
      isWinner: true,
    },
    {
      id: 'p2',
      name: 'بوز QuietComfort 45',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=85',
      bestPrice: '16,200 ج.م',
      originalPrice: '18,500 ج.م',
      cashback: '+350 ج.م',
      bestStore: 'نون (Noon)',
      rating: 4.6,
      battery: '24 ساعة تشغيل متواصل',
      noiseCancelling: 'إلغاء ضوضاء مخصص',
      weight: '240 جرام',
      isWinner: false,
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] bg-[#0b1326]/85 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto animate-fade-in text-[#dae2fd] cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#131b2e] border border-[#bdc2ff]/25 rounded-3xl w-full max-w-4xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col my-auto max-h-[90vh] cursor-default custom-scrollbar"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#171f33] border-b border-white/10 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#7dffa2]/20 border border-[#7dffa2]/30 flex items-center justify-center text-[#7dffa2]">
              <span className="material-symbols-outlined text-lg">compare</span>
            </div>
            <h2 className="font-headline font-bold text-lg text-white">مقارنة الأسعار والمواصفات التفاعلية</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#222a3d] text-[#c5c5d8] hover:text-white flex items-center justify-center transition-all active:scale-90"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Comparison Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {/* Winner AI Recommendation Box */}
          <div className="bg-[#8700d0]/15 border border-[#e3b5ff]/30 p-4 rounded-2xl flex items-center gap-3.5 shadow-lg">
            <div className="w-10 h-10 rounded-xl ai-gradient flex items-center justify-center text-white shrink-0 shadow-md">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <div>
              <p className="text-[#e3b5ff] font-headline font-bold text-xs">توصية Waffarly AI للمقارنة:</p>
              <p className="text-xs text-[#c5c5d8] mt-0.5 font-body leading-relaxed">
                تتفوق <span className="text-white font-bold font-headline">Sony WH-1000XM5</span> بتوفير أعلى في الكاش باك (+435 ج.م) وسعر أفضل بفرق 1,700 ج.م مع بطارية تدوم 30 ساعة!
              </p>
            </div>
          </div>

          {/* Comparison Table Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {compareProducts.map((p) => (
              <div
                key={p.id}
                className={`bg-[#171f33] rounded-3xl p-5 border transition-all relative flex flex-col justify-between space-y-4 shadow-xl ${
                  p.isWinner ? 'border-[#7dffa2] ring-2 ring-[#7dffa2]/20' : 'border-white/10'
                }`}
              >
                {p.isWinner && (
                  <span className="absolute -top-3 right-5 bg-[#7dffa2] text-[#003918] text-xs font-headline font-black px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1 border border-[#131b2e]">
                    <span className="material-symbols-outlined text-sm font-black" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                    الخيار الأفضل توفيراً 🏆
                  </span>
                )}

                <div className="text-center space-y-3 pt-1">
                  <div className="w-32 h-32 rounded-2xl bg-[#0b1326] p-2 mx-auto border border-white/10 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-base text-white">{p.name}</h3>
                    <div className="flex justify-center items-center gap-1 text-[#7dffa2] text-xs font-bold font-headline mt-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span>{p.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Specs Matrix List */}
                <div className="space-y-2 text-xs pt-3 border-t border-white/10 font-body">
                  <div className="flex justify-between bg-[#0b1326]/70 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[#c5c5d8]">أفضل سعر:</span>
                    <span className="font-bold font-headline text-[#7dffa2]"><bdi>{p.bestPrice}</bdi></span>
                  </div>
                  <div className="flex justify-between bg-[#0b1326]/70 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[#c5c5d8]">الكاش باك المباشر:</span>
                    <span className="font-bold font-headline text-[#e3b5ff]"><bdi>{p.cashback}</bdi></span>
                  </div>
                  <div className="flex justify-between bg-[#0b1326]/70 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[#c5c5d8]">المتجر الموصى به:</span>
                    <span className="font-bold font-headline text-[#bdc2ff]">{p.bestStore}</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-[#c5c5d8]">عمر البطارية:</span>
                    <span className="font-medium text-white">{p.battery}</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-[#c5c5d8]">إلغاء الضوضاء:</span>
                    <span className="font-medium text-white">{p.noiseCancelling}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist({
                      id: p.id,
                      title: p.name,
                      price: parseFloat(p.bestPrice.replace(/[^0-9.]/g, '')) || 14500,
                      currency: 'ج.م',
                      store: p.bestStore,
                      storeLogo: '',
                      productImage: p.image,
                      cashbackAmount: parseFloat(p.cashback.replace(/[^0-9.]/g, '')) || 400,
                    })}
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all ripple active:scale-90 shrink-0 ${
                      isInWishlist(p.id)
                        ? 'bg-rose-500/20 text-[#ffb4ab] border-rose-500/30'
                        : 'bg-[#0b1326] text-[#c5c5d8] border-white/10 hover:text-rose-400'
                    }`}
                    aria-label="المفضلة"
                  >
                    <span className="material-symbols-outlined text-lg" style={isInWishlist(p.id) ? { fontVariationSettings: "'FILL' 1" } : {}}>
                      favorite
                    </span>
                  </button>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => {
                      addToCart({
                        id: p.id,
                        title: p.name,
                        price: parseFloat(p.bestPrice.replace(/[^0-9.]/g, '')) || 14500,
                        currency: 'ج.م',
                        store: p.bestStore,
                        storeLogo: '',
                        productImage: p.image,
                        cashbackAmount: parseFloat(p.cashback.replace(/[^0-9.]/g, '')) || 400,
                      });
                    }}
                    className={`flex-1 py-3 rounded-2xl font-headline font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 ripple ${
                      p.isWinner
                        ? 'bg-gradient-to-r from-[#2d3fe3] via-[#8700d0] to-[#3647ea] text-white shadow-lg shadow-[#2d3fe3]/25'
                        : isInCart(p.id)
                        ? 'bg-[#7dffa2]/20 text-[#7dffa2] border border-[#7dffa2]/30'
                        : 'bg-[#0b1326] text-[#bdc2ff] hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base" style={isInCart(p.id) ? { fontVariationSettings: "'FILL' 1" } : {}}>
                      {isInCart(p.id) ? 'shopping_cart_checkout' : 'shopping_cart'}
                    </span>
                    <span>{isInCart(p.id) ? 'في السلة ✓' : 'أضف للسلة'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Close */}
        <div className="p-4 bg-[#171f33] border-t border-white/10 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-[#0b1326] text-[#bdc2ff] hover:bg-[#222a3d] font-headline font-bold text-xs sm:text-sm transition-all border border-white/10 active:scale-98"
          >
            إغلاق أداة المقارنة
          </button>
        </div>
      </div>
    </div>
  );
};
