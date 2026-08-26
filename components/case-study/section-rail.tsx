"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useMotionTier } from "@/hooks/use-motion-tier";

/**
 * A contents rail for the long case studies.
 *
 * Kudra runs to twenty-two sections, Hindustan Shipyard to seventeen. Both
 * were, until this existed, a single uninterrupted scroll with no way to see
 * how much was left or to jump to the part a reader actually came for — which
 * for a recruiter is almost always the outcomes, and which sat nineteen
 * sections down.
 *
 * ── Why it reads the page instead of being told about it ────────────────
 * Every case-study section already renders the shared `SectionHeading`, so
 * every one of them is a `<section>` containing an `<h2>`. That is enough to
 * build the whole index from: on mount this walks the document, gives each
 * section a slug id derived from its own heading if it has not got one, and
 * lists them.
 *
 * The alternative was threading an id and a label through forty-nine section
 * components across three case studies and keeping the list in sync by hand
 * forever after. Deriving it means a section added tomorrow appears in the
 * rail without anybody remembering to register it, and a heading reworded
 * tomorrow re-labels itself.
 *
 * ── Why the ticks are ticks ─────────────────────────────────────────────
 * Twenty-two words down the right-hand edge is a second column of type
 * competing with the case study. Twenty-two hairlines is a scale — it shows
 * position and extent at a glance, the way a scrollbar does, and gives up its
 * words only when a reader asks for them by pointing at one. The labels are
 * still in the DOM at all times, so a screen reader gets the full index
 * regardless.
 *
 * Desktop only. Below `lg` there is no margin to put it in, and a phone has
 * its own scrollbar for the same job.
 */

interface Entry {
  id: string;
  label: string;
}

function slug(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 48) || "section"
  );
}

export function SectionRail() {
  const { reduced } = useMotionTier();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [active, setActive] = useState<string | null>(null);

  // Build the index from what is actually on the page, and give every section
  // an id to be linked to. Runs once, after paint, so nothing here can differ
  // between the server render and the first client one.
  useEffect(() => {
    const found: Entry[] = [];
    const seen = new Set<string>();

    for (const heading of document.querySelectorAll("h2")) {
      const section = heading.closest("section");
      const label = heading.textContent?.trim();
      if (!section || !label) continue;

      let id = section.id;
      if (!id) {
        id = slug(label);
        // Two sections could reasonably share a heading; ids may not.
        let n = 2;
        while (seen.has(id)) id = `${slug(label)}-${n++}`;
        section.id = id;
      }
      if (seen.has(id)) continue;
      seen.add(id);
      found.push({ id, label });
    }

    setEntries(found);
  }, []);

  // Which section owns the top of the viewport. A band across the upper third
  // rather than a single line, so the active tick changes once per section
  // instead of flickering while a heading straddles a boundary.
  useEffect(() => {
    if (entries.length === 0) return;

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((record) => record.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-12% 0px -72% 0px", threshold: 0 },
    );

    for (const entry of entries) {
      const element = document.getElementById(entry.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 5) return null;

  return (
    <nav
      aria-label="Case study contents"
      className="fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-2">
        {entries.map((entry) => {
          const current = entry.id === active;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                aria-current={current ? "true" : undefined}
                className="group relative flex items-center justify-end py-0.5 pl-2 focus-visible:outline-none"
              >
                {/* Always in the accessible tree; revealed on pointer or
                    keyboard. `bg-paper` so it stays legible over whatever the
                    section behind it happens to be.

                    Positioned out of flow, and that is not cosmetic. In flow,
                    the label's box counted toward the link's width even while
                    invisible — which put a 240px-wide transparent click strip
                    down the right-hand edge of every case study, swallowing
                    clicks meant for the content underneath it. Out of flow the
                    link is only as wide as its tick. */}
                <span
                  className={cn(
                    "pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-sm bg-paper/95 px-2 py-1 text-[10px] leading-none text-ink/70 opacity-0 shadow-[0_0_0_1px_rgba(20,20,15,0.08)]",
                    "group-hover:opacity-100 group-focus-visible:opacity-100",
                    !reduced && "transition-opacity duration-fast",
                  )}
                >
                  {entry.label}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-px shrink-0",
                    !reduced && "transition-all duration-fast",
                    current
                      ? "w-6 bg-[color:var(--accent,#008080)]"
                      : "w-3 bg-ink/25 group-hover:w-5 group-hover:bg-ink/50",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
