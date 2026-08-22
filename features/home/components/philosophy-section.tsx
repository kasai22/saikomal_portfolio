import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { GlassSurface } from "@/components/ui/glass-surface";
import { SectionParallaxBg } from "@/components/ui/section-parallax-bg";
import { DESIGN_PHILOSOPHY_QUOTE, WHAT_I_BRING } from "@/features/home/constants/data";

export function PhilosophySection() {
  return (
    <RevealSection id="philosophy" className="relative px-6 py-16">
      <SectionParallaxBg className="left-[10%] top-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <RevealItem className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Product Design Philosophy
          </span>
          <h2 className="mt-2 max-w-3xl text-xl font-bold leading-tight sm:text-2xl">
            The handoff is where design either survives or falls apart.
          </h2>
        </RevealItem>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-5">
          <RevealItem delayMs={100} className="lg:col-span-3">
            <GlassSurface level={3} className="flex h-full flex-col justify-center p-6 lg:p-10">
              <span className="mb-3 text-3xl text-brand/40" aria-hidden="true">
                &ldquo;
              </span>
              <p className="text-lg font-medium leading-relaxed text-white sm:text-xl">
                {DESIGN_PHILOSOPHY_QUOTE}
              </p>
            </GlassSurface>
          </RevealItem>

          <RevealItem delayMs={200} className="lg:col-span-2">
            <GlassSurface level={2} className="h-full p-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">
                What I Bring
              </h3>
              <ul className="space-y-4">
                {WHAT_I_BRING.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                    <span className="mt-1.5 shrink-0 text-brand" aria-hidden="true">
                      ✦
                    </span>
                    <span>{item}</span>
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
