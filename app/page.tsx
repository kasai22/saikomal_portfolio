import { HeroSection } from "@/features/home/components/hero-section";
import { RecruiterSnapshot } from "@/features/home/components/recruiter-snapshot";
import { SelectedWorkSection } from "@/features/home/components/selected-work-section";
import { HeroWorkAssembly } from "@/components/transitions/hero-work-assembly";
import { EngineeringSection } from "@/features/home/components/engineering-section";
import { ProductSystemSection } from "@/features/home/components/product-system-section";
import { ProductBuildSection } from "@/features/home/components/product-build-section";
import { ProductIntelligenceSection } from "@/features/home/components/product-intelligence-section";
import { ProductMindSection } from "@/features/home/components/product-mind-section";
import { DesignMachineSection } from "@/features/home/components/design-machine-section";
import { CapabilitiesSection } from "@/features/home/components/capabilities-section";
import { ExperienceSection } from "@/features/home/components/experience-section";
import { ContactSection } from "@/features/home/components/contact-section";

/**
 * Work-first information architecture. The hero, then six numbered slides,
 * with the running order (and the chapter numbers) in `DECK`:
 *
 *   01  Selected UX & product experience — the five case studies
 *   02  Independent engineering projects — the four shipped builds
 *   03  My approach — Discover → Define → Design → Build → Validate
 *   04  Technical capabilities — and how AI fits into the engineering
 *   05  Professional experience — the four roles, résumé dates
 *   06  Contact
 *
 * The UX work leads and the engineering follows it, so the page reads as a
 * product designer who builds — not as a developer with a design section.
 *
 * ── Why the hero and the work are one element ───────────────────────────
 * `HeroWorkAssembly` wraps both because the hand-off between them is a single
 * move: the three project tiles in the hero travel down the document and land
 * in their real case-study cards. The pieces have to be visible across the
 * boundary, so the layer that carries them belongs to neither section and
 * spans both. Nothing inside is copied or transformed — see the component.
 *
 * ── The snapshot ────────────────────────────────────────────────────────
 * The six headline numbers follow the work instead of interrupting the
 * approach to it, which also puts them after the evidence they summarise.
 *
 * ── The figures ─────────────────────────────────────────────────────────
 * Four unnumbered figures sit between 02 and 03 and run as one argument.
 * Having just seen case studies *and* shipped builds, `FIG. 01` explains the
 * two as one practice; `FIG. 02` shows an interface being assembled; `FIG. 03`
 * is what it has to do once there is intelligence behind it; `FIG. 04` turns
 * to the person — a brief arriving as nine unsorted things and being put in
 * order. Slide 03 is then the whole method as one machine: the object the
 * four figures are parts of, which is why it comes after them.
 */
export default function HomePage() {
  return (
    <>
      <HeroWorkAssembly>
        <HeroSection />
        <SelectedWorkSection />
      </HeroWorkAssembly>
      <RecruiterSnapshot />
      <EngineeringSection />
      <ProductSystemSection />
      <ProductBuildSection />
      <ProductIntelligenceSection />
      <ProductMindSection />
      <DesignMachineSection />
      <CapabilitiesSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
