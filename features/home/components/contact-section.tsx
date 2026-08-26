import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { SocialLinks } from "@/features/home/components/social-links";
import { ContactForm } from "@/features/home/components/contact-form";
import { CONTACT_EMAIL, CONTACT_SOCIALS, DECK, SLIDE_INTRO } from "@/features/home/constants/data";

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

      <Stagger className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StaggerItem className="flex flex-col gap-3">
          {/* The address, in the open. The form posts to exactly this, but a
              recruiter who would rather use their own client should not have
              to fill in three fields to find out where it goes. */}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="corner-ticks border-ink/12 group flex items-center justify-between gap-4 border bg-paper-panel px-4 py-3.5 transition-colors duration-instant hover:border-brand/50"
          >
            <span className="min-w-0">
              <span className="t-label block text-ink/50">Email</span>
              <span className="mt-1 block truncate text-[13px] text-ink group-hover:text-brand-ink">
                {CONTACT_EMAIL}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="t-action shrink-0 text-ink/40 transition-colors group-hover:text-brand-ink"
            >
              Write
            </span>
          </a>

          <SocialLinks socials={CONTACT_SOCIALS} variant="row" />
        </StaggerItem>

        <StaggerItem>
          <ContactForm />
        </StaggerItem>
      </Stagger>
    </HomeSection>
  );
}
