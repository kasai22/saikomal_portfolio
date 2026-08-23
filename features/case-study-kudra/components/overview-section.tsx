import { SectionHeading } from "@/components/case-study/section-heading";
import { AccentCard } from "@/components/case-study/accent-card";
import { OVERVIEW_PARAGRAPHS } from "@/features/case-study-kudra/constants/data";

export function OverviewSection() {
  return (
    <section>
      <SectionHeading label="Case Study" title="The" accent="Overview" />
      <AccentCard>
        <p className="mb-4 text-[15px] leading-relaxed text-ink/75">{OVERVIEW_PARAGRAPHS[0]}</p>
        <p className="leading-relaxed text-ink/70">{OVERVIEW_PARAGRAPHS[1]}</p>
      </AccentCard>
    </section>
  );
}
