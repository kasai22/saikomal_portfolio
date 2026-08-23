export function SkipToContentLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
    >
      Skip to main content
    </a>
  );
}
