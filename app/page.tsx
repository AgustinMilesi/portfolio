import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { TrayectoriaTimeline } from "@/components/TrayectoriaTimeline";
import { FooterContact } from "@/components/FooterContact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[var(--bg-page,#0A0E14)] text-[var(--text-main,#E9E7E0)] selection:bg-[var(--primary-accent,#C6F827)] selection:text-[var(--primary-accent-text,#0A0E14)] transition-colors duration-200">
      {/* 1. Official Brand Navbar */}
      <Navbar />

      <main className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden">
        {/* 2. Hero: Presentation & Core Architectural Philosophy */}
        <HeroSection />

        {/* 3. Deep Detail Multi-Project Showcase & Case Study Modals */}
        <ProjectCarousel />

        {/* 4. Operator's Journey: From Wholesale Cashier to VOUT Architect */}
        <TrayectoriaTimeline />
      </main>

      {/* 5. Contact & Ecosystem Directory */}
      <FooterContact />
    </div>
  );
}
