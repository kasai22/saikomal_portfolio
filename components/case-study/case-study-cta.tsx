import Link from "next/link";

interface CaseStudyCtaProps {
  tagline: string;
}

export function CaseStudyCta({ tagline }: CaseStudyCtaProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-6 rounded-sm border border-[color:var(--accent-border,rgba(232,163,61,0.35))] bg-[color:var(--accent-subtle,rgba(232,163,61,0.14))] p-8 sm:flex-row md:p-12">
      <div>
        <h3 className="t-h3 mb-2 text-ink">Want to work together?</h3>
        <p className="text-ink/62">{tagline}</p>
      </div>
      <div className="flex shrink-0 gap-4">
        <Link
          href="/"
          className="rounded-full border border-ink/20 bg-ink/[0.035] px-6 py-3 text-[13px] font-semibold text-ink transition-colors hover:border-ink/35"
        >
          Back to Portfolio
        </Link>
        <Link
          href="/#contact"
          className="rounded-full bg-[color:var(--accent,#008080)] px-6 py-3 text-[13px] font-semibold text-ink transition-[filter] duration-instant hover:brightness-90"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
