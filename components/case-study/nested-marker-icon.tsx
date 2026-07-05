interface NestedMarkerIconProps {
  /** Sizing + corner-radius classes for the outer layer (includes position: relative) */
  outerClassName: string;
  /** Sizing + corner-radius + position classes for the middle layer */
  middleClassName: string;
  /** Sizing + corner-radius + position classes for the teal inner layer */
  innerClassName: string;
}

/**
 * The small "nested rounded shape with a teal center" marker that Figma
 * exported as bare decorative `<div>`s next to several section titles.
 * One shared component instead of ~4 near-identical inline copies.
 */
export function NestedMarkerIcon({
  outerClassName,
  middleClassName,
  innerClassName,
}: NestedMarkerIconProps) {
  return (
    <span className={`relative shrink-0 bg-[#212121] ${outerClassName}`} aria-hidden="true">
      <span className={`absolute bg-[#212121] ${middleClassName}`} />
      <span className={`absolute bg-brand ${innerClassName}`} />
    </span>
  );
}
