import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="font-display text-sm font-semibold uppercase tracking-widest text-brand">
        404 Error
      </span>
      <h1 className="font-display text-4xl font-bold sm:text-5xl">
        This page doesn&apos;t <span className="text-brand">exist</span>
      </h1>
      <p className="max-w-md text-white/60">
        The page you&apos;re looking for may have been moved or removed. Let&apos;s get you back
        on track.
      </p>
      <Link
        href="/"
        className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-dark"
      >
        Back to Home
      </Link>
    </div>
  );
}
