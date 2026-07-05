interface SectionDividerProps {
  number: string;
  title: string;
  subtitle: string;
}

export function SectionDivider({ number, title, subtitle }: SectionDividerProps) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand/40 bg-brand/10 text-sm font-bold text-brand"
        aria-hidden="true"
      >
        {number}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-white/40">{subtitle}</p>
      </div>
      <div className="ml-4 h-px flex-1 bg-white/[0.08]" />
    </div>
  );
}
