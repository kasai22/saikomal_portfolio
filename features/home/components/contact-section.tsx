import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { DownloadIcon } from "@/components/icons";
import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { SocialLinks } from "@/features/home/components/social-links";
import { ContactForm } from "@/features/home/components/contact-form";
import { CONTACT_SOCIALS, DECK, SLIDE_INTRO } from "@/features/home/constants/data";
import { CONTACT, PROFILE } from "@/constants/profile";

const ROW_CLASS =
  "corner-ticks border-ink/12 group flex items-center justify-between gap-4 border bg-paper-panel px-4 py-3.5 transition-colors duration-instant hover:border-brand/50";

/**
 * Slide 06 — the ask, and the last thing on the page. Every contact detail
 * is the résumé header's, read from `CONTACT`.
 */
export function ContactSection() {
  const rows = [
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, action: "Write" },
    { label: "Phone", value: CONTACT.phoneDisplay, href: CONTACT.phoneHref, action: "Call" },
  ];

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
            Let&apos;s build something <span className="text-brand-ink">meaningful</span>.
          </>
        }
        intro={SLIDE_INTRO.ask}
      />

      <Stagger className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StaggerItem className="flex flex-col gap-3">
          {/* The details, in the open. The form posts to exactly this
              address, but a recruiter who would rather use their own client
              should not have to fill in three fields to find out where it
              goes. */}
          {rows.map((row) => (
            <a key={row.label} href={row.href} className={ROW_CLASS}>
              <span className="min-w-0">
                <span className="t-label block text-ink/50">{row.label}</span>
                <span className="mt-1 block truncate text-[13px] text-ink group-hover:text-brand-ink">
                  {row.value}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="t-action shrink-0 text-ink/40 transition-colors group-hover:text-brand-ink"
              >
                {row.action}
              </span>
            </a>
          ))}

          <a href={CONTACT.resume.href} download={CONTACT.resume.fileName} className={ROW_CLASS}>
            <span className="min-w-0">
              <span className="t-label block text-ink/50">Résumé</span>
              <span className="mt-1 block truncate text-[13px] text-ink group-hover:text-brand-ink">
                {PROFILE.name} — {PROFILE.title} (PDF)
              </span>
            </span>
            <DownloadIcon className="h-3.5 w-3.5 shrink-0 text-ink/40 transition-colors group-hover:text-brand-ink" />
          </a>

          <SocialLinks socials={CONTACT_SOCIALS} variant="row" />

          <p className="t-meta text-ink/55">{PROFILE.location}</p>
        </StaggerItem>

        <StaggerItem>
          <ContactForm />
        </StaggerItem>
      </Stagger>
    </HomeSection>
  );
}
