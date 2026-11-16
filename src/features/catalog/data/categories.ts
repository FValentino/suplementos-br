import type { Category } from "../types/product";

export const categories: Category[] = [
  {
    id: "proteinas",
    name: "Proteínas",
    description: "Whey, isolate y blends para recuperar y crecer.",
    icon: "protein",
    accent: "#e60079",
    soft: "#fce6f1",
  },
  {
    id: "creatinas",
    name: "Creatinas",
    description: "Fuerza y potencia en cada serie.",
    icon: "creatine",
    accent: "#1677e8",
    soft: "#e7f1fd",
  },
  {
    id: "pre-entrenos",
    name: "Pre-entrenos",
    description: "Energía y foco para entrenar al máximo.",
    icon: "preworkout",
    accent: "#7138c8",
    soft: "#efe7fa",
  },
  {
    id: "aminoacidos",
    name: "Aminoácidos",
    description: "BCAA, glutamina y recuperación muscular.",
    icon: "amino",
    accent: "#22c5d8",
    soft: "#e2f8fb",
  },
  {
    id: "vitaminas",
    name: "Vitaminas y minerales",
    description: "Bases para rendir y sentirte bien.",
    icon: "vitamin",
    accent: "#7138c8",
    soft: "#efe7fa",
  },
  {
    id: "accesorios",
    name: "Accesorios",
    description: "Shakers y esenciales para tu rutina.",
    icon: "accessory",
    accent: "#10141c",
    soft: "#e8eaef",
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}
