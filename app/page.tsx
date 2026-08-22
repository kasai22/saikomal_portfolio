import { HeroSection } from "@/features/home/components/hero-section";
import { RecruiterSnapshot } from "@/features/home/components/recruiter-snapshot";
import { ProjectsSection } from "@/features/home/components/projects-section";
import { PhilosophySection } from "@/features/home/components/philosophy-section";
import { CapabilitiesSection } from "@/features/home/components/capabilities-section";
import { AboutSection } from "@/features/home/components/about-section";
import { ExperienceSection } from "@/features/home/components/experience-section";
import { EngineeringUxSection } from "@/features/home/components/engineering-ux-section";
import { HowIThinkSection } from "@/features/home/components/how-i-think-section";
import { ContactSection } from "@/features/home/components/contact-section";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RecruiterSnapshot />
      <ProjectsSection />
      <PhilosophySection />
      <CapabilitiesSection />
      <AboutSection />
      <ExperienceSection />
      <EngineeringUxSection />
      <HowIThinkSection />
      <ContactSection />
      <Footer />
    </>
  );
}
