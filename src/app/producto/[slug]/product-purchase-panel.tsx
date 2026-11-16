"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/features/cart/context/cart-context";
import { CheckIcon, MinusIcon, PlusIcon } from "@/features/shared/components/icons";

export function ProductPurchasePanel({ productId }: { productId: string }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleAdd() {
    addItem(productId, quantity);
    setAdded(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
      <div className="flex h-12 items-center justify-between rounded-lg border border-line bg-white px-1 sm:w-36">
        <button
          type="button"
          onClick={() => setQuantity((current) => Math.max(1, current - 1))}
          disabled={quantity <= 1}
          aria-label="Restar una unidad"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-mist disabled:opacity-40"
        >
          <MinusIcon className="h-4 w-4" />
        </button>
        <span aria-live="polite" className="w-8 text-center text-sm font-bold tabular-nums text-ink">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => setQuantity((current) => Math.min(99, current + 1))}
          aria-label="Sumar una unidad"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-mist"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className={`inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold text-white transition-colors ${
          added ? "bg-brand-violet" : "bg-ink hover:bg-ink-soft"
        }`}
      >
        {added ? <CheckIcon className="h-4 w-4" /> : null}
        {added ? "Agregado al carrito" : "Agregar al carrito"}
      </button>
    </div>
  );
}
