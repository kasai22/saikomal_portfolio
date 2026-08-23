import { RevealItem } from "@/components/ui/reveal-item";
import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { ProductCard } from "@/features/home/components/product-card";
import { DECK, PRODUCTS, SLIDE_INTRO } from "@/features/home/constants/data";

/** Slide 02 — the catalogue of products, case study or not. */
export function ProductsSection() {
  return (
    <HomeSection id="products" tone="raised">
      <SectionHeading
        chapter={DECK.products.chapter}
        eyebrow={DECK.products.eyebrow}
        title={
          <>
            Five products, <span className="text-brand-ink">five domains</span>.
          </>
        }
        intro={SLIDE_INTRO.products}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product, i) => (
          <RevealItem key={product.name} layered delayMs={i * 80}>
            <ProductCard product={product} />
          </RevealItem>
        ))}
      </div>
    </HomeSection>
  );
}
