import React, { useState } from 'react';
import { NavTab, DealItem } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeTab } from './components/HomeTab';
import { AssistantTab } from './components/AssistantTab';
import { WalletTab } from './components/WalletTab';
import { SearchTab } from './components/SearchTab';
import { AccountTab } from './components/AccountTab';
import { OnboardingModal } from './components/OnboardingModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CashbackWithdrawModal } from './components/CashbackWithdrawModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { PriceTrackerModal } from './components/PriceTrackerModal';
import { CouponCalculatorModal } from './components/CouponCalculatorModal';
import { NearbyDealsModal } from './components/NearbyDealsModal';
import { ReferralRewardsModal } from './components/ReferralRewardsModal';
import { ProductComparisonModal } from './components/ProductComparisonModal';
import { GiftCardsHubModal } from './components/GiftCardsHubModal';
import { LuckySpinModal } from './components/LuckySpinModal';
import { SupportTicketModal } from './components/SupportTicketModal';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState<boolean>(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isPriceTrackerOpen, setIsPriceTrackerOpen] = useState<boolean>(false);
  const [isCouponCalcOpen, setIsCouponCalcOpen] = useState<boolean>(false);
  const [isNearbyDealsOpen, setIsNearbyDealsOpen] = useState<boolean>(false);
  const [isReferralOpen, setIsReferralOpen] = useState<boolean>(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);
  const [isGiftCardsOpen, setIsGiftCardsOpen] = useState<boolean>(false);
  const [isLuckySpinOpen, setIsLuckySpinOpen] = useState<boolean>(false);
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('Sony WH-1000XM5');

  const handleSearchTrigger = (query: string) => {
    setSearchQuery(query);
    setActiveTab('search');
  };

  const handleSelectDeal = (deal: DealItem) => {
    setIsProductDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-['IBM_Plex_Arabic',sans-serif] relative overflow-x-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#2d3fe3]/10 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#8700d0]/10 rounded-full blur-[140px]"></div>
      </div>

      {/* Main Header */}
      <Header
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenAccount={() => setActiveTab('account')}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenPriceTracker={() => setIsPriceTrackerOpen(true)}
        onOpenReferral={() => setIsReferralOpen(true)}
        onOpenLuckySpin={() => setIsLuckySpinOpen(true)}
      />

      {/* Body Views */}
      <main className="relative z-10">
        {activeTab === 'home' && (
          <div key="home" className="animate-slide-up">
            <HomeTab
              onSearch={handleSearchTrigger}
              setActiveTab={setActiveTab}
              onOpenWithdraw={() => setIsWithdrawOpen(true)}
              onSelectProduct={() => setIsProductDetailOpen(true)}
              onOpenNearbyModal={() => setIsNearbyDealsOpen(true)}
              onOpenCouponCalc={() => setIsCouponCalcOpen(true)}
              onOpenReferral={() => setIsReferralOpen(true)}
              onOpenLuckySpin={() => setIsLuckySpinOpen(true)}
              onOpenComparison={() => setIsComparisonOpen(true)}
              onOpenGiftCards={() => setIsGiftCardsOpen(true)}
            />
          </div>
        )}

        {activeTab === 'assistant' && (
          <div key="assistant" className="animate-slide-up">
            <AssistantTab
              onOpenProductDetail={() => setIsProductDetailOpen(true)}
            />
          </div>
        )}

        {activeTab === 'wallet' && (
          <div key="wallet" className="animate-slide-up">
            <WalletTab
              onOpenWithdraw={() => setIsWithdrawOpen(true)}
              onOpenCouponCalc={() => setIsCouponCalcOpen(true)}
              onOpenGiftCards={() => setIsGiftCardsOpen(true)}
              onOpenLuckySpin={() => setIsLuckySpinOpen(true)}
            />
          </div>
        )}

        {activeTab === 'search' && (
          <div key="search" className="animate-slide-up">
            <SearchTab
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectDeal={handleSelectDeal}
              onOpenComparison={() => setIsComparisonOpen(true)}
            />
          </div>
        )}

        {activeTab === 'account' && (
          <div key="account" className="animate-slide-up">
            <AccountTab
              onOpenOnboarding={() => setIsOnboardingOpen(true)}
              onOpenWithdraw={() => setIsWithdrawOpen(true)}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onOpenPriceTracker={() => setIsPriceTrackerOpen(true)}
              onOpenCouponCalc={() => setIsCouponCalcOpen(true)}
              onOpenReferral={() => setIsReferralOpen(true)}
              onOpenSupport={() => setIsSupportOpen(true)}
              onOpenGiftCards={() => setIsGiftCardsOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Navigation Shell */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modals */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />

      <ProductDetailModal
        isOpen={isProductDetailOpen}
        onClose={() => setIsProductDetailOpen(false)}
      />

      <CashbackWithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
      />

      <NotificationCenterModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <PriceTrackerModal
        isOpen={isPriceTrackerOpen}
        onClose={() => setIsPriceTrackerOpen(false)}
        onSelectProduct={() => setIsProductDetailOpen(true)}
      />

      <CouponCalculatorModal
        isOpen={isCouponCalcOpen}
        onClose={() => setIsCouponCalcOpen(false)}
      />

      <NearbyDealsModal
        isOpen={isNearbyDealsOpen}
        onClose={() => setIsNearbyDealsOpen(false)}
      />

      <ReferralRewardsModal
        isOpen={isReferralOpen}
        onClose={() => setIsReferralOpen(false)}
      />

      <ProductComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />

      <GiftCardsHubModal
        isOpen={isGiftCardsOpen}
        onClose={() => setIsGiftCardsOpen(false)}
      />

      <LuckySpinModal
        isOpen={isLuckySpinOpen}
        onClose={() => setIsLuckySpinOpen(false)}
      />

      <SupportTicketModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
    </div>
  );
}

export default App;
