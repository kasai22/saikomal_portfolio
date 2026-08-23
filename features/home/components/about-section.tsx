import { RevealItem } from "@/components/ui/reveal-item";
import { Panel } from "@/components/ui/panel";
import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { EngineeringUxTriad } from "@/features/home/components/engineering-ux-triad";
import { ABOUT_LEAD, ABOUT_STATS, CAREER_PATH, DECK, SLIDE_INTRO } from "@/features/home/constants/data";

/**
 * Slide 06 — who is making the claims on slides 01–05. The three biography
 * paragraphs this used to carry are now one lead sentence plus a drawn
 * career track: the route from mechanical engineering to product design is
 * a shape you read in a second, not a paragraph you parse.
 */
export function AboutSection() {
  return (
    <HomeSection id="about" glowClassName="right-[12%] top-0 h-72 w-72 rounded-full bg-brand/[0.14] blur-3xl">
      <SectionHeading
        chapter={DECK.background.chapter}
        eyebrow={DECK.background.eyebrow}
        title={
          <>
            A designer with an <span className="text-brand-ink">engineering mindset</span>.
          </>
        }
        intro={SLIDE_INTRO.background}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <RevealItem delayMs={100} className="lg:col-span-3">
          <Panel level={2} className="flex h-full flex-col gap-4 p-6">
            <p className="text-[15px] font-medium leading-[1.6] text-ink/85">{ABOUT_LEAD}</p>

            <dl className="mt-auto grid grid-cols-4 gap-3 border-t border-ink/12 pt-5">
              {ABOUT_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="t-metric text-brand-ink">{stat.value}</dd>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-ink/60">{stat.label}</p>
                </div>
              ))}
            </dl>
          </Panel>
        </RevealItem>

        {/* The route in, drawn as a track. */}
        <RevealItem delayMs={200} className="lg:col-span-2">
          <Panel level={1} className="h-full p-6">
            <h3 className="t-eyebrow mb-5 text-ink/60">The route in</h3>
            <ol className="relative flex flex-col gap-5">
              <span
                className="absolute bottom-2 left-[3px] top-2 w-px bg-gradient-to-b from-ink/[0.035] via-brand/40 to-brand"
                aria-hidden="true"
              />
              {CAREER_PATH.map((step, i) => {
                const isCurrent = i === CAREER_PATH.length - 1;
                return (
                  <li key={step.label} className="relative pl-5">
                    <span
                      className={
                        isCurrent
                          ? "absolute left-0 top-1.5 h-[7px] w-[7px] -translate-x-px animate-pulse rounded-full bg-brand-light shadow-[0_0_8px_rgba(138,90,10,0.6)]"
                          : "absolute left-0 top-1.5 h-[7px] w-[7px] -translate-x-px rounded-full border border-ink/24 bg-paper"
                      }
                      aria-hidden="true"
                    />
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink/60">
                      {step.period}
                    </p>
                    <p className="t-h4 mt-0.5 text-ink">{step.label}</p>
                    <p className="t-meta mt-0.5 text-ink/60">{step.detail}</p>
                  </li>
                );
              })}
            </ol>
          </Panel>
        </RevealItem>
      </div>

      {/* The differentiator, kept with the background it comes from. */}
      <RevealItem className="mb-4 mt-10">
        <p className="t-eyebrow text-ink/60">Why the work looks like this</p>
      </RevealItem>
      <EngineeringUxTriad />
    </HomeSection>
  );
}
