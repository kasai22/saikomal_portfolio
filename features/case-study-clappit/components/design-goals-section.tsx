import { SectionHeading } from "@/components/case-study/section-heading";
import { DESIGN_GOALS } from "@/features/case-study-clappit/constants/data";

export function DesignGoalsSection() {
  return (
    <section>
      <SectionHeading
        label="Design Goals"
        title="What We Were"
        accent="Solving For"
        sub="Seven UX goals established in collaboration with stakeholders, each directly traceable to a user pain point from research."
      />
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DESIGN_GOALS.map((g) => (
          <div
            key={g.n}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-200 hover:border-white/20"
          >
            <div className="mb-3 text-4xl font-bold tabular-nums text-[color:var(--accent)] opacity-40">
              {g.n}
            </div>
            <h4 className="mb-2 text-sm font-bold leading-tight text-white">{g.goal}</h4>
            <p className="text-xs leading-relaxed text-white/50">{g.desc}</p>
          </div>
        ))}
        <div className="flex flex-col justify-between rounded-2xl border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] p-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--accent)]">
            North Star
          </span>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            &quot;An engineer should understand the complete operational state of their
            infrastructure within <span className="font-bold text-white">5 seconds</span> of
            opening the dashboard — without clicking, scrolling, or decoding.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
