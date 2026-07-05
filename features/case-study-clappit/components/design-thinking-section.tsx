import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { AccentCard } from "@/components/case-study/accent-card";
import { StepDot } from "@/features/case-study-clappit/components/step-dot";
import {
  FRAMEWORK_STEPS,
  KEY_STRATEGIC_INSIGHT,
  PROCESS_STEPS,
} from "@/features/case-study-clappit/constants/data";

export function DesignThinkingSection() {
  return (
    <section>
      <SectionHeading
        label="Design Thinking"
        title="How I"
        accent="Approached It"
        sub="A systems-led approach that treated the platform as a product ecosystem — not a collection of individual screens."
      />
      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          {PROCESS_STEPS.map((s) => (
            <div key={s.step} className="flex items-start gap-4">
              <StepDot />
              <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5">
                <h4 className="mb-2 text-sm font-semibold text-white">{s.step}</h4>
                <p className="text-sm leading-relaxed text-white/55">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-5">
          <SurfaceCard>
            <h3 className="mb-4 text-sm font-bold text-white">Iterative UX Thinking Framework</h3>
            <div className="space-y-3">
              {FRAMEWORK_STEPS.map((f, i) => (
                <div
                  key={f.label}
                  className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-subtle)] text-xs font-bold text-[color:var(--accent)]">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-white">{f.label}: </span>
                    <span className="text-xs text-white/50">{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </SurfaceCard>
          <AccentCard>
            <h3 className="mb-3 text-sm font-bold text-[color:var(--accent)]">
              Key Strategic Insight
            </h3>
            <p className="text-sm leading-relaxed text-white/70">{KEY_STRATEGIC_INSIGHT}</p>
          </AccentCard>
        </div>
      </div>
    </section>
  );
}
