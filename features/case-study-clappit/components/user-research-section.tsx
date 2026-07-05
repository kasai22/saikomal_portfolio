import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { RESEARCH_INSIGHTS, RESEARCH_PERSONAS } from "@/features/case-study-clappit/constants/data";

export function UserResearchSection() {
  return (
    <section>
      <SectionHeading
        label="User Research"
        title="Understanding the"
        accent="People"
        sub="16 structured interviews and 8 contextual observation sessions over four weeks. Three core personas emerged."
      />

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {RESEARCH_PERSONAS.map((p) => (
          <SurfaceCard key={p.persona} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-5">
              <span className="text-3xl">{p.icon}</span>
              <h3 className="text-sm font-bold leading-tight text-white">{p.persona}</h3>
            </div>
            <p className="text-xs leading-relaxed text-white/50">{p.bio}</p>
            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/30">
                Goals
              </span>
              <ul className="space-y-1.5">
                {p.goals.map((g) => (
                  <li key={g} className="flex items-center gap-2 text-xs text-white/60">
                    <span className="text-[color:var(--accent)]">✦</span> {g}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/30">
                Frustrations
              </span>
              <ul className="space-y-1.5">
                {p.frustrations.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-[#ff8a94]/80">
                    <span>→</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] p-3 text-xs italic leading-relaxed text-white/60">
              <span className="mb-1 block font-semibold not-italic text-[color:var(--accent)]">
                Motivation
              </span>
              {p.motivation}
            </div>
            <div>
              <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-white/30">
                Behavior
              </span>
              <p className="text-xs leading-relaxed text-white/40">{p.behavior}</p>
            </div>
          </SurfaceCard>
        ))}
      </div>

      <SurfaceCard>
        <h3 className="mb-6 text-base font-semibold text-white">Key Research Insights</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {RESEARCH_INSIGHTS.map((i) => (
            <div
              key={i.insight}
              className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[color:var(--accent)]" />
              <div>
                <div className="text-sm font-semibold text-white">{i.insight}</div>
                <div className="mt-1 text-sm leading-relaxed text-white/50">{i.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </section>
  );
}
