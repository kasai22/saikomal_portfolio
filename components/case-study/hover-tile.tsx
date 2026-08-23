interface HoverTileProps {
  icon: string;
  title: string;
  description: string;
}

/**
 * Used for Information Architecture modules and Future Scope items. The
 * original mutated `e.currentTarget.style` on mouseenter/mouseleave to swap
 * border/background color - same visual result here via a static Tailwind
 * hover state driven by the --accent-border/--accent-subtle CSS variables.
 */
export function HoverTile({ icon, title, description }: HoverTileProps) {
  return (
    <div className="cursor-default rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-200 hover:border-[color:var(--accent-border,rgba(0,128,128,0.25))] hover:bg-[color:var(--accent-subtle,rgba(0,128,128,0.12))]">
      <div className="mb-3 text-lg" aria-hidden="true">
        {icon}
      </div>
      <h3 className="t-h4 mb-2 text-white">{title}</h3>
      <p className="text-[11px] leading-relaxed text-white/50">{description}</p>
    </div>
  );
}
