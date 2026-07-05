import Image from "next/image";
import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import { VISUAL_DECISIONS } from "@/features/case-study-clappit/constants/data";

export function VisualDesignSection() {
  return (
    <section>
      <SectionHeading
        label="Visual Design"
        title="The Final"
        accent="Visual Direction"
        sub="Enterprise SaaS aesthetic built for clarity-first operation — every visual decision earned its place."
      />
      <div className="mb-4 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
        <Image
          src="/figmaAssets/clappit-dashboard.png"
          alt="ClappIt — Application Performance Dashboard"
          width={1920}
          height={1580}
          className="block h-auto w-full"
        />
      </div>
      <p className="mb-10 text-center text-xs text-white/35">
        ClappIt — Application Performance Dashboard. Pods health · Alert management · Network
        traffic · Service performance.
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {VISUAL_DECISIONS.map((u) => (
          <SurfaceCard key={u.title}>
            <div className="mb-4 h-0.5 w-8 rounded-full bg-[color:var(--accent)]" />
            <h4 className="mb-3 text-sm font-bold text-white">{u.title}</h4>
            <p className="text-sm leading-relaxed text-white/60">{u.desc}</p>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}
