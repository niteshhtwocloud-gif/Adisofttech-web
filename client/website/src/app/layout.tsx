import type { Metadata, Viewport } from "next";
import "./globals.css";

// ==================== GLOBAL METADATA CONFIGURATION ====================

const SITE_URL = process.env.SITE_URL || "https://www.adisofttech.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b57d0",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AST | Web, Mobile & Business Software for Growing Businesses",
    template: "%s | AST",
  },
  description:
    "AST provides modern web applications, mobile apps, custom business software, Tally customization, and Business OS solutions for growing enterprises.",
  keywords: [
    "AST",
    "web development",
    "mobile app development",
    "custom business software",
    "Tally customization",
    "ERP customization",
    "cloud solutions",
    "business automation",
    "Business OS",
  ],
  authors: [{ name: "AST" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "AST",
    title: "AST | Web, Mobile & Business Software for Growing Businesses",
    description:
      "AST provides modern web applications, mobile apps, custom business software, Tally customization, and Business OS solutions for growing enterprises.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AST | Web, Mobile & Business Software for Growing Businesses",
    description:
      "AST provides modern web applications, mobile apps, custom business software, Tally customization, and Business OS solutions for growing enterprises.",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
};

import PublicShell from "@/components/PublicShell";

// Root HTML layout providing typography fonts, metadata, and shared site shell.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#0f172a]">
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
