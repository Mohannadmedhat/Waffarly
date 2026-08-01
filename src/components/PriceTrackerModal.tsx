import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';

interface WatchedProduct {
  id: string;
  name: string;
  currentPrice: number;
  targetPrice: number;
  currency: string;
  store: string;
  image: string;
  status: 'dropped' | 'watching';
}

interface PriceTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (id: string) => void;
}

export const PriceTrackerModal: React.FC<PriceTrackerModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const { addToCart, isInCart } = useWishlist();
  const [newInputUrl, setNewInputUrl] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [watchedList, setWatchedList] = useState<WatchedProduct[]>([
    {
      id: 'sony-wh1000xm5',
      name: 'سوني WH-1000XM5',
      currentPrice: 14500,
      targetPrice: 14000,
      currency: 'ج.م',
      store: 'أمازون',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80',
      status: 'dropped',
    },
    {
      id: 'iphone-15',
      name: 'آيفون 15 (iPhone 15)',
      currentPrice: 42500,
      targetPrice: 40000,
      currency: 'ج.م',
      store: 'نون',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80',
      status: 'watching',
    },
  ]);

  if (!isOpen) return null;

  const handleAddTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const query = newInputUrl.trim() || 'رابط منتج جديد (أمازون/نون)';

    const newItem: WatchedProduct = {
      id: `item-${Date.now()}`,
      name: query.toLowerCase().includes('macbook')
        ? 'MacBook Air M2 Pro'
        : query.toLowerCase().includes('samsung')
        ? 'سامسونج Galaxy S24 Ultra'
        : 'منتج مضاف لتتبع السعر والتنبيهات',
      currentPrice: 32000,
      targetPrice: 29500,
      currency: 'ج.م',
      store: query.toLowerCase().includes('noon') ? 'نون' : 'أمازون',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
      status: 'watching',
    };

    setWatchedList((prev) => [newItem, ...prev]);
    setNewInputUrl('');
    setSuccessToast('✓ تمت إضافة المنتج لقائمة التتبع بنجاح وتفعيل التنبيهات!');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleRemoveTrack = (id: string) => {
    setWatchedList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-[#0b1326]/85 backdrop-blur-2xl flex flex-col justify-center items-center p-4 animate-fade-in text-[#dae2fd] cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#131b2e] border border-[#bdc2ff]/20 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] cursor-default"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#171f33] border-b border-[#454656]/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7dffa2] text-2xl">timeline</span>
            <h2 className="font-['Cairo'] font-bold text-lg text-[#dae2fd]">تتبع الأسعار وقائمة المفضلة</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#222a3d] text-[#dae2fd] hover:text-white flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Notification Toast Alert */}
        {successToast && (
          <div className="bg-[#7dffa2]/20 border-b border-[#7dffa2]/40 text-[#7dffa2] px-6 py-2.5 text-xs font-bold flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>{successToast}</span>
          </div>
        )}

        {/* Add Product Tracker Form */}
        <div className="p-4 bg-[#060e20] border-b border-[#454656]/20 space-y-2">
          <form onSubmit={handleAddTrack} className="flex gap-2">
            <input
              type="text"
              value={newInputUrl}
              onChange={(e) => setNewInputUrl(e.target.value)}
              placeholder="ألصق رابط المنتج من أمازون أو نون لتتبعه..."
              className="flex-1 bg-[#171f33] border border-[#454656]/30 rounded-xl px-4 py-3 text-xs text-[#dae2fd] placeholder:text-[#c5c5d8]/40 focus:border-[#bdc2ff] font-['IBM_Plex_Arabic']"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-gradient-to-r from-[#2d3fe3] to-[#8700d0] hover:opacity-90 text-white font-bold text-xs rounded-xl shadow-lg shrink-0 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>إضافة تتبع</span>
            </button>
          </form>

          {/* Quick Paste Sample Links */}
          <div className="flex items-center gap-2 text-[11px] text-[#c5c5d8]">
            <span>روابط سريعة للتجربة:</span>
            <button
              type="button"
              onClick={() => setNewInputUrl('https://amazon.eg/dp/B00SAMSK123')}
              className="px-2 py-0.5 rounded bg-[#222a3d] hover:bg-[#2d3449] text-[#bdc2ff]"
            >
              رابط أمازون
            </button>
            <button
              type="button"
              onClick={() => setNewInputUrl('https://noon.com/egypt-ar/macbook-m2')}
              className="px-2 py-0.5 rounded bg-[#222a3d] hover:bg-[#2d3449] text-[#bdc2ff]"
            >
              رابط نون
            </button>
          </div>
        </div>

        {/* Watched Products List */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {watchedList.length > 0 ? (
            watchedList.map((item) => (
              <div
                key={item.id}
                className="bg-[#222a3d] p-4 rounded-2xl border border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center hover:border-white/10 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover bg-[#131b2e] rounded-xl p-1 shrink-0 border border-white/5"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-[#dae2fd] font-['Cairo']">{item.name}</h3>
                    <p className="text-[11px] text-[#c5c5d8] mt-0.5">المتجر: {item.store}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs">
                      <span className="text-[#7dffa2] font-bold">
                        <bdi>{item.currentPrice.toLocaleString('ar-EG')} {item.currency}</bdi>
                      </span>
                      <span className="text-[#c5c5d8] text-[11px]">
                        المستهدف: <bdi>{item.targetPrice.toLocaleString('ar-EG')} {item.currency}</bdi>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {item.status === 'dropped' ? (
                    <div className="flex items-center gap-2">
                      <span className="bg-[#7dffa2]/15 text-[#7dffa2] border border-[#7dffa2]/30 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">trending_down</span>
                        وصل للسعر!
                      </span>
                      <button
                        onClick={() => addToCart({
                          id: item.id,
                          title: item.name,
                          price: item.currentPrice,
                          currency: item.currency,
                          store: item.store,
                          storeLogo: '',
                          productImage: item.image,
                          cashbackAmount: Math.round(item.currentPrice * 0.05),
                        })}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 ripple transition-all ${
                          isInCart(item.id)
                            ? 'bg-[#7dffa2]/20 text-[#7dffa2] border border-[#7dffa2]/30'
                            : 'bg-[#7dffa2] text-[#003918] hover:bg-[#6be68f]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">{isInCart(item.id) ? 'check' : 'shopping_cart'}</span>
                        <span>{isInCart(item.id) ? 'في السلة' : 'شراء'}</span>
                      </button>
                    </div>
                  ) : (
                    <span className="bg-[#bdc2ff]/15 text-[#bdc2ff] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      جاري التتبع...
                    </span>
                  )}

                  <button
                    onClick={() => handleRemoveTrack(item.id)}
                    title="حذف من قائمة التتبع"
                    className="w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-all active:scale-90"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 space-y-2 text-[#c5c5d8]">
              <span className="material-symbols-outlined text-4xl">inventory_2</span>
              <p className="text-xs">القائمة فارغة، ألصق رابط أي منتج أعلاه لتتبعه فوراً.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
