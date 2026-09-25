"use client";

export default function PrintReportButton() {
  function printReport() {
    window.print();
  }

  return (
    <button onClick={printReport} className="rounded-lg bg-blue-600 px-6 py-3 text-white">
      Print / Save Free PDF
    </button>
  );
}
