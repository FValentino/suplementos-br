import { ProductGrid } from "@/features/catalog/components/product-grid";
import { getFeaturedProducts } from "@/features/catalog/utils/catalog-selectors";
import { SectionHeader } from "@/features/shared/components/section-header";

export function FeaturedProducts() {
  const featured = getFeaturedProducts(4);

  return (
    <section className="section-space border-t border-line bg-paper">
      <div className="container-page">
        <SectionHeader
          title="Los más elegidos"
          description="Productos con buena rotación para empezar o reponer."
          action={{ label: "Ver catálogo", href: "/catalogo" }}
        />

        <ProductGrid products={featured} className="mt-8" />
      </div>
    </section>
  );
}
