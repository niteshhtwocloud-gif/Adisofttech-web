"use client";

/**
 * Component: Navbar (/components/Navbar.tsx)
 * 
 * Purpose:
 * Header for AST corporate technology website, matching the exact reference image:
 * 1. Thin top utility bar: Email, Location, Social Icons
 * 2. Sticky main navigation:
 *    - Left: Authentic AST Logo
 *    - Center: Home, About, Services, Business OS, Portfolio, Blog, Contact (with active blue underline indicator)
 *    - Right: Search icon, Login button, "Get a Free Consultation ->" CTA
 * 3. Fully responsive mobile drawer
 */

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  MapPin,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import {
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
} from "./icons/SocialIcons";
import ASTLogo from "@/components/ASTLogo";

// ==================== NAVIGATION CONFIGURATION ====================

interface NavLink {
  label: string;
  href: string;
  id: string;
  isPage?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", id: "home" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Business OS", href: "/#business-os", id: "business-os" },
  { label: "Portfolio", href: "/#portfolio", id: "portfolio" },
  { label: "Blog", href: "/blog", id: "blog", isPage: true },
  { label: "Contact", href: "/#contact", id: "contact" },
];

// ==================== NAVBAR COMPONENT & SCROLL TRACKING ====================

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const isHomepage = pathname === "/";

  // Handle scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Track active section for non-home pages
  useEffect(() => {
    if (!isHomepage) {
      if (pathname.startsWith("/blog")) {
        setActiveSection("blog");
      } else {
        setActiveSection("");
      }
    }
  }, [pathname, isHomepage]);

  // High-precision section scroll tracking for homepage
  useEffect(() => {
    if (!isHomepage) return;

    const sectionIds = ["contact", "portfolio", "business-os", "services", "about", "home"];

    const updateActiveSection = () => {
      // Top of page
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      // Bottom edge reached (Footer / Contact)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70) {
        setActiveSection("contact");
        return;
      }

      // Match current section where top <= trigger line and bottom > trigger line
      const triggerY = 140; // 80px navbar + 60px viewport threshold
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY && rect.bottom > triggerY) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    // Initial check on mount
    const hash = window.location.hash.replace("#", "");
    if (hash && sectionIds.includes(hash)) {
      setActiveSection(hash);
    } else {
      updateActiveSection();
    }

    const onHashChange = () => {
      const currentHash = window.location.hash.replace("#", "");
      if (currentHash && sectionIds.includes(currentHash)) {
        setActiveSection(currentHash);
      }
    };

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [isHomepage]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
      setMenuOpen(false);
      if (isHomepage && !link.isPage) {
        e.preventDefault();
        if (link.id === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setActiveSection("home");
          window.history.pushState(null, "", "/");
        } else {
          const element = document.getElementById(link.id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setActiveSection(link.id);
            window.history.pushState(null, "", `/#${link.id}`);
          }
        }
      }
    },
    [isHomepage]
  );

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* 1. Thin Top Utility Bar (Scrolls away naturally)              */}
      {/* ------------------------------------------------------------- */}
      <div className="hidden border-b border-slate-100 bg-white/80 py-2 text-[12px] text-slate-600 backdrop-blur-xs md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8">
          {/* Left contact info */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@adisofttech.com"
              className="flex items-center gap-2 transition hover:text-[#0b57d0]"
            >
              <Mail className="h-3.5 w-3.5 text-[#0b57d0]" />
              <span>info@adisofttech.com</span>
            </a>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-2 text-slate-500">
              <MapPin className="h-3.5 w-3.5 text-[#f97316]" />
              <span>New Delhi, India</span>
            </div>
          </div>

          {/* Right social & quick consultation */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 text-slate-400">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="transition hover:text-[#0b57d0]"
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="transition hover:text-[#0b57d0]"
              >
                <FacebookIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="transition hover:text-[#f97316]"
              >
                <InstagramIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. Main Sticky Navigation Bar                                  */}
      {/* ------------------------------------------------------------- */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200/80 bg-white/95 shadow-md shadow-slate-900/5 backdrop-blur-md"
            : "border-b border-slate-100/60 bg-white/90 backdrop-blur-md"
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Left: AST Logo */}
          <Link
            href="/"
            className="flex items-center transition hover:opacity-95"
            onClick={(e) => {
              if (isHomepage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActiveSection("home");
                window.history.pushState(null, "", "/");
              }
            }}
          >
            <ASTLogo height={42} />
          </Link>

          {/* Center: Desktop Navigation Links */}
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`relative py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "text-[#0b57d0]"
                        : "text-slate-700 hover:text-[#0b57d0]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-[#0b57d0]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 sm:gap-3.5">
            {/* Get a Free Consultation Primary CTA Button */}
            <Link
              href="/#contact"
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#0b57d0] to-[#1e40af] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/25 transition hover:from-blue-700 hover:to-blue-900 active:scale-[0.98] sm:inline-flex"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-6 pb-6 pt-3 shadow-xl lg:hidden">
            <ul className="flex flex-col divide-y divide-slate-100">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`block py-3 text-sm font-semibold transition ${
                        isActive
                          ? "text-[#0b57d0]"
                          : "text-slate-700 hover:text-[#0b57d0]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 flex flex-col gap-2.5">
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-[#0b57d0] px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-600/20"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
