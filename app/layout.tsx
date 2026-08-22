import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { SkipToContentLink } from "@/components/layout/skip-to-content-link";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CustomCursor } from "@/components/ui/custom-cursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://saikomal.dev";
const SITE_DESCRIPTION =
  "Sai Komal is a User Experience Engineer and Product Designer who translates design concepts into functional prototypes — spanning user research, usability testing, wireframing, and front-end implementation across SaaS, logistics, and AI-assisted products.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sai Komal — User Experience Engineer",
    template: "%s — Sai Komal",
  },
  description: SITE_DESCRIPTION,
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Sai Komal — User Experience Engineer",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Sai Komal Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Komal — User Experience Engineer",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-body antialiased">
        <SkipToContentLink />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
