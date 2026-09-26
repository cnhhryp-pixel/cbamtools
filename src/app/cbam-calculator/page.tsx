"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import SiteFooter from "../../components/SiteFooter";

const sectors = ["Iron & Steel","Aluminium","Cement","Fertilisers","Hydrogen","Electricity"];
const origins = ["China","India","Türkiye","United Kingdom","United States","South Korea","Japan","Vietnam","United Arab Emirates","South Africa","Brazil"];
const fmt = new Intl.NumberFormat("en-IE",{maximumFractionDigits:2});

export default function CBAMCalculator() {
  return (
    <Suspense fallback={<main className="calc-page"><section className="calc-hero"><span className="kicker">CBAM CALCULATOR</span><h1>Preparing calculator…</h1></section></main>}>
      <CalculatorContent />
    </Suspense>
  );
}

function CalculatorContent() {
  const params = useSearchParams();
  const [sector,setSector] = useState(params.get("sector") || "Iron & Steel");
  const [code,setCode] = useState(params.get("code") || "");
  const [country,setCountry] = useState(params.get("country") || "China");
  const [quantity,setQuantity] = useState("100");
  const [emission,setEmission] = useState(params.get("emissions") || "");
  const [source,setSource] = useState(params.get("emissionSource") || (params.get("emissions") ? "EU default value" : "Supplier / manual data"));
  const route=params.get("route")||params.get("productionRoute")||"";
  const datasetVersion=params.get("datasetVersion")||params.get("dataset")||"";
  const defaultValueId=params.get("defaultValueId")||"";
  const [price,setPrice] = useState(params.get("price") || "");
  const [benchmark,setBenchmark] = useState("");
  const [factor,setFactor] = useState("97.5");
  const [paid,setPaid] = useState("");
  const [advanced,setAdvanced] = useState(false);
  const [company,setCompany] = useState(params.get("company") || "");
  const [contact,setContact] = useState(params.get("contact") || "");
  const [reportDetails,setReportDetails] = useState(Boolean(params.get("company") || params.get("contact")));

  const result = useMemo(() => {
    const q=Math.max(0,Number(quantity)||0), e=Math.max(0,Number(emission)||0), p=Math.max(0,Number(price)||0);
    const b=Math.max(0,Number(benchmark)||0), f=Math.min(100,Math.max(0,Number(factor)||0))/100, cp=Math.max(0,Number(paid)||0);
    const gross=q*e, free=q*b*f, adjusted=Math.max(0,gross-free), grossCost=adjusted*p;
    const credit=Math.min(grossCost,gross*cp), cost=Math.max(0,grossCost-credit), cert=p>0?cost/p:0;
    return {gross,free,adjusted,credit,cost,cert};
  },[quantity,emission,price,benchmark,factor,paid]);

  const hasEmission=Number(emission)>0;
  const hasPrice=Number(price)>0;
  const readyForReport=hasEmission&&hasPrice;

  const reportHref="/report?"+new URLSearchParams({
    sector,code,country,quantity,emission,price,benchmark,factor,paid,
    gross:String(result.gross),free:String(result.free),adjusted:String(result.adjusted),
    credit:String(result.credit),cert:String(result.cert),cost:String(result.cost),
    emissionSource:source,route,
    datasetVersion:datasetVersion||(source==="EU default value"?"2026 Definitive Period":"User supplied"),
    defaultValueId,company,contact
  }).toString();

  return (
    <>
      <header className="inner-header">
        <a className="brand" href="/"><span className="brand-mark">C</span><span>CBAM<span className="brand-accent">Tools</span></span></a>
        <nav><a href="/hs-code-checker">HS Code Checker</a><a href="/cbam-default-values">Default Values</a><a href="/cbam-guide">Guides</a></nav>
        <a className="header-cta" href="/report">Assessment Report →</a>
      </header>

      <main className="calc-page">
        <section className="calc-hero">
          <div>
            <span className="kicker">EU CBAM CALCULATOR</span>
            <h1>Estimate your CBAM exposure.</h1>
            <p>Build a planning estimate from product classification, origin, emissions and certificate-price assumptions.</p>
          </div>
          <div className="calc-hero-flow"><span>01 Product</span><b>→</b><span>02 Emissions</span><b>→</b><span>03 Estimate</span></div>
        </section>

        <div className="calc-v2-grid">
          <section className="calc-form-card">
            <div className="calc-step"><span>01</span><div><small>PRODUCT INFORMATION</small><h2>What are you importing?</h2></div></div>
            <label>CBAM sector<select value={sector} onChange={e=>setSector(e.target.value)}>{sectors.map(x=><option key={x}>{x}</option>)}</select></label>
            <label>CN / HS code<input value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,""))} placeholder="e.g. 7208" inputMode="numeric"/></label>
            <a className="calc-helper-link" href="/hs-code-checker">Not sure? Check your HS/CN code →</a>
            <label>Country of origin<select value={country} onChange={e=>setCountry(e.target.value)}>{origins.map(x=><option key={x}>{x}</option>)}</select></label>

            <div className="calc-step"><span>02</span><div><small>EMISSIONS DATA</small><h2>Choose the emissions source.</h2></div></div>
            <div className="source-switch">
              <button className={source==="Supplier / manual data"?"active":""} onClick={()=>setSource("Supplier / manual data")} type="button">Supplier / manual data</button>
              <button className={source==="EU default value"?"active":""} onClick={()=>setSource("EU default value")} type="button">EU default value</button>
            </div>
            {source==="EU default value" && <div className="calc-source-note"><b>2026 Definitive Period</b><span>Use the Default Values tool to select a verified applicable row.</span><a href={"/cbam-default-values?sector="+encodeURIComponent(sector)+"&code="+encodeURIComponent(code)+"&country="+encodeURIComponent(country)}>Find verified default value →</a></div>}
            <label id="emissions-input">Embedded emissions (tCO₂e / tonne)<input value={emission} onChange={e=>setEmission(e.target.value)} inputMode="decimal" placeholder="Enter supplier data or a verified applicable value"/></label>

            <div className="calc-step"><span>03</span><div><small>IMPORT CALCULATION</small><h2>Enter shipment assumptions.</h2></div></div>
            <div className="calc-two">
              <label>Import quantity (tonnes)<input value={quantity} onChange={e=>setQuantity(e.target.value)} inputMode="decimal"/></label>
              <label>Certificate price (€ / tCO₂)<input value={price} onChange={e=>setPrice(e.target.value)} inputMode="decimal" placeholder="Enter the applicable published price"/><a className="calc-price-helper" href="/cbam-certificate-price">Check published CBAM certificate prices →</a></label>
            </div>

            <button className="advanced-toggle" type="button" onClick={()=>setAdvanced(!advanced)}>{advanced?"Hide":"Show"} advanced assumptions</button>
            {advanced && <div className="advanced-box">
              <div className="calc-two">
                <label>Benchmark input<input value={benchmark} onChange={e=>setBenchmark(e.target.value)} inputMode="decimal"/></label>
                <label>2026 CBAM factor (%)<input value={factor} onChange={e=>setFactor(e.target.value)} inputMode="decimal"/></label>
              </div>
              <label>Carbon price already paid (€ / tCO₂)<input value={paid} onChange={e=>setPaid(e.target.value)} inputMode="decimal"/></label>
            </div>}

            <button className="report-details-toggle" type="button" onClick={()=>setReportDetails(!reportDetails)}>{reportDetails?"Hide":"Add"} report details (optional)</button>
            {reportDetails && <div className="report-details-box">
              <div><small>REPORT IDENTITY</small><b>Prepare the assessment for a company or contact.</b><span>These fields are carried into the report preview and checkout.</span></div>
              <div className="calc-two">
                <label>Company / organisation<input value={company} onChange={e=>setCompany(e.target.value)} placeholder="e.g. Example Imports Ltd."/></label>
                <label>Contact email<input type="email" value={contact} onChange={e=>setContact(e.target.value)} placeholder="name@company.com"/></label>
              </div>
            </div>}
          </section>

          <aside className="result-panel calc-v2-result">
            <span className="result-status">LIVE PLANNING ESTIMATE</span>
            <div className="big-result"><small>ESTIMATED CBAM COST</small><strong>{readyForReport?"€"+fmt.format(result.cost):!hasEmission?"Enter emissions":"Enter price"}</strong><span>{readyForReport?source:!hasEmission?"Add an emissions value before calculating":"Add the applicable certificate price to complete the estimate"}</span></div>
            <div className="result-context"><div><span>Sector</span><b>{sector}</b></div><div><span>CN / HS</span><b>{code||"—"}</b></div><div><span>Origin</span><b>{country}</b></div><div><span>Quantity</span><b>{fmt.format(Number(quantity)||0)} t</b></div></div>
            <div className="result-row"><span>Gross embedded emissions</span><b>{fmt.format(result.gross)} tCO₂e</b></div>
            <div className="result-row"><span>After adjustment</span><b>{fmt.format(result.adjusted)} tCO₂e</b></div>
            <div className="result-row total"><span>Estimated certificates</span><b>{readyForReport?fmt.format(result.cert):"—"}</b></div>
            <a className="result-report-btn" href={readyForReport?reportHref:!hasEmission?(source==="EU default value"?"/cbam-default-values":"#emissions-input"):"/cbam-certificate-price"}>{readyForReport?"Generate assessment report →":!hasEmission?"Add emissions first →":"Add certificate price first →"}</a>
            <span className="result-upgrade-hint">Free preview first · Professional report available for $9.90</span>
            <p className="result-disclaimer">Planning estimate only. Confirm classification, emissions method, applicable adjustments and certificate price before compliance use.</p>
          </aside>
        </div>
      </main>
      <SiteFooter/>
    </>
  );
}
