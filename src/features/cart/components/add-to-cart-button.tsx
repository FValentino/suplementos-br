"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/cart-context";
import { CheckIcon, PlusIcon } from "@/features/shared/components/icons";

interface AddToCartButtonProps {
  productId: string;
  label?: string;
  className?: string;
  compact?: boolean;
}

export function AddToCartButton({
  productId,
  label = "Agregar al carrito",
  className,
  compact = false,
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
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors ${
        compact ? "h-10 w-10 border border-line bg-paper text-ink hover:bg-mist" : "h-11 px-4 text-sm"
      } ${!compact && added ? "bg-ink text-white" : ""} ${
        !compact && !added ? "bg-signal text-white hover:bg-signal/90" : ""
      } ${className ?? ""}`}
      aria-label={added ? "Producto agregado al carrito" : label}
      title={compact ? (added ? "Agregado" : "Agregar") : undefined}
    >
      {added ? <CheckIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
      {compact ? null : added ? "Agregado" : label}
    </button>
  );
}
