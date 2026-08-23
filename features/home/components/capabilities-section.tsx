import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { GlassSurface } from "@/components/ui/glass-surface";
import { SectionParallaxBg } from "@/components/ui/section-parallax-bg";
import { SectionHeading } from "@/features/home/components/section-heading";
import { CapabilityGroupCard } from "@/features/home/components/capability-group-card";
import { CAPABILITY_GROUPS, TOOL_GROUPS } from "@/features/home/constants/data";

export function CapabilitiesSection() {
  return (
    <RevealSection id="capabilities" className="relative px-6 py-14">
      <SectionParallaxBg className="right-[8%] top-1/3 h-80 w-80 rounded-full bg-brand/[0.08] blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Capabilities"
          title={
            <>
              Capabilities, not a <span className="text-brand">tool list</span>
            </>
          }
          intro="Grouped by where the work sits — framing, UX, interface, handoff."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {CAPABILITY_GROUPS.map((group, i) => (
            <RevealItem key={group.category} delayMs={i * 100}>
              <CapabilityGroupCard group={group} />
            </RevealItem>
          ))}
        </div>

        <RevealItem delayMs={400} className="mt-4">
          <GlassSurface level={1} className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center">
            <span className="t-eyebrow shrink-0 text-white/30">Tools</span>
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
              {TOOL_GROUPS.map((tool) => (
                <div key={tool.label} className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="t-meta font-medium text-white/35">{tool.label}</span>
                  <span className="t-meta text-white/65">{tool.items.join(" · ")}</span>
                </div>
              ))}
            </div>
          </GlassSurface>
        </RevealItem>
      </div>
    </RevealSection>
  );
}
