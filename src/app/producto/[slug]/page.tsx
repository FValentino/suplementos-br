import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/features/catalog/components/product-grid";
import { ProductVisual } from "@/features/catalog/components/product-visual";
import { getCategoryById } from "@/features/catalog/data/categories";
import { products } from "@/features/catalog/data/products";
import { getProductBySlug, getRelatedProducts } from "@/features/catalog/utils/catalog-selectors";
import { formatPrice, getDiscountPercent } from "@/features/catalog/utils/format-price";
import { buildProductInquiryUrl } from "@/features/cart/utils/whatsapp";
import {
  ChatIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
  StarIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@/features/shared/components/icons";
import { ProductPurchasePanel } from "./product-purchase-panel";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  return {
    title: product.name,
    description: product.summary,
  };
}

const trustItems = [
  { icon: TruckIcon, label: "Envíos a todo el país" },
  { icon: ChatIcon, label: "Asesoramiento personalizado" },
  { icon: ShieldCheckIcon, label: "Pedido por WhatsApp" },
];

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = getCategoryById(product.categoryId);
  const related = getRelatedProducts(product, 4);
  const discount = getDiscountPercent(product.price, product.compareAtPrice);
  const inquiryUrl = buildProductInquiryUrl(product.name, product.presentation);

  return (
    <div className="bg-white">
      <div className="container-page py-6">
        <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="hover:text-ink">
            Inicio
          </Link>
          <ChevronRightIcon className="h-3 w-3" />
          <Link href="/catalogo" className="hover:text-ink">
            Catálogo
          </Link>
          {category ? (
            <>
              <ChevronRightIcon className="h-3 w-3" />
              <Link href={`/catalogo?categoria=${category.id}`} className="hover:text-ink">
                {category.name}
              </Link>
            </>
          ) : null}
          <ChevronRightIcon className="h-3 w-3" />
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      <div className="container-page grid gap-8 pb-14 lg:grid-cols-2 lg:gap-12">
        <div>
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ backgroundColor: product.visual.soft }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#ffffff_0%,transparent_60%)] opacity-70" />
            <ProductVisual
              visual={product.visual}
              name={product.name}
              brand={product.brand}
              className="relative mx-auto h-full w-full max-w-md p-6 sm:p-10"
            />
            {discount > 0 ? (
              <span className="absolute left-4 top-4 rounded-md bg-brand-magenta px-2.5 py-1 text-xs font-bold text-white">
                {discount}% off
              </span>
            ) : null}
            {product.badge ? (
              <span className="absolute right-4 top-4 rounded-md bg-ink px-2.5 py-1 text-xs font-bold text-white">
                {product.badge}
              </span>
            ) : null}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2.5 text-xs font-medium text-muted"
                >
                  <Icon className="h-4 w-4 shrink-0 text-brand" />
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <Link
            href={`/catalogo?categoria=${product.categoryId}`}
            className="text-xs font-semibold uppercase tracking-wide text-brand hover:underline"
          >
            {product.brand}
          </Link>
          <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1">
              <StarIcon className="h-4 w-4 text-brand-magenta" />
              <span className="font-semibold text-ink">{product.rating.toFixed(1)}</span>
            </span>
            <span className="text-muted">({product.reviews} reseñas)</span>
            <span className="text-line">•</span>
            <span className="text-muted">{product.presentation}</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{product.summary}</p>

          <div className="mt-6 rounded-xl border border-line bg-mist/50 p-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-3xl font-extrabold tracking-tight text-ink">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice ? (
                <span className="text-sm text-muted line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              ) : null}
              {discount > 0 ? (
                <span className="rounded-md bg-brand-magenta/10 px-2 py-1 text-xs font-bold text-brand-magenta">
                  Ahorrás {discount}%
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-xs text-muted">
              Precio de demostración. Coordinamos disponibilidad y envío por WhatsApp.
            </p>

            {product.flavors ? (
              <div className="mt-4">
                <p className="text-xs font-semibold text-ink">Sabores disponibles</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.flavors.map((flavor) => (
                    <span
                      key={flavor}
                      className="rounded-md border border-line bg-white px-2.5 py-1 text-xs font-medium text-muted"
                    >
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <ProductPurchasePanel productId={product.id} />

            <a
              href={inquiryUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-ink/15 bg-white text-sm font-semibold text-ink transition-colors hover:bg-mist"
            >
              <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
              Consultar por WhatsApp
            </a>
          </div>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {product.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-sm text-ink">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-7 divide-y divide-line border-y border-line">
            <details className="group py-4" open>
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
                Descripción
                <ChevronDownIcon className="h-4 w-4 text-muted transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{product.description}</p>
            </details>
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
                Cómo usar
                <ChevronDownIcon className="h-4 w-4 text-muted transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Mezclá una porción con agua o leche según tu preferencia. Consultanos si tenés
                dudas sobre la cantidad adecuada para tus objetivos.
              </p>
            </details>
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
                Envíos y coordinación
                <ChevronDownIcon className="h-4 w-4 text-muted transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Enviamos a todo el país. Al cerrar el pedido por WhatsApp coordinamos medio de
                envío, tiempos y forma de pago.
              </p>
            </details>
          </div>
        </div>
      </div>

      <section className="border-t border-line bg-mist/50 py-12">
        <div className="container-page">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
            También te puede interesar
          </h2>
          <ProductGrid products={related} className="mt-6" />
        </div>
      </section>
    </div>
  );
}
