import { BRAND_NAME } from "@/constants/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/12 px-6 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-body text-[11px] text-ink/60 sm:flex-row">
        <span>
          © {year} {BRAND_NAME}
        </span>
        <span>
          Designed &amp; built by <span className="text-brand-ink">{BRAND_NAME}</span>
        </span>
      </div>
    </footer>
  );
}
