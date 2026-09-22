import type { Metadata } from "next";
import ProjectsListing from "@/components/ProjectsListing";

export const metadata: Metadata = {
  title: "All Projects & Case Studies | AdiSofTech",
  description:
    "Explore our complete portfolio of enterprise software, high-conversion web applications, custom mobile platforms, and business automation solutions.",
};

export default function ProjectsPage() {
  return <ProjectsListing />;
}
