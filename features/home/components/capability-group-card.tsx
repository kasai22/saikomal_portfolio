import { Panel } from "@/components/ui/panel";
import type { CapabilityGroup } from "@/features/home/types";

interface CapabilityGroupCardProps {
  group: CapabilityGroup;
}

export function CapabilityGroupCard({ group }: CapabilityGroupCardProps) {
  return (
    <Panel level={2} className="group relative h-full overflow-hidden p-6 hover:border-brand/40">
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 transition-opacity duration-base group-hover:opacity-100"
        style={{ background: "radial-gradient(circle, rgba(232,163,61,0.22) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="mb-4 flex items-start gap-3 border-b border-ink/[0.096] pb-4">
        <span className="mt-px shrink-0 text-lg leading-none text-brand-ink" aria-hidden="true">
          {group.icon}
        </span>
        <div className="min-w-0">
          <h3 className="t-h4 text-ink">{group.category}</h3>
          <p className="t-meta mt-1 text-ink/60">{group.description}</p>
        </div>
        <span
          className="ml-auto shrink-0 text-[10px] font-semibold tabular-nums text-ink/60"
          aria-hidden="true"
        >
          {group.items.length}
        </span>
      </div>

      <ul className="flex flex-wrap gap-1.5">
        {group.items.map((skill) => (
          <li key={skill} className="t-chip transition-colors duration-instant group-hover:border-brand/20">
            {skill}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
