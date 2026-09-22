import type { Metadata } from "next";
import About from "@/components/About";
import TrustSection from "@/components/TrustSection";

export const metadata: Metadata = {
  title: "About Us | AdiSofTech",
  description: "Learn more about AdiSofTech, our mission, engineering philosophy, and enterprise track record.",
};

export default function AboutPage() {
  return (
    <div className="pt-8">
      <About />
      <TrustSection />
    </div>
  );
}
