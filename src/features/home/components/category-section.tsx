import { CategoryCard } from "@/features/catalog/components/category-card";
import { categories } from "@/features/catalog/data/categories";
import { SectionHeader } from "@/features/shared/components/section-header";

export function CategorySection() {
  return (
    <section id="categorias" className="scroll-mt-24 bg-mist/60 py-14 lg:py-20">
      <div className="container-page">
        <SectionHeader
          title="Encontrá lo que buscás"
          description="Organizamos la tienda por objetivo para que llegues rápido al producto que necesitás."
          action={{ label: "Ver catálogo", href: "/catalogo" }}
        />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
