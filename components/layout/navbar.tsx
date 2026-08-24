"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { NAV, STAGGER } from "@/lib/animations/constants";
import { SPRING_LAYOUT } from "@/lib/animations/springs";
import { ENTER, EXIT } from "@/lib/animations/transitions";
import { NAV_LINKS, BRAND_NAME } from "@/constants/navigation";
import type { NavLink as NavLinkType } from "@/types/navigation";
import { NavLink } from "@/components/layout/nav-link";
import { MenuToggleButton } from "@/components/layout/menu-toggle-button";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { HoverLink } from "@/components/animations/HoverLink";
import { ActionButton } from "@/components/ui/action-button";
import { DownloadIcon } from "@/components/icons";

const SECTION_IDS = NAV_LINKS.map((link) => link.sectionId).filter(
  (id): id is string => Boolean(id),
);

/**
 * The site header: brand, section links with a sliding active indicator, and
 * the two persistent actions.
 *
 * ── Entrance ────────────────────────────────────────────────────────────
 * The bar itself drops in from just above the viewport while its contents
 * cascade left to right. It runs on mount rather than on scroll, and it is
 * short — the navigation is chrome, and chrome that performs on arrival
 * delays the thing the visitor actually came for.
 *
 * ── Scroll behaviour ────────────────────────────────────────────────────
 * Solid once the page moves; retracts while the reader heads down the page
 * and returns on any upward intent. The anti-jump rules — a movement
 * threshold, a depth floor, and state that only changes on a real decision —
 * live in `useScrollDirection`. Movement is a spring, so a direction change
 * mid-travel is absorbed rather than snapped.
 *
 * ── Mobile menu ─────────────────────────────────────────────────────────
 * `AnimatePresence` with an animated height, so the panel opens and closes
 * instead of appearing. It is unmounted when closed rather than hidden with
 * CSS, which also keeps a second copy of the active indicator out of the
 * tree — two elements sharing one `layoutId` animate against each other.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled, hidden } = useScrollDirection();
  const activeSection = useActiveSection(SECTION_IDS);
  const pathname = usePathname();
  const router = useRouter();
  const menuId = useId();

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const handleNavigate = (link: NavLinkType, event: React.MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);

    if (!link.sectionId) return; // plain route link — let the browser/router handle it

    // If we're not on the homepage, let the anchor's default href navigate
    // there (it already includes the #hash) rather than trying to scroll
    // to an element that doesn't exist on this page.
    if (pathname !== "/") return;

    event.preventDefault();
    document.getElementById(link.sectionId)?.scrollIntoView({ behavior: "smooth" });
    router.replace(`/#${link.sectionId}`, { scroll: false });
  };

  const isLinkActive = (link: NavLinkType) => Boolean(link.sectionId) && link.sectionId === activeSection;

  return (
    <motion.header
      initial={{ y: -NAV.height, opacity: 0 }}
      animate={{
        // An open menu pins the bar in place: retracting the header while its
        // own panel is open would take the menu with it.
        y: hidden && !menuOpen ? -NAV.height : 0,
        opacity: 1,
      }}
      transition={SPRING_LAYOUT}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b transition-colors duration-fast",
        scrolled || menuOpen
          ? "border-[color:var(--rule)] bg-paper/90 backdrop-blur-sm"
          : "border-transparent",
      )}
    >
      <Stagger
        immediate
        step={STAGGER.tight}
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5"
      >
        <StaggerItem distance="nudge">
          <Link
            href="/"
            className="select-none font-display text-[15px] font-semibold tracking-[-0.02em] text-ink"
            onClick={() => setMenuOpen(false)}
          >
            &lt; <span className="text-brand-ink">{BRAND_NAME}</span> /&gt;
          </Link>
        </StaggerItem>

        <StaggerItem as="nav" distance="nudge" aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <NavLink link={link} isActive={isLinkActive(link)} onNavigate={handleNavigate} showActiveIndicator />
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem distance="nudge" className="hidden items-center gap-6 md:flex">
          <HoverLink
            href="/SaiKomal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="SaiKomal_Resume.pdf"
            data-cursor="open"
            className="text-xs font-medium text-ink/72 transition-colors duration-instant hover:text-brand-ink"
          >
            Resume
            <DownloadIcon className="h-3.5 w-3.5" />
          </HoverLink>
          <ActionButton as="a" href="/#contact" variant="solid" className="px-4 py-2">
            Let&apos;s talk
          </ActionButton>
        </StaggerItem>

        <MenuToggleButton
          isOpen={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          controlsId={menuId}
        />
      </Stagger>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id={menuId}
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: ENTER }}
            exit={{ height: 0, opacity: 0, transition: EXIT }}
            className="overflow-hidden border-b border-[color:var(--rule)] bg-paper md:hidden"
          >
            <nav aria-label="Sections" className="px-6 py-6">
              <Stagger immediate step={STAGGER.tight} as="ul" className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <StaggerItem as="li" key={link.label} direction="left" distance="nudge">
                  <NavLink
                    link={link}
                    isActive={isLinkActive(link)}
                    onNavigate={handleNavigate}
                    className="block text-sm"
                  />
                </StaggerItem>
              ))}
              <StaggerItem as="li" direction="left" distance="nudge">
                <a
                  href="/SaiKomal_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="SaiKomal_Resume.pdf"
                  className="flex items-center gap-1.5 text-sm font-medium text-ink/72"
                >
                  Resume
                  <DownloadIcon className="h-4 w-4" />
                </a>
              </StaggerItem>
              <StaggerItem as="li" direction="left" distance="nudge">
                <ActionButton as="a" href="/#contact" variant="solid" className="w-full justify-center">
                  Let&apos;s talk
                </ActionButton>
              </StaggerItem>
              </Stagger>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
