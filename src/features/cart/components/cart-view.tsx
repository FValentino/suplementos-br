"use client";

import Link from "next/link";
import { formatPrice } from "@/features/catalog/utils/format-price";
import {
  ArrowRightIcon,
  CartIcon,
  WhatsAppIcon,
} from "@/features/shared/components/icons";
import { useCart } from "../context/cart-context";
import { buildCartMessage, buildWhatsAppUrl } from "../utils/whatsapp";
import { CartLineItem } from "./cart-line-item";

function CartSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start" aria-busy="true">
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="h-28 animate-pulse rounded-lg bg-mist" />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-xl bg-mist" />
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-mist/40 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-muted">
        <CartIcon className="h-6 w-6" />
      </span>
      <h2 className="mt-4 font-display text-xl font-bold text-ink">Tu carrito está vacío</h2>
      <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted">
        Sumá productos al carrito y después cerramos el pedido por WhatsApp.
      </p>
      <Link
        href="/catalogo"
        className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
      >
        Ver catálogo
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function CartView() {
  const { lines, itemCount, subtotal, isReady, setQuantity, removeItem, clear } = useCart();

  if (!isReady) {
    return <CartSkeleton />;
  }

  if (lines.length === 0) {
    return <EmptyCart />;
  }

  const whatsappUrl = buildWhatsAppUrl(buildCartMessage(lines, subtotal));

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted">
            {itemCount} {itemCount === 1 ? "producto" : "productos"} en tu carrito
          </p>
          <button
            type="button"
            onClick={clear}
            className="text-xs font-semibold text-muted underline-offset-4 hover:text-brand-magenta hover:underline"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="mt-4 divide-y divide-line border-y border-line">
          {lines.map((line) => (
            <CartLineItem
              key={line.product.id}
              line={line}
              onQuantityChange={setQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        <Link
          href="/catalogo"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand"
        >
          <ArrowRightIcon className="h-4 w-4 rotate-180" />
          Seguir comprando
        </Link>
      </div>

      <aside className="rounded-xl border border-line bg-mist/50 p-5 lg:sticky lg:top-24">
        <h2 className="font-display text-lg font-bold text-ink">Resumen del pedido</h2>

        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd className="font-semibold text-ink">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-muted">Envío</dt>
            <dd className="text-right text-xs text-muted">A coordinar por WhatsApp</dd>
          </div>
          <div className="flex items-center justify-between border-t border-line pt-3">
            <dt className="font-semibold text-ink">Total</dt>
            <dd className="font-display text-lg font-extrabold text-ink">
              {formatPrice(subtotal)}
            </dd>
          </div>
        </dl>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-whatsapp text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Finalizar por WhatsApp
        </a>

        <p className="mt-3 text-[11px] leading-relaxed text-muted">
          Demo sin pasarela de pago: el pedido se envía como mensaje y no se cobra nada desde la
          web.
        </p>
      </aside>
    </div>
  );
}
