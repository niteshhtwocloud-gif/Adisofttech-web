"use client";

import { usePathname } from "next/navigation";

// ==================== FLOATING WHATSAPP CTA COMPONENT ====================

export default function WhatsAppButton() {

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919831718493";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20ADISOFTTECH%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex items-center">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/35 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/50 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 sm:h-[52px] sm:w-[52px]"
      >
        {/* Official WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="currentColor"
          className="h-6 w-6 sm:h-7 sm:w-7"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>

        {/* Hover Tooltip Label (Desktop only, slides out to the right) */}
        <span
          className="pointer-events-none absolute left-full ml-3 hidden items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3.5 py-2 text-xs font-semibold text-[#0f172a] shadow-lg shadow-slate-900/10 transition-all duration-200 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 sm:inline-flex whitespace-nowrap"
          role="tooltip"
        >
          <span className="h-2 w-2 rounded-full bg-[#25D366]" />
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
