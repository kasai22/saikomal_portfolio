import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { FEATURES } from "@/features/case-study-kudra/constants/data";

export function KeyFeaturesSection() {
  return (
    <section>
      <SectionHeading label="Key Features" title="Core" accent="Capabilities" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {FEATURES.map((f) => (
          <SurfaceCard key={f.feature} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] text-base">
                {f.icon}
              </div>
              <h3 className="t-h4 text-ink">{f.feature}</h3>
            </div>
            <p className="text-[13px] leading-relaxed text-ink/65">{f.detail}</p>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}
