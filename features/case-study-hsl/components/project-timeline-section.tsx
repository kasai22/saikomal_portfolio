import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { TIMELINE_PHASES } from "@/features/case-study-hsl/constants/data";

export function ProjectTimelineSection() {
  return (
    <section>
      <SectionHeading
        label="Project Timeline"
        title="Twelve"
        accent="Weeks"
        sub="Eight weeks of research and UX before any visual design started — which is why the reframe from 'website redesign' to 'status visibility' happened early enough to matter."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {TIMELINE_PHASES.map((phase) => (
          <SurfaceCard key={phase.phase}>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-white">{phase.phase}</h3>
              <span className="shrink-0 rounded-full border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] px-3 py-1 text-xs font-semibold text-[color:var(--accent)]">
                {phase.weeks}
              </span>
            </div>

            <div
              className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-white/10"
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full bg-[color:var(--accent)]"
                style={{ width: `${phase.share}%` }}
              />
            </div>

            <ol className="space-y-3">
              {phase.steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color:var(--accent-border)] text-[10px] font-bold text-[color:var(--accent)]">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-white/65">{step}</span>
                </li>
              ))}
            </ol>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}
