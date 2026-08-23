import { BRAND_NAME } from "@/constants/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 px-6 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 font-body text-[11px] text-white/35 sm:flex-row">
        <span>
          © {year} {BRAND_NAME}
        </span>
        <span>
          Designed &amp; built by <span className="text-brand">{BRAND_NAME}</span>
        </span>
      </div>
    </footer>
  );
}
