import HomeHero from "@/components/HomeHero";
import ToolCards from "@/components/ToolCards";
import TrustSection from "@/components/TrustSection";
import IndustriesSection from "@/components/IndustriesSection";
import PopularResources from "@/components/PopularResources";
import CBAMCTA from "@/components/CBAMCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <HomeHero />
      <ToolCards />
      <IndustriesSection />
      <PopularResources />
      <TrustSection />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-xl bg-gray-50 p-10 text-center">
          <h2 className="text-3xl font-bold">Generate Your CBAM Assessment Report</h2>
          <p className="mt-3 text-gray-600">Print your report for free or unlock the professional report option.</p>
        </div>
      </section>
      <CBAMCTA />
    </main>
  );
}
