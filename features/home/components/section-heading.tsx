import { RevealItem } from "@/components/ui/reveal-item";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  /** One line at most. If it needs two, it belongs in a case study. */
  intro?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * The one section header used by every home section — eyebrow, h2, and at
 * most a single line of intro. Sections previously each picked their own
 * heading sizes (text-2xl/text-3xl/text-xl); routing them all through here
 * is what keeps the page on one type scale.
 */
export function SectionHeading({ eyebrow, title, intro, align = "left", className }: SectionHeadingProps) {
  return (
    <RevealItem className={cn("mb-8", align === "center" && "text-center", className)}>
      <span className="t-eyebrow text-brand">{eyebrow}</span>
      <h2 className="t-h2 mt-2 text-white">{title}</h2>
      {intro && (
        <p className={cn("t-meta mt-2 max-w-md text-white/45", align === "center" && "mx-auto")}>{intro}</p>
      )}
    </RevealItem>
  );
}
