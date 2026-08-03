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
        <p className="text-lg leading-relaxed text-white/80">{OVERVIEW_INTRO}</p>
      </AccentCard>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {OVERVIEW_POINTS.map((p) => (
          <div
            key={p.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-200 hover:border-white/20"
          >
            <div className="mb-4 h-0.5 w-8 rounded-full bg-[color:var(--accent)]" />
            <h4 className="mb-2 text-sm font-semibold text-white">{p.label}</h4>
            <p className="text-sm leading-relaxed text-white/55">{p.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
