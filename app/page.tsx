import { HeroSection } from "@/features/home/components/hero-section";
import { RecruiterSnapshot } from "@/features/home/components/recruiter-snapshot";
import { SelectedWorkSection } from "@/features/home/components/selected-work-section";
import { ProductsSection } from "@/features/home/components/products-section";
import { DevelopmentSection } from "@/features/home/components/development-section";
import { ServicesSection } from "@/features/home/components/services-section";
import { HowIWorkSection } from "@/features/home/components/how-i-work-section";
import { AboutSection } from "@/features/home/components/about-section";
import { ExperienceSection } from "@/features/home/components/experience-section";
import { ContactSection } from "@/features/home/components/contact-section";
import { Footer } from "@/components/layout/footer";

/**
 * Work-first information architecture: the catalogue of what exists comes
 * before the argument about how it was made. Hero, then the facts at a
 * glance, then eight numbered slides — selected work, the product
 * catalogue, development, the offer, the method, the background, the
 * track record, the ask. Running order lives in `DECK`.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RecruiterSnapshot />
      <SelectedWorkSection />
      <ProductsSection />
      <DevelopmentSection />
      <ServicesSection />
      <HowIWorkSection />
      <AboutSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </>
  );
}
