import Link from "next/link";
import { ProductMedia } from "@/features/catalog/components/product-media";
import { getCatalogProducts } from "@/features/catalog/utils/catalog-selectors";
import { ArrowRightIcon } from "@/features/shared/components/icons";
import type { Category } from "../types/product";
import { countProductsByCategory } from "../utils/catalog-selectors";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const count = countProductsByCategory(category.id);
  const sample = getCatalogProducts(12).find((product) => product.categoryId === category.id);

  return (
    <Link
      href={`/catalogo?categoria=${category.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-paper transition-colors hover:border-ink/30"
    >
      <div className="relative aspect-[4/3] bg-mist">
        {sample ? (
          <ProductMedia
            product={sample}
            sizes="fill"
            className="p-6 transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-2xl font-bold leading-[1.05] tracking-[-0.03em] text-ink">
          {category.name}
        </h3>
        <p className="mt-2 text-sm leading-[1.6] text-muted">{category.description}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
          {count} productos · Ver categoría
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
