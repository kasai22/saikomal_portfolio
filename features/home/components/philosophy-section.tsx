import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { GlassSurface } from "@/components/ui/glass-surface";
import { SectionParallaxBg } from "@/components/ui/section-parallax-bg";
import { SectionHeading } from "@/features/home/components/section-heading";
import { DESIGN_PHILOSOPHY_QUOTE, STRENGTHS } from "@/features/home/constants/data";

/**
 * The five "what I bring" claims used to be full sentences stacked in a
 * list. They're now icon + title + a short qualifier, so the column scans
 * in a glance and the quote stays the only long-form text in the section.
 */
export function PhilosophySection() {
  return (
    <RevealSection id="philosophy" className="relative px-6 py-14">
      <SectionParallaxBg className="left-[10%] top-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Philosophy"
          title="The handoff is where design survives or falls apart."
        />

        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-5">
          <RevealItem delayMs={100} className="lg:col-span-3">
            <GlassSurface level={3} className="flex h-full flex-col justify-center p-6 lg:p-9">
              <span className="mb-2 text-2xl leading-none text-brand/40" aria-hidden="true">
                &ldquo;
              </span>
              <p className="text-base font-medium leading-[1.55] text-white sm:text-lg">
                {DESIGN_PHILOSOPHY_QUOTE}
              </p>
            </GlassSurface>
          </RevealItem>

          <RevealItem delayMs={200} className="lg:col-span-2">
            <GlassSurface level={2} className="h-full p-6">
              <h3 className="t-eyebrow mb-4 text-white/40">What I bring</h3>
              <ul className="flex flex-col gap-3.5">
                {STRENGTHS.map((strength) => (
                  <li key={strength.title} className="flex items-start gap-3">
                    <span
                      className="mt-px shrink-0 text-xs leading-5 text-brand"
                      aria-hidden="true"
                    >
                      {strength.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="t-h4 block text-white/90">{strength.title}</span>
                      <span className="t-meta block text-white/40">{strength.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </GlassSurface>
          </RevealItem>
        </div>
      </div>
    </RevealSection>
  );
}
