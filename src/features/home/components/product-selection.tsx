import { ProductGrid } from "@/features/catalog/components/product-grid";
import { getCatalogProducts } from "@/features/catalog/utils/catalog-selectors";
import { SectionHeader } from "@/features/shared/components/section-header";

export function ProductSelection() {
  const selection = getCatalogProducts(8).slice(4, 8);

  if (selection.length === 0) {
    return null;
  }

  return (
    <section className="section-space border-t border-line bg-paper">
      <div className="container-page">
        <SectionHeader
          title="Todo el catálogo"
          description="Más opciones de proteínas y creatinas disponibles."
          action={{ label: "Ver catálogo", href: "/catalogo" }}
        />
        <ProductGrid products={selection} className="mt-8" />
      </div>
    </section>
  );
}
