import HomeHero from "@/components/HomeHero";
import ToolCards from "@/components/ToolCards";
import TrustSection from "@/components/TrustSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <HomeHero />
      <ToolCards />
      <TrustSection />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-xl bg-gray-50 p-10 text-center">
          <h2 className="text-3xl font-bold">Generate Your CBAM Assessment Report</h2>
          <p className="mt-3 text-gray-600">
            Print your report for free or unlock the professional report option.
          </p>
        </div>
      </section>
    </main>
  );
}
