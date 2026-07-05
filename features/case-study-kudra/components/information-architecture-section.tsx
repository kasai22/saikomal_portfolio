import { SectionHeading } from "@/components/case-study/section-heading";
import { HoverTile } from "@/components/case-study/hover-tile";
import { ARCHITECTURE_MODULES } from "@/features/case-study-kudra/constants/data";

export function InformationArchitectureSection() {
  return (
    <section>
      <SectionHeading label="Information Architecture" title="Platform" accent="Structure" />
      <p className="mb-8 max-w-2xl text-white/60">
        The platform architecture was designed around operational efficiency — ensuring quick
        access to the most-used workflows while reducing navigation complexity.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {ARCHITECTURE_MODULES.map((m) => (
          <HoverTile key={m.module} icon={m.icon} title={m.module} description={m.desc} />
        ))}
      </div>
    </section>
  );
}
