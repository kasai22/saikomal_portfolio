import Image from "next/image";
import { SectionHeading } from "@/components/case-study/section-heading";
import { HIGH_FIDELITY_CAPTION, HIGH_FIDELITY_SCREENS } from "@/features/case-study-rex/constants/data";

export function HighFidelityScreensSection() {
  return (
    <section>
      <SectionHeading
        label="High Fidelity Screens"
        title="Inside the"
        accent="REX Experience"
        sub={HIGH_FIDELITY_CAPTION}
      />

      <div className="grid grid-cols-1 gap-8">
        {HIGH_FIDELITY_SCREENS.map((f) => (
          <div key={f.screen} className="rounded-sm border border-ink/12 bg-ink/[0.033] p-4 md:p-6">
            <div className="mb-5 overflow-hidden rounded-sm border border-ink/12 shadow-sm">
              <Image
                src={f.image}
                alt={f.screen}
                width={1920}
                height={1200}
                className="block h-auto w-full"
              />
            </div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <h3 className="t-h4 text-ink">{f.screen}</h3>
              <span className="rounded-full bg-[color:var(--accent-subtle)] px-2.5 py-1 text-[11px] font-medium text-[color:var(--accent)]">
                {f.tag}
              </span>
            </div>
            <div className="rounded-sm border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] p-4 text-[13px]">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[color:var(--accent)]">
                Design Rationale
              </span>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/70">{f.decision}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
