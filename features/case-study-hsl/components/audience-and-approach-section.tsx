import { PillHeading } from "@/components/case-study/pill-heading";
import { AUDIENCE_APPROACH_ENTRIES } from "@/features/case-study-hsl/constants/data";

export function AudienceAndApproachSection() {
  return (
    <section className="mx-auto flex w-full max-w-[1214px] flex-col gap-12 lg:gap-4">
      {AUDIENCE_APPROACH_ENTRIES.map((entry) => (
        <div key={entry.id} className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          <div
            className={`flex justify-center ${entry.imageFirstOnMobile ? "order-1" : "order-2 lg:order-2"} ${entry.imageFirstOnMobile ? "lg:order-1" : ""}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector illustration, no benefit from next/image optimization */}
            <img
              src={entry.imageSrc}
              alt={entry.imageAlt}
              className="w-full max-w-[620px] self-center object-contain lg:self-start"
            />
          </div>

          <article
            className={`flex flex-col ${entry.imageFirstOnMobile ? "order-2 lg:order-2" : "order-1 lg:order-1"}`}
          >
            <PillHeading
              className="mb-7"
              align="start"
              pillWidth={entry.pillWidth}
              segments={entry.heading}
            />
            <div className={entry.id === "approach" ? "pl-4 lg:pt-8" : ""}>
              {entry.kind === "list" ? (
                <ul className="space-y-1 font-body text-base text-white">
                  {entry.listItems?.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : (
                <p className="text-left font-body text-base text-white lg:text-justify">
                  {entry.paragraph}
                </p>
              )}
            </div>
          </article>
        </div>
      ))}
    </section>
  );
}
