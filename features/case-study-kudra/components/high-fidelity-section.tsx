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
      <p className="mb-8 max-w-2xl text-white/60">
        The final UI adopted a clean enterprise SaaS aesthetic — dark layouts, structured cards,
        clear status indicators, and analytics-first interfaces prioritizing active trips,
        vehicle statuses, and fleet performance metrics.
      </p>

      <div className="mb-3 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
        <Image
          src="/figmaAssets/kudra-dashboard.png"
          alt="Kudra live fleet operations dashboard"
          width={1917}
          height={1020}
          className="block h-auto w-full"
        />
      </div>
      <p className="mb-10 text-center text-xs text-white/30">
        Live Fleet Operations Dashboard — 84 vehicles, real-time status tiles, active trip
        monitoring
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {SCREEN_SHOWCASE.map((screen) => (
          <div
            key={screen.title}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:border-white/20"
          >
            <div className="relative overflow-hidden">
              <Image
                src={screen.imageSrc}
                alt={`Kudra — ${screen.title}`}
                width={IMAGE_DIMENSIONS[screen.imageSrc].width}
                height={IMAGE_DIMENSIONS[screen.imageSrc].height}
                className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute left-3 top-3 rounded-full border border-[color:var(--accent-border)] bg-black/65 px-3 py-1 text-xs font-semibold text-[color:var(--accent)]">
                {screen.tag}
              </span>
            </div>
            <div className="p-5">
              <h4 className="mb-2 text-sm font-bold text-white">{screen.title}</h4>
              <p className="text-xs leading-relaxed text-white/50">{screen.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
