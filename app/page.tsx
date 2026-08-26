import { HeroSection } from "@/features/home/components/hero-section";
import { RecruiterSnapshot } from "@/features/home/components/recruiter-snapshot";
import { SelectedWorkSection } from "@/features/home/components/selected-work-section";
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
 * Work-first information architecture. Hero, then the facts at a glance,
 * then four numbered slides — selected work, development, the track record,
 * the ask. Running order lives in `DECK`.
 *
 * The offer, the method and the background used to sit at 03, 04 and 05 and
 * were cut. What they argued in prose, the figures below now argue in
 * drawings — which is why `DECK` renumbers rather than leaving gaps where
 * they were.
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
      <HeroSection />
      <RecruiterSnapshot />
      <SelectedWorkSection />
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
