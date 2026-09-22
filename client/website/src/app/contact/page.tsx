import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact & Technical Consultation | AdiSofTech",
  description: "Schedule a consultation with our senior engineering team to discuss your software and automation requirements.",
};

export default function ContactPage() {
  return (
    <div className="pt-8">
      <Contact />
    </div>
  );
}
