interface SectionLabelProps {
  text: string;
}

export function SectionLabel({ text }: SectionLabelProps) {
  return (
    <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--accent,#008080)]">
      {text}
    </span>
  );
}
