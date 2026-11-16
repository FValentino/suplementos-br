import Link from "next/link";
import { CartIcon } from "@/features/shared/components/icons";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-mist text-muted">
        <CartIcon className="h-6 w-6" />
      </span>
      <h1 className="mt-6 font-display text-[32px] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[40px]">
        No encontramos esta página
      </h1>
      <p className="mt-3 max-w-md text-base leading-[1.6] text-muted">
        Puede que el producto ya no esté disponible o que el enlace haya cambiado.
      </p>
      <Link
        href="/catalogo"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-signal px-5 text-sm font-semibold text-white transition-colors hover:bg-signal/90"
      >
        Volver al catálogo
      </Link>
    </div>
  );
}
