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
      <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl">
        {title} <span className="text-[color:var(--accent,#008080)]">{accent}</span>
      </h2>
      {sub && <p className="mt-4 max-w-2xl leading-relaxed text-white/55">{sub}</p>}
    </div>
  );
}
