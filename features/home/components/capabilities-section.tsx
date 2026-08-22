import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { GlassSurface } from "@/components/ui/glass-surface";
import { SectionParallaxBg } from "@/components/ui/section-parallax-bg";
import { CapabilityGroupCard } from "@/features/home/components/capability-group-card";
import { CAPABILITY_GROUPS, TOOL_GROUPS } from "@/features/home/constants/data";

export function CapabilitiesSection() {
  return (
    <RevealSection id="capabilities" className="relative px-6 py-16">
      <SectionParallaxBg className="right-[8%] top-1/3 h-80 w-80 rounded-full bg-brand/[0.08] blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <RevealItem className="mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">What I Do</span>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Capabilities, not a <span className="text-brand">tool list</span>
          </h2>
          <p className="mt-3 max-w-xl text-xs leading-relaxed text-white/50">
            Grouped by where the work actually sits — framing the problem, shaping the UX, building
            the interface, and keeping it all aligned with engineering.
          </p>
        </RevealItem>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {CAPABILITY_GROUPS.map((group, i) => (
            <RevealItem key={group.category} delayMs={i * 100}>
              <CapabilityGroupCard group={group} />
            </RevealItem>
          ))}
        </div>

        <RevealItem delayMs={400} className="mt-8">
          <GlassSurface level={1} className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-start">
            <span className="shrink-0 text-xs uppercase tracking-widest text-white/30">Tools</span>
            <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3">
              {TOOL_GROUPS.map((tool) => (
                <div key={tool.label} className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                  <span className="text-xs font-medium text-white/40">{tool.label}:</span>
                  <span className="text-sm text-white/70">{tool.items.join(" · ")}</span>
                </div>
              ))}
            </div>
          </GlassSurface>
        </RevealItem>
      </div>
    </RevealSection>
  );
}
