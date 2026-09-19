export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="text-5xl font-bold">CBAMtools</h1>
        <p className="mt-6 text-xl text-gray-600">
          Calculate, check and prepare for EU Carbon Border Adjustment Mechanism compliance.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a className="rounded-lg bg-blue-600 px-6 py-3 text-white" href="/cbam-calculator">
            Start CBAM Calculator
          </a>
          <a className="rounded-lg border px-6 py-3" href="/hs-code-checker">
            Check HS Code
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
        {[
          ['CBAM Calculator', 'Estimate potential CBAM carbon costs.'],
          ['HS Code Checker', 'Check whether products are covered by CBAM.'],
          ['Cost Calculator', 'Estimate possible certificate costs.'],
        ].map(([title, desc]) => (
          <div key={title} className="rounded-xl border p-6">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="mt-3 text-gray-600">{desc}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-xl bg-gray-50 p-10 text-center">
          <h2 className="text-3xl font-bold">Generate Your CBAM Assessment Report</h2>
          <p className="mt-3 text-gray-600">Download a professional PDF summary after calculation.</p>
        </div>
      </section>
    </main>
  );
}
