import Image from "next/image";
import { SectionHeading } from "@/components/case-study/section-heading";
import { SCREEN_SHOWCASE } from "@/features/case-study-kudra/constants/data";

const IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "/kudra/live-tracking.png": { width: 1918, height: 1026 },
  "/kudra/fleet-management.png": { width: 1918, height: 1025 },
  "/kudra/vehicle-reports.png": { width: 1918, height: 1031 },
  "/kudra/add-device.png": { width: 1918, height: 1026 },
};

export function HighFidelitySection() {
  return (
    <section>
      <SectionHeading label="High Fidelity Design" title="The Final" accent="Platform" />
      <p className="mb-8 max-w-2xl text-ink/65">
        The final UI adopted a clean enterprise SaaS aesthetic — dark layouts, structured cards,
        clear status indicators, and analytics-first interfaces prioritizing active trips,
        vehicle statuses, and fleet performance metrics.
      </p>

      <div className="mb-3 overflow-hidden rounded-sm border border-ink/12 shadow-sm">
        <Image
          src="/figmaAssets/kudra-dashboard.png"
          alt="Kudra live fleet operations dashboard"
          width={1917}
          height={1020}
          className="block h-auto w-full"
        />
      </div>
      <p className="mb-10 text-center text-[11px] text-ink/60">
        Live Fleet Operations Dashboard — 84 vehicles, real-time status tiles, active trip
        monitoring
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {SCREEN_SHOWCASE.map((screen) => (
          <div
            key={screen.title}
            className="group overflow-hidden rounded-sm border border-ink/12 bg-ink/[0.022] transition-all duration-300 hover:border-ink/20"
          >
            <div className="relative overflow-hidden">
              <Image
                src={screen.imageSrc}
                alt={`Kudra — ${screen.title}`}
                width={IMAGE_DIMENSIONS[screen.imageSrc]?.width ?? 1918}
                height={IMAGE_DIMENSIONS[screen.imageSrc]?.height ?? 1026}
                className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute left-3 top-3 rounded-sm border border-paper/25 bg-ink/85 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-paper">
                {screen.tag}
              </span>
            </div>
            <div className="p-5">
              <h3 className="t-h4 mb-2 text-ink">{screen.title}</h3>
              <p className="text-[11px] leading-relaxed text-ink/60">{screen.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
