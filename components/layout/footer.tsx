import { BRAND_NAME } from "@/constants/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 font-body text-sm text-white/40 sm:flex-row">
        <span>
          © {year} {BRAND_NAME}. All rights reserved.
        </span>
        <span>
          Designed &amp; Built by <span className="text-brand">{BRAND_NAME}</span>
        </span>
      </div>
    </footer>
  );
}
