import Image from "next/image";
import type { Product } from "../types/product";
import { ProductVisual } from "./product-visual";

interface ProductMediaProps {
  product: Product;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function ProductMedia({
  product,
  className,
  sizes = "(max-width: 640px) 50vw, 25vw",
  priority = false,
}: ProductMediaProps) {
  if (product.image) {
    return (
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-contain ${className ?? ""}`}
      />
    );
  }

  return (
    <div className={`flex h-full w-full items-center justify-center ${className ?? ""}`}>
      <ProductVisual
        visual={product.visual}
        name={product.name}
        brand={product.brand}
        className="h-full w-full"
      />
    </div>
  );
}
