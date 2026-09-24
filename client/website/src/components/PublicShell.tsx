"use client";

/**
 * Component: PublicShell (/components/PublicShell.tsx)
 * 
 * Purpose:
 * Isolates public marketing UI elements (Navbar, Footer, WhatsApp floating button)
 * from the Admin CMS workspace (/admin).
 *
 * Why this exists:
 * 1. Guarantees that /admin routes have 100% full screen real estate without marketing navigation clutter.
 * 2. Completely avoids React hook lifecycle discrepancies between public pages and admin pages.
 */

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

// ==================== PUBLIC LAYOUT SHELL ====================

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full min-w-0 overflow-x-hidden">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
