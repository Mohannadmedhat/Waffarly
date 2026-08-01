import React, { useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen, closeCart,
    cartItems, cartCount, cartTotal, cartSavings,
    removeFromCart, updateCartQty, clearCart,
  } = useWishlist();

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeCart]);

  // Prevent background scroll when open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={closeCart}
        />
      )}

      {/* Drawer Panel */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`} dir="rtl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0d1527]/95 backdrop-blur-xl border-b border-white/8 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2d3fe3]/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#bdc2ff] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                shopping_cart
              </span>
            </div>
            <div>
              <h2 className="font-bold text-[#dae2fd] text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>
                سلة التسوق
              </h2>
              {cartCount > 0 && (
                <p className="text-[10px] text-[#c5c5d8]">{cartCount} {cartCount === 1 ? 'منتج' : 'منتجات'}</p>
              )}
            </div>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-xl bg-[#222a3d] flex items-center justify-center text-[#c5c5d8] hover:text-white hover:bg-[#2d3449] transition-all active:scale-90"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content */}
        {cartItems.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-6 space-y-4 text-center">
            <div className="w-20 h-20 rounded-full bg-[#222a3d] border border-white/5 flex items-center justify-center animate-float">
              <span className="material-symbols-outlined text-4xl text-[#8899cc]">shopping_cart</span>
            </div>
            <h3 className="font-bold text-[#dae2fd]" style={{ fontFamily: "'Cairo', sans-serif" }}>
              السلة فارغة!
            </h3>
            <p className="text-[#c5c5d8] text-sm max-w-xs leading-relaxed">
              أضف منتجات من العروض لتجد أفضل الأسعار وأعلى كاش باك في مكان واحد
            </p>
            <button
              onClick={closeCart}
              className="px-6 py-2.5 bg-gradient-to-r from-[#2d3fe3] to-[#8700d0] text-white rounded-2xl text-sm font-bold ripple active:scale-95 transition-all"
            >
              تصفح العروض
            </button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="px-4 py-4 space-y-3">
              {cartItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-[#131b2e] border border-white/6 rounded-2xl p-3 flex gap-3 group animate-fade-in"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-[#171f33] rounded-xl shrink-0 overflow-hidden flex items-center justify-center">
                    <img
                      src={item.productImage}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="text-[#dae2fd] text-xs font-bold leading-snug line-clamp-2 flex-1" style={{ fontFamily: "'Cairo', sans-serif" }}>
                        {item.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="shrink-0 w-6 h-6 rounded-lg bg-[#222a3d] flex items-center justify-center text-[#8899cc] hover:text-[#ffb4ab] hover:bg-rose-500/10 transition-all active:scale-90"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Price */}
                      <div>
                        <span className="text-[#7dffa2] font-bold text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>
                          {item.price.toLocaleString('ar-EG')} {item.currency}
                        </span>
                        {item.cashbackAmount > 0 && (
                          <p className="text-[10px] text-[#e3b5ff]">+{item.cashbackAmount} كاش باك</p>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-[#222a3d] rounded-xl p-1">
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-[#2d3449] flex items-center justify-center text-[#c5c5d8] hover:text-white transition-all active:scale-90"
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="text-[#dae2fd] text-xs font-bold w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-[#2d3449] flex items-center justify-center text-[#c5c5d8] hover:text-white transition-all active:scale-90"
                        >
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                    </div>

                    {/* Store badge */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 bg-white rounded-md p-0.5 flex items-center justify-center shrink-0">
                        <img src={item.storeLogo} alt={item.store} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[10px] text-[#8899cc]">{item.store}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="sticky bottom-0 bg-[#0d1527]/95 backdrop-blur-xl border-t border-white/8 px-5 py-4 space-y-3">
              {/* Savings Summary */}
              {cartSavings > 0 && (
                <div className="bg-[#7dffa2]/10 border border-[#7dffa2]/20 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#7dffa2] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                      savings
                    </span>
                    <span className="text-[#7dffa2] text-xs font-bold">إجمالي توفيرك + كاش باك</span>
                  </div>
                  <span className="text-[#7dffa2] font-bold text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {cartSavings.toFixed(0)} ج.م
                  </span>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-[#c5c5d8] text-sm">الإجمالي:</span>
                <span className="text-[#dae2fd] font-bold text-lg" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  {cartTotal.toLocaleString('ar-EG')} ج.م
                </span>
              </div>

              {/* CTA */}
              <button className="w-full bg-gradient-to-r from-[#2d3fe3] to-[#8700d0] text-white font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 ripple active:scale-95 transition-all shadow-lg shadow-[#2d3fe3]/20">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  shopping_cart_checkout
                </span>
                <span>تسوق الآن من أفضل متجر</span>
              </button>

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="w-full text-[#8899cc] hover:text-[#ffb4ab] text-xs font-medium transition-colors py-1"
              >
                مسح السلة كلها
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
