import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { BulletList } from "@/components/case-study/bullet-list";
import { USER_ROLES } from "@/features/case-study-kudra/constants/data";

export function TargetAudienceSection() {
  return (
    <section>
      <SectionHeading label="Target Audience" title="Who Uses" accent="Kudra?" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {USER_ROLES.map((u) => (
          <SurfaceCard key={u.role}>
            <div className="mb-6 flex items-center gap-3">
              <span className="text-xl" aria-hidden="true">
                {u.icon}
              </span>
              <h3 className="text-[15px] font-bold text-ink">{u.role}</h3>
            </div>
            <div className="mb-5">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-ink/60">
                Responsibilities
              </p>
              <BulletList items={u.responsibilities} />
            </div>
            <div className="rounded-sm border border-red-500/20 bg-red-500/5 p-4">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-red-400/70">
                Pain Points
              </p>
              <ul className="space-y-2">
                {u.painPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[13px] leading-relaxed text-ink/62">
                    <span className="mt-0.5 shrink-0 text-red-400/60">✗</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}
