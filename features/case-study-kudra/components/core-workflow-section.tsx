import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { BulletList } from "@/components/case-study/bullet-list";
import { StepBadge } from "@/components/case-study/step-badge";
import { WORKFLOW_STEPS } from "@/features/case-study-kudra/constants/data";

export function CoreWorkflowSection() {
  return (
    <section>
      <SectionHeading label="Core Workflow" title="The Trip" accent="Lifecycle" />
      <div className="relative">
        <div
          className="absolute bottom-10 left-[19px] top-10 hidden w-0.5 bg-gradient-to-b from-[color:var(--accent)] to-transparent lg:block"
          aria-hidden="true"
        />
        <div className="space-y-4">
          {WORKFLOW_STEPS.map((w) => (
            <div key={w.step} className="relative flex items-start gap-5 lg:pl-14">
              <div className="relative z-10 lg:absolute lg:left-0 lg:top-3">
                <StepBadge n={w.step} />
              </div>
              <SurfaceCard className="flex-1">
                <h4 className="mb-3 font-bold text-white">{w.title}</h4>
                <BulletList items={w.items} />
              </SurfaceCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
