import { RevealItem } from "@/components/ui/reveal-item";
import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { SocialLinks } from "@/features/home/components/social-links";
import { ContactForm } from "@/features/home/components/contact-form";
import { CONTACT_SOCIALS, DECK, SLIDE_INTRO } from "@/features/home/constants/data";

/** Slide 08 — the ask, and the last thing on the page. */
export function ContactSection() {
  return (
    <HomeSection
      id="contact"
      glowClassName="left-1/2 top-1/2 -ml-48 -mt-48 h-96 w-96 rounded-full bg-brand/[0.12] blur-3xl"
    >
      <SectionHeading
        chapter={DECK.ask.chapter}
        eyebrow={DECK.ask.eyebrow}
        title={
          <>
            Let&apos;s <span className="text-brand-ink">talk</span>.
          </>
        }
        intro={SLIDE_INTRO.ask}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RevealItem delayMs={100}>
          <SocialLinks socials={CONTACT_SOCIALS} variant="row" />
        </RevealItem>

        <RevealItem delayMs={200}>
          <ContactForm />
        </RevealItem>
      </div>
    </HomeSection>
  );
}
