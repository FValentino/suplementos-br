import Link from "next/link";
import { ProductMedia } from "@/features/catalog/components/product-media";
import { categories } from "@/features/catalog/data/categories";
import {
  countProductsByCategory,
  getFeaturedProducts,
  getProductBySlug,
} from "@/features/catalog/utils/catalog-selectors";
import { formatPrice } from "@/features/catalog/utils/format-price";
import { buildGeneralInquiryUrl } from "@/features/cart/utils/whatsapp";
import { ArrowRightIcon, WhatsAppIcon } from "@/features/shared/components/icons";

export function Hero() {
  const featured = getFeaturedProducts(1)[0];
  const heroProduct = featured ?? getProductBySlug("proteina-one-fit");

  return (
    <section className="hero-section section-space border-b border-line bg-paper lg:flex lg:h-[calc(100svh-73px)] lg:items-center lg:py-8">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div className="hero-enter">
          <h1 className="hero-title max-w-[12ch] font-display text-[40px] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink sm:text-[56px] lg:text-[clamp(56px,4.8vw,72px)]">
            Proteínas y creatinas para entrenar en serio.
          </h1>
          <p className="hero-subhead mt-6 max-w-[65ch] text-lg leading-[1.6] text-muted">
            Elegí tu producto, consultá stock y coordinamos el envío por WhatsApp.
          </p>

          <ul className="hero-categories mt-8 border-t border-line lg:mt-6">
            {categories.map((category) => {
              const productsInCategory = countProductsByCategory(category.id);
              const sample = getFeaturedProducts(12).find(
                (product) => product.categoryId === category.id,
              );
              const label =
                category.id === "proteinas"
                  ? "Proteínas"
                  : category.id === "creatinas"
                    ? "Creatinas"
                    : category.name;

              return (
                <li key={category.id}>
                  <Link
                    href={`/catalogo?categoria=${category.id}`}
                    className="hero-category group flex items-center justify-between gap-4 border-b border-line py-4 lg:py-3"
                  >
                    <div>
                      <span className="hero-category-label font-display text-2xl font-bold leading-[1.05] tracking-[-0.03em] text-ink transition-colors group-hover:text-signal">
                        {label}
                        {sample ? ` desde ${formatPrice(sample.price)}` : ""}
                      </span>
                      <span className="hero-category-count mt-1 block text-sm text-muted">
                        {productsInCategory} productos
                      </span>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-signal" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row lg:mt-6">
            <Link
              href="/catalogo"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-signal px-6 text-sm font-semibold text-white transition-colors hover:bg-signal/90"
            >
              Ver catálogo
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a
              href={buildGeneralInquiryUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-ink px-6 text-sm font-semibold text-ink transition-colors hover:bg-mist"
            >
              <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
              Comprar por WhatsApp
            </a>
          </div>
        </div>

        {heroProduct ? (
          <div className="hero-enter relative" style={{ animationDelay: "80ms" }}>
            <div className="rounded-xl bg-mist p-6 sm:p-8 lg:p-8">
              <div className="relative aspect-[4/5] w-full lg:aspect-auto lg:h-[clamp(360px,58vh,620px)]">
                <ProductMedia
                  product={heroProduct}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="p-4"
                />
                <div className="absolute left-0 top-0 rounded-lg border border-line bg-paper px-4 py-3">
                  <p className="font-display text-lg font-bold leading-[1.05] tracking-[-0.03em] text-ink">
                    {heroProduct.name}
                  </p>
                  <p className="mt-1 font-display text-2xl font-extrabold tracking-[-0.03em] text-signal">
                    {formatPrice(heroProduct.price)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
