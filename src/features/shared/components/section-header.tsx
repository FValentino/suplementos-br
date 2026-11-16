import Link from "next/link";
import { ArrowRightIcon } from "@/features/shared/components/icons";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: { label: string; href: string };
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeader({
  title,
  description,
  action,
  tone = "light",
  className,
}: SectionHeaderProps) {
  const isDark = tone === "dark";

  return (
    <div className={`flex flex-wrap items-end justify-between gap-4 ${className ?? ""}`}>
      <div className="max-w-2xl">
        <h2
          className={`font-display text-2xl font-extrabold tracking-tight sm:text-3xl ${
            isDark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p className={`mt-2 text-sm leading-relaxed sm:text-base ${isDark ? "text-white/65" : "text-muted"}`}>
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <Link
          href={action.href}
          className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-semibold transition-colors ${
            isDark
              ? "border-white/20 text-white hover:bg-white/10"
              : "border-line text-ink hover:border-ink/25 hover:bg-mist"
          }`}
        >
          {action.label}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
