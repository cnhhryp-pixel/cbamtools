export const metadata = {
  title: "CBAM for Importers - EU Importer Preparation Guide",
  description:
    "A practical CBAM guide for EU importers covering product checks, HS codes, emissions data and preparation steps.",
};

export default function CBAMForImportersPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-bold">CBAM for Importers: How to Prepare for EU Carbon Reporting</h1>

      <p className="mt-6 text-gray-700">
        EU importers of covered products need to understand CBAM requirements,
        collect relevant information and prepare accurate emissions reporting.
      </p>

      <h2 className="mt-10 text-2xl font-bold">Key preparation steps</h2>

      <ol className="mt-4 list-decimal pl-6 text-gray-700 space-y-2">
        <li>Review imported products and HS code classification.</li>
        <li>Identify whether products may fall within CBAM scope.</li>
        <li>Request emissions information from suppliers.</li>
        <li>Estimate potential carbon-related costs.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold">Use CBAMtools</h2>
      <p className="mt-3 text-gray-700">
        CBAMtools provides calculators and assessment reports to help importers organize their preparation workflow.
      </p>
    </main>
  );
}
