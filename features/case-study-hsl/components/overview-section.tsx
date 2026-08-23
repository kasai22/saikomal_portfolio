import { SectionHeading } from "@/components/case-study/section-heading";
import { AccentCard } from "@/components/case-study/accent-card";
import { HoverTile } from "@/components/case-study/hover-tile";
import { INTRO_PARAGRAPHS, MODULE_SCOPE } from "@/features/case-study-hsl/constants/data";

export function OverviewSection() {
  return (
    <section>
      <SectionHeading label="Case Study" title="The" accent="Overview" />

      <AccentCard>
        <div className="space-y-4">
          {INTRO_PARAGRAPHS.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex} className="text-[13px] leading-relaxed text-ink/70">
              {paragraph.map((segment, segmentIndex) => (
                <span
                  key={segmentIndex}
                  className={segment.highlight ? "font-medium text-ink" : undefined}
                >
                  {segment.text}
                </span>
              ))}
            </p>
          ))}
        </div>
      </AccentCard>

      <div className="mt-8">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-ink/60">
          What was in scope
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULE_SCOPE.map((module) => (
            <HoverTile
              key={module.title}
              icon={module.icon}
              title={module.title}
              description={module.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
