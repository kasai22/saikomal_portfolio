import { SectionParallaxBg } from "@/components/ui/section-parallax-bg";
import { cn } from "@/lib/utils";

interface HomeSectionProps {
  id?: string;
  children: React.ReactNode;
  /** Alternating surface, used to separate consecutive slides. */
  tone?: "base" | "raised";
  /** Positioning classes for the decorative parallax glow, if this slide has one. */
  glowClassName?: string;
  className?: string;
}

/**
 * The single wrapper every home slide uses. Section padding and the content
 * container live here and nowhere else — sections previously each declared
 * their own (`max-w-7xl`, `max-w-4xl`, `max-w-3xl`, `max-w-6xl`), so the left
 * content edge moved by up to 256px as you scrolled. One container means one
 * edge down the whole page.
 *
 * This is now a **server component**. It used to render a `RevealSection`,
 * a client wrapper that ran an IntersectionObserver over `[data-animate]`
 * descendants and swapped their classes. Reveals are declared by the elements
 * themselves now, so the section itself needs no client boundary at all.
 */
export function HomeSection({ id, children, tone = "base", glowClassName, className }: HomeSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative px-6 py-16 sm:py-20",
        tone === "raised" && "bg-ink/[0.022]",
        className,
      )}
    >
      {glowClassName && <SectionParallaxBg className={glowClassName} />}
      <div className="relative mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
