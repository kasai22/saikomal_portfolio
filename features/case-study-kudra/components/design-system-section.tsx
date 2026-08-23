import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { AccentCard } from "@/components/case-study/accent-card";
import { BulletList } from "@/components/case-study/bullet-list";
import { DESIGN_PRINCIPLES, STATUS_COLORS, UI_DECISIONS } from "@/features/case-study-kudra/constants/data";

export function DesignSystemSection() {
  return (
    <section>
      <SectionHeading label="Design System" title="Visual" accent="Language" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <SurfaceCard>
          <h3 className="mb-4 font-semibold text-white">Design Principles</h3>
          <div className="space-y-3">
            {DESIGN_PRINCIPLES.map((pr) => (
              <div key={pr.p} className="flex items-start gap-3 border-t border-white/5 pt-3 first:border-0 first:pt-0">
                <span className="mt-0.5 shrink-0 text-[color:var(--accent)]">→</span>
                <div>
                  <div className="text-[13px] font-medium text-white">{pr.p}</div>
                  <div className="mt-0.5 text-[11px] leading-relaxed text-white/50">{pr.d}</div>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <div className="space-y-5">
          <SurfaceCard>
            <h3 className="mb-4 font-semibold text-white">UI Decisions</h3>
            <BulletList items={UI_DECISIONS} />
          </SurfaceCard>
          <AccentCard>
            <h3 className="mb-3 font-semibold text-[color:var(--accent)]">Status Color Semantics</h3>
            <div className="grid grid-cols-2 gap-3">
              {STATUS_COLORS.map((c) => (
                <div key={c.state} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <div className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: c.color }} />
                  <div>
                    <div className="text-[11px] font-semibold text-white">{c.state}</div>
                    <div className="text-[11px] text-white/40">{c.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </AccentCard>
        </div>
      </div>
    </section>
  );
}
