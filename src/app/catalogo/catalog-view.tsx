"use client";

import type { FormEvent, ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/features/catalog/data/categories";
import { filterProducts, type CatalogSort } from "@/features/catalog/utils/catalog-selectors";
import { ProductGrid } from "@/features/catalog/components/product-grid";
import { CloseIcon, SearchIcon, SparklesIcon } from "@/features/shared/components/icons";
import type { CategoryId } from "@/features/catalog/types/product";

const SORT_OPTIONS = [
  { value: "featured", label: "Destacados" },
  { value: "price-asc", label: "Menor precio" },
  { value: "price-desc", label: "Mayor precio" },
  { value: "name", label: "Nombre A-Z" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

function isCategoryId(value: string): value is CategoryId {
  return categories.some((category) => category.id === value);
}

function isSortValue(value: string): value is SortValue {
  return SORT_OPTIONS.some((option) => option.value === value);
}

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-4 text-xs font-semibold transition-colors ${
        active
          ? "border-ink bg-ink text-white"
          : "border-line bg-white text-muted hover:border-ink/25 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export function CatalogView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const categoryParam = searchParams.get("categoria") ?? "all";
  const promoOnly = searchParams.get("promo") === "1";
  const sortParam = searchParams.get("orden") ?? "featured";

  const categoryId = isCategoryId(categoryParam) ? categoryParam : "all";
  const sort: CatalogSort = isSortValue(sortParam) ? sortParam : "featured";

  function updateParams(patch: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(patch)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = String(formData.get("q") ?? "").trim();
    updateParams({ q: value || null });
  }

  function clearFilters() {
    router.replace(pathname, { scroll: false });
  }

  const results = filterProducts({ query, categoryId, promoOnly, sort });
  const hasFilters = Boolean(query) || categoryId !== "all" || promoOnly;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <form role="search" onSubmit={handleSearch} className="relative w-full lg:max-w-md">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            key={query}
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Buscar por producto o marca"
            aria-label="Buscar en el catálogo"
            className="h-11 w-full rounded-lg border border-line bg-white pl-9 pr-10 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-brand"
          />
          {query ? (
            <button
              type="button"
              onClick={() => updateParams({ q: null })}
              aria-label="Limpiar búsqueda"
              className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:bg-mist hover:text-ink"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          ) : null}
        </form>

        <div className="flex items-center gap-2">
          <label htmlFor="catalog-sort" className="text-xs font-semibold text-muted">
            Ordenar por
          </label>
          <select
            id="catalog-sort"
            value={sort}
            onChange={(event) =>
              updateParams({ orden: event.target.value === "featured" ? null : event.target.value })
            }
            className="h-10 rounded-lg border border-line bg-white px-3 text-sm font-medium text-ink outline-none focus:border-brand"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
        <FilterChip active={categoryId === "all"} onClick={() => updateParams({ categoria: null })}>
          Todos
        </FilterChip>
        {categories.map((category) => (
          <FilterChip
            key={category.id}
            active={categoryId === category.id}
            onClick={() => updateParams({ categoria: category.id })}
          >
            {category.name}
          </FilterChip>
        ))}
        <FilterChip
          active={promoOnly}
          onClick={() => updateParams({ promo: promoOnly ? null : "1" })}
        >
          <SparklesIcon className="h-3.5 w-3.5" />
          Ofertas
        </FilterChip>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <p className="text-sm text-muted">
          {results.length} {results.length === 1 ? "producto" : "productos"}
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-semibold text-muted underline-offset-4 hover:text-brand hover:underline"
          >
            Limpiar filtros
          </button>
        ) : null}
      </div>

      <div className="mt-5">
        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-mist/40 px-6 py-16 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-muted">
              <SearchIcon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-display text-lg font-bold text-ink">
              No encontramos productos
            </h2>
            <p className="mt-1 max-w-sm text-sm text-muted">
              Probá con otra búsqueda o quitá los filtros para ver todo el catálogo.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-ink px-4 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
