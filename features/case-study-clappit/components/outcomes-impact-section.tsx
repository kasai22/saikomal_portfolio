import { SectionHeading } from "@/components/case-study/section-heading";
import { AccentCard } from "@/components/case-study/accent-card";
import { OUTCOME_METRICS, TESTIMONIALS } from "@/features/case-study-clappit/constants/data";

export function OutcomesImpactSection() {
  return (
    <section>
      <SectionHeading
        label="Outcome & Impact"
        title="Measurable"
        accent="Results"
        sub="Improvements tracked through usability testing sessions, post-launch observation, and stakeholder feedback."
      />
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {OUTCOME_METRICS.map((m) => (
          <div key={m.metric} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-2 text-4xl font-bold tabular-nums text-[color:var(--accent)]">
              {m.metric}
            </div>
            <div className="mb-2 text-sm font-semibold text-white">{m.label}</div>
            <div className="text-xs leading-relaxed text-white/45">{m.desc}</div>
          </div>
        ))}
      </div>
      <AccentCard>
        <h3 className="mb-5 font-bold text-white">Qualitative Feedback</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {TESTIMONIALS.map((q) => (
            <div key={q.role} className="rounded-xl border border-white/[0.08] bg-white/5 p-5">
              <p className="mb-3 text-sm italic leading-relaxed text-white/65">{q.quote}</p>
              <p className="text-xs font-medium text-white/35">— {q.role}</p>
            </div>
          ))}
        </div>
      </AccentCard>
    </section>
  );
}
