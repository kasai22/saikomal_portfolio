interface SectionDividerProps {
  number: string;
  title: string;
  subtitle: string;
}

export function SectionDivider({ number, title, subtitle }: SectionDividerProps) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-brand/40 bg-brand/10 text-xs font-bold text-brand"
        aria-hidden="true"
      >
        {number}
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-xs text-white/40">{subtitle}</p>
      </div>
      <div className="ml-4 h-px flex-1 bg-white/[0.08]" />
    </div>
  );
}
