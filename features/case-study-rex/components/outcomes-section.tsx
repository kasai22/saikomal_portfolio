import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { STAGGER } from "@/lib/animations/constants";
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
        {OUTCOME_METRICS.map((m, i) => (
          <div key={m.label} className="rounded-sm border border-ink/12 bg-ink/[0.035] p-6">
            <div className="t-metric mb-2 text-[color:var(--accent)]">
              <AnimatedCounter value={m.metric} delay={i * STAGGER.tight} />
            </div>
            <div className="mb-2 text-[13px] font-semibold text-ink">{m.label}</div>
            <div className="text-[11px] leading-relaxed text-ink/60">{m.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
