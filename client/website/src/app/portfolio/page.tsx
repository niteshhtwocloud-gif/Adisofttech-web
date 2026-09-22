import type { Metadata } from "next";
import ProjectsListing from "@/components/ProjectsListing";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies | AdiSofTech",
  description:
    "Explore our complete portfolio of enterprise software, high-conversion web applications, custom mobile platforms, and business automation solutions.",
};

export default function PortfolioPage() {
  return <ProjectsListing />;
}
