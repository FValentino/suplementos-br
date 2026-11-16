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
  { label: "Catálogo completo", href: "/catalogo" },
  { label: "Promociones", href: "/catalogo?promo=1" },
  { label: "Carrito", href: "/carrito" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <BrandLogo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Suplementación deportiva y bienestar en San Miguel de Tucumán. Te acompañamos para
            entrenar mejor, recuperar y sostener tus objetivos.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Suplementos BR"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/75 transition-colors hover:border-white/40 hover:text-white"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={buildGeneralInquiryUrl()}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp de Suplementos BR"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/75 transition-colors hover:border-white/40 hover:text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold text-white">Tienda</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {storeLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/60 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold text-white">Categorías</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/catalogo?categoria=${category.id}`}
                  className="text-white/60 transition-colors hover:text-white"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold text-white">Contacto</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>
              <a
                href={buildGeneralInquiryUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-start gap-2 transition-colors hover:text-white"
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
                className="inline-flex items-start gap-2 transition-colors hover:text-white"
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

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {SITE.copyrightYear} {SITE.name}. Todos los derechos reservados.
          </p>
          <p>Demo comercial: productos, precios y stock son ficticios.</p>
        </div>
      </div>
    </footer>
  );
}
