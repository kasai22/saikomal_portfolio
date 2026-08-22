import { GlassSurface } from "@/components/ui/glass-surface";
import type { CapabilityGroup } from "@/features/home/types";

interface CapabilityGroupCardProps {
  group: CapabilityGroup;
}

export function CapabilityGroupCard({ group }: CapabilityGroupCardProps) {
  return (
    <GlassSurface level={2} className="group relative overflow-hidden p-7 hover:border-brand/40">
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle, rgba(0,128,128,0.15) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="mb-5 flex items-start gap-3 border-b border-white/[0.08] pb-5">
        <span className="mt-0.5 shrink-0 text-2xl leading-none text-brand" aria-hidden="true">
          {group.icon}
        </span>
        <div>
          <h3 className="text-base font-bold leading-tight text-white">{group.category}</h3>
          <p className="mt-1 text-xs leading-relaxed text-white/40">{group.description}</p>
        </div>
      </div>

      <ul className="flex flex-wrap gap-2">
        {group.items.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65 transition-all duration-200 group-hover:border-brand/20"
          >
            {skill}
          </li>
        ))}
      </ul>
    </GlassSurface>
  );
}
