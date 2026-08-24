import { FadeIn } from "@/components/animations/FadeIn";
import { Reveal } from "@/components/animations/Reveal";
import { DELAY } from "@/lib/animations/constants";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Two-digit slide number — the running order of the pitch. */
  chapter: string;
  /** What this slide is, in one or two words. */
  eyebrow: string;
  /** The claim the slide makes. Written as a sentence, not a label. */
  title: React.ReactNode;
  /** One line of support underneath. Anything longer belongs in a case study. */
  intro?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * One slide header, used by every home section. The chapter number and rule
 * are what make the page read as a running deck rather than a stack of
 * unrelated sections — and routing all of them through here is what keeps the
 * type scale and the heading-to-content gap identical everywhere.
 *
 * The chapter mark and the title wipe in from the left on a short offset; the
 * supporting line fades in behind them. Three staged elements is the ceiling
 * for a heading — more and the reader waits for the section to assemble
 * itself before they can start reading it.
 */
export function SectionHeading({
  chapter,
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10", className)}>
      <Reveal from="left">
        <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
          <span className="t-eyebrow tabular-nums text-brand-ink">{chapter}</span>
          <span className="h-px w-6 bg-brand/60" aria-hidden="true" />
          <span className="t-eyebrow text-ink/60">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal from="left" delay={DELAY.short}>
        <h2 className={cn("t-h2 mt-3 max-w-2xl text-ink", align === "center" && "mx-auto text-center")}>
          {title}
        </h2>
      </Reveal>
      {intro && (
        <FadeIn direction="up" distance="nudge" delay={DELAY.base}>
          <p
            className={cn(
              "t-body mt-2.5 max-w-lg text-ink/60",
              align === "center" && "mx-auto text-center",
            )}
          >
            {intro}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
