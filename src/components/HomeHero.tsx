export default function HomeHero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 text-center">
      <h1 className="text-5xl font-bold leading-tight">
        Simplify EU CBAM Compliance
      </h1>
      <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-600">
        Calculate carbon costs, check HS codes, and generate professional CBAM reports for your imported products.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a href="/cbam-calculator" className="rounded-lg bg-blue-600 px-6 py-3 text-white">
          Start Free Calculator
        </a>
        <a href="/report" className="rounded-lg border px-6 py-3">
          Get Professional Report $9.90
        </a>
      </div>
      <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-4">
        {['Free CBAM Calculator','HS Code Analysis','Printable Reports','No Account Required'].map(item=>(
          <div key={item} className="rounded-xl border p-4 text-sm font-medium">✓ {item}</div>
        ))}
      </div>
    </section>
  );
}
