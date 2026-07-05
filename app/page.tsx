import { HeroSection } from "@/features/home/components/hero-section";
import { AboutSection } from "@/features/home/components/about-section";
import { SkillsSection } from "@/features/home/components/skills-section";
import { ProjectsSection } from "@/features/home/components/projects-section";
import { ContactSection } from "@/features/home/components/contact-section";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
