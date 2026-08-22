import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { AccentCard } from "@/components/case-study/accent-card";
import { BulletList } from "@/components/case-study/bullet-list";
import { PROBLEM_STATEMENT } from "@/features/case-study-hsl/constants/data";

const WHO_WAS_STUCK = [
  "Candidates applied, then had no signal of any kind until an email arrived — if one arrived.",
  "Vendors depended on email confirmations and updates to know where a tender stood.",
  "Employees crossed between modules that each used different navigation and terminology.",
];

const WHAT_IT_COST = [
  "HR and the tender cell became a human status API, answering the same question by phone all day.",
  "Information the platform already held was re-sent manually, one message at a time.",
  "A missed email was a dead end — there was no second place to check.",
];

export function ProblemStatementSection() {
  return (
    <section>
      <SectionHeading label="Problem Statement" title="The Operational" accent="Reality" />

      <AccentCard className="mb-6">
        <p className="text-base leading-relaxed text-white/75">{PROBLEM_STATEMENT}</p>
      </AccentCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SurfaceCard>
          <h3 className="mb-5 font-semibold text-white">Where people got stuck</h3>
          <BulletList items={WHO_WAS_STUCK} />
        </SurfaceCard>
        <SurfaceCard>
          <div className="mb-5 h-1 w-8 rounded-full bg-red-500/50" />
          <h3 className="mb-5 font-semibold text-white">What it cost HSL</h3>
          <ul className="space-y-2">
            {WHAT_IT_COST.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-white/65"
              >
                <span className="mt-0.5 shrink-0 text-red-400/60">✗</span> {item}
              </li>
            ))}
          </ul>
        </SurfaceCard>
      </div>
    </section>
  );
}
