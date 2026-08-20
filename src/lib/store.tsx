import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type Product } from "@/data/products";
import { useCatalog } from "@/lib/catalog";

type CartLine = { slug: string; qty: number };

type StoreValue = {
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  coupon: string | null;
  addToCart: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  toggleCompare: (slug: string) => void;
  applyCoupon: (code: string) => boolean;
  clearCoupon: () => void;
  cartCount: number;
  cartLines: { product: Product; qty: number }[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
};

const StoreContext = createContext<StoreValue | null>(null);

const KEY = "northbay-store-v1";

/** Demo coupon codes — replace with real promotion rules. */
export const COUPONS: Record<string, number> = { WELCOME10: 0.1, BUNDLE25: 0.15 };

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const { products } = useCatalog();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setCart(parsed.cart ?? []);
        setWishlist(parsed.wishlist ?? []);
        setCompare(parsed.compare ?? []);
        setCoupon(parsed.coupon ?? null);
      }
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify({ cart, wishlist, compare, coupon }));
  }, [cart, wishlist, compare, coupon, hydrated]);

  const addToCart = useCallback((slug: string, qty = 1) => {
    setCart((c) => {
      const found = c.find((l) => l.slug === slug);
      if (found) return c.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
      return [...c, { slug, qty }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setCart((c) =>
      qty <= 0
        ? c.filter((l) => l.slug !== slug)
        : c.map((l) => (l.slug === slug ? { ...l, qty } : l)),
    );
  }, []);

  const removeFromCart = useCallback(
    (slug: string) => setCart((c) => c.filter((l) => l.slug !== slug)),
    [],
  );
  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (slug: string) =>
      setWishlist((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug])),
    [],
  );

  const toggleCompare = useCallback(
    (slug: string) =>
      setCompare((c) =>
        c.includes(slug) ? c.filter((s) => s !== slug) : c.length >= 4 ? c : [...c, slug],
      ),
    [],
  );

  const applyCoupon = useCallback((code: string) => {
    const key = code.trim().toUpperCase();
    if (COUPONS[key]) {
      setCoupon(key);
      return true;
    }
    return false;
  }, []);

  const value = useMemo<StoreValue>(() => {
    const cartLines = cart
      .map((l) => {
        const product = products.find((p) => p.slug === l.slug);
        return product ? { product, qty: l.qty } : null;
      })
      .filter((x): x is { product: Product; qty: number } => x !== null);

    const subtotal = cartLines.reduce((s, l) => s + l.product.price * l.qty, 0);
    const rate = coupon ? (COUPONS[coupon] ?? 0) : 0;
    const discount = +(subtotal * rate).toFixed(2);
    const shipping = subtotal === 0 || subtotal - discount >= 49 ? 0 : 6.95;
    const tax = +((subtotal - discount) * 0.07).toFixed(2);
    const total = +(subtotal - discount + shipping + tax).toFixed(2);

    return {
      cart,
      wishlist,
      compare,
      coupon,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      toggleCompare,
      applyCoupon,
      clearCoupon: () => setCoupon(null),
      cartCount: cart.reduce((s, l) => s + l.qty, 0),
      cartLines,
      subtotal: +subtotal.toFixed(2),
      discount,
      shipping,
      tax,
      total,
    };
  }, [
    cart,
    wishlist,
    compare,
    coupon,
    products,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    toggleCompare,
    applyCoupon,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });
