"use client";

import type { FormEvent, ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/features/catalog/data/categories";
import { filterProducts, type CatalogSort } from "@/features/catalog/utils/catalog-selectors";
import { ProductGrid } from "@/features/catalog/components/product-grid";
import { CloseIcon, SearchIcon } from "@/features/shared/components/icons";
import type { CategoryId } from "@/features/catalog/types/product";

const SORT_OPTIONS = [
  { value: "featured", label: "Recomendados" },
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
      className={`inline-flex h-10 shrink-0 items-center rounded-lg border px-4 text-sm font-semibold transition-colors ${
        active
          ? "border-ink bg-ink text-white"
          : "border-line bg-paper text-ink hover:bg-mist"
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

  const results = filterProducts({ query, categoryId, promoOnly: false, sort });
  const hasFilters = Boolean(query) || categoryId !== "all";

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <form role="search" onSubmit={handleSearch} className="relative w-full lg:max-w-md">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            key={query}
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Buscar por producto o marca"
            aria-label="Buscar en el catálogo"
            className="h-11 w-full rounded-lg border border-line bg-paper pl-9 pr-10 text-sm text-ink transition-colors placeholder:text-muted focus:border-focus"
          />
          {query ? (
            <button
              type="button"
              onClick={() => updateParams({ q: null })}
              aria-label="Limpiar búsqueda"
              className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-muted hover:bg-mist hover:text-ink"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          ) : null}
        </form>

        <div className="flex items-center gap-3">
          <label htmlFor="catalog-sort" className="text-sm font-medium text-muted">
            Ordenar por
          </label>
          <select
            id="catalog-sort"
            value={sort}
            onChange={(event) =>
              updateParams({ orden: event.target.value === "featured" ? null : event.target.value })
            }
            className="h-11 rounded-lg border border-line bg-paper px-3 text-sm font-medium text-ink focus:border-focus"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-muted">Filtrar por categoría</p>
        <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto pb-1">
          <FilterChip active={categoryId === "all"} onClick={() => updateParams({ categoria: null })}>
            Todos los productos
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
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <p className="text-sm text-muted">
          {results.length} {results.length === 1 ? "producto" : "productos"}
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-semibold text-ink underline-offset-4 hover:text-signal hover:underline"
          >
            Limpiar filtros
          </button>
        ) : null}
      </div>

      <div className="mt-6">
        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-line bg-mist px-6 py-16 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-paper text-muted">
              <SearchIcon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-display text-xl font-bold tracking-[-0.03em] text-ink">
              No encontramos productos
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-[1.6] text-muted">
              Probá con otra búsqueda o quitá los filtros para ver todo el catálogo.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-signal px-5 text-sm font-semibold text-white transition-colors hover:bg-signal/90"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
