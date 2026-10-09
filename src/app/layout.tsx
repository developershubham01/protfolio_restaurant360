import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Restaurant360 — Hybrid Offline & Online Restaurant ERP Platform",
  description:
    "Hybrid Offline & Online Restaurant ERP built for restaurant chains, cafés, food courts, cloud kitchens, and franchises. 100% offline-ready with seamless online auto-sync. POS billing, kitchen display, inventory, CRM, analytics, AI insights and more.",
  keywords: [
    "Restaurant ERP",
    "Offline POS",
    "Hybrid Restaurant ERP",
    "Offline Restaurant Software",
    "Restaurant POS",
    "Cloud Kitchen Software",
    "Restaurant Management",
    "Restaurant360",
    "Resto360",
    "Kitchen Display System",
    "Restaurant CRM",
    "Franchise Management",
  ],
  authors: [{ name: "Restaurant360" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Restaurant360 — Hybrid Offline & Online Restaurant ERP Platform",
    description:
      "Hybrid Offline & Online Restaurant ERP for chains, cafés, food courts, cloud kitchens & franchises. Works 100% offline with real-time sync.",
    siteName: "Restaurant360",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurant360 — Hybrid Offline & Online Restaurant ERP Platform",
    description:
      "Hybrid Offline & Online Restaurant ERP for chains, cafés, food courts, cloud kitchens & franchises. Works 100% offline with real-time sync.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
