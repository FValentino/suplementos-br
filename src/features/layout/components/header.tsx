"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CartButton } from "@/features/cart/components/cart-button";
import { buildGeneralInquiryUrl } from "@/features/cart/utils/whatsapp";
import { BrandLogo } from "@/features/shared/components/brand-logo";
import {
  CloseIcon,
  MenuIcon,
  SearchIcon,
  WhatsAppIcon,
} from "@/features/shared/components/icons";
import { NAV_LINKS } from "@/features/shared/config/site";

function SearchForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = value.trim();
    router.push(query ? `/catalogo?q=${encodeURIComponent(query)}` : "/catalogo");
    onSubmitted?.();
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="relative w-full">
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Buscar proteínas, creatinas..."
        aria-label="Buscar productos"
        className="h-10 w-full rounded-lg border border-line bg-mist/70 pl-9 pr-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-brand focus:bg-white"
      />
    </form>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="container-page flex h-16 items-center gap-4 lg:h-[72px] lg:gap-8">
        <Link href="/" aria-label="Suplementos BR, ir al inicio" className="shrink-0">
          <BrandLogo />
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === pathname;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive ? "bg-mist text-ink" : "text-muted hover:bg-mist hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden w-full max-w-xs md:block">
          <SearchForm />
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <CartButton />
          <a
            href={buildGeneralInquiryUrl()}
            target="_blank"
            rel="noreferrer"
            className="hidden h-10 items-center gap-2 rounded-lg border border-line px-4 text-sm font-semibold text-ink transition-colors hover:border-ink/25 hover:bg-mist sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
            Consultar
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-mist lg:hidden"
          >
            {isMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div id="mobile-menu" className="border-t border-line bg-white lg:hidden">
          <div className="container-page flex flex-col gap-4 py-4">
            <div className="md:hidden">
              <SearchForm onSubmitted={() => setIsMenuOpen(false)} />
            </div>
            <nav aria-label="Navegación móvil" className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="border-b border-line/70 py-3 text-sm font-semibold text-ink last:border-none"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <a
              href={buildGeneralInquiryUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-ink text-sm font-semibold text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
