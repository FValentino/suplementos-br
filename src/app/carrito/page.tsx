import type { Metadata } from "next";
import { CartView } from "@/features/cart/components/cart-view";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Revisá los productos de tu carrito y cerramos el pedido por WhatsApp.",
};

export default function CartPage() {
  return (
    <div className="bg-paper">
      <div className="section-space border-b border-line">
        <div className="container-page">
          <h1 className="font-display text-[40px] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink sm:text-[56px]">
            Tu carrito
          </h1>
          <p className="mt-4 max-w-[65ch] text-lg leading-[1.6] text-muted">
            Revisá tus productos y coordinamos disponibilidad, envío y pago por WhatsApp.
          </p>
        </div>
      </div>

      <div className="container-page py-10 lg:py-12">
        <CartView />
      </div>
    </div>
  );
}
