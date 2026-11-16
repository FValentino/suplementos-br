import Link from "next/link";
import { ProductVisual } from "@/features/catalog/components/product-visual";
import { getProductBySlug } from "@/features/catalog/utils/catalog-selectors";
import { formatPrice } from "@/features/catalog/utils/format-price";
import { buildGeneralInquiryUrl } from "@/features/cart/utils/whatsapp";
import {
  ArrowRightIcon,
  CheckIcon,
  WhatsAppIcon,
} from "@/features/shared/components/icons";

const trustItems = ["Envíos a todo el país", "Atención personalizada", "Compra por WhatsApp"];

export function Hero() {
  const whey = getProductBySlug("whey-protein-concentrada");
  const creatine = getProductBySlug("creatina-monohidratada");
  const multivitamin = getProductBySlug("multivitaminico-diario");

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
        <div className="rise-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            <span className="brand-gradient h-2 w-2 rounded-full" />
            Suplementación deportiva y bienestar
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl">
            <span className="block">Potenciá tu rendimiento.</span>
            <span className="block">Superá tus límites.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Encontrá los suplementos ideales para acompañar tus objetivos y llevar tu
            entrenamiento al siguiente nivel.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="brand-gradient inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Explorar productos
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a
              href={buildGeneralInquiryUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line px-6 text-sm font-semibold text-ink transition-colors hover:border-ink/25 hover:bg-mist"
            >
              <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
              Consultar por WhatsApp
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {trustItems.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                <CheckIcon className="h-4 w-4 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rise-in relative" style={{ animationDelay: "120ms" }}>
          <div className="relative overflow-hidden rounded-3xl bg-ink p-5 sm:p-7">
            <div className="speed-lines absolute inset-0" />
            <div className="absolute right-6 top-6 flex flex-col items-end gap-1.5">
              <span className="h-1.5 w-16 rounded-full bg-brand-magenta" />
              <span className="h-1.5 w-11 rounded-full bg-brand-violet" />
              <span className="h-1.5 w-7 rounded-full bg-brand-cyan" />
            </div>

            <div className="relative h-[360px] sm:h-[430px] lg:h-[470px]">
              {whey ? (
                <ProductVisual
                  visual={whey.visual}
                  name={whey.name}
                  brand={whey.brand}
                  className="absolute bottom-6 left-1/2 z-10 h-[80%] w-[58%] -translate-x-1/2"
                />
              ) : null}
              {creatine ? (
                <ProductVisual
                  visual={creatine.visual}
                  name={creatine.name}
                  brand={creatine.brand}
                  className="absolute bottom-2 left-0 z-0 h-[46%] w-[36%]"
                />
              ) : null}
              {multivitamin ? (
                <ProductVisual
                  visual={multivitamin.visual}
                  name={multivitamin.name}
                  brand={multivitamin.brand}
                  className="absolute bottom-2 right-0 z-0 h-[44%] w-[28%]"
                />
              ) : null}

              {whey ? (
                <div className="absolute left-0 top-4 z-20 rounded-xl bg-white p-3 shadow-lift sm:left-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                    Más elegido
                  </p>
                  <p className="mt-0.5 font-display text-sm font-bold text-ink">{whey.name}</p>
                  <p className="mt-1 font-display text-base font-extrabold text-brand-magenta">
                    {formatPrice(whey.price)}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <p className="mt-3 text-center text-[11px] text-muted">
            Imágenes ilustrativas. Productos y precios de demostración.
          </p>
        </div>
      </div>
    </section>
  );
}
