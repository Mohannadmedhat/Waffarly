import React from 'react';
import { useWishlist } from '../context/WishlistContext';

export const GlobalToast: React.FC = () => {
  const { toast } = useWishlist();

  if (!toast) return null;

  const iconMap = {
    wishlist: 'favorite',
    cart: 'shopping_cart',
    remove: 'favorite_border',
  };
  const colorMap = {
    wishlist: '#ffb4ab',
    cart: '#7dffa2',
    remove: '#8899cc',
  };

  return (
    <div
      className="fixed top-20 left-1/2 -translate-x-1/2 z-[300] animate-toast pointer-events-none"
      style={{ zIndex: 300 }}
    >
      <div className="bg-[#131b2e]/95 border border-white/10 backdrop-blur-xl text-[#dae2fd] text-xs font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 whitespace-nowrap">
        <span
          className="material-symbols-outlined text-base"
          style={{
            color: colorMap[toast.type],
            fontVariationSettings: toast.type === 'wishlist' ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          {iconMap[toast.type]}
        </span>
        <span className="font-body">{toast.message}</span>
      </div>
    </div>
  );
};
