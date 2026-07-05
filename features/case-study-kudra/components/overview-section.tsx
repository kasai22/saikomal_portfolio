import { SectionHeading } from "@/components/case-study/section-heading";
import { AccentCard } from "@/components/case-study/accent-card";
import { OVERVIEW_PARAGRAPHS } from "@/features/case-study-kudra/constants/data";

export function OverviewSection() {
  return (
    <section>
      <SectionHeading label="Case Study" title="The" accent="Overview" />
      <AccentCard>
        <p className="mb-4 text-lg leading-relaxed text-white/75">{OVERVIEW_PARAGRAPHS[0]}</p>
        <p className="leading-relaxed text-white/65">{OVERVIEW_PARAGRAPHS[1]}</p>
      </AccentCard>
    </section>
  );
}
