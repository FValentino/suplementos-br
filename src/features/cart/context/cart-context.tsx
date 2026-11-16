"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getProductById } from "@/features/catalog/utils/catalog-selectors";
import type { CartItem, CartLine } from "../types/cart";

const STORAGE_KEY = "suplementos-br-cart";
const MAX_QUANTITY = 99;

interface CartContextValue {
  items: CartItem[];
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  isReady: boolean;
  addItem: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStoredItems(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((entry): entry is CartItem => {
      if (typeof entry !== "object" || entry === null) return false;
      const candidate = entry as Partial<CartItem>;
      return (
        typeof candidate.productId === "string" &&
        typeof candidate.quantity === "number" &&
        candidate.quantity > 0 &&
        Boolean(getProductById(candidate.productId))
      );
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // localStorage is only available after mount; hydrate there to keep SSR markup stable.
    /* eslint-disable react-hooks/set-state-in-effect */
    setItems(readStoredItems());
    setIsReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!isReady) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage can be unavailable in private mode; the cart still works in memory.
    }
  }, [items, isReady]);

  function addItem(productId: string, quantity = 1) {
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.min(item.quantity + quantity, MAX_QUANTITY) }
            : item,
        );
      }

      return [...current, { productId, quantity: Math.min(quantity, MAX_QUANTITY) }];
    });
  }

  function setQuantity(productId: string, quantity: number) {
    setItems((current) => {
      if (quantity <= 0) {
        return current.filter((item) => item.productId !== productId);
      }

      return current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(quantity, MAX_QUANTITY) }
          : item,
      );
    });
  }

  function removeItem(productId: string) {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }

  function clear() {
    setItems([]);
  }

  const lines = useMemo<CartLine[]>(() => {
    return items.flatMap((item) => {
      const product = getProductById(item.productId);
      return product ? [{ product, quantity: item.quantity }] : [];
    });
  }, [items]);

  const itemCount = lines.reduce((total, line) => total + line.quantity, 0);
  const subtotal = lines.reduce((total, line) => total + line.product.price * line.quantity, 0);

  const value: CartContextValue = {
    items,
    lines,
    itemCount,
    subtotal,
    isReady,
    addItem,
    setQuantity,
    removeItem,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
