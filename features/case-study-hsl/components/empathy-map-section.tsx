import Image from "next/image";
import { NestedMarkerIcon } from "@/components/case-study/nested-marker-icon";
import { EMPATHY_MAP } from "@/features/case-study-hsl/constants/data";

export function EmpathyMapSection() {
  return (
    <section className="w-full text-white">
      <header className="mb-8 flex items-start gap-3">
        <NestedMarkerIcon
          outerClassName="mt-1 h-[34px] w-[34px] rounded-full"
          middleClassName="left-[3px] top-[3px] h-[27px] w-[27px] rounded-full"
          innerClassName="left-[7px] top-[7px] h-5 w-5 rounded-full"
        />
        <h2 className="font-body text-3xl font-medium text-white sm:text-[34px]">Empathy Map</h2>
      </header>

      <div className="relative mx-auto max-w-[1192px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-20">
          {EMPATHY_MAP.map((quadrant) => (
            <div
              key={quadrant.title}
              className={`rounded-[25px] bg-brand px-7 pb-[30px] pt-[18px] text-white ${
                quadrant.title === "Says" || quadrant.title === "Thinks"
                  ? "min-h-[313px]"
                  : "min-h-[477px]"
              }`}
            >
              <h3 className="mb-6 font-body text-3xl font-medium text-white sm:text-[34px]">
                {quadrant.title}
              </h3>
              <div className="space-y-3 text-justify font-body text-lg text-white sm:text-2xl">
                {quadrant.items.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/figmaAssets/ellipse-64.png"
            alt=""
            width={249}
            height={249}
            className="rounded-full border-[10px] border-white object-cover"
          />
        </div>
      </div>
    </section>
  );
}
