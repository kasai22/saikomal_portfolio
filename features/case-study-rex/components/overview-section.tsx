import { SectionHeading } from "@/components/case-study/section-heading";
import { AccentCard } from "@/components/case-study/accent-card";
import { OVERVIEW_INTRO, OVERVIEW_POINTS } from "@/features/case-study-rex/constants/data";

export function OverviewSection() {
  return (
    <section>
      <SectionHeading
        label="Overview"
        title="A Personal AI"
        accent="Stylist, Not a Search Bar"
        sub="REX was built to make discovering and designing the perfect saree feel effortless, personal, and inspiring — for a platform where trust and craftsmanship matter as much as technology."
      />
      <AccentCard className="mb-8">
        <p className="text-[15px] leading-relaxed text-ink/80">{OVERVIEW_INTRO}</p>
      </AccentCard>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {OVERVIEW_POINTS.map((p) => (
          <div
            key={p.label}
            className="rounded-sm border border-ink/12 bg-ink/[0.035] p-6 transition-colors duration-instant hover:border-ink/20"
          >
            <div className="mb-4 h-0.5 w-8 rounded-full bg-[color:var(--accent)]" />
            <h3 className="t-h4 mb-2 text-ink">{p.label}</h3>
            <p className="text-[13px] leading-relaxed text-ink/62">{p.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
