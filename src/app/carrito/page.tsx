import type { Metadata } from "next";
import { CartView } from "@/features/cart/components/cart-view";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Revisá los productos de tu carrito y cerramos el pedido por WhatsApp.",
};

export default function CartPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-line bg-mist/50 py-10">
        <div className="container-page">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Pedido</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Tu carrito
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Revisá tus productos y coordinamos disponibilidad, envío y pago por WhatsApp.
          </p>
        </div>
      </div>

      <div className="container-page py-10">
        <CartView />
      </div>
    </div>
  );
}
