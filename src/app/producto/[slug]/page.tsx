import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/features/catalog/components/product-grid";
import { ProductMedia } from "@/features/catalog/components/product-media";
import { getCategoryById } from "@/features/catalog/data/categories";
import { products } from "@/features/catalog/data/products";
import { getProductBySlug, getRelatedProducts } from "@/features/catalog/utils/catalog-selectors";
import { formatPrice } from "@/features/catalog/utils/format-price";
import { buildProductInquiryUrl } from "@/features/cart/utils/whatsapp";
import { CheckIcon, ChevronRightIcon, WhatsAppIcon } from "@/features/shared/components/icons";
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

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = getCategoryById(product.categoryId);
  const related = getRelatedProducts(product, 4);
  const inquiryUrl = buildProductInquiryUrl(product.name, product.presentation);

  return (
    <div className="bg-paper">
      <div className="container-page py-6">
        <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          <Link href="/" className="hover:text-ink">
            Inicio
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <Link href="/catalogo" className="hover:text-ink">
            Catálogo
          </Link>
          {category ? (
            <>
              <ChevronRightIcon className="h-3.5 w-3.5" />
              <Link href={`/catalogo?categoria=${category.id}`} className="hover:text-ink">
                {category.name}
              </Link>
            </>
          ) : null}
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      <div className="container-page grid gap-8 pb-16 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-mist">
          <ProductMedia
            product={product}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-full w-full p-6 sm:p-10"
          />
        </div>

        <div className="lg:sticky lg:top-24">
          <p className="text-sm font-medium text-muted">
            {product.brand} · {product.presentation}
          </p>
          <h1 className="mt-2 font-display text-[32px] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[40px]">
            {product.name}
          </h1>

          <p className="mt-4 font-display text-[32px] font-extrabold tracking-[-0.03em] text-signal">
            {formatPrice(product.price)}
          </p>

          <p className="mt-4 max-w-[65ch] text-base leading-[1.6] text-muted">{product.summary}</p>

          {product.flavors?.length ? (
            <div className="mt-6">
              <p className="text-sm font-semibold text-ink">Sabores o presentaciones</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.flavors.map((flavor) => (
                  <span
                    key={flavor}
                    className="rounded-lg border border-line bg-paper px-3 py-2 text-sm text-muted"
                  >
                    {flavor}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-6 flex flex-col gap-3">
            <ProductPurchasePanel productId={product.id} />
            <a
              href={inquiryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-ink text-sm font-semibold text-ink transition-colors hover:bg-mist"
            >
              <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
              Consultar por WhatsApp
            </a>
          </div>

          <ul className="mt-6 grid gap-2.5">
            {product.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-sm text-ink">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-4 border-t border-line pt-6 text-sm leading-[1.6] text-muted">
            <div>
              <h2 className="font-display text-lg font-bold tracking-[-0.03em] text-ink">Descripción</h2>
              <p className="mt-2">{product.description}</p>
            </div>
            <div>
              <h2 className="font-display text-lg font-bold tracking-[-0.03em] text-ink">Stock y envío</h2>
              <p className="mt-2">
                Consultá disponibilidad y coordinamos el envío a todo el país por WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="section-space border-t border-line bg-mist">
        <div className="container-page">
          <h2 className="font-display text-[32px] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[40px]">
            También te puede interesar
          </h2>
          <ProductGrid products={related} className="mt-8" />
        </div>
      </section>
    </div>
  );
}
