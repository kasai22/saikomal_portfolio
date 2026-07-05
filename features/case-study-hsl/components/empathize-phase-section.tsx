import { PillHeading } from "@/components/case-study/pill-heading";
import { NestedMarkerIcon } from "@/components/case-study/nested-marker-icon";
import {
  INTERVIEW_GROUPS,
  KEY_INSIGHTS_FROM_RESEARCH,
  QUALITATIVE_RESEARCH_SUMMARY,
} from "@/features/case-study-hsl/constants/data";

export function EmpathizePhaseSection() {
  return (
    <section className="w-full text-white">
      <div className="mx-auto flex w-full max-w-[1208px] flex-col items-center">
        <PillHeading
          className="mb-12"
          pillWidth={369}
          segments={[
            { text: "Emphatize", accent: true },
            { text: " Phase", accent: false },
          ]}
        />

        <div className="flex w-full flex-col gap-10">
          <div className="flex items-start gap-3">
            <div className="pt-1">
              <NestedMarkerIcon
                outerClassName="h-[34px] w-7 rounded-[14px/17px]"
                middleClassName="left-[3px] top-1 h-[27px] w-[16px] rounded-[11px/13px]"
                innerClassName="left-1.5 top-[7px] h-5 w-4 rounded-[8px/10px]"
              />
            </div>
            <div className="flex-1">
              <h3 className="mb-6 font-body text-3xl font-medium text-white sm:text-[34px]">
                Qualitative Research
              </h3>
              <p className="max-w-[1019px] text-justify font-body text-base text-white">
                {QUALITATIVE_RESEARCH_SUMMARY}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="pt-1">
              <NestedMarkerIcon
                outerClassName="h-[34px] w-7 rounded-[14px/17px]"
                middleClassName="left-[3px] top-1 h-[27px] w-[16px] rounded-[11px/13px]"
                innerClassName="left-1.5 top-[7px] h-5 w-4 rounded-[8px/10px]"
              />
            </div>
            <div className="flex-1">
              <h3 className="mb-6 font-body text-3xl font-medium text-white sm:text-[34px]">
                Interview Questions
              </h3>
              <div className="max-w-[952px] space-y-5 text-justify">
                {INTERVIEW_GROUPS.map((group) => (
                  <div key={group.title}>
                    <h4 className="mb-1 font-body text-xl font-bold text-white">{group.title}</h4>
                    <ul className="font-body text-base text-white">
                      {group.questions.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full rounded-2xl bg-[#212121] px-6 py-7 sm:px-[94px] sm:py-[29px]">
            <div className="max-w-[985px]">
              <h3 className="mb-10 font-body text-3xl font-medium text-brand sm:text-[34px]">
                Key Insight Derived
              </h3>
              <div className="space-y-4 text-justify font-body text-base font-medium text-white">
                {KEY_INSIGHTS_FROM_RESEARCH.map((insight) => (
                  <p key={insight}>{insight}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
