import { HeroSection } from "@/features/home/components/hero-section";
import { RecruiterSnapshot } from "@/features/home/components/recruiter-snapshot";
import { SelectedWorkSection } from "@/features/home/components/selected-work-section";
import { HeroWorkAssembly } from "@/components/transitions/hero-work-assembly";
import { DevelopmentSection } from "@/features/home/components/development-section";
import { ProductSystemSection } from "@/features/home/components/product-system-section";
import { ProductBuildSection } from "@/features/home/components/product-build-section";
import { ProductIntelligenceSection } from "@/features/home/components/product-intelligence-section";
import { ProductMindSection } from "@/features/home/components/product-mind-section";
import { DesignMachineSection } from "@/features/home/components/design-machine-section";
import { ExperienceSection } from "@/features/home/components/experience-section";
import { ContactSection } from "@/features/home/components/contact-section";
import { Footer } from "@/components/layout/footer";

/**
 * Work-first information architecture. Hero, then four numbered slides —
 * selected work, development, the track record, the ask. Running order lives
 * in `DECK`.
 *
 * The offer, the method and the background used to sit at 03, 04 and 05 and
 * were cut. What they argued in prose, the figures below now argue in
 * drawings — which is why `DECK` renumbers rather than leaving gaps where
 * they were.
 *
 * ── Why the hero and the work are one element ───────────────────────────
 * `HeroWorkAssembly` wraps both because the hand-off between them is a single
 * move: the three project tiles in the hero travel down the document and land
 * in the three real case-study cards. The pieces have to be visible across the
 * boundary, so the layer that carries them belongs to neither section and
 * spans both. Nothing inside is copied or transformed — see the component.
 *
 * ── Why the recruiter snapshot moved ────────────────────────────────────
 * It used to sit between the two, and it was a wall across the middle of that
 * move: eight rows of facts and a Resume button, arriving exactly where the
 * pieces needed open page to travel through. The facts are worth having and
 * they are unchanged — they now follow the work instead of interrupting the
 * approach to it, which also puts them after the evidence they summarise
 * rather than before it.
 *
 * Four unnumbered figures punctuate the deck, and they run as one argument.
 * `FIG. 01` sits between 02 and 03: having just shown design case studies and
 * shipped front-ends, it is where the two are explained as one practice rather
 * than two services. `FIG. 02` sits after 04, where the method has just been
 * described in five stages and can then be watched happening to a real
 * product's interface. `FIG. 03` follows it directly — the interface has been
 * assembled, and this is what it has to do once there is intelligence behind
 * it. `FIG. 04` turns from the product to the person: a brief arriving as nine
 * unsorted things and being put in order. `FIG. 05` closes the run with the
 * object the other four are parts of — the whole method as one machine, seen
 * from the side, with a camera travelling its length — and hands over to the
 * track record on the next screen.
 */
export default function HomePage() {
  return (
    <>
      <HeroWorkAssembly>
        <HeroSection />
        <SelectedWorkSection />
      </HeroWorkAssembly>
      <RecruiterSnapshot />
      <DevelopmentSection />
      <ProductSystemSection />
      <ProductBuildSection />
      <ProductIntelligenceSection />
      <ProductMindSection />
      <DesignMachineSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </>
  );
}
