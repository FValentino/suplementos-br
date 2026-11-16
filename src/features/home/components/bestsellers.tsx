import Link from "next/link";
import { ProductVisual } from "@/features/catalog/components/product-visual";
import { getBestSellers } from "@/features/catalog/utils/catalog-selectors";
import { formatPrice } from "@/features/catalog/utils/format-price";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";
import { ArrowRightIcon } from "@/features/shared/components/icons";
import { SectionHeader } from "@/features/shared/components/section-header";

export function BestSellers() {
  const bestSellers = getBestSellers(4);

  return (
    <section className="bg-mist/60 py-14 lg:py-20">
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div>
          <SectionHeader
            title="Los más vendidos"
            description="Los productos que más salen y que nuestros clientes vuelven a elegir."
          />
          <Link
            href="/catalogo"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand"
          >
            Explorar catálogo
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div>
          {bestSellers.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center gap-3 border-b border-line py-4 first:pt-0 last:border-none last:pb-0 sm:gap-4"
            >
              <span className="w-7 shrink-0 font-display text-xl font-extrabold text-ink/25">
                {index + 1}
              </span>

              <Link
                href={`/producto/${product.slug}`}
                className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg"
                style={{ backgroundColor: product.visual.soft }}
                aria-label={`Ver ${product.name}`}
              >
                <ProductVisual
                  visual={product.visual}
                  name={product.name}
                  brand={product.brand}
                  className="h-full w-full p-1.5"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                  {product.brand}
                </p>
                <Link
                  href={`/producto/${product.slug}`}
                  className="block truncate font-display text-sm font-bold text-ink hover:text-brand"
                >
                  {product.name}
                </Link>
                <p className="mt-0.5 text-xs text-muted">{product.presentation}</p>
                <p className="mt-1 font-display text-sm font-extrabold text-ink">
                  {formatPrice(product.price)}
                </p>
              </div>

              <AddToCartButton
                productId={product.id}
                className="h-10 shrink-0 px-3 text-xs"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
