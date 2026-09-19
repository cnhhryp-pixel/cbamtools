export const metadata = { title: "CBAM HS Code List - Check Covered Products" };

export default function CBAMHSCodeListPage() {
  return <main className="mx-auto max-w-4xl px-6 py-20">
    <h1 className="text-4xl font-bold">CBAM HS Code List: Products Covered by CBAM</h1>
    <p className="mt-6 text-gray-700">HS code classification is an important step when checking whether imported products may be subject to CBAM requirements.</p>
    <h2 className="mt-10 text-2xl font-bold">Common CBAM product categories</h2>
    <ul className="mt-4 list-disc pl-6"><li>Iron and steel products</li><li>Aluminium products</li><li>Cement products</li><li>Fertilizers</li></ul>
  </main>;
}
