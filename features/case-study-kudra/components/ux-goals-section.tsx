import { SectionHeading } from "@/components/case-study/section-heading";
import { UX_GOALS } from "@/features/case-study-kudra/constants/data";

export function UxGoalsSection() {
  return (
    <section>
      <SectionHeading label="UX Goals" title="What We Were" accent="Designing For" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {UX_GOALS.map((g) => (
          <div key={g.goal} className="rounded-sm border border-ink/12 bg-ink/[0.035] p-5">
            <div className="mb-3 h-1 w-6 rounded-full bg-[color:var(--accent)]" />
            <h3 className="t-h4 mb-2 text-ink">{g.goal}</h3>
            <p className="text-[11px] leading-relaxed text-ink/60">{g.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
