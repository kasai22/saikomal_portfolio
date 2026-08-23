import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { SkipToContentLink } from "@/components/layout/skip-to-content-link";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { PersonJsonLd } from "@/components/seo/person-json-ld";
import { SITE_URL } from "@/constants/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_DESCRIPTION =
  "Product Designer and UX Engineer. I design enterprise dashboards and operational workflows — and ship the React/Next.js front end that makes them real.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sai Komal — Product Designer & UX Engineer",
    template: "%s — Sai Komal",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Sai Komal",
    "Product Designer",
    "UX Engineer",
    "Design Engineer",
    "Enterprise SaaS design",
    "Design systems",
    "Next.js",
    "React",
    "Figma",
    "UX portfolio",
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
    title: "Sai Komal — Product Designer & UX Engineer",
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
    title: "Sai Komal — Product Designer & UX Engineer",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-body antialiased">
        <PersonJsonLd />
        <SkipToContentLink />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
