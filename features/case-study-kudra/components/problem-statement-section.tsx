import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { AccentCard } from "@/components/case-study/accent-card";
import { BulletList } from "@/components/case-study/bullet-list";
import { COORDINATION_METHODS, COORDINATION_PROBLEMS, MISSING_CONTEXT_ITEMS } from "@/features/case-study-kudra/constants/data";

export function ProblemStatementSection() {
  return (
    <section>
      <SectionHeading label="Problem Statement" title="The Operational" accent="Reality" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <SurfaceCard>
          <h3 className="mb-5 font-semibold text-white">How logistics teams coordinated</h3>
          <BulletList items={COORDINATION_METHODS} />
        </SurfaceCard>
        <SurfaceCard>
          <h3 className="mb-5 font-semibold text-white">What this created</h3>
          <BulletList items={COORDINATION_PROBLEMS} />
        </SurfaceCard>
      </div>
      <AccentCard className="mt-6">
        <h3 className="mb-4 font-semibold text-white">
          Vehicles were moving without operational context.
        </h3>
        <p className="mb-4 text-[13px] leading-relaxed text-white/65">Teams could not easily identify:</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {MISSING_CONTEXT_ITEMS.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-[13px] text-white/65"
            >
              <span className="text-[color:var(--accent)]">✦</span> {item}
            </div>
          ))}
        </div>
      </AccentCard>
    </section>
  );
}
