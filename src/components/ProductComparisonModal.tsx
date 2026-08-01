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
      name: 'Sony WH-1000XM5',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAkJ7utX-rV2ZJ8dHuld_B24bGMD14cnaV661NkVU0zDkKQqNaQFy8BGb6tpC0eXrS7biz-MpAu7rfrEo8-ZJvAEo8PN5BKrf87iLJgyhfXeyw_EB-tCq36UfiCqhCImpNh09vSLfg5ASnaNwf4TeTIpWmlQ75P5FowRz64mSb5EVvrdSfSVHqakIIVNAE3jwKeSKdrehM7c3bE56DLg5_794vQKLoijXACTHYvPgKZJ-7VvSbh-OVSNEYXSKOsZwi5MSSmrbBoAAm',
      bestPrice: '14,500 ج.م',
      originalPrice: '17,200 ج.م',
      cashback: '+435 ج.م',
      bestStore: 'أمازون (Amazon)',
      rating: 4.8,
      battery: '30 ساعة تشغيل',
      noiseCancelling: 'إلغاء ضوضاء فائق (HD QN1)',
      weight: '250 جرام',
      isWinner: true,
    },
    {
      id: 'p2',
      name: 'Bose QuietComfort 45',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCorJYil_Ipms2sIbkBG89KDHYhj0pIzoOEiyxm7jl_ZsC8iAD8W1PVOEvBq77PAPKJV7R-Wo0VDq3evf1FSjrWH0J7hT1WVBh6qEO-6c51O3XoDI3LT3_YTEggsC62TYthKRmE-66MpxP5lm5USrRVyK7kqGHEKIxVa1Gjrkwiad4REtHvULf3WhAXOKqcOTM9Am79wWtlIhO__fylBjpN2gg-u7oT8YSUzDQt45jQYUsnaMamPdfFGFuzzsPAEyJI_6ZSL5KH6jG',
      bestPrice: '16,200 ج.م',
      originalPrice: '18,500 ج.م',
      cashback: '+350 ج.م',
      bestStore: 'نون (Noon)',
      rating: 4.6,
      battery: '24 ساعة تشغيل',
      noiseCancelling: 'إلغاء ضوضاء مخصص',
      weight: '240 جرام',
      isWinner: false,
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-[#0b1326]/85 backdrop-blur-2xl flex flex-col justify-center items-center p-4 animate-fade-in text-[#dae2fd] cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#131b2e] border border-[#bdc2ff]/20 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] cursor-default"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#171f33] border-b border-[#454656]/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7dffa2] text-2xl">compare</span>
            <h2 className="font-['Cairo'] font-bold text-lg text-[#dae2fd]">جدول مقارنة الأجهزة والمنتجات التفاعلي</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#222a3d] text-[#dae2fd] hover:text-white flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Comparison Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Winner AI Recommendation Box */}
          <div className="bg-[#8700d0]/15 border border-[#e3b5ff]/30 p-4 rounded-2xl flex items-center gap-3">
            <span className="material-symbols-outlined text-[#e3b5ff] text-2xl">auto_awesome</span>
            <div>
              <p className="text-[#e3b5ff] font-bold text-xs">توصية وافرلي الذكية للمقارنة:</p>
              <p className="text-xs text-[#c5c5d8] mt-0.5">
                تتفوق <span className="text-white font-bold">Sony WH-1000XM5</span> بتوفير أعلى في الكاش باك (+435 ج.م) وسعر أفضل بفرق 1,700 ج.م مع بطارية تدوم 30 ساعة!
              </p>
            </div>
          </div>

          {/* Comparison Table Grid */}
          <div className="grid grid-cols-2 gap-4">
            {compareProducts.map((p) => (
              <div
                key={p.id}
                className={`bg-[#222a3d] rounded-2xl p-5 border transition-all relative flex flex-col justify-between space-y-4 ${
                  p.isWinner ? 'border-[#7dffa2] ring-2 ring-[#7dffa2]/20' : 'border-white/5'
                }`}
              >
                {p.isWinner && (
                  <span className="absolute -top-3 right-4 bg-[#7dffa2] text-[#00622e] text-[10px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">emoji_events</span>
                    الخيار الأفضل توفيراً
                  </span>
                )}

                <div className="text-center space-y-3">
                  <img src={p.image} alt={p.name} className="w-28 h-28 object-contain mx-auto bg-[#131b2e] rounded-2xl p-2 border border-white/5" />
                  <div>
                    <h3 className="font-['Cairo'] font-black text-base text-[#dae2fd]">{p.name}</h3>
                    <div className="flex justify-center items-center gap-1 text-[#7dffa2] text-xs font-bold mt-1">
                      <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span>{p.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Specs Matrix List */}
                <div className="space-y-2.5 text-xs pt-3 border-t border-white/5">
                  <div className="flex justify-between bg-[#131b2e]/60 p-2 rounded-xl">
                    <span className="text-[#c5c5d8]">أفضل سعر:</span>
                    <span className="font-bold text-[#7dffa2]"><bdi>{p.bestPrice}</bdi></span>
                  </div>
                  <div className="flex justify-between bg-[#131b2e]/60 p-2 rounded-xl">
                    <span className="text-[#c5c5d8]">الكاش باك المباشر:</span>
                    <span className="font-bold text-[#e3b5ff]"><bdi>{p.cashback}</bdi></span>
                  </div>
                  <div className="flex justify-between bg-[#131b2e]/60 p-2 rounded-xl">
                    <span className="text-[#c5c5d8]">المتجر الموصى به:</span>
                    <span className="font-bold text-[#bdc2ff]">{p.bestStore}</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-[#c5c5d8]">عمر البطارية:</span>
                    <span className="font-medium text-white">{p.battery}</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-[#c5c5d8]">خاصية إلغاء الضوضاء:</span>
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
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ripple active:scale-90 ${
                      isInWishlist(p.id)
                        ? 'bg-rose-500/20 text-[#ffb4ab] border-rose-500/30'
                        : 'bg-[#171f33] text-[#c5c5d8] border-white/5 hover:text-rose-400'
                    }`}
                    aria-label="المفضلة"
                  >
                    <span className="material-symbols-outlined text-base" style={isInWishlist(p.id) ? { fontVariationSettings: "'FILL' 1" } : {}}>
                      favorite
                    </span>
                  </button>

                  {/* Add to Cart / Buy Now Button */}
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
                    className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 ripple ${
                      p.isWinner
                        ? 'bg-gradient-to-r from-[#2d3fe3] to-[#3647ea] text-white shadow-lg shadow-[#2d3fe3]/20'
                        : isInCart(p.id)
                        ? 'bg-[#7dffa2]/20 text-[#7dffa2] border border-[#7dffa2]/30'
                        : 'bg-[#171f33] text-[#bdc2ff] hover:bg-[#2d3449]'
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
        <div className="p-4 bg-[#171f33] border-t border-[#454656]/20">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#222a3d] text-[#bdc2ff] hover:bg-[#2d3449] font-bold text-sm transition-all"
          >
            إغلاق أداة المقارنة
          </button>
        </div>
      </div>
    </div>
  );
};
