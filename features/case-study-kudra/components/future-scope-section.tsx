import { SectionHeading } from "@/components/case-study/section-heading";
import { HoverTile } from "@/components/case-study/hover-tile";
import { FUTURE_SCOPE } from "@/features/case-study-kudra/constants/data";

export function FutureScopeSection() {
  return (
    <section>
      <SectionHeading label="Future Scope" title="What Comes" accent="Next" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FUTURE_SCOPE.map((f) => (
          <HoverTile key={f.title} icon={f.icon} title={f.title} description={f.desc} />
        ))}
      </div>
    </section>
  );
}
