import React, { useState } from 'react';
import { ProductDetail } from '../types';
import { mockProductDetail } from '../data/mockData';

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
    label: 'اشتري الآن! ✅',
    desc: 'السعر الحالي في أدنى مستوى له خلال 3 أشهر. الفرصة مثالية للشراء!',
    bg: 'from-[#003918] to-[#0a2e1a]',
    border: 'border-[#7dffa2]/40',
    color: '#7dffa2',
    barW: '100%',
  };
  if (ratio <= 0.88) return {
    level: 'wait',
    icon: 'schedule',
    label: 'انتظر قليلاً ⏳',
    desc: 'السعر فوق المتوسط بقليل. قد ينخفض أكثر خلال أسبوع.',
    bg: 'from-[#2a1800] to-[#1f1300]',
    border: 'border-[#ffb4ab]/30',
    color: '#ffc68a',
    barW: '55%',
  };
  return {
    level: 'avoid',
    icon: 'warning',
    label: 'سعر مرتفع 🔴',
    desc: 'السعر أعلى من المعتاد. ابحث عن بديل أو انتظر عروض قادمة.',
    bg: 'from-[#2a0011] to-[#1f000c]',
    border: 'border-[#ffb4ab]/30',
    color: '#ffb4ab',
    barW: '20%',
  };
};

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product = mockProductDetail
}) => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [graphTimeframe, setGraphTimeframe] = useState<'30' | '90'>('30');
  const [copied, setCopied] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  if (!isOpen) return null;

  const indicator = getBuyIndicator(product);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `🛍️ عرض على وافرلي!\n${product.name}\nالسعر: ${product.finalPrice.toLocaleString('ar-EG')} ج.م (بعد كاش باك ${product.cashbackAmount} ج.م)\nhttps://waffarly.app/deal/${product.id || 'demo'}`;
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
      className="fixed inset-0 z-[100] bg-[#0b1326]/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in text-[#dae2fd] cursor-pointer"
    >
      {/* Share Toast */}
      {shareToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[300] bg-[#131b2e] border border-[#7dffa2]/30 text-[#7dffa2] text-xs font-bold px-5 py-2.5 rounded-2xl shadow-2xl animate-fade-in flex items-center gap-2">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          تم نسخ رابط العرض! شاركه مع أصحابك 🎉
        </div>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#131b2e] border border-[#bdc2ff]/20 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] cursor-default"
      >
        {/* Top Bar */}
        <div className="bg-[#171f33] px-6 py-4 flex justify-between items-center border-b border-[#454656]/20">
          <span className="font-['Cairo'] font-bold text-[#bdc2ff] text-base">تفاصيل المنتج والتحليل الذكي</span>
          <div className="flex items-center gap-2">
            {/* Share Button */}
            <button
              onClick={handleShare}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                copied
                  ? 'bg-[#7dffa2] text-[#003918]'
                  : 'bg-[#222a3d] text-[#bdc2ff] hover:bg-[#2d3449] border border-[#454656]/30'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {copied ? 'check' : 'share'}
              </span>
              {copied ? 'تم النسخ!' : 'شارك العرض'}
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#222a3d] text-[#dae2fd] hover:text-white flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Main Product Visual & Gallery */}
          <section className="space-y-4">
            <div className="relative w-full aspect-square rounded-[36px] bg-[#131b2e] overflow-hidden border border-[#454656]/20 flex items-center justify-center p-6">
              <img
                src={product.galleryImages[selectedImgIndex] || product.mainImage}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-4 right-4 bg-[#8700d0]/80 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-white/10 text-[#e3b5ff] text-xs font-bold flex items-center gap-1.5 shadow-xl">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span>تحليل وافرلي الذكي</span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex gap-3 justify-center">
              {product.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`w-16 h-16 rounded-2xl bg-[#131b2e] p-1.5 border transition-all ${
                    selectedImgIndex === idx
                      ? 'border-[#bdc2ff] ring-2 ring-[#bdc2ff]/30 scale-105'
                      : 'border-[#454656]/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </section>

          {/* Product Info & Rating */}
          <section className="space-y-2">
            <div className="flex justify-between items-start gap-4">
              <h1 className="font-['Cairo'] font-black text-3xl text-[#dae2fd]">
                <bdi className="bidi-isolate">{product.name}</bdi>
              </h1>
              <div className="flex items-center gap-1 text-[#7dffa2] bg-[#7dffa2]/10 px-3 py-1 rounded-full text-xs font-bold shrink-0">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span>{product.rating}</span>
                <span className="text-[#c5c5d8] text-[10px]">({product.ratingCount})</span>
              </div>
            </div>
            <p className="text-[#c5c5d8] text-sm leading-relaxed">
              <bdi className="bidi-isolate">{product.subtitle}</bdi>
            </p>
          </section>

          {/* ═══ NEW: AI Buy-Now Indicator ═══ */}
          <section
            className={`p-5 rounded-3xl bg-gradient-to-br ${indicator.bg} border ${indicator.border} space-y-3 shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-['Cairo'] font-bold text-base flex items-center gap-2" style={{ color: indicator.color }}>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1", color: indicator.color }}>
                  {indicator.icon}
                </span>
                {indicator.label}
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg" style={{ background: `${indicator.color}20`, color: indicator.color }}>
                تحليل ذكي
              </span>
            </div>

            <p className="text-[#c5c5d8] text-xs leading-relaxed">{indicator.desc}</p>

            {/* Price Position Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] text-[#c5c5d8]">
                <span>أدنى سعر</span>
                <span>متوسط السعر</span>
                <span>أعلى سعر</span>
              </div>
              <div className="h-2.5 bg-[#222a3d] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: indicator.barW,
                    background: `linear-gradient(to right, #7dffa2, ${indicator.color})`,
                  }}
                />
              </div>
              <p className="text-[10px] text-center font-bold" style={{ color: indicator.color }}>
                السعر الحالي: {product.finalPrice.toLocaleString('ar-EG')} ج.م
                ({Math.round((1 - product.finalPrice / product.originalPrice) * 100)}% أقل من الأصلي)
              </p>
            </div>

            {/* Quick stats row */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/5">
              {[
                { label: 'أدنى سعر', value: `${(product.originalPrice * 0.72).toFixed(0)} ج.م`, color: '#7dffa2' },
                { label: 'المتوسط', value: `${(product.originalPrice * 0.85).toFixed(0)} ج.م`, color: '#bdc2ff' },
                { label: 'الحالي', value: `${product.finalPrice.toLocaleString('ar-EG')} ج.م`, color: indicator.color },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-[9px] text-[#c5c5d8] mb-0.5">{s.label}</p>
                  <p className="text-[11px] font-black" style={{ color: s.color }}><bdi>{s.value}</bdi></p>
                </div>
              ))}
            </div>
          </section>

          {/* Savings Breakdown Box */}
          <section className="p-6 rounded-[32px] bg-gradient-to-br from-[#171f33] via-[#222a3d] to-[#131b2e] border border-[#bdc2ff]/20 shadow-2xl space-y-4">
            <h3 className="font-['Cairo'] font-bold text-lg text-[#7dffa2] flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">savings</span>
              حساب التوفير الذكي
            </h3>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-[#c5c5d8]">
                <span>السعر الأصلي:</span>
                <span className="line-through">
                  <bdi className="bidi-isolate">{product.originalPrice.toLocaleString('ar-EG')} {product.currency}</bdi>
                </span>
              </div>
              <div className="flex justify-between text-[#ffb4ab]">
                <span>خصم وافرلي (-15%):</span>
                <span><bdi className="bidi-isolate">-{product.discountAmount.toLocaleString('ar-EG')} {product.currency}</bdi></span>
              </div>
              <div className="flex justify-between text-[#e3b5ff]">
                <span>الكاش باك المباشر:</span>
                <span><bdi className="bidi-isolate">+{product.cashbackAmount.toLocaleString('ar-EG')} {product.currency}</bdi></span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                <div>
                  <span className="text-xs text-[#c5c5d8]">السعر النهائي بعد التوفير:</span>
                  <p className="font-['Cairo'] font-black text-3xl text-[#7dffa2]">
                    <bdi className="bidi-isolate">{product.finalPrice.toLocaleString('ar-EG')} {product.currency}</bdi>
                  </p>
                </div>
                <div className="bg-[#7dffa2]/15 text-[#7dffa2] px-3 py-1.5 rounded-2xl text-xs font-bold">
                  وفرت <bdi className="bidi-isolate">{product.totalSaved.toLocaleString('ar-EG')} {product.currency}</bdi>!
                </div>
              </div>
            </div>
          </section>

          {/* Price Tracker Graph */}
          <section className="p-6 rounded-[32px] bg-[#131b2e] border border-[#454656]/20 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-['Cairo'] font-bold text-base text-[#dae2fd] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#e3b5ff]">timeline</span>
                تتبع مسار السعر
              </h3>
              <div className="flex gap-1 bg-[#060e20] p-1 rounded-xl">
                <button
                  onClick={() => setGraphTimeframe('30')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${graphTimeframe === '30' ? 'bg-[#bdc2ff] text-[#0013a0]' : 'text-[#c5c5d8]'}`}
                >
                  30 يوم
                </button>
                <button
                  onClick={() => setGraphTimeframe('90')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${graphTimeframe === '90' ? 'bg-[#bdc2ff] text-[#0013a0]' : 'text-[#c5c5d8]'}`}
                >
                  90 يوم
                </button>
              </div>
            </div>

            <div className="h-32 w-full pt-4">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M 0 10 L 20 15 L 40 8 L 60 25 L 80 32 L 100 35" fill="none" stroke="#7dffa2" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                <linearGradient id="detail-grad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#7dffa2" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#7dffa2" stopOpacity="0" />
                </linearGradient>
                <path d="M 0 10 L 20 15 L 40 8 L 60 25 L 80 32 L 100 35 L 100 40 L 0 40 Z" fill="url(#detail-grad)" />
              </svg>
            </div>
            <p className="text-[11px] text-center text-[#c5c5d8]">السعر الحالي في أدنى مستوياته منذ 3 أشهر</p>
          </section>

          {/* Technical Specs Bento */}
          <section className="space-y-3">
            <h3 className="font-['Cairo'] font-bold text-base text-[#dae2fd]">المواصفات التقنية</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: 'memory', color: '#e3b5ff', label: 'معالج الصوتيات', val: product.specs.processor },
                { icon: 'speaker', color: '#7dffa2', label: 'المشغلات', val: product.specs.screen },
                { icon: 'battery_charging_full', color: '#bdc2ff', label: 'البطارية والأداء', val: product.specs.battery },
                { icon: 'bolt', color: '#ffb4ab', label: 'سرعة الشحن', val: product.specs.storage },
              ].map((spec) => (
                <div key={spec.label} className="bg-[#222a3d] p-4 rounded-2xl border border-white/5">
                  <span className="material-symbols-outlined text-xl mb-1" style={{ color: spec.color }}>{spec.icon}</span>
                  <p className="text-[11px] text-[#c5c5d8]">{spec.label}</p>
                  <p className="text-xs font-bold text-[#dae2fd]"><bdi className="bidi-isolate">{spec.val}</bdi></p>
                </div>
              ))}
            </div>
          </section>

          {/* Delivery & Warranty */}
          <section className="p-5 rounded-3xl bg-[#171f33] border border-[#454656]/20 space-y-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#7dffa2]">local_shipping</span>
              <span className="text-xs text-[#dae2fd] font-medium">{product.delivery.freeDelivery}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#e3b5ff]">verified_user</span>
              <span className="text-xs text-[#dae2fd] font-medium">{product.delivery.warranty}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#bdc2ff]">assignment_return</span>
              <span className="text-xs text-[#dae2fd] font-medium">{product.delivery.returnPolicy}</span>
            </div>
          </section>
        </div>

        {/* Sticky Bottom Action Buttons */}
        <div className="p-4 bg-[#171f33] border-t border-[#454656]/20 flex gap-3">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className={`py-3.5 px-5 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0 ${
              copied
                ? 'bg-[#7dffa2] text-[#003918]'
                : 'bg-[#222a3d] text-[#bdc2ff] border border-[#bdc2ff]/20 hover:bg-[#2d3449]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{copied ? 'check' : 'share'}</span>
          </button>

          {/* Buy Now Button */}
          <button
            onClick={() => {
              alert('جاري توجيهك للمتجر للحصول على خصم الكاش باك المباشر!');
              onClose();
            }}
            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#2d3fe3] via-[#8700d0] to-[#3647ea] text-white font-bold font-['Cairo'] text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">shopping_cart</span>
            <span>اشتري الآن واربح الكاش باك</span>
          </button>
        </div>
      </div>
    </div>
  );
};
