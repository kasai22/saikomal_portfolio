import { PillHeading } from "@/components/case-study/pill-heading";
import { POSSIBLE_SOLUTION_DESCRIPTION } from "@/features/case-study-hsl/constants/data";

export function PossibleSolutionSection() {
  return (
    <section className="mx-auto flex w-full max-w-[1150px] flex-col items-center gap-10">
      <PillHeading
        pillWidth={369}
        segments={[
          { text: "Possible", accent: false },
          { text: " Solution", accent: true },
        ]}
      />
      <p className="w-full text-justify font-body text-base text-white">
        {POSSIBLE_SOLUTION_DESCRIPTION}
      </p>
    </section>
  );
}
