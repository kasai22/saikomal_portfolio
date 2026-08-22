import Image from "next/image";
import { SectionHeading } from "@/components/case-study/section-heading";

export function VisualDesignSection() {
  return (
    <section>
      <SectionHeading
        label="Design Phase"
        title="Visual"
        accent="Design"
        sub="A current, credible look for a shipyard whose platform had stopped reflecting its actual capability — carried across desktop and mobile from the same component set."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl">
          <Image
            src="/figmaAssets/image-16.png"
            alt="Visual design overview of the redesigned HSL homepage"
            width={1424}
            height={711}
            className="block h-auto w-full"
          />
          <figcaption className="px-5 py-4 text-xs text-white/40">
            Redesigned homepage — capability, tenders, and careers surfaced on the landing view
            instead of buried in navigation.
          </figcaption>
        </figure>

        <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl">
          <div className="max-h-[520px] overflow-hidden">
            <Image
              src="/figmaAssets/image-17.png"
              alt="Mobile-responsive preview of the redesigned HSL website"
              width={278}
              height={4096}
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="px-5 py-4 text-xs text-white/40">
            Mobile responsive — a baseline requirement, given how many applicants and vendors reach
            the site from a phone.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
