import Link from "next/link";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";
import { StarIcon } from "@/features/shared/components/icons";
import type { Product } from "../types/product";
import { formatPrice, getDiscountPercent } from "../utils/format-price";
import { ProductVisual } from "./product-visual";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = getDiscountPercent(product.price, product.compareAtPrice);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition-all duration-200 hover:border-ink/15 hover:shadow-card">
      <Link
        href={`/producto/${product.slug}`}
        className="relative block overflow-hidden"
        aria-label={`Ver ${product.name}`}
      >
        <div
          className="relative aspect-[4/5]"
          style={{ backgroundColor: product.visual.soft }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,#ffffff_0%,transparent_62%)] opacity-70" />
          <ProductVisual
            visual={product.visual}
            name={product.name}
            brand={product.brand}
            className="absolute inset-0 h-full w-full p-5 transition-transform duration-300 group-hover:scale-[1.04]"
          />
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {product.badge ? (
              <span className="rounded-md bg-ink px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                {product.badge}
              </span>
            ) : null}
            {discount > 0 ? (
              <span className="rounded-md bg-brand-magenta px-2 py-1 text-[10px] font-bold text-white">
                {discount}% off
              </span>
            ) : null}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
          {product.brand}
        </span>
        <Link
          href={`/producto/${product.slug}`}
          className="mt-1 font-display text-[15px] font-bold leading-snug text-ink hover:text-brand"
        >
          {product.name}
        </Link>
        <span className="mt-0.5 text-xs text-muted">{product.presentation}</span>

        <div className="mt-2 flex items-center gap-1 text-xs text-muted">
          <StarIcon className="h-3.5 w-3.5 text-brand-magenta" />
          <span className="font-semibold text-ink">{product.rating.toFixed(1)}</span>
          <span>({product.reviews})</span>
        </div>

        <div className="mt-auto pt-3">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-display text-lg font-extrabold tracking-tight text-ink">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice ? (
              <span className="text-xs text-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            ) : null}
          </div>
          <AddToCartButton productId={product.id} className="mt-3 w-full" />
        </div>
      </div>
    </article>
  );
}
