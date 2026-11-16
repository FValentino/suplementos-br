import Link from "next/link";
import { CartIcon } from "@/features/shared/components/icons";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-muted">
        <CartIcon className="h-6 w-6" />
      </span>
      <p className="mt-6 font-display text-sm font-bold uppercase tracking-wide text-brand-magenta">
        Error 404
      </p>
      <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        No encontramos esta página
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        Puede que el producto ya no esté disponible o que el enlace haya cambiado.
      </p>
      <Link
        href="/catalogo"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
      >
        Volver al catálogo
      </Link>
    </div>
  );
}
