import type { Metadata } from "next";
import Services from "@/components/Services";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Engineering Services | AdiSofTech",
  description: "Explore our full suite of digital engineering services including custom web development, Tally ERP, and cloud systems.",
};

export default function ServicesPage() {
  return (
    <div className="pt-8">
      <Services />
      <CTA />
    </div>
  );
}
