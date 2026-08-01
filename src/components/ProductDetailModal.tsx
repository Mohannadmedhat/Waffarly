import React, { useState } from 'react';
import { ProductDetail } from '../types';
import { mockProductDetail } from '../data/mockData';
import { useWishlist } from '../context/WishlistContext';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: ProductDetail;
}

// AI Buy-Now indicator logic: compares current vs original price
const getBuyIndicator = (product: ProductDetail) => {
  const ratio = product.finalPrice / product.originalPrice;
  if (ratio <= 0.78) return {
    level: 'buy',
    icon: 'thumb_up',
    label: 'فرصة مثالية للشراء الآن! ✅',
    desc: 'السعر الحالي في أدنى مستوى له منذ 3 أشهر. توصي خوارزميات وافرلي بالشراء فوراً للاستفادة من أعلى كاش باك.',
    bg: 'from-[#003918]/90 to-[#0b1326]',
    border: 'border-[#7dffa2]/50',
    color: '#7dffa2',
    barW: '100%',
  };
  if (ratio <= 0.88) return {
    level: 'wait',
    icon: 'schedule',
    label: 'انتظر إشعار انخفاض السعر ⏳',
    desc: 'السعر فوق المتوسط بقليل. قد ينخفض أكثر خلال الأيام القادمة.',
    bg: 'from-[#2a1800]/90 to-[#0b1326]',
    border: 'border-[#ffc68a]/50',
    color: '#ffc68a',
    barW: '55%',
  };
  return {
    level: 'avoid',
    icon: 'warning',
    label: 'السعر مرتفع حالياً 🔴',
    desc: 'السعر أعلى من المعتاد. نوصي بالبحث عن بديل أو انتظر العروض القادمة.',
    bg: 'from-[#2a0011]/90 to-[#0b1326]',
    border: 'border-[#ffb4ab]/50',
    color: '#ffb4ab',
    barW: '20%',
  };
};

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product = mockProductDetail
}) => {
  const { toggleWishlist, addToCart, isInWishlist, isInCart } = useWishlist();
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [graphTimeframe, setGraphTimeframe] = useState<'30' | '90'>('30');
  const [copied, setCopied] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  if (!isOpen) return null;

  const productId = String(product.id || product.name);
  const inWishlist = isInWishlist(productId);
  const inCart     = isInCart(productId);
  const indicator  = getBuyIndicator(product);

  const handleWishlist = () => toggleWishlist({
    id: productId,
    title: product.name,
    price: product.finalPrice,
    originalPrice: product.originalPrice,
    currency: product.currency,
    store: product.storeName || 'Amazon',
    storeLogo: product.storeLogo || '',
    productImage: product.mainImage,
    cashbackAmount: product.cashbackAmount,
  });

  const handleAddToCart = () => addToCart({
    id: productId,
    title: product.name,
    price: product.finalPrice,
    originalPrice: product.originalPrice,
    currency: product.currency,
    store: product.storeName || 'Amazon',
    storeLogo: product.storeLogo || '',
    productImage: product.mainImage,
    cashbackAmount: product.cashbackAmount,
  });

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `🛍️ عرض ممتاز على وافرلي!\n${product.name}\nالسعر: ${product.finalPrice.toLocaleString('ar-EG')} ج.م (كاش باك ${product.cashbackAmount} ج.م)\nhttps://wafffarly.vercel.app/deal/${product.id || 'demo'}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        setCopied(true);
        setShareToast(true);
        setTimeout(() => { setCopied(false); setShareToast(false); }, 2500);
      });
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] bg-[#0b1326]/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in text-[#dae2fd] cursor-pointer"
    >
      {/* Share Toast */}
      {shareToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[300] bg-[#131b2e] border border-[#7dffa2]/40 text-[#7dffa2] text-xs font-bold px-5 py-3 rounded-2xl shadow-2xl animate-fade-in flex items-center gap-2 font-headline">
          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          تم نسخ رابط العرض بنجاح! 🎉
        </div>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#131b2e] border border-[#bdc2ff]/25 rounded-3xl w-full max-w-2xl sm:max-w-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col my-auto max-h-[90vh] cursor-default custom-scrollbar"
      >
        {/* Modal Header */}
        <div className="bg-[#171f33] px-5 sm:px-6 py-4 flex justify-between items-center border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl ai-gradient flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <span className="font-headline font-bold text-white text-base">تفاصيل المنتج والتحليل الذكي</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-headline font-bold transition-all active:scale-95 ${
                copied
                  ? 'bg-[#7dffa2] text-[#003918]'
                  : 'bg-[#222a3d] text-[#bdc2ff] hover:bg-[#2d3449] border border-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {copied ? 'check' : 'share'}
              </span>
              <span>{copied ? 'تم النسخ' : 'مشاركة'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#222a3d] text-[#c5c5d8] hover:text-white flex items-center justify-center transition-all active:scale-90"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">

          {/* Product Hero Image & Gallery */}
          <section className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            {/* Main Preview Container */}
            <div className="sm:col-span-8 relative h-56 sm:h-64 rounded-3xl bg-[#0b1326] overflow-hidden border border-white/10 flex items-center justify-center p-4 group">
              <img
                src={product.galleryImages[selectedImgIndex] || product.mainImage}
                alt={product.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-[#8700d0]/80 backdrop-blur-xl px-3 py-1 rounded-xl border border-white/15 text-[#e3b5ff] text-xs font-headline font-bold flex items-center gap-1.5 shadow-lg">
                <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span>تحليل Waffarly AI</span>
              </div>
            </div>

            {/* Thumbnail Gallery List */}
            <div className="sm:col-span-4 flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 justify-center">
              {product.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`h-14 sm:h-16 rounded-2xl bg-[#0b1326] p-1.5 border transition-all flex items-center justify-center ${
                    selectedImgIndex === idx
                      ? 'border-[#7dffa2] ring-2 ring-[#7dffa2]/30 scale-102 shadow-md'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </section>

          {/* Product Header & Rating */}
          <section className="space-y-1.5">
            <div className="flex justify-between items-start gap-4">
              <h1 className="font-headline font-black text-xl sm:text-2xl text-white leading-snug">
                <bdi>{product.name}</bdi>
              </h1>
              <div className="flex items-center gap-1 text-[#7dffa2] bg-[#7dffa2]/15 border border-[#7dffa2]/30 px-3 py-1 rounded-xl text-xs font-headline font-bold shrink-0">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span>{product.rating}</span>
                <span className="text-[#c5c5d8] text-[10px]">({product.ratingCount})</span>
              </div>
            </div>
            <p className="text-[#c5c5d8] text-xs sm:text-sm leading-relaxed font-body">
              <bdi>{product.subtitle}</bdi>
            </p>
          </section>

          {/* ═══ AI Smart Analysis Box ═══ */}
          <section
            className={`p-5 rounded-3xl bg-gradient-to-br ${indicator.bg} border ${indicator.border} space-y-3.5 shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-bold text-base flex items-center gap-2" style={{ color: indicator.color }}>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1", color: indicator.color }}>
                  {indicator.icon}
                </span>
                {indicator.label}
              </h3>
              <span className="text-[10px] font-headline font-bold px-2.5 py-1 rounded-xl" style={{ background: `${indicator.color}20`, color: indicator.color }}>
                توصية الذكاء الاصطناعي
              </span>
            </div>

            <p className="text-[#c5c5d8] text-xs sm:text-sm leading-relaxed font-body">{indicator.desc}</p>

            {/* Price Position Meter */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-[#c5c5d8] font-headline">
                <span>أدنى سعر</span>
                <span>متوسط السعر</span>
                <span>أعلى سعر</span>
              </div>
              <div className="h-2.5 bg-[#171f33] rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: indicator.barW,
                    background: `linear-gradient(to right, #7dffa2, ${indicator.color})`,
                  }}
                />
              </div>
              <p className="text-xs text-center font-bold font-headline mt-1" style={{ color: indicator.color }}>
                السعر الحالي: {product.finalPrice.toLocaleString('ar-EG')} ج.م
                ({Math.round((1 - product.finalPrice / product.originalPrice) * 100)}% أقل من الأصلي)
              </p>
            </div>
          </section>

          {/* ═══ NEW FEATURE #1: Multi-Store Live Price Comparison Matrix ═══ */}
          <section className="p-5 sm:p-6 rounded-3xl bg-[#171f33] border border-[#bdc2ff]/30 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-[#7dffa2]/20 border border-[#7dffa2]/30 flex items-center justify-center text-[#7dffa2]">
                  <span className="material-symbols-outlined text-base">storefront</span>
                </div>
                <h3 className="font-headline font-bold text-base text-white">مقارنة أسعار المنتج المباشرة عبر المتاجر</h3>
              </div>
              <span className="text-[10px] font-headline font-bold bg-[#7dffa2]/15 text-[#7dffa2] border border-[#7dffa2]/30 px-2.5 py-1 rounded-xl flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7dffa2] animate-pulse" />
                تحديث حي ⚡
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  store: 'أمازون مصر (Amazon)',
                  logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=300&auto=format&fit=crop&q=80',
                  price: product.finalPrice,
                  originalPrice: product.originalPrice,
                  cashback: product.cashbackAmount,
                  delivery: 'توصيل غداً مجاناً 🚚',
                  isBest: true,
                  stock: 'متوفر بكثرة',
                  tagBg: 'bg-[#7dffa2]/15 text-[#7dffa2] border-[#7dffa2]/30',
                },
                {
                  store: 'نون (Noon)',
                  logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&auto=format&fit=crop&q=80',
                  price: Math.round(product.finalPrice * 1.05),
                  originalPrice: product.originalPrice,
                  cashback: Math.round(product.cashbackAmount * 0.8),
                  delivery: 'توصيل خلال يومين 📦',
                  isBest: false,
                  stock: '3 قطع متبقية ⚠️',
                  tagBg: 'bg-[#e3b5ff]/15 text-[#e3b5ff] border-[#e3b5ff]/30',
                },
                {
                  store: 'جوميا (Jumia)',
                  logo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=300&auto=format&fit=crop&q=80',
                  price: Math.round(product.finalPrice * 1.09),
                  originalPrice: product.originalPrice,
                  cashback: Math.round(product.cashbackAmount * 0.6),
                  delivery: 'توصيل خلال 3 أيام 🚚',
                  isBest: false,
                  stock: 'متوفر',
                  tagBg: 'bg-[#bdc2ff]/15 text-[#bdc2ff] border-[#bdc2ff]/30',
                },
                {
                  store: 'كارفور (Carrefour)',
                  logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&auto=format&fit=crop&q=80',
                  price: Math.round(product.finalPrice * 1.12),
                  originalPrice: product.originalPrice,
                  cashback: Math.round(product.cashbackAmount * 0.5),
                  delivery: 'استلام مباشر من الفرع 🛒',
                  isBest: false,
                  stock: 'متوفر بالفرع',
                  tagBg: 'bg-white/10 text-[#c5c5d8] border-white/10',
                },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
                    s.isBest
                      ? 'bg-[#0b1326] border-[#7dffa2] shadow-lg shadow-[#7dffa2]/10 ring-1 ring-[#7dffa2]/30'
                      : 'bg-[#0b1326]/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={s.logo} alt={s.store} className="w-10 h-10 rounded-xl object-cover border border-white/10 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-headline font-bold text-sm text-white">{s.store}</h4>
                        {s.isBest && (
                          <span className="bg-[#7dffa2] text-[#003918] text-[10px] font-headline font-black px-2 py-0.5 rounded-md shadow-sm">
                            أفضل سعر 🏆
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#c5c5d8] font-body mt-0.5">{s.delivery} · <span className="text-[#8899cc]">{s.stock}</span></p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                    <div className="text-right sm:text-left">
                      <span className="font-headline font-black text-base sm:text-lg text-[#7dffa2] block">
                        <bdi>{s.price.toLocaleString('ar-EG')} {product.currency}</bdi>
                      </span>
                      <span className="text-[10px] text-[#e3b5ff] font-bold font-headline block">
                        كاش باك +{s.cashback.toLocaleString('ar-EG')} {product.currency}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        handleAddToCart();
                        onClose();
                      }}
                      className={`px-3.5 py-2 rounded-xl font-headline font-bold text-xs transition-all active:scale-95 shrink-0 flex items-center gap-1 ripple ${
                        s.isBest
                          ? 'bg-gradient-to-r from-[#2d3fe3] to-[#8700d0] text-white shadow-md'
                          : 'bg-[#171f33] hover:bg-[#222a3d] text-[#bdc2ff] border border-white/10'
                      }`}
                    >
                      <span>شراء 🛒</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ Savings Breakdown Box ═══ */}
          <section className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#171f33] via-[#151c2e] to-[#0b1326] border border-[#bdc2ff]/20 shadow-xl space-y-4">
            <h3 className="font-headline font-bold text-base text-[#7dffa2] flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">savings</span>
              حساب التوفير والكاش باك
            </h3>

            <div className="space-y-3 text-xs sm:text-sm font-body">
              <div className="flex justify-between text-[#c5c5d8]">
                <span>السعر الأصلي قبل الخصم:</span>
                <span className="line-through">
                  <bdi>{product.originalPrice.toLocaleString('ar-EG')} {product.currency}</bdi>
                </span>
              </div>
              <div className="flex justify-between text-[#ffb4ab]">
                <span>خصم وافرلي (-15%):</span>
                <span><bdi>-{product.discountAmount.toLocaleString('ar-EG')} {product.currency}</bdi></span>
              </div>
              <div className="flex justify-between text-[#e3b5ff] font-bold">
                <span>الكاش باك المباشر لحسابك:</span>
                <span><bdi>+{product.cashbackAmount.toLocaleString('ar-EG')} {product.currency}</bdi></span>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                <div>
                  <span className="text-xs text-[#c5c5d8]">السعر النهائي الصافي:</span>
                  <p className="font-headline font-black text-2xl sm:text-3xl text-[#7dffa2]">
                    <bdi>{product.finalPrice.toLocaleString('ar-EG')} {product.currency}</bdi>
                  </p>
                </div>
                <div className="bg-[#7dffa2]/15 text-[#7dffa2] border border-[#7dffa2]/30 px-3.5 py-2 rounded-2xl text-xs font-bold font-headline shadow-md">
                  وفرت <bdi>{product.totalSaved.toLocaleString('ar-EG')} {product.currency}</bdi>!
                </div>
              </div>
            </div>
          </section>

          {/* Price Tracker Graph */}
          <section className="p-5 rounded-3xl bg-[#171f33] border border-white/10 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-headline font-bold text-sm sm:text-base text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#e3b5ff]">timeline</span>
                مخطط تتبع مسار السعر
              </h3>
              <div className="flex gap-1 bg-[#0b1326] p-1 rounded-xl">
                <button
                  onClick={() => setGraphTimeframe('30')}
                  className={`px-3 py-1 rounded-lg text-xs font-headline font-bold transition-all ${graphTimeframe === '30' ? 'bg-[#bdc2ff] text-[#0013a0]' : 'text-[#c5c5d8]'}`}
                >
                  30 يوم
                </button>
                <button
                  onClick={() => setGraphTimeframe('90')}
                  className={`px-3 py-1 rounded-lg text-xs font-headline font-bold transition-all ${graphTimeframe === '90' ? 'bg-[#bdc2ff] text-[#0013a0]' : 'text-[#c5c5d8]'}`}
                >
                  90 يوم
                </button>
              </div>
            </div>

            <div className="h-28 w-full pt-2">
              <svg className="w-full h-full" viewBox="0 0 100 35" preserveAspectRatio="none">
                <path d="M 0 10 L 20 15 L 40 8 L 60 25 L 80 32 L 100 35" fill="none" stroke="#7dffa2" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                <linearGradient id="detail-grad2" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#7dffa2" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#7dffa2" stopOpacity="0" />
                </linearGradient>
                <path d="M 0 10 L 20 15 L 40 8 L 60 25 L 80 32 L 100 35 L 100 35 L 0 35 Z" fill="url(#detail-grad2)" />
              </svg>
            </div>
            <p className="text-xs text-center text-[#c5c5d8] font-body">السعر في أدنى مستوياته منذ 3 أشهر</p>
          </section>

          {/* Technical Specs Bento Grid */}
          <section className="space-y-3">
            <h3 className="font-headline font-bold text-base text-white">المواصفات التقنية</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: 'memory', color: '#e3b5ff', label: 'المعالج', val: product.specs.processor },
                { icon: 'speaker', color: '#7dffa2', label: 'الشاشة / المشغلات', val: product.specs.screen },
                { icon: 'battery_charging_full', color: '#bdc2ff', label: 'البطارية', val: product.specs.battery },
                { icon: 'bolt', color: '#ffb4ab', label: 'الشحن والتوصيل', val: product.specs.storage },
              ].map((spec) => (
                <div key={spec.label} className="bg-[#171f33] p-4 rounded-2xl border border-white/5 space-y-1">
                  <span className="material-symbols-outlined text-xl" style={{ color: spec.color }}>{spec.icon}</span>
                  <p className="text-[11px] text-[#c5c5d8] font-body">{spec.label}</p>
                  <p className="text-xs font-bold font-headline text-white"><bdi>{spec.val}</bdi></p>
                </div>
              ))}
            </div>
          </section>

          {/* Delivery & Warranty Policies */}
          <section className="p-4 rounded-2xl bg-[#171f33] border border-white/5 space-y-2.5">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#7dffa2] text-lg">local_shipping</span>
              <span className="text-xs text-[#dae2fd] font-body">{product.delivery.freeDelivery}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#e3b5ff] text-lg">verified_user</span>
              <span className="text-xs text-[#dae2fd] font-body">{product.delivery.warranty}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#bdc2ff] text-lg">assignment_return</span>
              <span className="text-xs text-[#dae2fd] font-body">{product.delivery.returnPolicy}</span>
            </div>
          </section>

        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#171f33] border-t border-white/10 space-y-3 shrink-0">
          <div className="flex gap-2">
            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className={`flex-1 py-3 rounded-2xl font-headline font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 ripple ${
                inWishlist
                  ? 'bg-rose-500/20 text-[#ffb4ab] border border-rose-500/30'
                  : 'bg-[#222a3d] text-[#c5c5d8] border border-white/10 hover:text-rose-400'
              }`}
            >
              <span className="material-symbols-outlined text-base" style={inWishlist ? { fontVariationSettings: "'FILL' 1" } : {}}>
                favorite
              </span>
              <span>{inWishlist ? 'في المفضلة' : 'المفضلة'}</span>
            </button>

            {/* Cart */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 rounded-2xl font-headline font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 ripple ${
                inCart
                  ? 'bg-[#7dffa2]/20 text-[#7dffa2] border border-[#7dffa2]/30'
                  : 'bg-[#222a3d] text-[#bdc2ff] border border-white/10 hover:bg-[#2d3449]'
              }`}
            >
              <span className="material-symbols-outlined text-base" style={inCart ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {inCart ? 'shopping_cart_checkout' : 'add_shopping_cart'}
              </span>
              <span>{inCart ? 'في السلة ✓' : 'إضافة للسلة'}</span>
            </button>
          </div>

          {/* Buy Now CTA */}
          <button
            onClick={() => {
              handleAddToCart();
              onClose();
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#2d3fe3] via-[#8700d0] to-[#3647ea] text-white font-headline font-bold text-sm shadow-xl shadow-[#2d3fe3]/25 active:scale-95 transition-all flex items-center justify-center gap-2 ripple"
          >
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              shopping_cart_checkout
            </span>
            <span>اشتري الآن واربح {product.cashbackAmount.toLocaleString('ar-EG')} ج.م كاش باك</span>
          </button>
        </div>

      </div>
    </div>
  );
};
