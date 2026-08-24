import { FadeIn } from "@/components/animations/FadeIn";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { Panel } from "@/components/ui/panel";
import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { CapabilityGroupCard } from "@/features/home/components/capability-group-card";
import {
  CAPABILITY_GROUPS,
  DECK,
  SERVICES,
  SLIDE_INTRO,
  TOOL_GROUPS,
} from "@/features/home/constants/data";

/**
 * Slide 04 — the offer, stated as things a team can hand over rather than
 * as a skills list. Each service names its deliverables; the capability
 * grid underneath is the detail behind them, and the tools row is last
 * because it matters least.
 */
export function ServicesSection() {
  return (
    <HomeSection
      id="services"
      glowClassName="right-[8%] top-1/3 h-80 w-80 rounded-full bg-brand/[0.12] blur-3xl"
    >
      <SectionHeading
        chapter={DECK.help.chapter}
        eyebrow={DECK.help.eyebrow}
        title={
          <>
            Four things I can <span className="text-brand-ink">take off your plate</span>.
          </>
        }
        intro={SLIDE_INTRO.help}
      />

      <Stagger className="grid grid-cols-1 gap-px overflow-hidden border border-ink/12 bg-ink/12 md:grid-cols-2">
        {SERVICES.map((service) => (
          <StaggerItem key={service.number}>
            <div className="flex h-full flex-col gap-3 bg-paper-panel p-6">
              <div className="flex items-baseline gap-3">
                <span className="t-eyebrow tabular-nums text-brand-ink">{service.number}</span>
                <h3 className="t-h3 text-ink">{service.title}</h3>
              </div>
              <p className="t-meta text-ink/65">{service.description}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5 border-t border-ink/[0.09] pt-4">
                {service.deliverables.map((item) => (
                  <li key={item} className="t-chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <FadeIn direction="up" distance="nudge" className="mb-4 mt-10">
        <p className="t-eyebrow text-ink/60">The detail behind it</p>
      </FadeIn>
      <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {CAPABILITY_GROUPS.map((group) => (
          <StaggerItem key={group.category}>
            <CapabilityGroupCard group={group} />
          </StaggerItem>
        ))}
      </Stagger>

      <FadeIn direction="up" className="mt-4">
        <Panel level={1} className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center">
          <span className="t-eyebrow shrink-0 text-ink/60">Tools</span>
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
            {TOOL_GROUPS.map((tool) => (
              <div key={tool.label} className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="t-meta font-medium text-ink/60">{tool.label}</span>
                <span className="t-meta text-ink/70">{tool.items.join(" · ")}</span>
              </div>
            ))}
          </div>
        </Panel>
      </FadeIn>
    </HomeSection>
  );
}
