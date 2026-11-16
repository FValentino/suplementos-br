import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "./catalog-view";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explorá proteínas, creatinas, pre-entrenos, aminoácidos, vitaminas y accesorios. Filtrá por categoría y encontrá tu próximo suplemento.",
};

function CatalogFallback() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="h-80 animate-pulse rounded-xl bg-mist" />
      ))}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-line bg-mist/50 py-10">
        <div className="container-page">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Tienda</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Catálogo completo
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Todo lo que necesitás para entrenar, recuperar y sostener tus objetivos. Filtrá por
            categoría o buscá por producto o marca.
          </p>
        </div>
      </div>

      <div className="container-page py-8 lg:py-10">
        <Suspense fallback={<CatalogFallback />}>
          <CatalogView />
        </Suspense>
      </div>
    </div>
  );
}
