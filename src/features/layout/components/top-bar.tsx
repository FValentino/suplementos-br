import { SITE } from "@/features/shared/config/site";
import { buildGeneralInquiryUrl } from "@/features/cart/utils/whatsapp";
import { TruckIcon, WhatsAppIcon } from "@/features/shared/components/icons";

export function TopBar() {
  return (
    <div className="bg-ink text-white">
      <div className="container-page flex h-9 items-center justify-between gap-4 text-[11px] sm:text-xs">
        <span className="inline-flex items-center gap-1.5">
          <TruckIcon className="h-3.5 w-3.5 text-brand-cyan" />
          Enviamos a todo el país
        </span>
        <a
          href={buildGeneralInquiryUrl()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-white/75 transition-colors hover:text-white"
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
          Consultanos por WhatsApp
        </a>
        <span className="hidden text-white/55 md:inline">{SITE.location}</span>
      </div>
    </div>
  );
}
