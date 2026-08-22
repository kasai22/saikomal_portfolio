import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import {
  COLOR_SWATCHES,
  FONT_DESCRIPTION,
  FONT_NAME,
  FONT_SAMPLES,
} from "@/features/case-study-hsl/constants/data";

export function TypographyAndColorsSection() {
  return (
    <section>
      <SectionHeading label="Design System" title="Typography &" accent="Colour" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <SurfaceCard>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/35">
            Typeface
          </p>
          <p className="mb-6 text-5xl font-bold text-[color:var(--accent)] sm:text-6xl">
            {FONT_NAME}
          </p>
          <div className="mb-6 space-y-1 text-lg text-white/50">
            <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p>abcdefghijklmnopqrstuvwxyz</p>
            <p>1234567890</p>
          </div>
          <p className="text-sm leading-relaxed text-white/60">{FONT_DESCRIPTION}</p>
        </SurfaceCard>

        <div className="space-y-6">
          <SurfaceCard>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/35">
              Weights in use
            </p>
            <div className="space-y-3">
              {FONT_SAMPLES.map((sample) => (
                <div
                  key={sample.label}
                  className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0"
                >
                  <span className={`text-2xl text-white ${sample.weightClassName}`}>
                    {sample.text}
                  </span>
                  <span className="shrink-0 text-xs uppercase tracking-widest text-white/35">
                    {sample.label}
                  </span>
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/35">
              Colour
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {COLOR_SWATCHES.map((swatch, index) => (
                <div
                  key={`${swatch.title}-${index}`}
                  className="overflow-hidden rounded-xl border border-white/10"
                >
                  <div
                    className="h-16 w-full"
                    style={{ backgroundColor: swatch.value }}
                    aria-hidden="true"
                  />
                  <div className="bg-white/5 px-3 py-2">
                    <div className="text-xs font-semibold text-white">{swatch.title}</div>
                    <div className="mt-0.5 font-mono text-xs text-white/40">{swatch.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>
      </div>
    </section>
  );
}
