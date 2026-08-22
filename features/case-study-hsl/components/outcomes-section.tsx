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
        <p className="text-base leading-relaxed text-white/75">{OUTCOME_INTRO}</p>
      </AccentCard>

      <ul className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {OUTCOMES.map((outcome) => (
          <li key={outcome.title}>
            <SurfaceCard className="h-full">
              <div className="mb-4 h-1 w-8 rounded-full bg-[color:var(--accent)]" />
              <h3 className="mb-3 text-sm font-bold text-white">{outcome.title}</h3>
              <p className="text-sm leading-relaxed text-white/60">{outcome.description}</p>
            </SurfaceCard>
          </li>
        ))}
      </ul>

      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/35">
          What I took from it
        </p>
        <div className="space-y-4">
          {REFLECTION_POINTS.map((point) => (
            <SurfaceCard key={point}>
              <p className="text-sm leading-relaxed text-white/65">{point}</p>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  );
}
