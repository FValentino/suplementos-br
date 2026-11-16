import { CategoryCard } from "@/features/catalog/components/category-card";
import { categories } from "@/features/catalog/data/categories";
import { SectionHeader } from "@/features/shared/components/section-header";

export function CategorySection() {
  return (
    <section id="categorias" className="section-space bg-paper">
      <div className="container-page">
        <SectionHeader
          title="Elegí por categoría"
          description="Dos líneas claras para encontrar rápido lo que necesitás."
          action={{ label: "Ver catálogo", href: "/catalogo" }}
        />

        <div className="mt-8 flex justify-center lg:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
