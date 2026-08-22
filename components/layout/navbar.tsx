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
import { GlassButton } from "@/components/ui/glass-button";
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
        "fixed left-0 right-0 top-0 z-50 px-4 pt-4 transition-all duration-300 sm:px-6",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full px-6 py-3 backdrop-blur-md transition-all duration-300",
          scrolled
            ? "border border-[color:var(--glass-2-border)] bg-[var(--glass-2-bg)] shadow-lg shadow-black/20"
            : "border border-[color:var(--glass-1-border)] bg-[var(--glass-1-bg)]",
        )}
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
            className="flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors duration-200 hover:text-brand-light"
          >
            Resume
            <DownloadIcon className="h-3.5 w-3.5" />
          </a>
          <GlassButton as="a" href="/#contact" variant="solid" className="px-5 py-2 text-xs">
            Let&apos;s Talk
          </GlassButton>
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
        className="mx-auto mt-2 max-w-7xl rounded-3xl border border-[color:var(--glass-4-border)] bg-[var(--glass-4-bg)] px-6 py-6 backdrop-blur-xl md:hidden"
      >
        <ul className="flex flex-col gap-4">
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
          <li>
            <a
              href="/SaiKomal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="SaiKomal_Resume.pdf"
              className="flex items-center gap-1.5 text-base font-medium text-white/70"
            >
              Resume
              <DownloadIcon className="h-4 w-4" />
            </a>
          </li>
          <li>
            <GlassButton as="a" href="/#contact" variant="solid" className="w-full justify-center">
              Let&apos;s Talk
            </GlassButton>
          </li>
        </ul>
      </div>
    </header>
  );
}
