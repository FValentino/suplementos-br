import Link from "next/link";
import { ProductVisual } from "@/features/catalog/components/product-visual";
import { getProductBySlug } from "@/features/catalog/utils/catalog-selectors";
import { buildGeneralInquiryUrl } from "@/features/cart/utils/whatsapp";
import { ArrowRightIcon, WhatsAppIcon } from "@/features/shared/components/icons";

export function BrandBanner() {
  const creatine = getProductBySlug("creatina-monohidratada");
  const preworkout = getProductBySlug("pre-workout-explosive");

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="container-page">
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-line bg-mist/70 lg:grid-cols-2">
          <div className="p-6 sm:p-10 lg:p-12">
            <span className="brand-gradient block h-1 w-16 rounded-full" />
            <h2 className="mt-5 font-display text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              Tu esfuerzo merece el mejor acompañamiento.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              Encontrá lo que necesitás para acompañar tu entrenamiento, mejorar tu rendimiento
              y mantenerte en movimiento.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/catalogo"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
              >
                Ver productos
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a
                href={buildGeneralInquiryUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-ink/15 px-5 text-sm font-semibold text-ink transition-colors hover:bg-white"
              >
                <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
                Hacer una consulta
              </a>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden bg-ink">
            <div className="speed-lines absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-2 px-8">
              {creatine ? (
                <ProductVisual
                  visual={creatine.visual}
                  name={creatine.name}
                  brand={creatine.brand}
                  className="h-[240px] w-[42%] translate-y-3 sm:h-[300px]"
                />
              ) : null}
              {preworkout ? (
                <ProductVisual
                  visual={preworkout.visual}
                  name={preworkout.name}
                  brand={preworkout.brand}
                  className="h-[280px] w-[48%] sm:h-[340px]"
                />
              ) : null}
            </div>
            <div className="absolute right-5 top-5 flex flex-col items-end gap-1.5">
              <span className="h-1.5 w-12 rounded-full bg-brand-cyan" />
              <span className="h-1.5 w-8 rounded-full bg-brand-violet" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
