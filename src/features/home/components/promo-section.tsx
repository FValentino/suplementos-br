import { ProductGrid } from "@/features/catalog/components/product-grid";
import { getPromoProducts } from "@/features/catalog/utils/catalog-selectors";
import { SectionHeader } from "@/features/shared/components/section-header";

export function PromoSection() {
  const promos = getPromoProducts(4);

  return (
    <section className="relative overflow-hidden bg-ink py-14 lg:py-20">
      <div className="speed-lines absolute inset-0 opacity-60" />
      <div className="absolute left-0 top-0 h-1 w-full brand-gradient" />

      <div className="container-page relative">
        <SectionHeader
          tone="dark"
          title="Promos que potencian tu entrenamiento"
          description="Encontrá oportunidades para equiparte y acompañar tus objetivos."
          action={{ label: "Ver todas las promos", href: "/catalogo?promo=1" }}
        />

        <ProductGrid products={promos} className="mt-8" />

        <p className="mt-5 text-xs text-white/45">
          Descuentos de demostración. No representan precios ni promociones reales del comercio.
        </p>
      </div>
    </section>
  );
}
