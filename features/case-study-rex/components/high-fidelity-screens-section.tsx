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
          <div key={f.screen} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-6">
            <div className="mb-5 overflow-hidden rounded-xl border border-white/10 shadow-xl">
              <Image
                src={f.image}
                alt={f.screen}
                width={1920}
                height={1200}
                className="block h-auto w-full"
              />
            </div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <h4 className="text-base font-bold text-white">{f.screen}</h4>
              <span className="rounded-full bg-[color:var(--accent-subtle)] px-2.5 py-1 text-xs font-medium text-[color:var(--accent)]">
                {f.tag}
              </span>
            </div>
            <div className="rounded-xl border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] p-4 text-sm">
              <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--accent)]">
                Design Rationale
              </span>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{f.decision}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
