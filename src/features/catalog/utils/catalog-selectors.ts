import { products } from "../data/products";
import type { CategoryId, Product } from "../types/product";

export type CatalogSort = "featured" | "price-asc" | "price-desc" | "name";

export interface CatalogFilters {
  query: string;
  categoryId: CategoryId | "all";
  promoOnly: boolean;
  sort: CatalogSort;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.slice(0, limit);
}

export function getCatalogProducts(limit = 4): Product[] {
  return products.slice(0, limit);
}

export function getPromoProducts(limit = 4): Product[] {
  return products.filter((product) => product.promo).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (candidate) => candidate.categoryId === product.categoryId && candidate.id !== product.id,
  );
  const fallback = products.filter(
    (candidate) => candidate.categoryId !== product.categoryId && candidate.id !== product.id,
  );

  return [...sameCategory, ...fallback].slice(0, limit);
}

export function countProductsByCategory(categoryId: CategoryId): number {
  return products.filter((product) => product.categoryId === categoryId).length;
}

export function filterProducts(filters: CatalogFilters): Product[] {
  const normalizedQuery = filters.query.trim().toLowerCase();

  const result = products.filter((product) => {
    if (filters.categoryId !== "all" && product.categoryId !== filters.categoryId) {
      return false;
    }

    if (filters.promoOnly && !product.promo) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return [product.name, product.brand, product.summary]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  });

  return result.sort((a, b) => {
    if (filters.sort === "price-asc") return a.price - b.price;
    if (filters.sort === "price-desc") return b.price - a.price;
    if (filters.sort === "name") return a.name.localeCompare(b.name, "es");
    return 0;
  });
}
