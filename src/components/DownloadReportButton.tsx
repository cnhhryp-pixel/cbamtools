"use client";

import { createCBAMReportText } from "../lib/cbamReport";

export default function DownloadReportButton() {
  function downloadReport() {
    const report = createCBAMReportText({
      product: "CBAM Product Assessment",
      cost: "Calculated Result",
    });

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "CBAM_Assessment_Report.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={downloadReport}
      className="rounded-lg bg-green-600 px-6 py-3 text-white"
    >
      Download CBAM Report
    </button>
  );
}
