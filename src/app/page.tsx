import { Benefits } from "@/features/home/components/benefits";
import { BrandBanner } from "@/features/home/components/brand-banner";
import { CategorySection } from "@/features/home/components/category-section";
import { FeaturedProducts } from "@/features/home/components/featured-products";
import { Hero } from "@/features/home/components/hero";
import { ProductSelection } from "@/features/home/components/product-selection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <BrandBanner />
      <Benefits />
      <ProductSelection />
    </>
  );
}
