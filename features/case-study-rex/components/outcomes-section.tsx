import { SectionHeading } from "@/components/case-study/section-heading";
import { OUTCOME_METRICS } from "@/features/case-study-rex/constants/data";

export function OutcomesSection() {
  return (
    <section>
      <SectionHeading
        label="Scope & Success Metrics"
        title="Designed to Be"
        accent="Governed, Not Guessed"
        sub="As a BRD-driven, pre-launch product, success here is defined by the constraints and metrics built into the design — the guardrails that make the AI stylist trustworthy at scale."
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {OUTCOME_METRICS.map((m) => (
          <div key={m.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-2 text-3xl font-bold tabular-nums text-[color:var(--accent)]">
              {m.metric}
            </div>
            <div className="mb-2 text-sm font-semibold text-white">{m.label}</div>
            <div className="text-xs leading-relaxed text-white/45">{m.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
