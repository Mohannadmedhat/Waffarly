import React from 'react';
import { NavTab } from '../types';
import { useWishlist } from '../context/WishlistContext';

interface NavigationProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

const navItems = [
  {
    id: 'home' as NavTab,
    label: 'الرئيسية',
    icon: 'home',
    activeGradient: 'from-[#2d3fe3] to-[#8700d0]',
    glowColor: 'rgba(45,63,227,0.5)',
  },
  {
    id: 'assistant' as NavTab,
    label: 'المساعد',
    icon: 'auto_awesome',
    activeGradient: 'from-[#8700d0] to-[#c044ff]',
    glowColor: 'rgba(135,0,208,0.5)',
    isSpecial: true,
  },
  {
    id: 'wallet' as NavTab,
    label: 'المحفظة',
    icon: 'account_balance_wallet',
    activeGradient: 'from-[#2d3fe3] to-[#009b44]',
    glowColor: 'rgba(0,155,68,0.4)',
  },
  {
    id: 'search' as NavTab,
    label: 'العروض',
    icon: 'sell',
    activeGradient: 'from-[#c044ff] to-[#2d3fe3]',
    glowColor: 'rgba(192,68,255,0.4)',
  },
  {
    id: 'account' as NavTab,
    label: 'حسابي',
    icon: 'person',
    activeGradient: 'from-[#3647ea] to-[#8700d0]',
    glowColor: 'rgba(54,71,234,0.5)',
  },
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { wishlistItems, openCart, cartCount } = useWishlist();

  return (
    <>
      {/* ═══ MOBILE: Bottom Tab Bar ═══ */}
      <nav className="md:hidden fixed bottom-4 left-0 right-0 z-50 px-4 pointer-events-none flex justify-center">
        <div
          className="pointer-events-auto bg-[#0b1326]/85 backdrop-blur-2xl rounded-[28px] border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.7)] flex items-center gap-1 p-1.5"
          style={{ width: 'fit-content', maxWidth: '480px' }}
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const isFav = item.id === 'search' && wishlistItems.length > 0;

            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center transition-all duration-300 active:scale-90 rounded-[20px] ripple ${
                  isActive
                    ? `bg-gradient-to-br ${item.activeGradient} shadow-xl px-4 py-2.5 gap-1`
                    : 'px-4 py-2.5 gap-1 hover:bg-white/5'
                }`}
                style={isActive ? { boxShadow: `0 6px 20px ${item.glowColor}` } : {}}
                aria-label={item.label}
              >
                {/* Icon */}
                <span
                  className={`material-symbols-outlined transition-all duration-300 ${
                    isActive ? 'text-white text-[22px]' : 'text-[#8899cc] text-[22px]'
                  } ${item.isSpecial && !isActive ? 'text-[#c044ff] animate-pulse' : ''}`}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>

                {/* Label */}
                <span
                  className={`text-[10px] font-bold whitespace-nowrap font-headline leading-none transition-all duration-300 ${
                    isActive ? 'text-white opacity-100' : 'text-[#8899cc] opacity-80'
                  }`}
                >
                  {item.label}
                </span>

                {/* Wishlist count badge */}
                {isFav && !isActive && (
                  <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center badge-pulse">
                    {wishlistItems.length}
                  </span>
                )}

                {/* Active glow dot */}
                {isActive && (
                  <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.8)]" />
                )}
              </button>
            );
          })}

          {/* Cart Button */}
          <button
            id="nav-cart"
            onClick={openCart}
            className="relative flex flex-col items-center justify-center transition-all duration-300 active:scale-90 rounded-[20px] px-4 py-2.5 gap-1 hover:bg-white/5 ripple"
            aria-label="سلة التسوق"
          >
            <span className="material-symbols-outlined text-[#8899cc] text-[22px]">shopping_cart</span>
            <span className="text-[10px] font-bold whitespace-nowrap font-headline leading-none text-[#8899cc] opacity-80">
              السلة
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-[#7dffa2] text-[#003918] text-[9px] font-black flex items-center justify-center badge-pulse">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* ═══ DESKTOP/TABLET: Right Sidebar ═══ */}
      <nav
        className="hidden md:flex flex-col fixed top-0 right-0 bottom-0 z-50 bg-[#080f20]/92 backdrop-blur-2xl border-l border-white/8 shadow-[-8px_0_32px_rgba(0,0,0,0.4)]"
        style={{ width: '72px' }}
        aria-label="Navigation"
      >
        {/* Logo */}
        <div className="flex flex-col items-center py-5 border-b border-white/8 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2d3fe3] to-[#8700d0] flex items-center justify-center shadow-lg shadow-[#2d3fe3]/30">
            <span className="material-symbols-outlined text-white text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              savings
            </span>
          </div>
        </div>

        {/* Nav Items */}
        <div className="flex-1 flex flex-col items-center gap-1 px-2 py-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const isFav = item.id === 'search' && wishlistItems.length > 0;

            return (
              <button
                key={item.id}
                id={`sidebar-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`group relative w-full flex flex-col items-center justify-center rounded-2xl py-3 px-1 transition-all duration-200 ripple ${
                  isActive
                    ? `bg-gradient-to-br ${item.activeGradient} shadow-lg`
                    : 'hover:bg-white/6'
                }`}
                style={isActive ? { boxShadow: `0 4px 16px ${item.glowColor}` } : {}}
                title={item.label}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <span
                  className={`material-symbols-outlined text-[22px] transition-all duration-200 ${
                    isActive ? 'text-white' : 'text-[#8899cc] group-hover:text-[#bdc2ff]'
                  } ${item.isSpecial && !isActive ? 'text-[#c044ff] animate-pulse' : ''}`}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span
                  className={`text-[9px] font-bold font-headline mt-1 transition-all ${
                    isActive ? 'text-white' : 'text-[#8899cc] group-hover:text-[#bdc2ff]'
                  }`}
                >
                  {item.label}
                </span>

                {/* Wishlist badge */}
                {isFav && !isActive && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-black flex items-center justify-center">
                    {wishlistItems.length > 9 ? '9+' : wishlistItems.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Cart Button in Sidebar */}
        <div className="px-2 pb-4 border-t border-white/8 pt-3 flex flex-col items-center gap-1">
          <button
            id="sidebar-cart"
            onClick={openCart}
            className="group relative w-full flex flex-col items-center justify-center rounded-2xl py-3 px-1 hover:bg-white/6 transition-all ripple"
            title="السلة"
            aria-label="سلة التسوق"
          >
            <span className="material-symbols-outlined text-[22px] text-[#8899cc] group-hover:text-[#7dffa2] transition-colors">
              shopping_cart
            </span>
            <span className="text-[9px] font-bold font-headline mt-1 text-[#8899cc] group-hover:text-[#7dffa2] transition-colors">
              السلة
            </span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#7dffa2] text-[#003918] text-[9px] font-black flex items-center justify-center badge-pulse">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
