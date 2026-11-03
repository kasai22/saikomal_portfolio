import { BRAND_NAME } from "@/constants/navigation";
import { CONTACT, PROFILE } from "@/constants/profile";

/**
 * The page's last line: who, how to reach them, and the résumé — the same
 * details as the résumé header, read from `CONTACT`.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { label: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
    { label: CONTACT.linkedinDisplay, href: CONTACT.linkedin, external: true },
    { label: "Résumé (PDF)", href: CONTACT.resume.href, download: CONTACT.resume.fileName },
  ];

  return (
    <footer className="border-t border-ink/12 px-6 py-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 font-body text-[11px] text-ink/60 md:flex-row md:items-center md:justify-between">
        <span>
          © {year} {BRAND_NAME} · {PROFILE.title}
        </span>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(link.download ? { download: link.download } : {})}
                className="transition-colors duration-instant hover:text-brand-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <span>
          Designed &amp; built by <span className="text-brand-ink">{BRAND_NAME}</span>
        </span>
      </div>
    </footer>
  );
}
