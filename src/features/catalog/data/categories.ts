import type { Category } from "../types/product";

export const categories: Category[] = [
  {
    id: "proteinas",
    name: "Proteínas",
    description: "One Fit, Gold y Star en distintas presentaciones.",
    icon: "protein",
    accent: "#e60079",
    soft: "#fce6f1",
  },
  {
    id: "creatinas",
    name: "Creatinas",
    description: "One Fit, Star, X Body y Ena para tu entrenamiento.",
    icon: "creatine",
    accent: "#1677e8",
    soft: "#e7f1fd",
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}
