import { SectionHeading } from "@/components/case-study/section-heading";
import { AccentCard } from "@/components/case-study/accent-card";
import { IMPACT_SUMMARY, OUTCOME_METRICS } from "@/features/case-study-kudra/constants/data";

export function OutcomesSection() {
  return (
    <section>
      <SectionHeading label="Outcomes & Impact" title="Measurable" accent="Results" />
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {OUTCOME_METRICS.map((m) => (
          <div key={m.metric + m.label} className="rounded-sm border border-ink/12 bg-ink/[0.035] p-6">
            <div className="t-metric mb-2 text-[color:var(--accent)]">{m.metric}</div>
            <div className="mb-2 text-[13px] font-semibold text-ink">{m.label}</div>
            <div className="text-[11px] leading-relaxed text-ink/60">{m.desc}</div>
          </div>
        ))}
      </div>
      <AccentCard>
        <h3 className="mb-4 font-bold text-ink">Product Impact Summary</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {IMPACT_SUMMARY.map((item) => (
            <div key={item} className="flex items-start gap-3 text-[13px] text-ink/70">
              <span className="text-[color:var(--accent)]">✦</span> {item}
            </div>
          ))}
        </div>
      </AccentCard>
    </section>
  );
}
