import { Card, CardContent } from "@/components/ui/card";

const fontSamples = [
  { label: "Bold", text: "Nato Sans", className: "font-bold" },
  { label: "Regular", text: "Nato SansG", className: "font-normal" },
  { label: "Medium", text: "Nato Sans", className: "font-medium" },
  { label: "Light", text: "Nato Sans", className: "font-light" },
];

const colorItems = [
  {
    title: "Primary Color",
    value: "#2947a3",
  },
  {
    title: "Secondary Color",
    value: "#fff3f4",
  },
  {
    title: "Text Color",
    value: "#150202",
  },
  {
    title: "Text Color",
    value: "#595959",
  },
  {
    title: "Bg Color",
    value: "#f3f3f3",
  },
];

const SectionMarker = () => (
  <span className="relative mt-1 block h-[34px] w-[35px] shrink-0 rounded-[17.42px/17px] bg-[#212121]">
    <span className="absolute left-1 top-1 block h-[27px] w-7 rounded-[13.79px/13.46px] bg-[#212121]" />
    <span className="absolute left-[7px] top-[7px] block h-5 w-5 rounded-[10.16px/9.92px] bg-[#008080]" />
  </span>
);

export const KeyInsightsSection = (): JSX.Element => {
  return (
    <section className="relative w-full px-4 pb-6 pt-0 text-white md:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16">
        <header className="flex justify-center pt-2">
          <div className="flex w-full max-w-[520px] flex-col items-center">
            <div className="h-8 w-full rounded-[94px] bg-[#212121]" />
            <h2 className="-mt-8 text-center [font-family:'Poppins',Helvetica] text-[30px] font-normal leading-none tracking-[0] text-transparent sm:text-[38px] lg:text-[45px]">
              <span className="font-medium text-white">Typography &amp;</span>
              <span className="font-bold text-white">&nbsp;</span>
              <span className="font-bold text-[#008080]">Colors</span>
            </h2>
          </div>
        </header>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <section className="flex flex-col gap-8">
            <div className="flex items-start gap-3">
              <SectionMarker />
              <div>
                <h3 className="[font-family:'Poppins',Helvetica] text-[28px] font-medium leading-normal tracking-[0] text-white sm:text-[34px]">
                  Font Used
                </h3>
              </div>
            </div>
            <div className="flex flex-col gap-8 pl-0 lg:pl-[49px]">
              <div className="relative inline-flex w-fit items-center justify-center border-[1.5px] border-solid border-white px-5 py-4">
                <span className="absolute -left-[7px] -top-[7px] block h-[13px] w-[13px] border border-solid border-white bg-white" />
                <span className="absolute -bottom-[7px] -left-[7px] block h-[13px] w-[13px] border border-solid border-white bg-white" />
                <span className="absolute -right-[7px] -top-[7px] block h-[13px] w-[13px] border border-solid border-white bg-white" />
                <span className="absolute -bottom-[7px] -right-[7px] block h-[13px] w-[13px] border border-solid border-white bg-white" />
                <img
                  className="absolute right-[11px] top-[28px] h-[70px] w-px"
                  alt="Line"
                  src="/figmaAssets/line-154.svg"
                />
                <p className="pr-10 [font-family:'Poppins',Helvetica] text-[46px] font-bold leading-none tracking-[0] text-[#008080] sm:text-[56px] lg:text-[70px]">
                  Nato Sans
                </p>
              </div>
              <div className="space-y-2 [font-family:'Poppins',Helvetica] text-[24px] font-normal leading-normal tracking-[0] text-white sm:text-[28px]">
                <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p>abcdefghijklmnopqrstuvwxyz</p>
                <p>1234567890</p>
              </div>
            </div>
          </section>
          <div className="flex flex-col gap-8">
            <p className="[font-family:'Poppins',Helvetica] text-[22px] font-normal leading-normal tracking-[0] text-white sm:text-[28px]">
              <span className="font-medium">Satoshi</span>
              <span className="[font-family:'Poppins',Helvetica] text-[22px] font-normal tracking-[0] text-white sm:text-[28px]">
                {" "}
                font is a elegant and modern sans serif font. It is very neat
                and clean. It have more readability and variety of options.
                That&apos;s why I used this font.
              </span>
            </p>
            <Card className="rounded-[25px] border-0 bg-[#212121] shadow-[0px_2px_10px_#0000001a]">
              <CardContent className="grid grid-cols-1 gap-x-10 gap-y-6 p-6 sm:grid-cols-2 sm:p-8">
                {fontSamples.map((item) => (
                  <div key={`${item.label}-${item.text}`} className="min-w-0">
                    <p
                      className={`[font-family:'Poppins',Helvetica] text-[30px] ${item.className} leading-normal tracking-[0] text-white sm:text-[35px]`}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
        <section className="flex flex-col gap-10">
          <div className="flex items-start gap-3">
            <SectionMarker />
            <h3 className="[font-family:'Poppins',Helvetica] text-[28px] font-medium leading-normal tracking-[0] text-white sm:text-[34px]">
              Color Used
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {colorItems.map((item, index) => (
              <article
                key={`${item.title}-${item.value}-${index}`}
                className="flex flex-col items-center text-center"
              >
                <img
                  className="h-[173px] w-[169px]"
                  alt="Vector"
                  src="/figmaAssets/vector.svg"
                />
                <div className="mt-5 space-y-1">
                  <h4 className="[font-family:'Poppins',Helvetica] text-[22px] font-medium leading-normal tracking-[0] text-white sm:text-[28px]">
                    {item.title}
                  </h4>
                  <p className="[font-family:'Poppins',Helvetica] text-[21px] font-normal leading-normal tracking-[0] text-white sm:text-[26px] lg:text-[28px]">
                    {item.value}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};
