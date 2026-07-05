import Image from "next/image";
import { PillHeading } from "@/components/case-study/pill-heading";
import { DESIGN_THINKING_INTRO, DESIGN_THINKING_STEPS } from "@/features/case-study-hsl/constants/data";

export function DesignThinkingStepsSection() {
  return (
    <section className="w-full text-white">
      <div className="mx-auto flex w-full max-w-[1226px] flex-col items-center">
        <header className="flex w-full flex-col items-center">
          <PillHeading
            pillWidth={487}
            segments={[
              { text: "Design Thinking", accent: true },
              { text: " Process", accent: false },
            ]}
          />
          <p className="mt-[70px] w-full max-w-[1184px] text-justify font-body text-xl text-white sm:text-2xl">
            {DESIGN_THINKING_INTRO}
          </p>
        </header>

        <ol className="mt-16 grid w-full grid-cols-5 items-start gap-3 md:gap-6">
          {DESIGN_THINKING_STEPS.map((step, index) => (
            <li key={step.title} className="flex flex-col items-center">
              <div className="flex w-full items-center justify-center">
                <div className="flex h-[163px] w-full max-w-[156px] items-center justify-center rounded-[78px] bg-[#212121] shadow-[0px_2px_10px_#0000001a]">
                  {/* eslint-disable-next-line @next/next/no-img-element -- SVG icon, no benefit from next/image optimization */}
                  <img
                    src={step.iconSrc}
                    alt={step.iconAlt}
                    className="h-auto max-h-[88px] w-auto object-contain"
                  />
                </div>
                {step.connectorSrc && index < DESIGN_THINKING_STEPS.length - 1 && (
                  <Image
                    src={step.connectorSrc}
                    alt=""
                    width={79}
                    height={33}
                    className="ml-3 hidden h-[33px] w-[79px] object-contain md:block"
                  />
                )}
              </div>
              <h3 className="mt-5 text-center font-body text-3xl font-medium text-white sm:text-[34px]">
                {step.title}
              </h3>
              <div className="mt-6 text-center font-body text-xl text-white">
                {step.items.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
