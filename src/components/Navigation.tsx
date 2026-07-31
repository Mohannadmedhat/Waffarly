import React from 'react';
import { NavTab } from '../types';

interface NavigationProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
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

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 px-4 pointer-events-none flex justify-center">
      <div
        className="pointer-events-auto bg-[#0b1326]/80 backdrop-blur-2xl rounded-[28px] border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.7)] flex items-center gap-1 p-1.5"
        style={{ width: 'fit-content', maxWidth: '480px' }}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center transition-all duration-300 active:scale-90 rounded-[20px] ${
                isActive
                  ? `bg-gradient-to-br ${item.activeGradient} shadow-xl px-4 py-2.5 gap-1`
                  : 'px-4 py-2.5 gap-1 hover:bg-white/5'
              }`}
              style={
                isActive
                  ? { boxShadow: `0 6px 20px ${item.glowColor}` }
                  : {}
              }
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
                className={`text-[10px] font-bold whitespace-nowrap font-['Cairo'] leading-none transition-all duration-300 ${
                  isActive ? 'text-white opacity-100' : 'text-[#8899cc] opacity-80'
                }`}
              >
                {item.label}
              </span>

              {/* Active glow dot */}
              {isActive && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
