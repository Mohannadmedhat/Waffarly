import React, { useState } from 'react';
import { mockNearbyDeals } from '../data/mockData';

interface NearbyDealsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Extended mock data for the map
const extendedDeals = [
  ...mockNearbyDeals,
  { id: 'deal-4', title: 'كافيه أرت هاوس', category: 'مطاعم وكافيهات', discountText: 'اشترِ 1 واحصل على 1', rating: 4.6, distance: 'على بعد 1.8 كم', imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80' },
  { id: 'deal-5', title: 'صيدلية النهدي', category: 'صيدليات', discountText: 'خصم 25%', rating: 4.4, distance: 'على بعد 0.5 كم', imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80' },
  { id: 'deal-6', title: 'سينما سيتي ستارز', category: 'ترفيه', discountText: 'كاش باك 12%', rating: 4.9, distance: 'على بعد 3.2 كم', imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80' },
];

// Fake map pins (positioned as % of container)
const mapPins = [
  { id: 'deal-1', top: '35%', left: '55%', label: 'خصم 20%', color: '#7dffa2' },
  { id: 'deal-2', top: '60%', left: '30%', label: 'خصم 15%', color: '#bdc2ff' },
  { id: 'deal-3', top: '25%', left: '75%', label: '10% CB', color: '#7dffa2' },
  { id: 'deal-4', top: '70%', left: '65%', label: '1+1', color: '#e3b5ff' },
  { id: 'deal-5', top: '45%', left: '20%', label: 'خصم 25%', color: '#ffb4ab' },
  { id: 'deal-6', top: '20%', left: '45%', label: '12% CB', color: '#bdc2ff' },
];

const categoryFilters = [
  { id: 'all', label: 'الكل', count: 6 },
  { id: 'food', label: '🍽️ مطاعم', count: 2 },
  { id: 'sports', label: '💪 رياضة', count: 1 },
  { id: 'groceries', label: '🛒 سوبرماركت', count: 1 },
  { id: 'pharma', label: '💊 صيدلية', count: 1 },
  { id: 'entertainment', label: '🎬 ترفيه', count: 1 },
];

export const NearbyDealsModal: React.FC<NearbyDealsModalProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [claimedId, setClaimedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClaim = (id: string) => {
    setClaimedId(id);
    setTimeout(() => {
      alert('✅ تم الحصول على قسيمة الخصم! أبرزها للمحل للحصول على التخفيض الفوري.');
      setClaimedId(null);
    }, 300);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-[#0b1326]/85 backdrop-blur-2xl flex flex-col justify-center items-center p-4 animate-fade-in text-[#dae2fd] cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#131b2e] border border-[#bdc2ff]/20 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] cursor-default"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#171f33] border-b border-[#454656]/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#7dffa2]/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#7dffa2] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
            </div>
            <div>
              <h2 className="font-['Cairo'] font-bold text-base text-[#dae2fd]">استكشاف العروض القريبة</h2>
              <p className="text-[11px] text-[#c5c5d8] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7dffa2] animate-pulse inline-block" />
                القاهرة، المعادي · {extendedDeals.length} عروض نشطة
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Map / List Toggle */}
            <div className="flex bg-[#0b1326] rounded-xl p-1">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  viewMode === 'map' ? 'bg-[#bdc2ff] text-[#0013a0]' : 'text-[#c5c5d8]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">map</span>
                خريطة
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  viewMode === 'list' ? 'bg-[#bdc2ff] text-[#0013a0]' : 'text-[#c5c5d8]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">list</span>
                قائمة
              </button>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#222a3d] text-[#dae2fd] hover:text-white flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="px-4 py-3 bg-[#171f33]/60 flex gap-2 overflow-x-auto no-scrollbar border-b border-[#454656]/10">
          {categoryFilters.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all active:scale-95 flex items-center gap-1 ${
                activeCategory === cat.id
                  ? 'bg-[#bdc2ff] text-[#0013a0]'
                  : 'bg-[#222a3d] text-[#c5c5d8] hover:bg-[#2d3449]'
              }`}
            >
              {cat.label}
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeCategory === cat.id ? 'bg-[#0013a0]/20 text-[#0013a0]' : 'bg-[#131b2e] text-[#c5c5d8]'}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* ═══ MAP VIEW ═══ */}
        {viewMode === 'map' && (
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Interactive Map Area */}
            <div className="relative flex-1 min-h-[280px] bg-[#060e20] overflow-hidden">
              {/* Map grid background */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(#bdc2ff22 1px, transparent 1px),
                    linear-gradient(90deg, #bdc2ff22 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }}
              />

              {/* Simulated roads */}
              <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#bdc2ff" strokeWidth="8" />
                <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#bdc2ff" strokeWidth="5" />
                <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#bdc2ff" strokeWidth="5" />
                <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#bdc2ff" strokeWidth="3" />
                <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#bdc2ff" strokeWidth="3" />
                <ellipse cx="50%" cy="50%" rx="80" ry="60" stroke="#bdc2ff" strokeWidth="3" fill="none" />
              </svg>

              {/* User position */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-5 h-5 rounded-full bg-[#2d3fe3] border-2 border-white shadow-[0_0_0_8px_rgba(45,63,227,0.25)] animate-pulse" />
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-white font-bold whitespace-nowrap bg-[#2d3fe3] px-2 py-0.5 rounded-full">أنت هنا</div>
              </div>

              {/* Map Pins */}
              {mapPins.map((pin) => (
                <button
                  key={pin.id}
                  onClick={() => setSelectedPin(selectedPin === pin.id ? null : pin.id)}
                  className="absolute z-10 transform -translate-x-1/2 -translate-y-full transition-all active:scale-90"
                  style={{ top: pin.top, left: pin.left }}
                >
                  {/* Pin */}
                  <div
                    className={`relative flex flex-col items-center ${selectedPin === pin.id ? 'scale-125' : ''} transition-transform`}
                  >
                    <div
                      className="px-2.5 py-1 rounded-xl text-[10px] font-black shadow-xl border border-black/20 whitespace-nowrap"
                      style={{ background: pin.color, color: '#0b1326' }}
                    >
                      {pin.label}
                    </div>
                    <div className="w-0 h-0" style={{ borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `6px solid ${pin.color}` }} />
                  </div>
                </button>
              ))}

              {/* Radius circle */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#bdc2ff]/20"
                style={{ width: '220px', height: '220px' }}
              />

              {/* Map controls */}
              <div className="absolute bottom-3 right-3 flex flex-col gap-1.5">
                <div className="bg-[#131b2e]/90 backdrop-blur-md rounded-xl p-2 flex flex-col gap-1 border border-white/10 shadow-xl">
                  <button className="w-7 h-7 flex items-center justify-center text-[#dae2fd] hover:text-white text-lg font-black">+</button>
                  <div className="h-px bg-white/10" />
                  <button className="w-7 h-7 flex items-center justify-center text-[#dae2fd] hover:text-white text-lg font-black">−</button>
                </div>
                <button className="bg-[#131b2e]/90 backdrop-blur-md rounded-xl p-2 border border-white/10 shadow-xl">
                  <span className="material-symbols-outlined text-[#7dffa2] text-sm">my_location</span>
                </button>
              </div>

              {/* Map Legend */}
              <div className="absolute top-3 left-3 bg-[#131b2e]/90 backdrop-blur-md rounded-xl px-3 py-2 border border-white/10 text-[10px] text-[#c5c5d8] space-y-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#2d3fe3]" />
                  <span>موقعك</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#7dffa2]" />
                  <span>عروض ونشطة</span>
                </div>
              </div>
            </div>

            {/* Selected Pin Info Card */}
            {selectedPin && (() => {
              const deal = extendedDeals.find((d) => d.id === selectedPin);
              if (!deal) return null;
              return (
                <div className="p-4 bg-[#171f33] border-t border-[#454656]/20 animate-fade-in">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-['Cairo'] font-bold text-[#dae2fd] text-sm">{deal.title}</h3>
                      <p className="text-[#c5c5d8] text-xs flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[10px]">near_me</span>
                        {deal.distance}
                        <span className="mx-1">·</span>
                        <span className="material-symbols-outlined text-[10px] text-[#7dffa2]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        {deal.rating}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-[#7dffa2] text-[#003918]">{deal.discountText}</span>
                    </div>
                    <button
                      onClick={() => handleClaim(deal.id)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2d3fe3] to-[#8700d0] text-white font-bold text-xs active:scale-95 transition-all shrink-0"
                    >
                      {claimedId === deal.id ? '⌛' : 'احصل على الكوبون'}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ═══ LIST VIEW ═══ */}
        {viewMode === 'list' && (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto flex-1">
            {extendedDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-[#222a3d] rounded-2xl overflow-hidden border border-white/5 flex flex-col shadow-lg hover:border-[#bdc2ff]/30 transition-all group"
              >
                <div className="relative h-28">
                  <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-[#7dffa2] text-[#00622e] px-2.5 py-0.5 rounded-lg text-xs font-bold shadow-md">
                    {deal.discountText}
                  </div>
                </div>

                <div className="p-3.5 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm text-[#dae2fd] font-['Cairo']">{deal.title}</h3>
                    <div className="flex items-center gap-1 text-[#7dffa2] text-xs shrink-0">
                      <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      {deal.rating}
                    </div>
                  </div>
                  <p className="text-[11px] text-[#c5c5d8] flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">near_me</span>
                    {deal.distance}
                  </p>
                  <button
                    onClick={() => handleClaim(deal.id)}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-[#2d3fe3] to-[#3647ea] text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">confirmation_number</span>
                    {claimedId === deal.id ? 'جاري...' : 'احصل على الكوبون'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-[#171f33] border-t border-[#454656]/20">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#222a3d] text-[#bdc2ff] hover:bg-[#2d3449] font-bold text-sm transition-all"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
