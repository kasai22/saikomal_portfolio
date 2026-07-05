export interface HeadingSegment {
  text: string;
  /** Highlighted (bold + accent-colored) segment vs. plain white segment */
  accent?: boolean;
}

interface PillHeadingProps {
  segments: HeadingSegment[];
  /** Width of the decorative pill behind the text, in pixels */
  pillWidth: number;
  /** Heading font size in pixels (Figma source used 41px or 45px) */
  fontSize?: number;
  /** Accent color for highlighted segments - defaults to brand teal */
  accentColor?: string;
  /** Horizontal alignment of the heading within its container */
  align?: "center" | "start";
  className?: string;
}

/**
 * The "pill behind two-tone text" heading that recurs across nearly every
 * case study section (e.g. "Possible **Solution**", "**Visual** Design").
 * Centralizing it removes ~10 near-identical copies of this markup.
 */
export function PillHeading({
  segments,
  pillWidth,
  fontSize = 41,
  accentColor = "#008080",
  align = "center",
  className,
}: PillHeadingProps) {
  return (
    <header
      className={`flex w-full ${align === "center" ? "justify-center" : "justify-start"} ${className ?? ""}`}
    >
      <div className="relative inline-flex items-center justify-center px-6 py-3">
        <div
          className="absolute left-1/2 top-1/2 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#212121]"
          style={{ width: pillWidth }}
          aria-hidden="true"
        />
        <h2
          className="relative text-center font-normal leading-none tracking-normal"
          style={{ fontFamily: "'Poppins', Helvetica", fontSize }}
        >
          {segments.map((segment, i) => (
            <span
              key={i}
              className={segment.accent ? "font-bold" : "font-medium text-white"}
              style={segment.accent ? { color: accentColor } : undefined}
            >
              {segment.text}
            </span>
          ))}
        </h2>
      </div>
    </header>
  );
}
