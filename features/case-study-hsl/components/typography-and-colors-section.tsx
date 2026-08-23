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
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-ink/60">
            Typeface
          </p>
          <p className="mb-6 text-2xl font-semibold tracking-[-0.02em] text-[color:var(--accent)]">
            {FONT_NAME}
          </p>
          <div className="mb-6 space-y-1 text-[15px] text-ink/60">
            <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p>abcdefghijklmnopqrstuvwxyz</p>
            <p>1234567890</p>
          </div>
          <p className="text-[13px] leading-relaxed text-ink/65">{FONT_DESCRIPTION}</p>
        </SurfaceCard>

        <div className="space-y-6">
          <SurfaceCard>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-ink/60">
              Weights in use
            </p>
            <div className="space-y-3">
              {FONT_SAMPLES.map((sample) => (
                <div
                  key={sample.label}
                  className="flex items-baseline justify-between gap-4 border-b border-ink/[0.07] pb-3 last:border-0 last:pb-0"
                >
                  <span className={`text-lg text-ink ${sample.weightClassName}`}>
                    {sample.text}
                  </span>
                  <span className="shrink-0 text-[11px] uppercase tracking-widest text-ink/60">
                    {sample.label}
                  </span>
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-ink/60">
              Colour
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {COLOR_SWATCHES.map((swatch, index) => (
                <div
                  key={`${swatch.title}-${index}`}
                  className="overflow-hidden rounded-sm border border-ink/12"
                >
                  <div
                    className="h-16 w-full"
                    style={{ backgroundColor: swatch.value }}
                    aria-hidden="true"
                  />
                  <div className="bg-ink/[0.035] px-3 py-2">
                    <div className="text-[11px] font-semibold text-ink">{swatch.title}</div>
                    <div className="mt-0.5 font-mono text-[11px] text-ink/60">{swatch.value}</div>
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
