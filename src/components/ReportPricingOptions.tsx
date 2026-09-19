export default function ReportPricingOptions() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border p-6">
        <h2 className="text-2xl font-bold">Free Report</h2>
        <p className="mt-3 text-gray-600">
          View your CBAM assessment online and print the report.
        </p>
        <button className="mt-5 rounded-lg border px-5 py-3">
          Print Report
        </button>
      </div>

      <div className="rounded-xl border p-6">
        <h2 className="text-2xl font-bold">Professional Report</h2>
        <p className="mt-3 text-gray-600">
          Unlock a downloadable CBAM assessment report.
        </p>
        <p className="mt-3 text-xl font-semibold">$9.90</p>
        <button className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-white">
          Unlock PDF Download
        </button>
      </div>
    </section>
  );
}
