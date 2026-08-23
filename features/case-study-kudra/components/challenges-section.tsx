import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { CHALLENGES } from "@/features/case-study-kudra/constants/data";

export function ChallengesSection() {
  return (
    <section>
      <SectionHeading label="Challenges" title="What Made This" accent="Hard" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {CHALLENGES.map((c) => (
          <SurfaceCard key={c.ch}>
            <div className="mb-4 h-1 w-8 rounded-full bg-red-500/50" />
            <h3 className="t-h4 mb-3 text-white">{c.ch}</h3>
            <p className="mb-4 text-[13px] leading-relaxed text-white/60">{c.detail}</p>
            <div className="rounded-xl border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] p-4 text-[13px]">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[color:var(--accent)]">
                Resolution
              </span>
              <p className="mt-2 text-[13px] leading-relaxed text-white/65">{c.solution}</p>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}
