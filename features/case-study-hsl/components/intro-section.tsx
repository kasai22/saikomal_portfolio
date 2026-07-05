import { INTRO_PARAGRAPHS } from "@/features/case-study-hsl/constants/data";

export function IntroSection() {
  return (
    <section className="w-full max-w-[800px]">
      <div className="flex w-full flex-col items-start gap-8 px-6 py-8 sm:px-10 sm:py-10 md:px-14">
        <h2 className="text-style-display-semibold-l text-adaptive-strong">Case Studies</h2>
        <div className="flex w-full flex-col gap-4">
          {INTRO_PARAGRAPHS.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex} className="text-style-heading-regular-l">
              {paragraph.map((segment, segmentIndex) => (
                <span
                  key={segmentIndex}
                  className={segment.highlight ? "text-white" : "text-white/60"}
                >
                  {segment.text}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
