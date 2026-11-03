import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { SkipToContentLink } from "@/components/layout/skip-to-content-link";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { Cursor } from "@/components/animations/Cursor";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { PersonJsonLd } from "@/components/seo/person-json-ld";
import { Footer } from "@/components/layout/footer";
import { SITE_URL } from "@/constants/site";
import { PROFILE } from "@/constants/profile";
import "./globals.css";

// Geometric grotesque for everything readable; a mono for the technical
// annotation layer (FIG. markers, indices, micro-labels).
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_TITLE = `${PROFILE.name} — ${PROFILE.title}`;

// One sentence for search results and link previews. The keywords a hiring
// search uses are in it because they are true, not as a list.
const SITE_DESCRIPTION =
  "Product Designer and hands-on UX Engineer: enterprise UX, AI product design and data-heavy interfaces — and the React, Next.js and TypeScript front ends that ship them. 5 years across software, data and product design, 4+ in UX.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Sai Komal",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Sai Komal",
    "Product Designer",
    "UX Engineer",
    "Senior UI/UX Engineer",
    "Front-end development",
    "React developer",
    "Next.js",
    "TypeScript",
    "Enterprise UX",
    "AI product design",
    "Design systems",
    "Data-heavy interfaces",
  ],
  authors: [{ name: "Sai Komal", url: SITE_URL }],
  creator: "Sai Komal",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.png" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Sai Komal Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@SaiKomal4",
    creator: "@SaiKomal4",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="bg-paper font-body text-ink antialiased">
        <PersonJsonLd />
        <SkipToContentLink />
        {/* MotionProvider sets `reducedMotion="user"` for the whole tree, so
            Motion itself honours the OS setting rather than each component
            branching on a preference flag. */}
        <MotionProvider>
          <SmoothScroll />
          <ScrollProgress />
          <Cursor />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
