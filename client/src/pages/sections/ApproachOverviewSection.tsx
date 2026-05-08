import { Card, CardContent } from "@/components/ui/card";

const glassCardClassName =
  "relative overflow-hidden rounded-[40px] border-0 bg-transparent p-2 shadow-[0px_8px_16px_#00000099,0px_3px_8px_#0000001f,0px_1px_2px_#0000000a] backdrop-blur-md backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(12px)_brightness(100%)] [background:radial-gradient(50%_50%_at_50%_0%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.02)_100%)] before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-[40px] before:p-px before:content-[''] before:[background:linear-gradient(180deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude]";

const infoItems = [
  {
    title: "Add images",
    description: 'Change the fill type to "image"',
    iconSrc: "/figmaAssets/icon.svg",
  },
];

export const ApproachOverviewSection = (): JSX.Element => {
  return (
    <section className="relative flex w-full flex-col items-center gap-10 px-4 py-0">
      <header className="relative inline-flex flex-col items-center gap-2.5">
        <div className="absolute left-1/2 top-9 h-8 w-[380px] -translate-x-1/2 rounded-[94px] bg-[#212121]" />
        <h2 className="relative mt-[-1.00px] w-[352.6px] text-center text-[45px] leading-[normal] tracking-[0] text-transparent [font-family:'Poppins',Helvetica] font-normal">
          <span className="font-medium text-white">Visual</span>
          <span className="font-bold text-white">&nbsp;</span>
          <span className="font-bold text-[#ff66c4]">Design</span>
        </h2>
      </header>
      <div className="relative flex w-full max-w-[1182px] flex-col items-center">
        <Card className={`${glassCardClassName} w-full`}>
          <CardContent className="p-0">
            <article className="relative overflow-hidden rounded-[32px]">
              <img
                className="block h-auto w-full"
                alt="Visual design overview"
                src="/figmaAssets/image-16.png"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-6 px-6 py-4 sm:px-10 sm:py-3">
                {infoItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-6 rounded-[24px]"
                  >
                    <img
                      className="h-auto w-auto flex-none"
                      alt={item.title}
                      src={item.iconSrc}
                    />
                    <div className="flex flex-col items-start gap-2">
                      <h3 className="mt-[-1.00px] w-fit whitespace-nowrap font-heading-semibold-m text-[length:var(--heading-semibold-m-font-size)] font-[number:var(--heading-semibold-m-font-weight)] leading-[var(--heading-semibold-m-line-height)] tracking-[var(--heading-semibold-m-letter-spacing)] text-adaptivemedium [font-style:var(--heading-semibold-m-font-style)]">
                        {item.title}
                      </h3>
                      <p className="self-stretch font-heading-regular-s text-[length:var(--heading-regular-s-font-size)] font-[number:var(--heading-regular-s-font-weight)] leading-[var(--heading-regular-s-line-height)] tracking-[var(--heading-regular-s-letter-spacing)] text-[#ffffff99] [font-style:var(--heading-regular-s-font-style)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </CardContent>
        </Card>
        <Card
          className={`${glassCardClassName} relative z-10 -mt-24 ml-auto w-full max-w-[369px]`}
        >
          <CardContent className="p-0">
            <div className="overflow-hidden rounded-[32px]">
              <img
                className="block h-auto w-full object-cover"
                alt="Visual design mobile preview"
                src="/figmaAssets/image-17.png"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
