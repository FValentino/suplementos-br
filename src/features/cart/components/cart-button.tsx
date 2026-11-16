"use client";

import Link from "next/link";
import { useCart } from "../context/cart-context";
import { CartIcon } from "@/features/shared/components/icons";

export function CartButton() {
  const { itemCount, isReady } = useCart();

  return (
    <Link
      href="/carrito"
      aria-label={itemCount > 0 ? `Carrito con ${itemCount} productos` : "Carrito"}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-mist"
    >
      <CartIcon className="h-5 w-5" />
      {isReady && itemCount > 0 ? (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-signal px-1 text-[11px] font-bold text-white">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </Link>
  );
}
