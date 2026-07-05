import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { SocialLinks } from "@/features/home/components/social-links";
import { ContactForm } from "@/features/home/components/contact-form";
import { SOCIALS } from "@/features/home/constants/data";

export function ContactSection() {
  return (
    <RevealSection id="contact" className="bg-white/[0.02] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <RevealItem className="mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">
            Get In Touch
          </span>
          <h2 className="mt-2 text-4xl font-bold sm:text-5xl">
            Let&apos;s <span className="text-brand">Connect</span>
          </h2>
        </RevealItem>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <RevealItem delayMs={100}>
            <p className="mb-8 text-lg leading-relaxed text-white/70">
              Whether you have a project in mind, a collaboration opportunity, or just want to say
              hello — I&apos;d love to hear from you. Let&apos;s create something great together.
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
