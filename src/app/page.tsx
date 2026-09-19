import HomeHero from "@/components/HomeHero";
import ToolCards from "@/components/ToolCards";
import TrustSection from "@/components/TrustSection";
import IndustriesSection from "@/components/IndustriesSection";
import PopularResources from "@/components/PopularResources";
import ProfessionalReportCTA from "@/components/ProfessionalReportCTA";
import CBAMCTA from "@/components/CBAMCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <HomeHero />
      <ToolCards />
      <IndustriesSection />
      <PopularResources />
      <ProfessionalReportCTA />
      <TrustSection />
      <CBAMCTA />
    </main>
  );
}
