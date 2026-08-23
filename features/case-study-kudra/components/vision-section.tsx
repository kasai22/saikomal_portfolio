import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { AccentCard } from "@/components/case-study/accent-card";
import { VISION_GOALS, VISION_PARAGRAPHS } from "@/features/case-study-kudra/constants/data";

export function VisionSection() {
  return (
    <section>
      <SectionHeading label="Product Vision" title="The" accent="North Star" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SurfaceCard>
            <p className="mb-6 text-[15px] leading-relaxed text-white/75">{VISION_PARAGRAPHS[0]}</p>
            <p className="leading-relaxed text-white/65">{VISION_PARAGRAPHS[1]}</p>
          </SurfaceCard>
        </div>
        <AccentCard className="flex flex-col justify-center gap-4">
          {VISION_GOALS.map((goal) => (
            <div key={goal} className="flex items-center gap-3 text-[13px] text-white/70">
              <span className="text-[color:var(--accent)]">→</span> {goal}
            </div>
          ))}
        </AccentCard>
      </div>
    </section>
  );
}
