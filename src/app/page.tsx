import { Benefits } from "@/features/home/components/benefits";
import { BestSellers } from "@/features/home/components/bestsellers";
import { BrandBanner } from "@/features/home/components/brand-banner";
import { CategorySection } from "@/features/home/components/category-section";
import { FeaturedProducts } from "@/features/home/components/featured-products";
import { Hero } from "@/features/home/components/hero";
import { PromoSection } from "@/features/home/components/promo-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <PromoSection />
      <BrandBanner />
      <Benefits />
      <BestSellers />
    </>
  );
}
