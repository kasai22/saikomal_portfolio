import { PillHeading } from "@/components/case-study/pill-heading";
import { NestedMarkerIcon } from "@/components/case-study/nested-marker-icon";
import { COLOR_SWATCHES, FONT_DESCRIPTION, FONT_SAMPLES } from "@/features/case-study-hsl/constants/data";

export function TypographyAndColorsSection() {
  return (
    <section className="w-full text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16">
        <PillHeading
          pillWidth={520}
          fontSize={38}
          segments={[
            { text: "Typography &", accent: false },
            { text: " Colors", accent: true },
          ]}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-3">
              <NestedMarkerIcon
                outerClassName="mt-1 h-[34px] w-[35px] rounded-[17px/17px]"
                middleClassName="left-1 top-1 h-[27px] w-7 rounded-[14px/13px]"
                innerClassName="left-[7px] top-[7px] h-5 w-5 rounded-[10px/10px]"
              />
              <h3 className="font-body text-2xl font-medium text-white sm:text-[34px]">
                Font Used
              </h3>
            </div>

            <div className="flex flex-col gap-8 pl-0 lg:pl-[49px]">
              <div className="relative inline-flex w-fit items-center justify-center border-[1.5px] border-white px-5 py-4">
                <span className="absolute -left-[7px] -top-[7px] block h-[13px] w-[13px] border border-white bg-white" />
                <span className="absolute -bottom-[7px] -left-[7px] block h-[13px] w-[13px] border border-white bg-white" />
                <span className="absolute -right-[7px] -top-[7px] block h-[13px] w-[13px] border border-white bg-white" />
                <span className="absolute -bottom-[7px] -right-[7px] block h-[13px] w-[13px] border border-white bg-white" />
                <p className="pr-10 font-body text-5xl font-bold text-brand sm:text-6xl lg:text-7xl">
                  Nato Sans
                </p>
              </div>
              <div className="space-y-2 font-body text-2xl text-white sm:text-[28px]">
                <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p>abcdefghijklmnopqrstuvwxyz</p>
                <p>1234567890</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <p className="font-body text-xl text-white sm:text-[28px]">
              <span className="font-medium">Satoshi</span> {FONT_DESCRIPTION}
            </p>
            <div className="grid grid-cols-1 gap-x-10 gap-y-6 rounded-[25px] bg-[#212121] p-6 shadow-[0px_2px_10px_#0000001a] sm:grid-cols-2 sm:p-8">
              {FONT_SAMPLES.map((sample) => (
                <p
                  key={`${sample.label}-${sample.text}`}
                  className={`font-body text-3xl text-white sm:text-[35px] ${sample.weightClassName}`}
                >
                  {sample.text}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex items-start gap-3">
            <NestedMarkerIcon
              outerClassName="mt-1 h-[34px] w-[35px] rounded-[17px/17px]"
              middleClassName="left-1 top-1 h-[27px] w-7 rounded-[14px/13px]"
              innerClassName="left-[7px] top-[7px] h-5 w-5 rounded-[10px/10px]"
            />
            <h3 className="font-body text-2xl font-medium text-white sm:text-[34px]">
              Color Used
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {COLOR_SWATCHES.map((swatch, index) => (
              <div key={`${swatch.title}-${index}`} className="flex flex-col items-center text-center">
                <div
                  className="h-[120px] w-[120px] rounded-2xl border border-white/10 shadow-[0px_4px_16px_#00000033]"
                  style={{ backgroundColor: swatch.value }}
                  aria-hidden="true"
                />
                <div className="mt-5 space-y-1">
                  <h4 className="font-body text-xl font-medium text-white sm:text-2xl">
                    {swatch.title}
                  </h4>
                  <p className="font-body text-lg text-white sm:text-xl lg:text-2xl">
                    {swatch.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
