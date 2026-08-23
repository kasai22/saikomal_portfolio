import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { AccentCard } from "@/components/case-study/accent-card";
import { FINAL_REFLECTION_PARAGRAPHS, FINAL_REFLECTION_QUOTE, LEARNINGS } from "@/features/case-study-kudra/constants/data";

export function LearningsSection() {
  return (
    <section>
      <SectionHeading label="Learnings" title="What This Project" accent="Taught Me" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <SurfaceCard>
          <div className="space-y-5">
            {LEARNINGS.map((i) => (
              <div key={i.l} className="flex items-start gap-3 border-t border-ink/[0.07] pt-4 first:border-0 first:pt-0">
                <span className="mt-0.5 shrink-0 text-[color:var(--accent)]">→</span>
                <div>
                  <div className="text-[13px] font-semibold text-ink">{i.l}</div>
                  <div className="mt-1 text-[13px] leading-relaxed text-ink/62">{i.d}</div>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>
        <AccentCard className="flex flex-col justify-center">
          <h3 className="mb-4 text-[15px] font-bold text-[color:var(--accent)]">Final Reflection</h3>
          <p className="mb-4 leading-relaxed text-ink/72">{FINAL_REFLECTION_PARAGRAPHS[0]}</p>
          <p className="mb-4 leading-relaxed text-ink/70">{FINAL_REFLECTION_PARAGRAPHS[1]}</p>
          <p className="mb-4 leading-relaxed text-ink/70">{FINAL_REFLECTION_PARAGRAPHS[2]}</p>
          <div className="border-t border-ink/12 pt-5">
            <p className="text-[13px] italic text-ink/60">&quot;{FINAL_REFLECTION_QUOTE}&quot;</p>
          </div>
        </AccentCard>
      </div>
    </section>
  );
}
