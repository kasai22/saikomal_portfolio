import { SectionLabel } from "@/components/case-study/section-label";

interface SectionHeadingProps {
  label: string;
  title: string;
  accent: string;
  /** Optional supporting paragraph shown under the title */
  sub?: string;
  className?: string;
}

export function SectionHeading({ label, title, accent, sub, className }: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${className ?? ""}`}>
      <SectionLabel text={label} />
      <h2 className="t-h2 mt-2 text-white">
        {title} <span className="text-[color:var(--accent,#008080)]">{accent}</span>
      </h2>
      {sub && <p className="t-body mt-2 max-w-xl text-white/50">{sub}</p>}
    </div>
  );
}
