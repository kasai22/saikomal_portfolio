import Image from "next/image";
import { SectionHeading } from "@/components/case-study/section-heading";

export function InformationArchitectureSection() {
  return (
    <section>
      <SectionHeading
        label="Ideate Phase"
        title="Information"
        accent="Architecture"
        sub="One structure spanning all five modules, so a user crossing from tenders into recruitment doesn't have to relearn the site."
      />
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
        <Image
          src="/figmaAssets/image-15.png"
          alt="Information architecture diagram showing the redesigned HSL site map"
          width={1972}
          height={4096}
          className="block h-auto w-full"
        />
      </div>
    </section>
  );
}
