import { ProductGrid } from "@/features/catalog/components/product-grid";
import { getFeaturedProducts } from "@/features/catalog/utils/catalog-selectors";
import { SectionHeader } from "@/features/shared/components/section-header";

export function FeaturedProducts() {
  const featured = getFeaturedProducts(8);

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="container-page">
        <SectionHeader
          title="Elegidos para vos"
          description="Una selección de los productos que más nos consultan para arrancar, rendir y recuperar."
          action={{ label: "Ver todo", href: "/catalogo" }}
        />

        <ProductGrid products={featured} className="mt-8" />
      </div>
    </section>
  );
}
