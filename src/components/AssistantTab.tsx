import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { mockInitialChatHistory } from '../data/mockData';

interface AssistantTabProps {
  onOpenProductDetail: () => void;
}

// Smart Alternative Finder data
const smartAlternatives = [
  {
    name: 'Sony WH-1000XM4',
    price: '3,200 ج.م',
    originalPrice: '3,800 ج.م',
    cashback: '280 ج.م',
    store: 'نون',
    rating: 4.7,
    savings: '18%',
    tag: 'الأوفر',
    tagColor: '#7dffa2',
    tagBg: '#7dffa215',
    reason: 'نفس الجودة بسعر أقل',
  },
  {
    name: 'JBL Tour One M2',
    price: '2,850 ج.م',
    originalPrice: '3,500 ج.م',
    cashback: '320 ج.م',
    store: 'أمازون',
    rating: 4.5,
    savings: '19%',
    tag: 'الأشهر',
    tagColor: '#bdc2ff',
    tagBg: '#bdc2ff15',
    reason: 'أفضل مبيعاً هذا الشهر',
  },
  {
    name: 'Bose QC45',
    price: '3,600 ج.م',
    originalPrice: '4,200 ج.م',
    cashback: '400 ج.م',
    store: 'جوميا',
    rating: 4.8,
    savings: '14%',
    tag: 'الأعلى تقييماً',
    tagColor: '#e3b5ff',
    tagBg: '#e3b5ff15',
    reason: 'أعلى تقييم من المستخدمين',
  },
];

// Budget Advisor quick presets
const budgetPresets = [
  { label: '1,000 ج.م', val: 1000 },
  { label: '2,500 ج.م', val: 2500 },
  { label: '5,000 ج.م', val: 5000 },
  { label: '10,000 ج.م', val: 10000 },
];

// Budget categories
const budgetCategories = [
  { label: 'موبايلات', pct: 40, icon: 'smartphone', color: '#bdc2ff' },
  { label: 'إلكترونيات', pct: 30, icon: 'devices', color: '#e3b5ff' },
  { label: 'ملابس', pct: 20, icon: 'checkroom', color: '#7dffa2' },
  { label: 'طعام', pct: 10, icon: 'restaurant', color: '#ffb4ab' },
];

export const AssistantTab: React.FC<AssistantTabProps> = ({ onOpenProductDetail }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockInitialChatHistory);
  const [inputText, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<'chat' | 'alternatives' | 'budget'>('chat');
  const [budget, setBudget] = useState(5000);
  const [budgetCategory, setBudgetCategory] = useState('موبايلات');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setSearchInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });

      if (!res.ok) throw new Error('Failed');
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: data.reply || 'إليك النتيجة والتوصية الذكية:',
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        deal: data.deal || undefined,
        suggestionChips: data.suggestionChips || ['مقارنة الأسعار', 'البحث عن كوبونات', 'تتبع السعر']
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: `أهلاً! لقد قمت بتحليل السوق لطلبك "${textToSend}". إليك أفضل صفقة:`,
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        deal: {
          title: 'Samsung Galaxy A05',
          specs: '6.7 بوصة | 128GB | بطارية 5000 mAh',
          price: '4,250 ج.م',
          originalPrice: '4,800 ج.م',
          discountText: 'توصية ذكية',
          store: 'Amazon',
          cashback: '450 ج.م',
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB04eLak2vheJIvzwWSKOhaPOlkBbaZ1jIUmjVk6pQM3iyzyVPSYzRkiG7SopfKlzBmDevQIY2DpbTdqQG92KmLPL3ysdY6GwlwtUE67E42rjxaT9K_ltrErXCNC70YE1U4T_j8Oiay7ZJotYvUk3zuw-Vdkx231j1Q2GfEzluO9UxPMnZ7QBBH5mn00uog9mJJPS_czSg8iD1yZSbaab_9XSsHr2rgCV1EnqcAlRc5nfkxQl8PXwwNVbedgMDkF65N7Pxl0SO_HIgW',
          reason: 'هذا الموبايل يقدم أفضل قيمة مقابل السعر حالياً مع بطارية ممتازة وشاشة كبيرة.',
          dailySavingRate: '5,501 ج.م'
        },
        suggestionChips: ['مقارنة الأسعار', 'عرض المراجعات', 'البحث عن كوبونات']
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-32 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col min-h-screen animate-fade-in">

      {/* Top Identity Header */}
      <div className="flex justify-between items-center mb-5 pb-4 border-b border-[#454656]/10">
        <div className="flex items-center gap-2">
          <div className="ai-gradient w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#8700d0]/30">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>magic_button</span>
          </div>
          <div>
            <h2 className="font-['Cairo'] font-bold text-base text-[#e3b5ff]">ذكاء Waffarly الاصطناعي</h2>
            <p className="text-[#c5c5d8] text-[11px]">مساعد الشراء الشخصي وتحليل العروض</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7dffa2] animate-pulse" />
          <span className="text-[10px] bg-[#8700d0]/20 text-[#e3b5ff] border border-[#e3b5ff]/20 px-2.5 py-1 rounded-full font-bold">متصل الآن</span>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex gap-2 mb-5 bg-[#0b1326] p-1.5 rounded-2xl border border-white/5">
        {[
          { id: 'chat', label: 'محادثة ذكية', icon: 'chat' },
          { id: 'alternatives', label: 'بدائل أرخص', icon: 'compare_arrows' },
          { id: 'budget', label: 'مستشار الميزانية', icon: 'savings' },
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id as typeof activeMode)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
              activeMode === mode.id
                ? 'bg-gradient-to-r from-[#8700d0] to-[#2d3fe3] text-white shadow-lg'
                : 'text-[#c5c5d8] hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{mode.icon}</span>
            <span className="hidden sm:inline">{mode.label}</span>
          </button>
        ))}
      </div>

      {/* ═══ MODE: CHAT ═══ */}
      {activeMode === 'chat' && (
        <div className="flex-1 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-3 animate-fade-in">
              {msg.sender === 'user' ? (
                <div className="flex flex-col items-start self-start max-w-[85%] mr-auto">
                  <div className="glass-bubble rounded-t-3xl rounded-br-3xl p-4 text-[#dae2fd] shadow-lg">
                    <p className="font-['IBM_Plex_Arabic'] text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-[#c5c5d8] text-[10px] mt-1 mr-2">{msg.time}</span>
                </div>
              ) : (
                <div className="flex flex-col items-end self-end max-w-[98%] ml-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#e3b5ff] font-['Cairo'] font-bold text-xs">المساعد الذكي</span>
                    <div className="ai-gradient w-6 h-6 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-[13px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>magic_button</span>
                    </div>
                  </div>

                  <div className="bg-[#222a3d] rounded-t-3xl rounded-bl-3xl p-5 shadow-2xl space-y-4 border-r-4 border-[#8700d0] w-full">
                    <p className="font-['IBM_Plex_Arabic'] text-sm leading-relaxed text-[#dae2fd]">{msg.text}</p>

                    {msg.deal && (
                      <div className="glass-card rounded-[28px] overflow-hidden border border-white/10 mt-3 text-right">
                        <div className="relative h-48 w-full bg-[#131b2e]">
                          <img src={msg.deal.imageUrl} alt={msg.deal.title} className="w-full h-full object-cover" />
                          <div className="absolute top-4 left-4 bg-[#8700d0]/80 backdrop-blur-xl px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                            <span className="material-symbols-outlined text-sm text-[#e3b5ff]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                            <span className="text-[11px] font-bold text-[#e7c0ff] font-['IBM_Plex_Arabic']">{msg.deal.discountText || 'توصية ذكية'}</span>
                          </div>
                        </div>

                        <div className="p-5 space-y-4">
                          <div className="flex justify-between items-start gap-3">
                            <div>
                              <h3 className="font-['Cairo'] font-black text-xl text-[#dae2fd]"><bdi>{msg.deal.title}</bdi></h3>
                              <p className="text-[#c5c5d8] text-xs mt-1"><bdi>{msg.deal.specs}</bdi></p>
                            </div>
                            <div className="flex flex-col items-end shrink-0">
                              <span className="text-[#7dffa2] font-['Cairo'] font-black text-2xl"><bdi>{msg.deal.price}</bdi></span>
                              {msg.deal.originalPrice && (
                                <span className="text-[#c5c5d8] line-through text-xs"><bdi>{msg.deal.originalPrice}</bdi></span>
                              )}
                            </div>
                          </div>

                          {msg.deal.reason && (
                            <p className="text-[#c5c5d8] text-xs leading-relaxed bg-[#131b2e]/60 p-3 rounded-2xl border border-white/5">{msg.deal.reason}</p>
                          )}

                          <div className="bg-[#060e20] rounded-2xl p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] text-[#c5c5d8]">مخطط السعر (آخر 30 يوم)</span>
                              <span className="text-[10px] text-[#00e475] font-bold">انخفاض بنسبة 12%</span>
                            </div>
                            <div className="h-10 w-full flex items-end gap-1">
                              {[8, 6, 7, 9, 4, 3].map((h, i) => (
                                <div key={i} className={`w-full rounded-sm bg-gradient-to-t from-[#7dffa2]/${i === 5 ? '100' : '30'} to-transparent`} style={{ height: `${h * 4}px` }} />
                              ))}
                            </div>
                          </div>

                          <button
                            onClick={onOpenProductDetail}
                            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#2d3fe3] to-[#3647ea] text-white font-bold text-sm shadow-lg shadow-[#2d3fe3]/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                          >
                            <span className="material-symbols-outlined text-lg">shopping_bag</span>
                            <span>عرض تفاصيل الصفقة والشراء</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <span className="text-[#c5c5d8] text-[10px] mt-1 ml-2">{msg.time}</span>

                  {msg.suggestionChips && (
                    <div className="flex flex-wrap gap-2 justify-end pt-2">
                      {msg.suggestionChips.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(chip)}
                          className="px-3.5 py-1.5 rounded-full bg-[#222a3d] border border-[#454656]/30 text-[#dae2fd] text-xs font-medium hover:bg-[#8700d0]/20 hover:border-[#8700d0]/50 transition-all flex items-center gap-1.5 active:scale-95"
                        >
                          <span className="material-symbols-outlined text-sm text-[#e3b5ff]">auto_awesome</span>
                          <span>{chip}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 p-4 bg-[#222a3d] rounded-2xl max-w-[220px] border border-[#8700d0]/30">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[#e3b5ff] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#e3b5ff] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#e3b5ff] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs text-[#e3b5ff] font-bold">جاري تحليل السوق...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* ═══ MODE: SMARTER ALTERNATIVES ═══ */}
      {activeMode === 'alternatives' && (
        <div className="space-y-5 animate-fade-in">
          {/* Header */}
          <div className="bg-[#131b2e] border border-[#bdc2ff]/15 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2d3fe3]/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#bdc2ff]" style={{ fontVariationSettings: "'FILL' 1" }}>compare_arrows</span>
            </div>
            <div>
              <h3 className="font-['Cairo'] font-bold text-[#dae2fd] text-sm">بدائل أرخص بنفس الجودة</h3>
              <p className="text-[#c5c5d8] text-xs">بدائل مقترحة بالذكاء الاصطناعي بدل سوني WH-1000XM5</p>
            </div>
          </div>

          {/* Original Product Reference */}
          <div className="bg-[#222a3d]/60 border border-[#454656]/20 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#ffb4ab]">info</span>
              <div>
                <p className="text-xs text-[#c5c5d8]">تبحث عن بديل لـ</p>
                <p className="font-bold text-[#dae2fd] text-sm">Sony WH-1000XM5</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#c5c5d8]">سعره</p>
              <p className="font-black text-[#ffb4ab] text-lg font-['Cairo']">4,800 ج.م</p>
            </div>
          </div>

          {/* Alternatives Cards */}
          <div className="space-y-4">
            {smartAlternatives.map((alt, idx) => (
              <div
                key={idx}
                className="bg-[#131b2e] border border-[#454656]/20 hover:border-[#bdc2ff]/40 rounded-2xl p-4 transition-all cursor-pointer group shadow-lg"
                onClick={onOpenProductDetail}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[10px] font-black px-2 py-0.5 rounded-md"
                        style={{ background: alt.tagBg, color: alt.tagColor, border: `1px solid ${alt.tagColor}40` }}
                      >
                        {alt.tag}
                      </span>
                      <div className="flex items-center gap-0.5 text-[#7dffa2] text-[10px]">
                        <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        {alt.rating}
                      </div>
                    </div>
                    <h4 className="font-['Cairo'] font-bold text-[#dae2fd] text-base">{alt.name}</h4>
                    <p className="text-[#c5c5d8] text-xs mt-0.5">{alt.reason} · {alt.store}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black font-['Cairo'] text-xl text-[#7dffa2]"><bdi>{alt.price}</bdi></p>
                    <p className="text-[#c5c5d8] line-through text-xs"><bdi>{alt.originalPrice}</bdi></p>
                  </div>
                </div>

                {/* Savings bar comparison */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-[#222a3d] rounded-xl p-2.5 text-center">
                    <p className="text-[9px] text-[#c5c5d8] mb-0.5">نسبة الخصم</p>
                    <p className="text-xs font-black text-[#7dffa2]">{alt.savings}</p>
                  </div>
                  <div className="bg-[#222a3d] rounded-xl p-2.5 text-center">
                    <p className="text-[9px] text-[#c5c5d8] mb-0.5">كاش باك</p>
                    <p className="text-xs font-black text-[#e3b5ff]">{alt.cashback}</p>
                  </div>
                  <div className="bg-[#222a3d] rounded-xl p-2.5 text-center">
                    <p className="text-[9px] text-[#c5c5d8] mb-0.5">المتجر</p>
                    <p className="text-xs font-black text-[#bdc2ff]">{alt.store}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ask for custom search */}
          <button
            onClick={() => setActiveMode('chat')}
            className="w-full py-3 rounded-2xl bg-[#222a3d] border border-[#bdc2ff]/20 text-[#bdc2ff] font-bold text-sm hover:bg-[#2d3449] transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">search</span>
            ابحث عن بديل لمنتج آخر
          </button>
        </div>
      )}

      {/* ═══ MODE: BUDGET ADVISOR ═══ */}
      {activeMode === 'budget' && (
        <div className="space-y-5 animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#131b2e] to-[#0b1326] border border-[#7dffa2]/20 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7dffa2]/15 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#7dffa2]" style={{ fontVariationSettings: "'FILL' 1" }}>savings</span>
              </div>
              <div>
                <h3 className="font-['Cairo'] font-bold text-[#dae2fd] text-sm">مستشار الميزانية الشخصية</h3>
                <p className="text-[#c5c5d8] text-xs">حدد ميزانيتك وسأقترح أفضل توزيع للمشتريات</p>
              </div>
            </div>

            {/* Budget Input */}
            <div>
              <div className="flex justify-between text-xs text-[#c5c5d8] mb-2">
                <span>ميزانية الشهر</span>
                <span className="font-bold text-[#7dffa2]">{budget.toLocaleString('ar-EG')} ج.م</span>
              </div>
              <input
                type="range"
                min={500}
                max={20000}
                step={500}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-[#7dffa2] h-2 rounded-full"
              />
              <div className="flex gap-2 mt-2 flex-wrap">
                {budgetPresets.map((p) => (
                  <button
                    key={p.val}
                    onClick={() => setBudget(p.val)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      budget === p.val ? 'bg-[#7dffa2] text-[#003918]' : 'bg-[#222a3d] text-[#c5c5d8] hover:bg-[#2d3449]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Spending Distribution */}
          <div className="bg-[#131b2e] border border-[#454656]/20 rounded-2xl p-5 space-y-4">
            <h4 className="font-['Cairo'] font-bold text-[#dae2fd] text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[#bdc2ff] text-lg">pie_chart</span>
              التوزيع المقترح للميزانية
            </h4>

            <div className="space-y-3">
              {budgetCategories.map((cat) => {
                const amount = Math.round((budget * cat.pct) / 100);
                return (
                  <div key={cat.label}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm" style={{ color: cat.color }}>{cat.icon}</span>
                        <span className="text-[#dae2fd] text-xs font-medium">{cat.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold" style={{ color: cat.color }}>{cat.pct}%</span>
                        <span className="text-[#c5c5d8] text-xs">{amount.toLocaleString('ar-EG')} ج.م</span>
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

          {/* Smart Tips */}
          <div className="bg-[#131b2e] border border-[#e3b5ff]/15 rounded-2xl p-5 space-y-3">
            <h4 className="font-['Cairo'] font-bold text-[#e3b5ff] text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>tips_and_updates</span>
              نصائح ذكية بناءً على ميزانيتك
            </h4>
            {[
              { tip: `بميزانية ${budget.toLocaleString('ar-EG')} ج.م، أفضل استثمار هو موبايل فلاجشيب مع كاش باك يصل لـ 15%.`, icon: 'smartphone', color: '#bdc2ff' },
              { tip: 'استخدم كوبونات وافرلي لتوفير 10-20% إضافية على مشترياتك الكبيرة.', icon: 'sell', color: '#7dffa2' },
              { tip: 'فعّل تتبع الأسعار على المنتجات اللي تريدها وانتظر أفضل وقت للشراء.', icon: 'trending_down', color: '#e3b5ff' },
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-[#222a3d]/60 rounded-xl">
                <span className="material-symbols-outlined text-sm shrink-0 mt-0.5" style={{ color: t.color, fontVariationSettings: "'FILL' 1" }}>{t.icon}</span>
                <p className="text-[#c5c5d8] text-xs leading-relaxed">{t.tip}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveMode('chat')}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#8700d0] to-[#2d3fe3] text-white font-bold text-sm shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            اسأل المساعد عن أفضل مشتريات بميزانيتك
          </button>
        </div>
      )}

      {/* Chat Input — only shown in chat mode */}
      {activeMode === 'chat' && (
        <div className="fixed bottom-20 left-0 right-0 w-full z-40 px-4 pointer-events-none">
          <div className="max-w-3xl mx-auto pointer-events-auto">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="bg-[#131b2e]/95 backdrop-blur-2xl rounded-full border border-[#bdc2ff]/20 flex items-center px-4 py-2 shadow-2xl focus-within:border-[#bdc2ff] transition-all"
            >
              <button type="button" className="text-[#c5c5d8] hover:text-[#bdc2ff] p-2">
                <span className="material-symbols-outlined text-xl">add_circle</span>
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="اسأل وافرلي عن أي منتج أو عروض..."
                className="bg-transparent border-none focus:ring-0 text-sm flex-1 text-[#dae2fd] px-3 placeholder:text-[#c5c5d8]/50 font-['IBM_Plex_Arabic']"
              />
              <button
                type="submit"
                disabled={loading || !inputText.trim()}
                className="w-10 h-10 rounded-full ai-gradient flex items-center justify-center text-white shadow-xl shadow-[#8700d0]/30 disabled:opacity-50 active:scale-90 transition-all"
              >
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
