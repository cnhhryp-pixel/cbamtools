"use client";

import { useState } from "react";

export default function CBAMCalculator() {
  const [quantity, setQuantity] = useState("");
  const [emission, setEmission] = useState("");
  const [price, setPrice] = useState("80");
  const [result, setResult] = useState<number | null>(null);

  function calculate() {
    const cost = Number(quantity) * Number(emission) * Number(price);
    setResult(cost || 0);
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-bold">CBAM Calculator</h1>
      <p className="mt-4 text-gray-600">Estimate CBAM related costs for imported products and prepare EU carbon compliance information.</p>
      <div className="mt-8 grid gap-4 max-w-xl">
        <input className="border p-3 rounded" placeholder="Quantity (tons)" value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
        <input className="border p-3 rounded" placeholder="Emission factor (tCO2/ton)" value={emission} onChange={(e)=>setEmission(e.target.value)} />
        <input className="border p-3 rounded" placeholder="Carbon price (€)" value={price} onChange={(e)=>setPrice(e.target.value)} />
        <button className="bg-blue-600 text-white rounded p-3" onClick={calculate}>Calculate</button>
      </div>
      {result !== null && <div className="mt-8 border rounded p-6"><h2 className="text-2xl font-semibold">Estimated CBAM Cost</h2><p className="mt-2">€ {result.toLocaleString()}</p></div>}
    </main>
  );
}
