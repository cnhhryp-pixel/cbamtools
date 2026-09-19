"use client";

import { useState } from "react";

const hsCodes = [
  { hsCode: "720810", sector: "Iron and Steel", product: "Steel products", cbam: true },
  { hsCode: "760110", sector: "Aluminium", product: "Unwrought aluminium", cbam: true },
];

export default function HSCodeChecker() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<any>(null);

  function checkCode() {
    const found = hsCodes.find((item) => item.hsCode === code);
    setResult(found || { cbam: false });
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-bold">CBAM HS Code Checker</h1>
      <p className="mt-4 text-gray-600">
        Check whether your products may be covered by CBAM regulation.
      </p>

      <div className="mt-8 flex gap-3">
        <input
          className="rounded border px-4 py-2"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter HS Code"
        />
        <button className="rounded bg-blue-600 px-5 py-2 text-white" onClick={checkCode}>
          Check
        </button>
      </div>

      {result && (
        <div className="mt-8 rounded border p-6">
          <h2 className="text-2xl font-semibold">
            CBAM Covered: {result.cbam ? "YES" : "NO"}
          </h2>
          {result.sector && <p>Sector: {result.sector}</p>}
          {result.product && <p>Product: {result.product}</p>}
        </div>
      )}
    </main>
  );
}
