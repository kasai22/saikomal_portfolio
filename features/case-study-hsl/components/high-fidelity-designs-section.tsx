import Image from "next/image";
import { SectionHeading } from "@/components/case-study/section-heading";

export function HighFidelityDesignsSection() {
  return (
    <section>
      <SectionHeading
        label="High Fidelity Design"
        title="The Final"
        accent="Screens"
        sub="The flows that removed the email round-trip — candidate status, tender listings, and the module surfaces around them."
      />
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-8">
        <Image
          src="/figmaAssets/mask-group.png"
          alt="Collage of high-fidelity mobile design screens for the HSL website"
          width={1200}
          height={1071}
          className="block h-auto w-full"
        />
      </div>
    </section>
  );
}
