import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { BulletList } from "@/components/case-study/bullet-list";
import { AUDIENCE_APPROACH_ENTRIES } from "@/features/case-study-hsl/constants/data";

export function AudienceAndApproachSection() {
  const audience = AUDIENCE_APPROACH_ENTRIES.find((entry) => entry.id === "audience");
  const approach = AUDIENCE_APPROACH_ENTRIES.find((entry) => entry.id === "approach");

  return (
    <section>
      <SectionHeading label="Audience & Approach" title="Who It's For, and How I" accent="Worked" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {audience?.listItems && (
          <SurfaceCard>
            <h3 className="mb-5 font-semibold text-white">Who I designed for</h3>
            <BulletList items={audience.listItems} />
          </SurfaceCard>
        )}
        {approach?.paragraph && (
          <SurfaceCard>
            <h3 className="mb-5 font-semibold text-white">The approach</h3>
            <p className="text-[13px] leading-relaxed text-white/65">{approach.paragraph}</p>
          </SurfaceCard>
        )}
      </div>
    </section>
  );
}
