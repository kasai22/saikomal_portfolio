import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { SectionParallaxBg } from "@/components/ui/section-parallax-bg";
import { SocialLinks } from "@/features/home/components/social-links";
import { ContactForm } from "@/features/home/components/contact-form";
import { SOCIALS } from "@/features/home/constants/data";

export function ContactSection() {
  return (
    <RevealSection id="contact" className="relative bg-white/[0.02] px-6 py-16">
      <SectionParallaxBg className="left-1/2 top-1/2 -ml-48 -mt-48 h-96 w-96 rounded-full bg-brand/[0.08] blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <RevealItem className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Open to New Roles
          </span>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Let&apos;s <span className="text-brand">Talk</span>
          </h2>
        </RevealItem>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <RevealItem delayMs={100}>
            <p className="mb-6 text-sm leading-relaxed text-white/70">
              I&apos;m currently looking for a full-time Product Designer or UX Engineer role.
              If you&apos;re hiring, or want to talk through whether I&apos;m a fit for a role
              you&apos;re filling, the fastest way to reach me is below — or grab my resume from
              the nav and email directly.
            </p>
            <SocialLinks socials={SOCIALS} variant="row" />
          </RevealItem>

          <RevealItem delayMs={200}>
            <ContactForm />
          </RevealItem>
        </div>
      </div>
    </RevealSection>
  );
}
