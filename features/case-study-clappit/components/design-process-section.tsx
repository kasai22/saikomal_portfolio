import { SectionHeading } from "@/components/case-study/section-heading";
import { STAGE_DETAILS, TIMELINE_STAGES } from "@/features/case-study-clappit/constants/data";

export function DesignProcessSection() {
  return (
    <section>
      <SectionHeading
        label="Design Process"
        title="The UX"
        accent="Workflow"
        sub="An 8-stage process that moved from research to validated, high-fidelity delivery over 8 months."
      />

      <div className="relative mb-12">
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-white/10 md:block" aria-hidden="true" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
          {TIMELINE_STAGES.map((s) => (
            <div key={s.stage} className="flex flex-col items-start">
              <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[color:var(--accent-border)] bg-[#0a0a0a] text-sm font-bold text-[color:var(--accent)]">
                {s.num}
              </div>
              <h4 className="mb-1 text-sm font-bold text-white">{s.stage}</h4>
              <p className="text-xs leading-relaxed text-white/40">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {STAGE_DETAILS.map((s) => (
          <div key={s.stage} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-5 flex items-center gap-3 border-b border-white/[0.08] pb-5">
              <span className="text-2xl">{s.icon}</span>
              <h4 className="font-bold text-white">{s.stage}</h4>
            </div>
            <div className="space-y-4">
              <div>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/30">
                  Activities
                </span>
                <ul className="space-y-1">
                  {s.activities.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-[color:var(--accent)]" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--accent)]">
                  Key Output
                </span>
                <p className="mt-1.5 text-xs leading-relaxed text-white/55">{s.output}</p>
              </div>
              <div className="rounded-xl border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] p-4 text-sm">
                <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--accent)]">
                  Design Decision
                </span>
                <p className="mt-1.5 text-xs leading-relaxed text-white/65">{s.decision}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
