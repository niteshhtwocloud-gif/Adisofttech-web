"use client";

import { ArrowRight } from "lucide-react";

// Call-to-action banner driving traffic to the technical consultation form.
export default function CTA() {
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 pb-6 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-blue-50/70 px-8 py-12 sm:flex-row sm:items-center sm:px-12">
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-semibold tracking-wide text-blue-600">
            LET&apos;S BUILD TOGETHER
          </p>
          <h2 className="text-2xl font-extrabold leading-tight text-[#0f172a] sm:text-3xl">
            Ready to transform your business with technology?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Get in touch with our team and let&apos;s discuss how AST can
            help you grow.
          </p>
        </div>
        <a
          href="#contact-form"
          onClick={handleScrollToContact}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0f172a] px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 cursor-pointer"
        >
          Contact Us
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

