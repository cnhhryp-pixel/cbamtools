export const metadata = {
  title: "EU CBAM Guide - Carbon Border Adjustment Mechanism Explained",
  description:
    "Learn how the EU Carbon Border Adjustment Mechanism works, who needs to prepare, and how CBAMtools helps with calculations and assessments.",
};

export default function CBAMGuidePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-bold">EU CBAM Guide: Carbon Border Adjustment Mechanism Explained</h1>

      <p className="mt-6 text-gray-700">
        The Carbon Border Adjustment Mechanism (CBAM) is an EU framework designed
        to address carbon emissions associated with certain imported goods.
      </p>

      <h2 className="mt-10 text-2xl font-bold">What is CBAM?</h2>
      <p className="mt-3 text-gray-700">
        CBAM requires importers to report relevant emissions information for
        covered products and prepare for carbon-related obligations.
      </p>

      <h2 className="mt-10 text-2xl font-bold">How can businesses prepare?</h2>
      <ul className="mt-3 list-disc pl-6 text-gray-700">
        <li>Check whether products fall under CBAM categories.</li>
        <li>Understand HS code classification.</li>
        <li>Collect supplier emission information.</li>
        <li>Estimate potential CBAM costs.</li>
      </ul>

      <p className="mt-10 text-gray-600">
        Use CBAMtools calculators and assessment reports to organize your CBAM preparation process.
      </p>
    </main>
  );
}
