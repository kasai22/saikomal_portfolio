import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { AccentCard } from "@/components/case-study/accent-card";
import {
  OUTCOME_INTRO,
  OUTCOMES,
  REFLECTION_POINTS,
} from "@/features/case-study-hsl/constants/data";

export function OutcomesSection() {
  return (
    <section>
      <SectionHeading label="Outcomes & Impact" title="What Actually" accent="Shipped" />

      <AccentCard className="mb-8">
        <p className="text-[13px] leading-relaxed text-ink/75">{OUTCOME_INTRO}</p>
      </AccentCard>

      <ul className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {OUTCOMES.map((outcome) => (
          <li key={outcome.title}>
            <SurfaceCard className="h-full">
              <div className="mb-4 h-1 w-8 rounded-full bg-[color:var(--accent)]" />
              <h3 className="mb-3 text-[13px] font-bold text-ink">{outcome.title}</h3>
              <p className="text-[13px] leading-relaxed text-ink/65">{outcome.description}</p>
            </SurfaceCard>
          </li>
        ))}
      </ul>

      <div>
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-ink/60">
          What I took from it
        </p>
        <div className="space-y-4">
          {REFLECTION_POINTS.map((point) => (
            <SurfaceCard key={point}>
              <p className="text-[13px] leading-relaxed text-ink/70">{point}</p>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  );
}
