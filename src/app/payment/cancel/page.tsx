export default function PaymentCancel() {
  return (
    <main className="min-h-screen px-6 py-20 text-center">
      <h1 className="text-4xl font-bold">Payment Cancelled</h1>
      <p className="mt-4 text-gray-600">
        No payment was completed. You can continue using the free CBAM tools and print your report.
      </p>
      <a className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white" href="/report">
        Return to Report
      </a>
    </main>
  );
}
