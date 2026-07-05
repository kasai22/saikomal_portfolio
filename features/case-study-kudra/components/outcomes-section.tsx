import { SectionHeading } from "@/components/case-study/section-heading";
import { AccentCard } from "@/components/case-study/accent-card";
import { IMPACT_SUMMARY, OUTCOME_METRICS } from "@/features/case-study-kudra/constants/data";

export function OutcomesSection() {
  return (
    <section>
      <SectionHeading label="Outcomes & Impact" title="Measurable" accent="Results" />
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {OUTCOME_METRICS.map((m) => (
          <div key={m.metric + m.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-2 text-4xl font-bold text-[color:var(--accent)]">{m.metric}</div>
            <div className="mb-2 text-sm font-semibold text-white">{m.label}</div>
            <div className="text-xs leading-relaxed text-white/45">{m.desc}</div>
          </div>
        ))}
      </div>
      <AccentCard>
        <h3 className="mb-4 font-bold text-white">Product Impact Summary</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {IMPACT_SUMMARY.map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm text-white/65">
              <span className="text-[color:var(--accent)]">✦</span> {item}
            </div>
          ))}
        </div>
      </AccentCard>
    </section>
  );
}
