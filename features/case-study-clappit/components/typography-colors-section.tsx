import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import {
  COLOR_TOKENS,
  COMPONENT_STATS,
  DESIGN_TOKENS,
  SPACING_SCALE,
  TYPE_SAMPLES,
} from "@/features/case-study-clappit/constants/data";

export function TypographyColorsSection() {
  return (
    <section>
      <SectionHeading
        label="Typography & Colors"
        title="The Design"
        accent="System Language"
        sub="A semantic design system built to scale — every token, type size, and color earns its role in the product."
      />

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SurfaceCard>
          <h3 className="mb-5 border-b border-white/[0.08] pb-4 text-sm font-bold text-white">
            Typography Hierarchy
          </h3>
          <div className="space-y-3">
            {TYPE_SAMPLES.map((t) => (
              <div
                key={t.label}
                className="flex items-center justify-between gap-4 border-b border-white/5 py-3 last:border-0"
              >
                <div className="w-20 shrink-0">
                  <div className="text-xs font-medium text-white/30">{t.label}</div>
                  <div className="text-xs text-white/20">{t.size}</div>
                </div>
                <div className={`flex-1 text-right text-white/80 ${t.className}`}>{t.sample}</div>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <h3 className="mb-5 border-b border-white/[0.08] pb-4 text-sm font-bold text-white">
            Interface Color System
          </h3>
          <div className="space-y-3">
            {COLOR_TOKENS.map((c) => (
              <div key={c.name} className="flex items-center gap-4">
                <div
                  className="h-10 w-10 shrink-0 rounded-xl border border-white/10"
                  style={{ backgroundColor: c.hex }}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">{c.name}</span>
                    <span className="font-mono text-xs text-white/30">{c.hex}</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs leading-relaxed text-white/40">{c.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <SurfaceCard>
          <h3 className="mb-4 text-sm font-bold text-white">Design Tokens</h3>
          <div className="space-y-2 font-mono text-xs">
            {DESIGN_TOKENS.map((t) => (
              <div
                key={t.token}
                className="flex items-center justify-between gap-3 border-b border-white/5 py-1.5 last:border-0"
              >
                <span className="text-white/45">{t.token}</span>
                <span className="shrink-0 text-white/65">{t.val}</span>
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard>
          <h3 className="mb-4 text-sm font-bold text-white">Spacing Scale</h3>
          <div className="space-y-3">
            {SPACING_SCALE.map((sp) => (
              <div key={sp} className="flex items-center gap-3">
                <div className="h-3 rounded-full bg-white/20" style={{ width: sp * 2 }} />
                <span className="font-mono text-xs text-white/40">{sp}px</span>
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard>
          <h3 className="mb-4 text-sm font-bold text-white">Component Stats</h3>
          <div className="space-y-3">
            {COMPONENT_STATS.map((s) => (
              <div
                key={s.l}
                className="flex items-center justify-between border-b border-white/5 py-1.5 last:border-0"
              >
                <span className="text-sm text-white/50">{s.l}</span>
                <span className="text-sm font-bold tabular-nums text-[color:var(--accent)]">
                  {s.v}
                </span>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>
    </section>
  );
}
