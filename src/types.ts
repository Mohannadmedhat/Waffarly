export type NavTab = 'home' | 'assistant' | 'wallet' | 'search' | 'account';

export interface DealItem {
  id: string;
  store: 'Amazon' | 'Noon' | 'Jumia' | string;
  storeLogo: string;
  storeColor?: string;
  title: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  discountPercentage?: number;
  cashbackAmount: number;
  couponCode?: string;
  deliveryText: string;
  badgeText?: string;
  isBestValue?: boolean;
  productImage: string;
  rating?: number;
  priceHistoryTrend?: 'falling' | 'stable' | 'rising';
}

export interface ProductDetail {
  id: string;
  name: string;
  subtitle: string;
  rating: number;
  ratingCount?: number;
  mainImage: string;
  galleryImages: string[];
  originalPrice: number;
  discountAmount: number;
  cashbackAmount: number;
  finalPrice: number;
  totalSaved: number;
  currency: string;
  recommendedStore: string;
  recommendedStoreLogo: string;
  specs: {
    processor: string;
    screen: string;
    battery: string;
    storage: string;
  };
  delivery: {
    freeDelivery: string;
    warranty: string;
    returnPolicy: string;
  };
  storeComparisons: {
    store: string;
    logo: string;
    price: number;
    delivery: string;
    cashbackNote: string;
    isBest?: boolean;
  }[];
}

export interface Transaction {
  id: string;
  storeName: string;
  logo: string;
  date: string;
  amount: number;
  currency: string;
  type: 'cashback' | 'withdrawal' | 'voucher' | 'bill';
  status: 'available' | 'pending' | 'completed' | 'paid';
  statusText: string;
}

export interface NearbyDeal {
  id: string;
  title: string;
  category: string;
  discountText: string;
  rating: number;
  distance: string;
  imageUrl: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  deal?: {
    title: string;
    specs: string;
    price: string;
    originalPrice?: string;
    discountText?: string;
    store: string;
    cashback: string;
    imageUrl: string;
    reason: string;
    dailySavingRate?: string;
  };
  suggestionChips?: string[];
}
