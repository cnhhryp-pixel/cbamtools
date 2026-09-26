export default function ReportPricingOptions(){
  return <section className="grid gap-6 md:grid-cols-2">
    <div className="rounded-xl border p-6">
      <h2 className="text-2xl font-bold">Free Report</h2>
      <p className="mt-3 text-gray-600">View your CBAM assessment online and print the preview with the CBAMTools watermark.</p>
      <a className="mt-5 inline-block rounded-lg border px-5 py-3" href="/report">Open report preview</a>
    </div>
    <div className="rounded-xl border p-6">
      <h2 className="text-2xl font-bold">Professional Report</h2>
      <p className="mt-3 text-gray-600">Purchase a clean Professional PDF through the CBAMTools PayPal Payment Link.</p>
      <p className="mt-3 text-xl font-semibold">€49</p>
      <a className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 text-white" href="/checkout">Continue to checkout</a>
    </div>
  </section>;
}
