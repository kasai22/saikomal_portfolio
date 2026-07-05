import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { SkipToContentLink } from "@/components/layout/skip-to-content-link";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://saikomal.dev";
const SITE_DESCRIPTION =
  "Sai Komal is a Product Designer and Frontend Developer specializing in SaaS, logistics systems, enterprise workflows, and AI-assisted experiences.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sai Komal — Product Designer & Frontend Developer",
    template: "%s — Sai Komal",
  },
  description: SITE_DESCRIPTION,
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Sai Komal — Product Designer & Frontend Developer",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Sai Komal Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Komal — Product Designer & Frontend Developer",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="bg-black font-body text-white">
        <SkipToContentLink />
        <Navbar />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
