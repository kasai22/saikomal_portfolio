"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/use-scrolled";
import { useActiveSection } from "@/hooks/use-active-section";
import { NAV_LINKS, BRAND_NAME } from "@/constants/navigation";
import type { NavLink as NavLinkType } from "@/types/navigation";
import { NavLink } from "@/components/layout/nav-link";
import { MenuToggleButton } from "@/components/layout/menu-toggle-button";
import { ActionButton } from "@/components/ui/action-button";
import { DownloadIcon } from "@/components/icons";

const SECTION_IDS = NAV_LINKS.map((link) => link.sectionId).filter(
  (id): id is string => Boolean(id),
);

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(20);
  const activeSection = useActiveSection(SECTION_IDS);
  const pathname = usePathname();
  const router = useRouter();
  const menuId = useId();

  // Close the mobile menu on Escape, or if the viewport is resized to desktop.
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
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "border-[color:var(--rule)] bg-paper/90 backdrop-blur-sm" : "border-transparent",
      )}
    >
      <div
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5"
      >
        <Link
          href="/"
          className="select-none font-display text-[15px] font-semibold tracking-[-0.02em] text-ink"
          onClick={() => setMenuOpen(false)}
        >
          &lt; <span className="text-brand-ink">{BRAND_NAME}</span> /&gt;
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink link={link} isActive={isLinkActive(link)} onNavigate={handleNavigate} showActiveIndicator />
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href="/SaiKomal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="SaiKomal_Resume.pdf"
            data-cursor="open"
            className="flex items-center gap-1.5 text-xs font-medium text-ink/72 transition-colors duration-200 hover:text-brand-ink"
          >
            Resume
            <DownloadIcon className="h-3.5 w-3.5" />
          </a>
          <ActionButton as="a" href="/#contact" variant="solid" className="px-4 py-2">
            Let&apos;s talk
          </ActionButton>
        </div>

        <MenuToggleButton
          isOpen={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          controlsId={menuId}
        />
      </div>

      <div
        id={menuId}
        hidden={!menuOpen}
        className="border-b border-[color:var(--rule)] bg-paper px-6 py-6 md:hidden"
      >
        <ul className="flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink
                link={link}
                isActive={isLinkActive(link)}
                onNavigate={handleNavigate}
                className="block text-sm"
              />
            </li>
          ))}
          <li>
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
          </li>
          <li>
            <ActionButton as="a" href="/#contact" variant="solid" className="w-full justify-center">
              Let&apos;s talk
            </ActionButton>
          </li>
        </ul>
      </div>
    </header>
  );
}
