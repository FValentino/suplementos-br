import Image from "next/image"
import logo from "@/assets/logo.jpg"

interface BrandLogoProps {
  tone?: "dark" | "light";
  compact?: boolean;
  className?: string;
}

export function BrandLogo({ tone = "dark", compact = false, className }: BrandLogoProps) {
  const titleColor = tone === "light" ? "text-white" : "text-ink";
  const subtitleColor = tone === "light" ? "text-white/70" : "text-muted";

  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-4"}`}>
      <Image
        src={logo}
        alt="logo suplementos br"
        className={`h-auto w-[60px] rounded-full border-2 border-gray-300 `}
      />
      <span className={`flex flex-col leading-none ${className ?? ""}`}>
        <span
          className={`font-display text-[18px] font-extrabold tracking-[-0.03em] ${titleColor}`}
        >
          Suplementos <br/>BR
        </span>
      </span>
    </div>
  );
}
