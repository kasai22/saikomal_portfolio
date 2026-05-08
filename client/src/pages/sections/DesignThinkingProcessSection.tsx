import { Card, CardContent } from "@/components/ui/card";

const sectionContent = {
  titleStart: "High-Fidelity ",
  titleEnd: "Designs",
  imageSrc: "/figmaAssets/mask-group.png",
  imageAlt: "High-fidelity mobile design screens collage",
};

export const DesignThinkingProcessSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      <div className="mx-auto flex w-full max-w-[1202px] flex-col items-center">
        <header className="flex w-full flex-col items-center">
          <div className="h-8 w-full max-w-[525px] rounded-[94px] bg-[#212121]" />
          <h2 className="-mt-8 text-center [font-family:'Poppins',Helvetica] text-[45px] font-normal leading-[normal] tracking-[0] text-transparent">
            <span className="font-bold text-[#008080]">
              {sectionContent.titleStart}
            </span>
            <span className="font-medium text-white">
              {sectionContent.titleEnd}
            </span>
          </h2>
        </header>
        <Card className="mt-[110px] w-full border-0 bg-transparent shadow-none">
          <CardContent className="p-0">
            <img
              className="block h-auto w-full"
              alt={sectionContent.imageAlt}
              src={sectionContent.imageSrc}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
