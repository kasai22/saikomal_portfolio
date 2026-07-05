import Link from "next/link";

export function BackToPortfolioLink() {
  return (
    <Link
      href="/"
      className="group mb-8 mt-4 inline-flex items-center gap-2 font-body text-sm font-medium text-[color:var(--accent,#008080)] transition-colors hover:text-white"
    >
      <svg
        className="h-4 w-4 transition-transform group-hover:-translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Back to Portfolio
    </Link>
  );
}
