import Link from "next/link";
import { ProductMedia } from "@/features/catalog/components/product-media";
import { getProductBySlug } from "@/features/catalog/utils/catalog-selectors";
import { ArrowRightIcon } from "@/features/shared/components/icons";

export function BrandBanner() {
  const product = getProductBySlug("creatina-one-fit-500g") ?? getProductBySlug("proteina-one-fit");

  return (
    <section className="section-space border-t border-line bg-mist">
      <div className="container-page grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
        <div>
          <h2 className="max-w-[20ch] font-display text-[32px] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[40px]">
            Suplementos reales, atención directa.
          </h2>
          <p className="mt-4 max-w-[65ch] text-base leading-[1.6] text-muted">
            Trabajamos con productos conocidos del mercado y te acompañamos por WhatsApp para elegir y coordinar tu compra.
          </p>
          <Link
            href="/catalogo"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline-offset-4 transition-colors hover:text-signal hover:underline"
          >
            Ver catálogo
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        {product ? (
          <div className="mx-auto w-full max-w-[280px] rounded-xl bg-paper p-4">
            <div className="relative aspect-square">
              <ProductMedia
                product={product}
                sizes="(max-width: 1024px) 50vw, 280px"
                className="p-4"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
