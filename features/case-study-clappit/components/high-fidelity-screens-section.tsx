import Image from "next/image";
import { SectionHeading } from "@/components/case-study/section-heading";
import { HIGH_FIDELITY_CAPTION, HIGH_FIDELITY_SCREENS } from "@/features/case-study-clappit/constants/data";

export function HighFidelityScreensSection() {
  return (
    <section>
      <SectionHeading
        label="High Fidelity Screens"
        title="The Final"
        accent="UI Design"
        sub="Key screens from the platform — designed for immediate operational clarity and enterprise-grade aesthetics."
      />

      <div className="mb-6 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
        <Image
          src="/figmaAssets/clappit-dashboard.png"
          alt="ClappIt — Main Dashboard"
          width={1920}
          height={1580}
          className="block h-auto w-full"
        />
      </div>
      <p className="mb-8 text-center text-xs text-white/30">{HIGH_FIDELITY_CAPTION}</p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {HIGH_FIDELITY_SCREENS.map((f) => (
          <div key={f.screen} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] text-lg">
                {f.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{f.screen}</h4>
                <span className="text-xs text-white/35">{f.tag}</span>
              </div>
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
