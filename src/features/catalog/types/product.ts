import type { StaticImageData } from "next/image";

export type CategoryId =
  | "proteinas"
  | "creatinas"
  | "pre-entrenos"
  | "aminoacidos"
  | "vitaminas"
  | "accesorios";

export type CategoryIconName =
  | "protein"
  | "creatine"
  | "preworkout"
  | "amino"
  | "vitamin"
  | "accessory";

export type ProductVariant = "tub" | "jar" | "pouch" | "shaker" | "bottle" | "box";

export interface ProductVisual {
  variant: ProductVariant;
  accent: string;
  soft: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categoryId: CategoryId;
  presentation: string;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  summary: string;
  description: string;
  benefits: string[];
  flavors?: string[];
  image?: StaticImageData;
  expirationDate?: string | null;
  promo: boolean;
  visual: ProductVisual;
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: CategoryIconName;
  accent: string;
  soft: string;
}
