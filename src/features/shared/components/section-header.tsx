import Link from "next/link";
import { ArrowRightIcon } from "@/features/shared/components/icons";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
}

export function SectionHeader({ title, description, action, className }: SectionHeaderProps) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-4 ${className ?? ""}`}>
      <div className="max-w-2xl">
        <h2 className="font-display text-[32px] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[40px]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-[65ch] text-base leading-[1.6] text-muted">{description}</p>
        ) : null}
      </div>

      {action ? (
        <Link
          href={action.href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline-offset-4 transition-colors hover:text-signal hover:underline"
        >
          {action.label}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
