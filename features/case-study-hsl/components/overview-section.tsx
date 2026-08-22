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
            <p key={paragraphIndex} className="text-base leading-relaxed text-white/65">
              {paragraph.map((segment, segmentIndex) => (
                <span
                  key={segmentIndex}
                  className={segment.highlight ? "font-medium text-white" : undefined}
                >
                  {segment.text}
                </span>
              ))}
            </p>
          ))}
        </div>
      </AccentCard>

      <div className="mt-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/35">
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
