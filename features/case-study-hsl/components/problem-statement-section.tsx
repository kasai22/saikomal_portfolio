import { PillHeading } from "@/components/case-study/pill-heading";
import { PROBLEM_STATEMENT } from "@/features/case-study-hsl/constants/data";

export function ProblemStatementSection() {
  return (
    <div className="flex w-full flex-col items-center">
      <PillHeading
        className="mb-8"
        pillWidth={441}
        segments={[
          { text: "Problem", accent: false },
          { text: " Statement", accent: true },
        ]}
      />
      <p className="w-full text-justify font-body text-base text-white">{PROBLEM_STATEMENT}</p>
    </div>
  );
}
