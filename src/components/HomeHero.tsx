export default function HomeHero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 text-center">
      <h1 className="text-5xl font-bold leading-tight">
        Simplify EU CBAM Compliance
      </h1>
      <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-600">
        Calculate CBAM costs, check HS codes, and generate assessment reports
        for global importers and exporters.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <a href="/cbam-calculator" className="rounded-lg bg-blue-600 px-6 py-3 text-white">
          Free CBAM Calculator
        </a>
        <a href="/hs-code-checker" className="rounded-lg border px-6 py-3">
          Check HS Code
        </a>
      </div>
    </section>
  );
}
