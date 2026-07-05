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
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] text-xl">
                {f.icon}
              </div>
              <h4 className="font-bold text-white">{f.feature}</h4>
            </div>
            <p className="text-sm leading-relaxed text-white/60">{f.detail}</p>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}
