import { SectionHeading } from "@/components/case-study/section-heading";
import { AccentCard } from "@/components/case-study/accent-card";
import { REFLECTION_POINTS } from "@/features/case-study-rex/constants/data";

export function ReflectionSection() {
  return (
    <section>
      <SectionHeading
        label="Reflection"
        title="What This Project"
        accent="Taught Me"
        sub="Designing an AI stylist for a luxury brand meant every UX decision doubled as a trust decision."
      />
      <AccentCard>
        <div className="space-y-5">
          {REFLECTION_POINTS.map((point) => (
            <div key={point} className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 text-[color:var(--accent)]">✦</span>
              <p className="text-[13px] leading-relaxed text-ink/72">{point}</p>
            </div>
          ))}
        </div>
      </AccentCard>
    </section>
  );
}
