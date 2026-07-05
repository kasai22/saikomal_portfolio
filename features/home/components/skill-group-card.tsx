import type { SkillGroup } from "@/features/home/types";

interface SkillGroupCardProps {
  group: SkillGroup;
}

export function SkillGroupCard({ group }: SkillGroupCardProps) {
  return (
    <div className="group relative cursor-default overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:border-brand/40 hover:bg-brand/[0.04]">
      {/* Glow */}
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
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65 transition-all duration-200 hover:border-brand/40 hover:bg-brand/10 hover:text-white"
          >
            {skill}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
        <span className="text-xs uppercase tracking-widest text-white/25">Capabilities</span>
        <span className="text-xs font-bold tabular-nums text-brand">{group.items.length}</span>
      </div>
    </div>
  );
}
