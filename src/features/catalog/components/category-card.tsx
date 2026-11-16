import Link from "next/link";
import { CategoryIcon } from "@/features/shared/components/category-icon";
import { ArrowRightIcon } from "@/features/shared/components/icons";
import type { Category } from "../types/product";
import { countProductsByCategory } from "../utils/catalog-selectors";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const count = countProductsByCategory(category.id);

  return (
    <Link
      href={`/catalogo?categoria=${category.id}`}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-line bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-card"
    >
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: category.accent }}
      />
      <span
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ backgroundColor: category.soft, color: category.accent }}
      >
        <CategoryIcon name={category.icon} className="h-6 w-6" />
      </span>

      <div>
        <h3 className="font-display text-base font-bold leading-tight text-ink">
          {category.name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">{category.description}</p>
      </div>

      <span className="mt-auto flex items-center justify-between text-xs font-semibold text-ink">
        <span>
          {count} {count === 1 ? "producto" : "productos"}
        </span>
        <ArrowRightIcon className="h-4 w-4 text-brand transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
