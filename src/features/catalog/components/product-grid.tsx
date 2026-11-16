import type { Product } from "../types/product";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 ${className ?? ""}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
