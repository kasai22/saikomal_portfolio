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
              <div key={i.l} className="flex items-start gap-3 border-t border-white/5 pt-4 first:border-0 first:pt-0">
                <span className="mt-0.5 shrink-0 text-[color:var(--accent)]">→</span>
                <div>
                  <div className="text-sm font-semibold text-white">{i.l}</div>
                  <div className="mt-1 text-sm leading-relaxed text-white/55">{i.d}</div>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>
        <AccentCard className="flex flex-col justify-center">
          <h3 className="mb-4 text-lg font-bold text-[color:var(--accent)]">Final Reflection</h3>
          <p className="mb-4 leading-relaxed text-white/70">{FINAL_REFLECTION_PARAGRAPHS[0]}</p>
          <p className="mb-4 leading-relaxed text-white/65">{FINAL_REFLECTION_PARAGRAPHS[1]}</p>
          <p className="mb-4 leading-relaxed text-white/65">{FINAL_REFLECTION_PARAGRAPHS[2]}</p>
          <div className="border-t border-white/10 pt-5">
            <p className="text-sm italic text-white/40">&quot;{FINAL_REFLECTION_QUOTE}&quot;</p>
          </div>
        </AccentCard>
      </div>
    </section>
  );
}
