import Link from "next/link";
import { ProductMedia } from "@/features/catalog/components/product-media";
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
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-mist sm:h-24 sm:w-24"
        aria-label={`Ver ${product.name}`}
      >
        <ProductMedia product={product} sizes="96px" className="h-full w-full p-2" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted">{product.brand}</p>
            <Link
              href={`/producto/${product.slug}`}
              className="block font-display text-base font-bold leading-[1.05] tracking-[-0.03em] text-ink hover:text-signal sm:text-lg"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-sm text-muted">{product.presentation}</p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            aria-label={`Quitar ${product.name} del carrito`}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-mist hover:text-ink"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
          <div className="flex h-10 items-center rounded-lg border border-line bg-paper">
            <button
              type="button"
              onClick={() => onQuantityChange(product.id, quantity - 1)}
              aria-label={`Restar una unidad de ${product.name}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-mist"
            >
              <MinusIcon className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-semibold tabular-nums text-ink">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onQuantityChange(product.id, quantity + 1)}
              aria-label={`Sumar una unidad de ${product.name}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-mist"
            >
              <PlusIcon className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="text-right">
            <p className="font-display text-lg font-extrabold tracking-[-0.03em] text-signal">
              {formatPrice(product.price * quantity)}
            </p>
            <p className="text-xs text-muted">{formatPrice(product.price)} c/u</p>
          </div>
        </div>
      </div>
    </div>
  );
}
