import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { SkillGroupCard } from "@/features/home/components/skill-group-card";
import { WorkflowBar } from "@/features/home/components/workflow-bar";
import { SKILL_GROUPS, WORKFLOW_METRICS } from "@/features/home/constants/data";

export function SkillsSection() {
  return (
    <RevealSection id="skills" className="bg-white/[0.02] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <RevealItem className="mb-4">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">
            Skills &amp; Tools
          </span>
          <h2 className="mt-2 text-4xl font-bold sm:text-5xl">
            What I <span className="text-brand">Work With</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/50">
            A senior product design toolkit built for SaaS — spanning strategy, systems thinking,
            AI-assisted workflows, and developer collaboration.
          </p>
        </RevealItem>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => (
            <RevealItem key={group.category} delayMs={i * 120}>
              <SkillGroupCard group={group} />
            </RevealItem>
          ))}
        </div>

        <RevealItem delayMs={360} className="mt-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5">
            <span className="shrink-0 text-xs uppercase tracking-widest text-white/30">
              Workflow
            </span>
            {WORKFLOW_METRICS.map((metric) => (
              <WorkflowBar key={metric.label} metric={metric} />
            ))}
          </div>
        </RevealItem>
      </div>
    </RevealSection>
  );
}
