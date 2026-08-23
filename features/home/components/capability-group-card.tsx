import { GlassSurface } from "@/components/ui/glass-surface";
import type { CapabilityGroup } from "@/features/home/types";

interface CapabilityGroupCardProps {
  group: CapabilityGroup;
}

export function CapabilityGroupCard({ group }: CapabilityGroupCardProps) {
  return (
    <GlassSurface level={2} className="group relative h-full overflow-hidden p-6 hover:border-brand/40">
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle, rgba(0,128,128,0.15) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="mb-4 flex items-start gap-3 border-b border-white/[0.08] pb-4">
        <span className="mt-px shrink-0 text-lg leading-none text-brand" aria-hidden="true">
          {group.icon}
        </span>
        <div className="min-w-0">
          <h3 className="t-h4 text-white">{group.category}</h3>
          <p className="t-meta mt-1 text-white/40">{group.description}</p>
        </div>
        <span
          className="ml-auto shrink-0 text-[10px] font-semibold tabular-nums text-white/20"
          aria-hidden="true"
        >
          {group.items.length}
        </span>
      </div>

      <ul className="flex flex-wrap gap-1.5">
        {group.items.map((skill) => (
          <li key={skill} className="t-chip transition-colors duration-200 group-hover:border-brand/20">
            {skill}
          </li>
        ))}
      </ul>
    </GlassSurface>
  );
}
