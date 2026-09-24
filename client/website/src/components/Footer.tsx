"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import {
  LinkedinIcon,
  FacebookIcon,
  YoutubeIcon,
  TwitterXIcon,
} from "./icons/SocialIcons";
import ASTLogo from "./ASTLogo";

// Global footer component displaying sitemap links, contact information, and brand credentials.
const QUICK_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Business OS", href: "/#business-os" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "All Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const SERVICE_LINKS = [
  { label: "Web Development", href: "/#services" },
  { label: "Mobile Development", href: "/#services" },
  { label: "Custom Business Software", href: "/#services" },
  { label: "Tally & ERP Customization", href: "/#services" },
  { label: "Cloud Solutions", href: "/#services" },
  { label: "Business Automation", href: "/#services" },
];

const SUPPORT_LINKS = [
  { label: "Help Center", href: "/#contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Contact Support", href: "/#contact" },
];

const SOCIAL_LINKS = [
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://www.linkedin.com/company/adisofttech" },
  { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/Adisofttech/" },
  { icon: YoutubeIcon, label: "YouTube", href: "https://youtube.com/@future_tech_ai_idea?si=1WHMyJBHfVDJG0ixe" },
  { icon: TwitterXIcon, label: "X (Twitter)", href: "https://x.com/pradeep_maniray" },
];

// ==================== FOOTER COMPONENT ====================

export default function Footer() {
  const pathname = usePathname();

  // If the user is inside the Admin CMS Panel (/admin),
  // suppress the public footer to maintain a clean admin dashboard experience.
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 pt-14 pb-8 sm:px-8 sm:pt-16">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Brand & Info */}
          <div className="flex flex-col lg:col-span-4">
            <Link href="/#home" className="inline-block">
              <ASTLogo height={42} />
            </Link>
            <p className="mt-3 text-xs font-semibold text-slate-500">
              Smart Solutions for a Better Tomorrow
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 max-w-xs">
              We build modern web, mobile and business software solutions for growing businesses.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-blue-600 hover:bg-blue-50/50 hover:text-blue-600"
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold tracking-tight text-[#0f172a]">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold tracking-tight text-[#0f172a]">
              Our Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold tracking-tight text-[#0f172a]">
              Support
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Right Brand Statement */}
          <div className="flex flex-col justify-start border-slate-200 pt-6 md:pt-0 lg:col-span-2 lg:border-l lg:pl-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              LET&apos;S BUILD<br />A BETTER TOMORROW
            </p>
            <h4 className="mt-3 text-xl font-extrabold leading-tight text-[#0f172a] sm:text-2xl">
              Technology<br />for Growing<br />Businesses
            </h4>
            <div className="mt-3 h-1 w-10 rounded-full bg-blue-600" />
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:mt-16 sm:flex-row sm:pt-8">
          <p className="text-xs text-slate-500">
            © 2026 AST. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-blue-600"
              >
                Privacy Policy
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                href="/terms"
                className="transition-colors hover:text-blue-600"
              >
                Terms &amp; Conditions
              </Link>
            </div>

            {/* Scroll To Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
