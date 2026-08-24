import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { STAGGER } from "@/lib/animations/constants";
import { SectionHeading } from "@/components/case-study/section-heading";
import { AccentCard } from "@/components/case-study/accent-card";
import { RESEARCH_AREAS, RESEARCH_STATS } from "@/features/case-study-kudra/constants/data";

export function ResearchSection() {
  return (
    <section>
      <SectionHeading label="Research & Discovery" title="Understanding the" accent="Operations" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <p className="mb-6 leading-relaxed text-ink/70">
            To better understand operational workflows, interviews and observational research
            were conducted with logistics operators, dispatch teams, and fleet managers. Research
            focused on:
          </p>
          <div className="space-y-3">
            {RESEARCH_AREAS.map((r) => (
              <div key={r.area} className="flex items-start gap-4 rounded-sm border border-ink/12 bg-ink/[0.035] p-4">
                <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                <div>
                  <div className="text-[13px] font-semibold text-ink">{r.area}</div>
                  <div className="mt-0.5 text-[13px] text-ink/60">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AccentCard className="flex flex-col justify-center">
          <h3 className="mb-2 text-[15px] font-bold text-[color:var(--accent)]">Research Approach</h3>
          <p className="mb-6 text-[13px] leading-relaxed text-ink/65">
            Structured interviews and contextual observation sessions with logistics operators
            across multiple branches. Focus was on shadowing real operational workflows — not
            just asking about them.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {RESEARCH_STATS.map((s, i) => (
              <div key={s.l} className="rounded-sm border border-ink/12 bg-ink/[0.035] p-4 text-center">
                <div className="t-metric text-[color:var(--accent)]">
                  <AnimatedCounter value={s.v} delay={i * STAGGER.tight} />
                </div>
                <div className="mt-1 text-[11px] text-ink/60">{s.l}</div>
              </div>
            ))}
          </div>
        </AccentCard>
      </div>
    </section>
  );
}
