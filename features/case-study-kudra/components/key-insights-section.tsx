import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { KEY_INSIGHTS } from "@/features/case-study-kudra/constants/data";

export function KeyInsightsSection() {
  return (
    <section>
      <SectionHeading label="Key Insights" title="What We" accent="Discovered" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {KEY_INSIGHTS.map((ins) => (
          <SurfaceCard key={ins.num}>
            <div className="mb-4 text-4xl font-bold text-[color:var(--accent)] opacity-25">
              {ins.num}
            </div>
            <h4 className="mb-3 text-base font-bold text-white">{ins.title}</h4>
            <p className="text-sm leading-relaxed text-white/60">{ins.desc}</p>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}
