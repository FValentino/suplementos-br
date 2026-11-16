"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/cart-context";
import { CheckIcon, PlusIcon } from "@/features/shared/components/icons";

interface AddToCartButtonProps {
  productId: string;
  label?: string;
  className?: string;
}

export function AddToCartButton({
  productId,
  label = "Agregar",
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleClick() {
    addItem(productId);
    setAdded(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors ${
        added ? "bg-brand-violet text-white" : "bg-ink text-white hover:bg-ink-soft"
      } ${className ?? ""}`}
      aria-label={added ? "Producto agregado al carrito" : "Agregar al carrito"}
    >
      {added ? <CheckIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
      {added ? "Agregado" : label}
    </button>
  );
}
