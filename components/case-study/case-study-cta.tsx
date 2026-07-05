import Link from "next/link";

interface CaseStudyCtaProps {
  tagline: string;
}

export function CaseStudyCta({ tagline }: CaseStudyCtaProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-[color:var(--accent-border,rgba(0,128,128,0.25))] bg-[color:var(--accent-subtle,rgba(0,128,128,0.12))] p-8 sm:flex-row md:p-12">
      <div>
        <h3 className="mb-2 text-2xl font-bold text-white">Want to work together?</h3>
        <p className="text-white/55">{tagline}</p>
      </div>
      <div className="flex shrink-0 gap-4">
        <Link
          href="/"
          className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40"
        >
          Back to Portfolio
        </Link>
        <a
          href="/#contact"
          className="rounded-full bg-[color:var(--accent,#008080)] px-6 py-3 text-sm font-semibold text-white transition-[filter] duration-200 hover:brightness-90"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}
