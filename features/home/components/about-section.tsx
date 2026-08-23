import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { GlassSurface } from "@/components/ui/glass-surface";
import { SectionParallaxBg } from "@/components/ui/section-parallax-bg";
import { SectionHeading } from "@/features/home/components/section-heading";
import { ABOUT_FOCUS, ABOUT_LEAD, ABOUT_STATS, CAREER_PATH } from "@/features/home/constants/data";

/**
 * About, at a glance. The three biography paragraphs this section used to
 * carry are now one lead sentence plus a drawn career track — the route
 * from mechanical engineering to product design is a shape you can read in
 * a second, not a paragraph you have to parse.
 */
export function AboutSection() {
  return (
    <RevealSection id="about" className="relative px-6 py-14">
      <SectionParallaxBg className="right-[12%] top-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="About"
          title={
            <>
              A designer with an <span className="text-brand">engineering mindset</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <RevealItem delayMs={100} className="lg:col-span-3">
            <GlassSurface level={2} className="flex h-full flex-col gap-4 p-6">
              <p className="text-[15px] font-medium leading-[1.6] text-white/85">{ABOUT_LEAD}</p>
              <p className="t-body text-white/50">{ABOUT_FOCUS}</p>

              <dl className="mt-auto grid grid-cols-4 gap-3 border-t border-white/10 pt-5">
                {ABOUT_STATS.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="t-metric text-brand-light">{stat.value}</dd>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/35">{stat.label}</p>
                  </div>
                ))}
              </dl>
            </GlassSurface>
          </RevealItem>

          {/* The route in, drawn as a track. */}
          <RevealItem delayMs={200} className="lg:col-span-2">
            <GlassSurface level={1} className="h-full p-6">
              <h3 className="t-eyebrow mb-5 text-white/40">The route in</h3>
              <ol className="relative flex flex-col gap-5">
                <span
                  className="absolute bottom-2 left-[3px] top-2 w-px bg-gradient-to-b from-white/5 via-brand/40 to-brand"
                  aria-hidden="true"
                />
                {CAREER_PATH.map((step, i) => {
                  const isCurrent = i === CAREER_PATH.length - 1;
                  return (
                    <li key={step.label} className="relative pl-5">
                      <span
                        className={
                          isCurrent
                            ? "absolute left-0 top-1.5 h-[7px] w-[7px] -translate-x-px animate-pulse rounded-full bg-brand-light shadow-[0_0_8px_rgba(0,179,179,0.8)]"
                            : "absolute left-0 top-1.5 h-[7px] w-[7px] -translate-x-px rounded-full border border-white/25 bg-background"
                        }
                        aria-hidden="true"
                      />
                      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/30">
                        {step.period}
                      </p>
                      <p className="t-h4 mt-0.5 text-white">{step.label}</p>
                      <p className="t-meta mt-0.5 text-white/40">{step.detail}</p>
                    </li>
                  );
                })}
              </ol>
            </GlassSurface>
          </RevealItem>
        </div>
      </div>
    </RevealSection>
  );
}
