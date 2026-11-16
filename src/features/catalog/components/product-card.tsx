import Link from "next/link";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";
import type { Product } from "../types/product";
import { formatPrice } from "../utils/format-price";
import { ProductMedia } from "./product-media";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex flex-col border border-line bg-paper">
      <Link
        href={`/producto/${product.slug}`}
        className="relative block overflow-hidden bg-mist"
        aria-label={`Ver ${product.name}`}
      >
        <div className="relative aspect-[4/5]">
          <ProductMedia
            product={product}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="h-full w-full p-5 transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium text-muted">
          {product.brand} · {product.presentation}
        </p>
        <Link
          href={`/producto/${product.slug}`}
          className="mt-1 font-display text-lg font-bold leading-[1.05] tracking-[-0.03em] text-ink hover:text-signal"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-end sm:justify-between">
          <span className="min-w-0 font-display text-lg font-extrabold tracking-[-0.03em] text-signal sm:text-xl">
            {formatPrice(product.price)}
          </span>
          <AddToCartButton productId={product.id} compact className="shrink-0" />
        </div>
      </div>
    </article>
  );
}
