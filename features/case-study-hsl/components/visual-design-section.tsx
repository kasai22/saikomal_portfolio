import Image from "next/image";
import { PillHeading } from "@/components/case-study/pill-heading";
import { GlassPanel } from "@/components/case-study/glass-panel";

export function VisualDesignSection() {
  return (
    <section className="flex w-full flex-col items-center gap-10 px-4">
      <PillHeading
        pillWidth={380}
        fontSize={45}
        accentColor="#ff66c4"
        segments={[
          { text: "Visual", accent: false },
          { text: " Design", accent: true },
        ]}
      />

      <div className="relative flex w-full max-w-[1182px] flex-col items-center">
        <GlassPanel className="w-full">
          <div className="relative overflow-hidden rounded-[32px]">
            <Image
              src="/figmaAssets/image-16.png"
              alt="Visual design overview of the redesigned HSL homepage"
              width={1424}
              height={711}
              className="block h-auto w-full"
            />
          </div>
        </GlassPanel>

        <GlassPanel className="relative z-10 -mt-24 ml-auto w-full max-w-[369px]">
          <div className="overflow-hidden rounded-[32px]">
            <Image
              src="/figmaAssets/image-17.png"
              alt="Mobile-responsive preview of the redesigned HSL website"
              width={278}
              height={4096}
              className="block h-auto w-full object-cover"
            />
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
