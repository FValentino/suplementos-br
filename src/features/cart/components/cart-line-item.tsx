import Link from "next/link";
import { ProductVisual } from "@/features/catalog/components/product-visual";
import { formatPrice } from "@/features/catalog/utils/format-price";
import { MinusIcon, PlusIcon, TrashIcon } from "@/features/shared/components/icons";
import type { CartLine } from "../types/cart";

interface CartLineItemProps {
  line: CartLine;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartLineItem({ line, onQuantityChange, onRemove }: CartLineItemProps) {
  const { product, quantity } = line;

  return (
    <div className="flex gap-3 py-4 sm:gap-4">
      <Link
        href={`/producto/${product.slug}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-24"
        style={{ backgroundColor: product.visual.soft }}
        aria-label={`Ver ${product.name}`}
      >
        <ProductVisual
          visual={product.visual}
          name={product.name}
          brand={product.brand}
          className="h-full w-full p-2"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              {product.brand}
            </p>
            <Link
              href={`/producto/${product.slug}`}
              className="block font-display text-sm font-bold leading-snug text-ink hover:text-brand sm:text-base"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-xs text-muted">{product.presentation}</p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            aria-label={`Quitar ${product.name} del carrito`}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:bg-mist hover:text-brand-magenta"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
          <div className="flex h-9 items-center rounded-lg border border-line bg-white">
            <button
              type="button"
              onClick={() => onQuantityChange(product.id, quantity - 1)}
              aria-label={`Restar una unidad de ${product.name}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink transition-colors hover:bg-mist"
            >
              <MinusIcon className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-bold tabular-nums text-ink">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onQuantityChange(product.id, quantity + 1)}
              aria-label={`Sumar una unidad de ${product.name}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink transition-colors hover:bg-mist"
            >
              <PlusIcon className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="text-right">
            <p className="font-display text-sm font-extrabold text-ink">
              {formatPrice(product.price * quantity)}
            </p>
            <p className="text-[11px] text-muted">{formatPrice(product.price)} c/u</p>
          </div>
        </div>
      </div>
    </div>
  );
}
