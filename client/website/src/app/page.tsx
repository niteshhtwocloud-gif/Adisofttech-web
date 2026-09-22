import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import About from "@/components/About";
import Services from "@/components/Services";
import BusinessOS from "@/components/BusinessOS";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";

// Primary landing page assembling hero, trust markers, services, portfolio, and contact section.
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TrustSection />
      <About />
      <Services />
      <BusinessOS />
      <Portfolio />
      <Contact />
    </main>
  );
}
