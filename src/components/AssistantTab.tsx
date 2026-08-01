import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { useWishlist } from '../context/WishlistContext';

interface AssistantTabProps {
  onOpenProductDetail: () => void;
}

const budgetCategories = [
  { label: 'الأجهزة الإلكترونية والتقنية', pct: 45, color: '#2d3fe3', icon: 'devices' },
  { label: 'المشتريات والسلع الأساسية', pct: 30, color: '#7dffa2', icon: 'shopping_basket' },
  { label: 'الترفيه والتسوق الشخصي', pct: 15, color: '#e3b5ff', icon: 'local_activity' },
  { label: 'الطوارئ والادخار اليومي', pct: 10, color: '#ffb4ab', icon: 'savings' },
];

const budgetPresets = [
  { label: '٥,٠٠٠ ج.م', val: 5000 },
  { label: '١٠,٠٠٠ ج.م', val: 10000 },
  { label: '٢٠,٠٠٠ ج.م', val: 20000 },
  { label: '٣٠,٠٠٠ ج.م', val: 30000 },
];

const smartAlternatives = [
  {
    name: 'Anker Soundcore Space Q45',
    price: '3,200 ج.م',
    originalPrice: '4,100 ج.م',
    store: 'أمازون (Amazon)',
    rating: 4.7,
    reason: 'نفس مستوى إلغاء الضوضاء تقريباً مع بطارية تدوم 50 ساعة وفرق سعر كبير!',
    tag: 'أفضل توفير',
    tagBg: 'rgba(125, 255, 162, 0.15)',
    tagColor: '#7dffa2',
  },
  {
    name: 'Sennheiser Accentum Wireless',
    price: '3,850 ج.م',
    originalPrice: '4,600 ج.م',
    store: 'نون (Noon)',
    rating: 4.8,
    reason: 'جودة صوت استثنائية وبناء فاخر مع كاش باك مباشر 250 ج.م.',
    tag: 'نقاء صوت عالي',
    tagBg: 'rgba(227, 181, 255, 0.15)',
    tagColor: '#e3b5ff',
  },
  {
    name: 'Sony WH-CH720N',
    price: '2,950 ج.م',
    originalPrice: '3,500 ج.م',
    store: 'جوميا (Jumia)',
    rating: 4.5,
    reason: 'خفيف الوزن جداً بنفس معالج الصوت وسعر اقتصادي ممتاز.',
    tag: 'سعر اقتصادي',
    tagBg: 'rgba(189, 194, 255, 0.15)',
    tagColor: '#bdc2ff',
  },
];

const promptStarters = [
  {
    icon: 'laptop_mac',
    title: 'أرخص لابتوب للألعاب',
    desc: 'مقارنة أسعار وكاش باك مباشر حتى 30,000 ج.م',
    query: 'عايز أرخص لابتوب للألعاب في حدود 30000 ج.م',
    color: '#2d3fe3',
  },
  {
    icon: 'smartphone',
    title: 'أفضل عروض الآيفون',
    desc: 'تتبع هبوط سعر آيفون 15 في المتاجر',
    query: 'اريد معرفة افضل سعر لآيفون 15 واسعار الكاش باك',
    color: '#8700d0',
  },
  {
    icon: 'headphones',
    title: 'سماعات رأس عازلة',
    desc: 'سماعات سوني وأبل بأفضل قيمة',
    query: 'ابحث عن افضل سماعات لاسلكية بخاصية إلغاء الضوضاء',
    color: '#7dffa2',
  },
  {
    icon: 'checkroom',
    title: 'كوبونات الملابس والرياضة',
    desc: 'خصومات نايكي واديداس وكارفور',
    query: 'ما هي افضل كوبونات الخصم للملابس والمشتريات؟',
    color: '#e3b5ff',
  },
];

export const AssistantTab: React.FC<AssistantTabProps> = ({ onOpenProductDetail }) => {
  const { addToCart, isInCart } = useWishlist();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<'chat' | 'alternatives' | 'budget'>('chat');
  const [budget, setBudget] = useState(10000);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setSearchInput('');
    setLoading(true);

    setTimeout(() => {
      let aiResponse: ChatMessage;

      if (query.includes('لابتوب') || query.includes('ألعاب') || query.includes('30000')) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: 'أهلاً بك! لقد قمت بتحليل السوق وتوقع الأسعار المتاحة. إليك أفضل خيار لجهاز لابتوب للألعاب بحدود ميزانيتك مع استرداد كاش باك حصري:',
          time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
          deal: {
            title: 'Lenovo Legion 5 Gaming Laptop',
            specs: 'معالج Ryzen 7 | كارت RTX 3060 | رام 16GB | SSD 512GB',
            price: '28,999 ج.م',
            originalPrice: '34,500 ج.م',
            discountText: 'أفضل سعر الآن',
            store: 'أمازون (Amazon)',
            cashback: '850 ج.م',
            imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=85',
            reason: 'يقدم أعلى أداء ألعاب مقابل السعر حالياً مع كاش باك مباشر 850 ج.م.',
            dailySavingRate: '5,501 ج.م',
          },
          suggestionChips: ['مقارنة مع بدائل أخرى', 'تتبع انخفاض السعر', 'البحث عن كوبونات'],
        };
      } else if (query.includes('سماعة') || query.includes('سوني') || query.includes('صوت')) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: 'بناءً على تحليلات سوق الإلكترونيات اليوم، إليك أفضل صفقة لسماعات إلغاء الضوضاء الفاخرة مع أعلى خصم كاش باك:',
          time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
          deal: {
            title: 'سوني WH-1000XM5 (أسود مطفي)',
            specs: 'معالج HD QN1 | إلغاء ضوضاء فائق | 30 ساعة بطارية',
            price: '14,500 ج.م',
            originalPrice: '17,200 ج.م',
            discountText: 'خصم 15% + كاش باك 435 ج.م',
            store: 'أمازون (Amazon)',
            cashback: '435 ج.م',
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=85',
            reason: 'السعر حالياً في أدنى مستوى له منذ 3 أشهر، والمخزون يتناقص بسرعة.',
            dailySavingRate: '2,700 ج.م',
          },
          suggestionChips: ['مقارنة مع بدائل أرخص', 'تتبع هبوط السعر', 'البحث عن كوبونات نون'],
        };
      } else {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `قمت بتحليل المتاجر وحاسبة الخصومات لـ "${query}". إليك أفضل صفقة موصى بها مع كاش باك مضاعف:`,
          time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
          deal: {
            title: 'آيفون 15 Pro 128GB (تيتانيوم طبيعي)',
            specs: 'شريحة A17 Pro | كاميرا 48MP | شاشة Super Retina XDR',
            price: '42,500 ج.م',
            originalPrice: '48,000 ج.م',
            discountText: 'توفير 5,500 ج.م',
            store: 'نون (Noon)',
            cashback: '850 ج.م',
            imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=85',
            reason: 'أفضل عرض متاح في السوق المصري مع توصيل مجاني وكاش باك محول فورياً.',
            dailySavingRate: '5,500 ج.م',
          },
          suggestionChips: ['بدائل بسعر أقل', 'تفعيل تنبيه الخصم', 'استخدام كوبون إضافي'],
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
      setLoading(false);
    }, 1000);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="pt-28 pb-12 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col min-h-[calc(100vh-80px)] animate-fade-in">

      {/* Top AI Copilot Header */}
      <div className="bg-gradient-to-r from-[#131b2e] via-[#1a2238] to-[#131b2e] border border-[#8700d0]/30 rounded-3xl p-4 sm:p-5 mb-5 shadow-xl relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#8700d0]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3.5 text-center sm:text-right">
            <div className="w-12 h-12 rounded-2xl ai-gradient flex items-center justify-center text-white shadow-lg shadow-[#8700d0]/40 shrink-0 border border-white/20">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                magic_button
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h2 className="font-headline font-black text-lg sm:text-xl text-white">ذكاء Waffarly AI</h2>
                <span className="bg-[#7dffa2]/15 text-[#7dffa2] border border-[#7dffa2]/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 font-headline">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7dffa2] animate-pulse" />
                  متصل ⚡
                </span>
              </div>
              <p className="text-[#c5c5d8] text-xs font-body mt-0.5">مساعدك الشخصي للبحث عن أرخص الأسعار والكاش باك</p>
            </div>
          </div>

          {/* Controls: Mode Switcher + Clear Chat */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex gap-1 bg-[#0b1326]/80 p-1 rounded-2xl border border-white/10 shrink-0 flex-1 sm:flex-none">
              {[
                { id: 'chat', label: 'محادثة ذكية', icon: 'chat' },
                { id: 'alternatives', label: 'بدائل أرخص', icon: 'compare_arrows' },
                { id: 'budget', label: 'الميزانية', icon: 'savings' },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id as typeof activeMode)}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 font-headline ripple ${
                    activeMode === mode.id
                      ? 'bg-gradient-to-r from-[#8700d0] to-[#2d3fe3] text-white shadow-lg shadow-[#8700d0]/25'
                      : 'text-[#c5c5d8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{mode.icon}</span>
                  <span>{mode.label}</span>
                </button>
              ))}
            </div>

            {messages.length > 0 && activeMode === 'chat' && (
              <button
                onClick={handleClearChat}
                title="محادثة جديدة"
                className="w-9 h-9 rounded-xl bg-[#131b2e] border border-white/10 hover:bg-[#222a3d] text-[#c5c5d8] hover:text-white flex items-center justify-center transition-all shrink-0 active:scale-90 ripple"
              >
                <span className="material-symbols-outlined text-base">autorenew</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ═══ MODE: CHAT ═══ */}
      {activeMode === 'chat' && (
        <div className="flex-1 flex flex-col justify-between space-y-4">

          {/* Messages Scroll Area */}
          <div className="flex-1 space-y-5">
            {/* Welcome Screen (Shown when messages array is empty!) */}
            {messages.length === 0 && (
              <div className="py-6 space-y-6 animate-fade-in text-center">
                <div className="space-y-2 max-w-lg mx-auto">
                  <div className="w-16 h-16 rounded-3xl ai-gradient mx-auto flex items-center justify-center shadow-xl shadow-[#8700d0]/40 border border-white/20 animate-float">
                    <span className="material-symbols-outlined text-3xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                      auto_awesome
                    </span>
                  </div>
                  <h3 className="font-headline font-black text-xl sm:text-2xl text-white">
                    أهلاً بك يا أحمد 👋 كيف أساعدك في التوفير؟
                  </h3>
                  <p className="text-[#c5c5d8] text-xs sm:text-sm font-body leading-relaxed">
                    اختر سؤالاً سريعاً أو اكتب اسم أي منتج للبحث عن أقوى العروض والكاش باك المباشر!
                  </p>
                </div>

                {/* Prompt Starters Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl mx-auto text-right">
                  {promptStarters.map((starter, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(starter.query)}
                      className="bg-[#131b2e] border border-[#454656]/25 hover:border-[#bdc2ff]/50 rounded-2xl p-4 transition-all cursor-pointer group shadow-lg flex items-start gap-3.5 active:scale-98 text-right ripple"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner border border-white/5"
                        style={{ background: `${starter.color}20`, color: starter.color }}
                      >
                        <span className="material-symbols-outlined text-xl">{starter.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-sm text-[#dae2fd] group-hover:text-white transition-colors">
                          {starter.title}
                        </h4>
                        <p className="text-[#c5c5d8] text-[11px] mt-0.5 font-body leading-snug">{starter.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Active Chat Conversation Trajectory */}
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-3 animate-fade-in">
                {msg.sender === 'user' ? (
                  /* User Message Bubble */
                  <div className="flex flex-col items-start self-start max-w-[85%] sm:max-w-[70%] mr-auto">
                    <div className="bg-gradient-to-br from-[#2d3fe3] to-[#1f2ca8] text-white rounded-2xl rounded-tl-sm p-3.5 sm:p-4 shadow-lg border border-white/10">
                      <p className="font-body text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    <span className="text-[#8899cc] text-[10px] font-body mt-1 mr-2">{msg.time}</span>
                  </div>
                ) : (
                  /* AI Response Block */
                  <div className="flex flex-col items-end self-end w-full max-w-2xl ml-auto space-y-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className="w-6 h-6 rounded-lg ai-gradient flex items-center justify-center shadow-md">
                        <span className="material-symbols-outlined text-xs text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                          magic_button
                        </span>
                      </div>
                      <span className="text-[#e3b5ff] font-headline font-bold text-xs">مساعد وافرلي الذكي</span>
                    </div>

                    <div className="bg-[#131b2e] rounded-2xl rounded-tr-sm p-4 sm:p-5 shadow-xl border border-[#8700d0]/30 space-y-4 w-full">
                      <p className="font-body text-sm leading-relaxed text-[#dae2fd]">{msg.text}</p>

                      {/* Product Recommendation Card */}
                      {msg.deal && (
                        <div className="bg-[#0b1326] rounded-2xl overflow-hidden border border-[#8700d0]/40 text-right shadow-xl group">
                          {/* Product Image */}
                          <div className="relative h-44 sm:h-48 w-full bg-[#171f33] overflow-hidden">
                            <img
                              src={msg.deal.imageUrl}
                              alt={msg.deal.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-[#0b1326]/40 to-transparent" />

                            <div className="absolute top-3 right-3 bg-[#8700d0]/90 backdrop-blur-xl px-3 py-1 rounded-xl flex items-center gap-1 border border-white/20 shadow-md">
                              <span className="material-symbols-outlined text-xs text-[#7dffa2]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                bolt
                              </span>
                              <span className="text-[11px] font-bold text-white font-headline">{msg.deal.discountText || 'أفضل سعر الآن'}</span>
                            </div>

                            <div className="absolute bottom-3 right-3 bg-[#7dffa2] text-[#003918] px-3 py-1 rounded-xl font-headline font-black text-xs shadow-md">
                              <span>كاش باك {msg.deal.cashback}</span>
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="p-4 space-y-3">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-white/10 pb-3">
                              <div>
                                <h3 className="font-headline font-bold text-lg text-white leading-tight">
                                  <bdi>{msg.deal.title}</bdi>
                                </h3>
                                <p className="text-[#c5c5d8] text-xs mt-0.5 font-body">
                                  <bdi>{msg.deal.specs}</bdi>
                                </p>
                                <p className="text-[10px] text-[#bdc2ff] mt-0.5 font-bold">المتجر: {msg.deal.store}</p>
                              </div>
                              <div className="text-right sm:text-left shrink-0">
                                <span className="text-[#7dffa2] font-headline font-black text-xl sm:text-2xl block">
                                  <bdi>{msg.deal.price}</bdi>
                                </span>
                                {msg.deal.originalPrice && (
                                  <span className="text-[#8899cc] line-through text-xs font-body block">
                                    <bdi>{msg.deal.originalPrice}</bdi>
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Reason */}
                            {msg.deal.reason && (
                              <div className="bg-[#171f33] p-3 rounded-xl border border-white/5 space-y-0.5">
                                <div className="flex items-center gap-1 text-[#e3b5ff] text-[11px] font-bold font-headline">
                                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    auto_awesome
                                  </span>
                                  <span>سبب التوصية:</span>
                                </div>
                                <p className="text-[#c5c5d8] text-xs leading-relaxed font-body">{msg.deal.reason}</p>
                              </div>
                            )}

                            {/* Price Trend SVG */}
                            <div className="bg-[#171f33] rounded-xl p-3 border border-white/5 space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-[11px] text-[#c5c5d8] font-bold">مسار السعر (آخر 30 يوماً)</span>
                                <span className="text-[10px] text-[#7dffa2] font-bold font-headline bg-[#7dffa2]/15 px-2 py-0.5 rounded-full">
                                  انخفاض 12% ↓
                                </span>
                              </div>
                              <div className="h-10 w-full pt-1">
                                <svg className="w-full h-full" viewBox="0 0 100 35" preserveAspectRatio="none">
                                  <path d="M 0 10 L 25 18 L 50 12 L 75 28 L 100 32" fill="none" stroke="#7dffa2" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                                  <linearGradient id="ai-deal-grad3" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#7dffa2" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#7dffa2" stopOpacity="0" />
                                  </linearGradient>
                                  <path d="M 0 10 L 25 18 L 50 12 L 75 28 L 100 32 L 100 35 L 0 35 Z" fill="url(#ai-deal-grad3)" />
                                </svg>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-1">
                              <button
                                onClick={() => {
                                  const d = msg.deal!;
                                  addToCart({
                                    id: `ai-${d.title.replace(/\s/g, '-')}`,
                                    title: d.title,
                                    price: parseFloat(String(d.price).replace(/[^0-9.]/g, '')) || 0,
                                    currency: 'ج.م',
                                    store: d.store || 'وافرلي',
                                    storeLogo: '',
                                    productImage: d.imageUrl || '',
                                    cashbackAmount: parseFloat(String(d.cashback).replace(/[^0-9.]/g, '')) || 0,
                                  });
                                }}
                                className={`py-2.5 px-3.5 rounded-xl flex items-center justify-center gap-1.5 border transition-all active:scale-95 ripple font-headline font-bold text-xs shrink-0 ${
                                  isInCart(`ai-${msg.deal!.title.replace(/\s/g, '-')}`)
                                    ? 'bg-[#7dffa2]/20 border-[#7dffa2] text-[#7dffa2]'
                                    : 'bg-[#171f33] border-white/15 text-[#bdc2ff] hover:bg-white/10'
                                }`}
                              >
                                <span className="material-symbols-outlined text-base" style={isInCart(`ai-${msg.deal!.title.replace(/\s/g, '-')}`) ? { fontVariationSettings: "'FILL' 1" } : {}}>
                                  {isInCart(`ai-${msg.deal!.title.replace(/\s/g, '-')}`) ? 'check_circle' : 'shopping_cart'}
                                </span>
                                <span>{isInCart(`ai-${msg.deal!.title.replace(/\s/g, '-')}`) ? 'في السلة ✓' : 'أضف للسلة'}</span>
                              </button>

                              <button
                                onClick={onOpenProductDetail}
                                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#2d3fe3] via-[#8700d0] to-[#3647ea] text-white font-headline font-bold text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5 ripple"
                              >
                                <span className="material-symbols-outlined text-base">shopping_bag</span>
                                <span>عرض التفاصيل والشراء</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <span className="text-[#8899cc] text-[10px] font-body mt-1 ml-2">{msg.time}</span>

                    {/* Suggestion Chips */}
                    {msg.suggestionChips && (
                      <div className="flex flex-wrap gap-2 justify-end pt-1">
                        {msg.suggestionChips.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(chip)}
                            className="px-3.5 py-1.5 rounded-full bg-[#131b2e] border border-[#bdc2ff]/20 text-[#dae2fd] text-xs font-medium hover:bg-[#8700d0]/25 transition-all flex items-center gap-1 active:scale-95 ripple font-body"
                          >
                            <span className="material-symbols-outlined text-xs text-[#e3b5ff]">auto_awesome</span>
                            <span>{chip}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex items-center gap-3 p-3.5 bg-[#131b2e] rounded-2xl border border-[#8700d0]/30 max-w-[220px] animate-fade-in">
                <div className="w-7 h-7 rounded-lg ai-gradient flex items-center justify-center shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-xs text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                    magic_button
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{
                          background: 'linear-gradient(135deg, #e3b5ff, #8700d0)',
                          animationDelay: `${delay}ms`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#e3b5ff] font-body">جاري تحليل السوق...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Inline Chat Input Form — Seamlessly Attached at the bottom of the container */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="bg-[#131b2e] border border-[#bdc2ff]/25 rounded-2xl p-2 shadow-xl focus-within:border-[#e3b5ff] transition-all flex items-center gap-2 shrink-0 mt-4"
          >
            <button
              type="button"
              title="إضافة ملف"
              className="w-9 h-9 rounded-xl text-[#c5c5d8] hover:text-white hover:bg-white/5 flex items-center justify-center transition-all shrink-0 active:scale-90"
            >
              <span className="material-symbols-outlined text-xl">add_circle</span>
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="اسأل وافرلي عن أي منتج، لابتوب، أو عروض كاش باك..."
              className="bg-transparent border-none focus:ring-0 text-sm flex-1 text-[#dae2fd] px-2 placeholder:text-[#c5c5d8]/40 font-body"
            />

            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              title="إرسال"
              className="w-10 h-10 rounded-xl ai-gradient flex items-center justify-center text-white shadow-md shadow-[#8700d0]/30 disabled:opacity-40 active:scale-90 transition-all shrink-0 ripple"
            >
              <span className="material-symbols-outlined text-lg transform -scale-x-100" style={{ fontVariationSettings: "'FILL' 1" }}>
                send
              </span>
            </button>
          </form>

        </div>
      )}

      {/* ═══ MODE: SMARTER ALTERNATIVES ═══ */}
      {activeMode === 'alternatives' && (
        <div className="space-y-5 animate-fade-in">
          <div className="bg-[#131b2e] border border-[#bdc2ff]/20 rounded-2xl p-4 flex items-center gap-3 shadow-xl">
            <div className="w-11 h-11 rounded-xl bg-[#2d3fe3]/20 border border-[#2d3fe3]/30 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#bdc2ff] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                compare_arrows
              </span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-[#dae2fd] text-base">بدائل أرخص بنفس الجودة الممتازة</h3>
              <p className="text-[#c5c5d8] text-xs font-body">اقتراحات ذكية توفر لك المال بدون التنازل عن الأداء والضمان</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {smartAlternatives.map((alt, idx) => (
              <div
                key={idx}
                className="bg-[#131b2e] border border-[#454656]/30 hover:border-[#bdc2ff]/50 rounded-2xl p-5 transition-all cursor-pointer group shadow-xl"
                onClick={onOpenProductDetail}
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-bold px-2.5 py-0.5 rounded-lg font-headline"
                        style={{ background: alt.tagBg, color: alt.tagColor, border: `1px solid ${alt.tagColor}40` }}
                      >
                        {alt.tag}
                      </span>
                      <div className="flex items-center gap-1 text-[#7dffa2] text-xs font-bold">
                        <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        {alt.rating}
                      </div>
                    </div>
                    <h4 className="font-headline font-bold text-[#dae2fd] text-base group-hover:text-white transition-colors">{alt.name}</h4>
                    <p className="text-[#c5c5d8] text-xs font-body">{alt.reason} · {alt.store}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black font-headline text-xl text-[#7dffa2]"><bdi>{alt.price}</bdi></p>
                    <p className="text-[#8899cc] line-through text-xs font-body"><bdi>{alt.originalPrice}</bdi></p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenProductDetail();
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#171f33] hover:bg-[#222a3d] border border-white/10 text-[#bdc2ff] font-headline font-bold text-xs transition-all flex items-center justify-center gap-1.5 ripple"
                >
                  <span className="material-symbols-outlined text-base">shopping_cart</span>
                  <span>عرض التفاصيل والشراء</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ MODE: BUDGET CALCULATOR ═══ */}
      {activeMode === 'budget' && (
        <div className="space-y-5 animate-fade-in">
          <div className="bg-[#131b2e] border border-[#7dffa2]/20 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex justify-between items-center">
              <h3 className="font-headline font-bold text-[#dae2fd] text-base flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7dffa2]">savings</span>
                حاسبة الميزانية والتخطيط الشامل
              </h3>
              <span className="text-xl font-black font-headline text-[#7dffa2]">{budget.toLocaleString('ar-EG')} ج.م</span>
            </div>

            <div className="space-y-2">
              <input
                type="range"
                min={500}
                max={50000}
                step={1000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-[#7dffa2] h-2 bg-[#222a3d] rounded-full cursor-pointer"
              />
              <div className="flex gap-2 mt-2 flex-wrap">
                {budgetPresets.map((p) => (
                  <button
                    key={p.val}
                    onClick={() => setBudget(p.val)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all font-headline ${
                      budget === p.val ? 'bg-[#7dffa2] text-[#003918] shadow-md' : 'bg-[#222a3d] text-[#c5c5d8] hover:bg-[#2d3449]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Spending Distribution */}
          <div className="bg-[#131b2e] border border-[#454656]/30 rounded-2xl p-5 space-y-3 shadow-xl">
            <h4 className="font-headline font-bold text-[#dae2fd] text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[#bdc2ff] text-lg">pie_chart</span>
              التوزيع المقترح للميزانية
            </h4>

            <div className="space-y-3">
              {budgetCategories.map((cat) => {
                const amount = Math.round((budget * cat.pct) / 100);
                return (
                  <div key={cat.label} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm" style={{ color: cat.color }}>{cat.icon}</span>
                        <span className="text-[#dae2fd] text-xs font-bold font-headline">{cat.label}</span>
                      </div>
                      <div className="flex items-center gap-2 font-headline text-xs">
                        <span className="font-bold" style={{ color: cat.color }}>{cat.pct}%</span>
                        <span className="text-[#7dffa2] font-bold">{amount.toLocaleString('ar-EG')} ج.م</span>
                      </div>
                    </div>
                    <div className="h-2 bg-[#222a3d] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${cat.pct}%`, background: cat.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
