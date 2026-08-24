"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useTransition, type MouseEvent, type ReactNode } from "react";
import {
  isViewTransitionSupported,
  releaseSharedElements,
  tagSharedElements,
} from "@/lib/view-transition";
import { useMotionPreference } from "@/hooks/use-motion-preference";

interface SharedProjectLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  "data-cursor"?: string;
}

/**
 * A project link that expands into its case study instead of cutting to it.
 *
 * On click it names this card's image and title, then runs the navigation
 * inside `document.startViewTransition`. The browser pairs those names with
 * the case-study hero's image and title and morphs one into the other, so
 * the card appears to grow into the page rather than being replaced by it.
 *
 * ── Waiting for the new page ────────────────────────────────────────────
 * `startViewTransition` captures the "after" state when the callback's
 * promise resolves, but `router.push` returns before the new route has
 * rendered. So the push runs inside a React transition and the promise is
 * held open until `isPending` clears — at which point the new page is
 * committed and safe to snapshot. Without that wait the browser captures
 * the old page twice and nothing appears to happen.
 *
 * ── Falling back ────────────────────────────────────────────────────────
 * If the API is missing (Firefox, older Safari) or the user has asked for
 * reduced motion, the click is left alone entirely and `<Link>` navigates
 * normally. There is no artificial loading state in either path — the
 * transition is the navigation, not a screen in front of it.
 */
export function SharedProjectLink({ href, children, ...rest }: SharedProjectLinkProps) {
  const router = useRouter();
  const reduced = useMotionPreference();
  const ref = useRef<HTMLAnchorElement>(null);
  const [isPending, startTransition] = useTransition();
  const resolveRef = useRef<(() => void) | null>(null);

  // Release the transition's promise once the new route has committed.
  useEffect(() => {
    if (!isPending && resolveRef.current) {
      resolveRef.current();
      resolveRef.current = null;
    }
  }, [isPending]);

  // Names must never outlive the transition, or the next card to be clicked
  // collides with this one and its transition is abandoned.
  useEffect(() => releaseSharedElements, []);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Let the browser handle modified clicks — new tab, new window, download.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    if (reduced || !isViewTransitionSupported()) return;

    event.preventDefault();
    tagSharedElements(ref.current);

    const transition = (
      document as Document & {
        startViewTransition: (cb: () => Promise<void>) => { finished: Promise<void> };
      }
    ).startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          resolveRef.current = resolve;
          startTransition(() => router.push(href));
        }),
    );

    transition.finished.finally(releaseSharedElements);
  };

  return (
    <Link ref={ref} href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
