import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { SectionParallaxBg } from "@/components/ui/section-parallax-bg";
import { SectionHeading } from "@/features/home/components/section-heading";
import { SocialLinks } from "@/features/home/components/social-links";
import { ContactForm } from "@/features/home/components/contact-form";
import { CONTACT_SOCIALS } from "@/features/home/constants/data";

export function ContactSection() {
  return (
    <RevealSection id="contact" className="relative bg-white/[0.02] px-6 py-14">
      <SectionParallaxBg className="left-1/2 top-1/2 -ml-48 -mt-48 h-96 w-96 rounded-full bg-brand/[0.08] blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Open to new roles"
          title={
            <>
              Let&apos;s <span className="text-brand">talk</span>
            </>
          }
          intro="Looking for a full-time Product Designer or UX Engineer role. Fastest reply is the form."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RevealItem delayMs={100}>
            <SocialLinks socials={CONTACT_SOCIALS} variant="row" />
          </RevealItem>

          <RevealItem delayMs={200}>
            <ContactForm />
          </RevealItem>
        </div>
      </div>
    </RevealSection>
  );
}
