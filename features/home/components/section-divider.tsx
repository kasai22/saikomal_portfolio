interface SectionDividerProps {
  number: string;
  title: string;
  subtitle: string;
}

export function SectionDivider({ number, title, subtitle }: SectionDividerProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-brand/40 bg-brand/10 text-[10px] font-bold text-brand"
        aria-hidden="true"
      >
        {number}
      </div>
      <div className="flex flex-wrap items-baseline gap-x-2.5">
        <h3 className="t-h4 text-white">{title}</h3>
        <p className="t-meta text-white/35">{subtitle}</p>
      </div>
      <div className="ml-3 h-px flex-1 bg-white/[0.08]" />
    </div>
  );
}
