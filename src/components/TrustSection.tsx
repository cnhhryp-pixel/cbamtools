const items = [
  "EU Importers",
  "Manufacturers",
  "Exporters",
  "Supply Chain Teams",
];

export default function TrustSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-bold text-center">Built for Global CBAM Compliance</h2>
      <p className="mt-4 text-center text-gray-600">
        CBAMtools helps businesses understand carbon reporting requirements and prepare assessments.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {items.map((item) => (
          <div key={item} className="rounded-xl border p-5 text-center">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
