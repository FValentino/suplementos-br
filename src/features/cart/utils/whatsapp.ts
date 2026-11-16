import { SITE } from "@/features/shared/config/site";
import { formatPrice } from "@/features/catalog/utils/format-price";
import type { CartLine } from "../types/cart";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildProductInquiryUrl(productName: string, presentation: string): string {
  return buildWhatsAppUrl(
    `¡Hola ${SITE.name}! Quiero consultar por ${productName} (${presentation}). ¿Me pasan disponibilidad y precio?`,
  );
}

export function buildGeneralInquiryUrl(): string {
  return buildWhatsAppUrl(`¡Hola ${SITE.name}! Quiero hacer una consulta sobre sus productos.`);
}

export function buildCartMessage(lines: CartLine[], subtotal: number): string {
  const items = lines
    .map((line) => `• ${line.quantity} x ${line.product.name} (${line.product.presentation})`)
    .join("\n");

  return [
    `¡Hola ${SITE.name}! Quiero cerrar este pedido:`,
    "",
    items,
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    "",
    "¿Me confirman disponibilidad y forma de envío?",
  ].join("\n");
}
