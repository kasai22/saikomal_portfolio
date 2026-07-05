export interface NavLink {
  /** Text shown in the nav */
  label: string;
  /** Full href, e.g. "/" or "/#about" */
  href: string;
  /** id of the in-page section this link points to, used for scroll-spy highlighting. Omitted for links that don't target a section (e.g. "Home"). */
  sectionId?: string;
}

export interface SocialLink {
  label: string;
  href: string;
}
