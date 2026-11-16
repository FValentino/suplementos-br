import Link from "next/link";
import { buildGeneralInquiryUrl } from "@/features/cart/utils/whatsapp";
import { categories } from "@/features/catalog/data/categories";
import { BrandLogo } from "@/features/shared/components/brand-logo";
import {
  InstagramIcon,
  MapPinIcon,
  WhatsAppIcon,
} from "@/features/shared/components/icons";
import { SITE } from "@/features/shared/config/site";

const storeLinks = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Carrito", href: "/carrito" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-mist text-ink">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <BrandLogo />
          <p className="mt-4 max-w-xs text-sm leading-[1.6] text-muted">
            Suplementación deportiva y bienestar en San Miguel de Tucumán. Atención directa y envíos a todo el país.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Suplementos BR"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-paper"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={buildGeneralInquiryUrl()}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp de Suplementos BR"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-paper"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold text-ink">Tienda</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {storeLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted transition-colors hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold text-ink">Categorías</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/catalogo?categoria=${category.id}`}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold text-ink">Contacto</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <a
                href={buildGeneralInquiryUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-start gap-2 transition-colors hover:text-ink"
              >
                <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0" />
                {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-start gap-2 transition-colors hover:text-ink"
              >
                <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0" />
                {SITE.instagramHandle}
              </a>
            </li>
            <li className="inline-flex items-start gap-2">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {SITE.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {SITE.copyrightYear} {SITE.name}. Todos los derechos reservados.
          </p>
          <p>Precios y stock sujetos a confirmación por WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
