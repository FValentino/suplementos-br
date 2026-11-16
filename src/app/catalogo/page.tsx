import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "./catalog-view";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explorá proteínas y creatinas. Filtrá por categoría y encontrá tu próximo suplemento.",
};

function CatalogFallback() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="h-80 animate-pulse rounded-lg bg-mist" />
      ))}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <div className="bg-paper">
      <div className="section-space border-b border-line">
        <div className="container-page">
          <h1 className="font-display text-[40px] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink sm:text-[56px]">
            Catálogo
          </h1>
          <p className="mt-4 max-w-[65ch] text-lg leading-[1.6] text-muted">
            Todos los productos disponibles. Filtrá por categoría y ordená como prefieras.
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
