import type { Product } from "@/features/catalog/types/product";

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartLine {
  product: Product;
  quantity: number;
}
