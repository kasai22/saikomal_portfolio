"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ENTER, EXIT } from "@/lib/animations/transitions";
import { fadeIn } from "@/lib/animations/variants";

export interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Cross-fades route content on navigation, keyed on the pathname.
 *
 * **Available but deliberately not mounted.** The Phase 0 audit graded page
 * transitions "do not animate", and that assessment stands:
 *
 * - It costs 300–600ms on every navigation to communicate "the page changed",
 *   which the browser already communicates.
 * - `AnimatePresence` has to hold the outgoing tree mounted while it exits,
 *   which delays the incoming page's LCP by the exit duration.
 * - It interacts badly with the App Router's scroll restoration and with the
 *   smooth-scroll loop, which both assume the new page is already in place.
 *
 * It lives here because the architecture asked for it and because a future
 * change of mind shouldn't require rebuilding it. If it is ever wired up, it
 * belongs in `app/layout.tsx` wrapping `{children}`, opacity-only, and the
 * exit duration must stay under `EXIT`'s.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ ...fadeIn.hidden }}
        animate={{ ...fadeIn.visible, transition: ENTER }}
        exit={{ ...fadeIn.hidden, transition: EXIT }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
