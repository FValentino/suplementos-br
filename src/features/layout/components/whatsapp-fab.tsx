import { buildGeneralInquiryUrl } from "@/features/cart/utils/whatsapp";
import { WhatsAppIcon } from "@/features/shared/components/icons";

export function WhatsAppFab() {
  return (
    <a
      href={buildGeneralInquiryUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Consultar por WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-12 items-center gap-2 rounded-lg bg-whatsapp px-4 text-sm font-semibold text-white transition-colors hover:bg-whatsapp/90"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="hidden sm:inline">Consultar</span>
    </a>
  );
}
