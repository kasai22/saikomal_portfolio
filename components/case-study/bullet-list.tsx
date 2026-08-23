export function BulletDot() {
  return (
    <span
      className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent,#008080)]"
      aria-hidden="true"
    />
  );
}

interface BulletListProps {
  items: string[];
}

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[13px] leading-relaxed text-white/65">
          <BulletDot /> {item}
        </li>
      ))}
    </ul>
  );
}
