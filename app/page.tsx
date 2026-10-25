import { TopTechnicalBar } from "@/components/TopTechnicalBar";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ArchStickerStage } from "@/components/ArchStickerStage";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { TrayectoriaTimeline } from "@/components/TrayectoriaTimeline";
import { FooterContact } from "@/components/FooterContact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0E14] text-[#E9E7E0] selection:bg-[#C6F827] selection:text-[#0A0E14]">
      {/* 1. Real-time Node Status & Latency Telemetry */}
      <TopTechnicalBar />

      {/* 2. Official Brand Navbar */}
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* 3. Monumental Display Hero with Wholesale Philosophy Manifesto */}
        <HeroSection />

        {/* 4. Signature Arch Stage with Interactive Tilted Sticker Badges */}
        <ArchStickerStage />

        {/* 5. Deep Detail Multi-Project Carousel & Case Study Modals */}
        <ProjectCarousel />

        {/* 6. Operator's Journey: From Wholesale Cashier to VOUT Architect */}
        <TrayectoriaTimeline />
      </main>

      {/* 7. Monumental Footer & Direct Inbound Channel */}
      <FooterContact />
    </div>
  );
}
