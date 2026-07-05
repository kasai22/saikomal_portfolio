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

    if (!link.sectionId) return; // plain route link ("Home") — let the browser/router handle it

    // If we're not on the homepage, let the anchor's default href navigate
    // there (it already includes the #hash) rather than trying to scroll
    // to an element that doesn't exist on this page.
    if (pathname !== "/") return;

    event.preventDefault();
    document.getElementById(link.sectionId)?.scrollIntoView({ behavior: "smooth" });
    router.replace(`/#${link.sectionId}`, { scroll: false });
  };

  const isLinkActive = (link: NavLinkType) => {
    if (link.href === "/") return pathname === "/" && !activeSection;
    return Boolean(link.sectionId) && link.sectionId === activeSection;
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-black/90 shadow-lg backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
      >
        <Link
          href="/"
          className="select-none font-display text-xl font-bold text-white"
          onClick={() => setMenuOpen(false)}
        >
          &lt; <span className="text-brand">{BRAND_NAME}</span> /&gt;
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink link={link} isActive={isLinkActive(link)} onNavigate={handleNavigate} />
            </li>
          ))}
        </ul>

        <MenuToggleButton
          isOpen={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          controlsId={menuId}
        />
      </nav>

      <div
        id={menuId}
        hidden={!menuOpen}
        className="border-t border-white/10 bg-black/95 backdrop-blur-md md:hidden"
      >
        <ul className="flex flex-col gap-4 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink
                link={link}
                isActive={isLinkActive(link)}
                onNavigate={handleNavigate}
                className="block text-base"
              />
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
