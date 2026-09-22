import type { Metadata } from "next";
import BusinessOS from "@/components/BusinessOS";
import Services from "@/components/Services";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Enterprise Solutions | AdiSofTech",
  description: "Bespoke business operating systems, automation, and enterprise workflow solutions engineered by AST.",
};

export default function SolutionsPage() {
  return (
    <div className="pt-8">
      <BusinessOS />
      <Services />
      <CTA />
    </div>
  );
}
