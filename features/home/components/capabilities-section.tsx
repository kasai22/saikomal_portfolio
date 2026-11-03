import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { Panel } from "@/components/ui/panel";
import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { STAGGER } from "@/lib/animations/constants";
import { DECK, SLIDE_INTRO } from "@/features/home/constants/data";
import { AI_PRACTICE, CAPABILITIES } from "@/constants/profile";

/**
 * Slide 04 — Technical capabilities: five groups, each with what it is used
 * for, then one plain statement of how AI fits into the engineering work —
 * because "uses AI" means very different things, and the difference is the
 * part a hiring team needs.
 *
 * Every group is evidenced elsewhere on the page — the case studies for
 * design, the engineering pages for code, integration and deployment — so
 * this slide states the vocabulary rather than arguing it.
 */
export function CapabilitiesSection() {
  return (
    <HomeSection
      id="capabilities"
      glowClassName="right-[10%] top-1/3 h-72 w-72 rounded-full bg-brand/[0.10] blur-3xl"
    >
      <SectionHeading
        chapter={DECK.capabilities.chapter}
        eyebrow={DECK.capabilities.eyebrow}
        title={
          <>
            Design and engineering, <span className="text-brand-ink">in one practice</span>.
          </>
        }
        intro={SLIDE_INTRO.capabilities}
      />

      <Stagger
        as="ul"
        step={STAGGER.base}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {CAPABILITIES.map((group, i) => (
          <StaggerItem as="li" key={group.id}>
            <Panel level={2} className="flex h-full flex-col p-5">
              <span className="t-label tabular-nums text-brand-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="t-h3 mt-3 text-ink">{group.title}</h3>
              <p className="t-meta mt-1.5 text-ink/62">{group.description}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="t-chip">
                    {item}
                  </li>
                ))}
              </ul>
            </Panel>
          </StaggerItem>
        ))}
        <StaggerItem as="li">
          <Panel level={1} className="corner-ticks flex h-full flex-col justify-between gap-4 p-5">
            <p className="t-body text-ink/65">
              The evidence for each group is on this page: the case studies for design, and the
              engineering pages for code, integration and deployment.
            </p>
            <a
              href="#engineering"
              className="t-action inline-flex items-center gap-1.5 text-brand-ink hover:text-ink"
            >
              See the engineering work <span aria-hidden="true">↑</span>
            </a>
          </Panel>
        </StaggerItem>
      </Stagger>

      <Panel level={3} className="mt-6 p-5 sm:p-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="t-h3 text-ink">{AI_PRACTICE.title}</h3>
          <span className="t-label text-ink/50">Claude · ChatGPT</span>
        </div>
        <p className="t-body mt-2 max-w-2xl text-ink/65">
          AI tools accelerate implementation. I remain responsible for understanding the code,
          assessing the output, integrating the change and validating that it works.
        </p>
        <Stagger
          as="ol"
          step={STAGGER.tight}
          className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 border-t border-[color:var(--rule)] pt-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {AI_PRACTICE.points.map((point, i) => (
            <StaggerItem as="li" key={point.label} className="flex flex-col gap-1.5">
              <span className="t-label tabular-nums text-brand-ink">
                {String(i + 1).padStart(2, "0")} · {point.label}
              </span>
              <span className="t-meta text-ink/65">{point.detail}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Panel>
    </HomeSection>
  );
}
