export const metadata = {
  title: "Contact CBAMtools - CBAM Assessment Support",
  description:
    "Contact CBAMtools for CBAM calculations, assessment reports and compliance preparation support.",
};

export default function Contact() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-bold">Contact CBAMtools</h1>
      <p className="mt-4 text-gray-600">
        Request CBAM assistance, product classification support or compliance guidance.
      </p>

      <form className="mt-8 space-y-4">
        <input className="w-full border p-3" placeholder="Name" />
        <input className="w-full border p-3" placeholder="Company" />
        <input className="w-full border p-3" placeholder="Email" />
        <input className="w-full border p-3" placeholder="Product / HS Code" />
        <input className="w-full border p-3" placeholder="Country" />
        <textarea className="w-full border p-3" placeholder="Message" />
        <button className="rounded-lg bg-blue-600 px-6 py-3 text-white">
          Submit Inquiry
        </button>
      </form>
    </main>
  );
}
