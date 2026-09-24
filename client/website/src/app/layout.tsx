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
  title:
    "ADISOFTTECH | Tally Expert, TDL Expert, Tally Integration & Custom Software",

  description:
    "ADISOFTTECH offers expert TallyPrime customization, TDL development, Tally API integration, custom software, web applications, CRM, ERP and business automation solutions.",

  keywords: [
    // Tally Expert Keywords
    "Tally Expert",
    "TallyPrime Expert",
    "Tally Prime Expert",
    "Tally Developer",
    "TallyPrime Developer",
    "Tally Customization Expert",
    "Tally Customization Services",

    // TDL Keywords
    "TDL Expert",
    "Tally TDL Expert",
    "TDL Developer",
    "Tally TDL Developer",
    "TDL Development Services",
    "Custom TDL Development",
    "TallyPrime TDL Development",

    // Tally Integration
    "Tally Integration Expert",
    "Tally Integration Services",
    "Tally API Integration",
    "TallyPrime API Integration",
    "Tally Integration with Third Party Software",
    "Tally CRM Integration",
    "Tally ERP Integration",
    "Tally Software Integration",
    "Tally Web Integration",
    "Tally Automation",

    // Tally Customization
    "Tally Prime Customization",
    "Tally Invoice Customization",
    "Tally Custom Reports",
    "Tally Report Customization",
    "Tally Voucher Customization",
    "Tally Barcode Integration",

    // Software Development
    "Custom Software Development",
    "Custom Software Development Company",
    "Custom Application Development",
    "Web Application Development",
    "CRM Development",
    "ERP Development",
    "API Integration Services",
    "Business Automation Software",

    "ADISOFTTECH",
  ],

  authors: [{ name: "ADISOFTTECH" }],

  openGraph: {
    title:
      "ADISOFTTECH | Tally Expert, TDL Development & Software Solutions",

    description:
      "Expert TallyPrime customization, TDL development, Tally API integration and custom business software development services.",

    url: SITE_URL,
    siteName: "ADISOFTTECH",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "ADISOFTTECH | Tally Expert, TDL Development & Software Solutions",
    description:
      "Expert TallyPrime customization, TDL development, Tally API integration and custom business software development services.",
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
