import {
  BoltIcon,
  CapsuleIcon,
  DropletIcon,
  DumbbellIcon,
  FlameIcon,
  ShakerIcon,
} from "@/features/shared/components/icons";
import type { CategoryIconName } from "@/features/catalog/types/product";

interface CategoryIconProps {
  name: CategoryIconName;
  className?: string;
}

export function CategoryIcon({ name, className }: CategoryIconProps) {
  if (name === "protein") return <DumbbellIcon className={className} />;
  if (name === "creatine") return <BoltIcon className={className} />;
  if (name === "preworkout") return <FlameIcon className={className} />;
  if (name === "amino") return <DropletIcon className={className} />;
  if (name === "vitamin") return <CapsuleIcon className={className} />;
  return <ShakerIcon className={className} />;
}
