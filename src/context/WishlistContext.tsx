import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

// ── Types ────────────────────────────────────────────────────────────
export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  store: string;
  storeLogo: string;
  productImage: string;
  cashbackAmount: number;
  couponCode?: string;
  discountPercentage?: number;
  addedAt: number; // timestamp
  targetPrice?: number;
}

interface CartItem extends WishlistItem {
  quantity: number;
}

interface WishlistContextValue {
  // Wishlist
  wishlistItems: WishlistItem[];
  wishlistIds: Set<string>;
  toggleWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;

  // Cart
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  cartSavings: number;
  addToCart: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeFromCart: (id: string) => void;
  updateCartQty: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;

  // Toast
  toast: { message: string; type: 'wishlist' | 'cart' | 'remove' } | null;

  // Cart Drawer
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

// ── Context ──────────────────────────────────────────────────────────
const WishlistContext = createContext<WishlistContextValue | null>(null);

const WISHLIST_KEY = 'waffarly_wishlist';
const CART_KEY     = 'waffarly_cart';

// ── Provider ─────────────────────────────────────────────────────────
export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [toast, setToast] = useState<WishlistContextValue['toast']>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Show toast helper
  const showToast = useCallback((message: string, type: WishlistContextValue['toast']['type']) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, type });
    toastTimerRef.current = setTimeout(() => setToast(null), 2800);
  }, []);

  // ── Wishlist Actions ─────────────────────────────────────────────
  const wishlistIds = new Set(wishlistItems.map((i) => i.id));

  const isInWishlist = useCallback((id: string) => wishlistIds.has(id), [wishlistItems]);

  const toggleWishlist = useCallback((item: Omit<WishlistItem, 'addedAt'>) => {
    setWishlistItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        showToast(`تمت إزالة "${item.title}" من المفضلة`, 'remove');
        return prev.filter((i) => i.id !== item.id);
      } else {
        showToast(`❤️ تمت إضافة "${item.title}" للمفضلة`, 'wishlist');
        return [{ ...item, addedAt: Date.now() }, ...prev];
      }
    });
  }, [showToast]);

  const removeFromWishlist = useCallback((id: string) => {
    setWishlistItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearWishlist = useCallback(() => setWishlistItems([]), []);

  // ── Cart Actions ─────────────────────────────────────────────────
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartSavings = cartItems.reduce(
    (sum, i) => sum + ((i.originalPrice ?? i.price) - i.price + i.cashbackAmount) * i.quantity,
    0
  );

  const isInCart = useCallback((id: string) => cartItems.some((i) => i.id === id), [cartItems]);

  const addToCart = useCallback((item: Omit<WishlistItem, 'addedAt'>) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        showToast(`تمت إضافة نسخة إضافية من "${item.title}"`, 'cart');
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      showToast(`🛒 تمت إضافة "${item.title}" للسلة`, 'cart');
      return [{ ...item, addedAt: Date.now(), quantity: 1 }, ...prev];
    });
  }, [showToast]);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateCartQty = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity } : i));
    }
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const openCart  = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  return (
    <WishlistContext.Provider value={{
      wishlistItems, wishlistIds, toggleWishlist, removeFromWishlist, clearWishlist, isInWishlist,
      cartItems, cartCount, cartTotal, cartSavings,
      addToCart, removeFromCart, updateCartQty, clearCart, isInCart,
      toast, isCartOpen, openCart, closeCart,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

// ── Hook ─────────────────────────────────────────────────────────────
export const useWishlist = (): WishlistContextValue => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
};
