interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden focusable="false">
      <circle cx="24" cy="24" r="23" fill="#ffffff" />
      <circle cx="24" cy="24" r="22.4" fill="none" stroke="#E3E8EF" strokeWidth="1.2" />
      <text
        x="21"
        y="30"
        textAnchor="middle"
        fontFamily="var(--font-display), sans-serif"
        fontSize="16"
        fontWeight="800"
        letterSpacing="-1.2"
        fill="#10141C"
      >
        BR
      </text>
      <rect x="30" y="17" width="10" height="2.6" rx="1.3" fill="#E60079" />
      <rect x="32" y="22.4" width="8" height="2.6" rx="1.3" fill="#7138C8" />
      <rect x="34" y="27.8" width="6" height="2.6" rx="1.3" fill="#1677E8" />
    </svg>
  );
}

interface BrandLogoProps {
  tone?: "dark" | "light";
  compact?: boolean;
  className?: string;
}

export function BrandLogo({ tone = "dark", compact = false, className }: BrandLogoProps) {
  const titleColor = tone === "light" ? "text-white" : "text-ink";
  const subtitleColor = tone === "light" ? "text-white/60" : "text-muted";

  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <BrandMark className="h-10 w-10 shrink-0" />
      {compact ? null : (
        <span className="flex flex-col leading-none">
          <span className={`font-display text-[17px] font-extrabold tracking-tight ${titleColor}`}>
            Suplementos BR
          </span>
          <span className={`mt-1.5 text-[10px] font-semibold ${subtitleColor}`}>
            San Miguel de Tucumán
          </span>
        </span>
      )}
    </span>
  );
}
