import ContentPage from "./ContentPage";

type Props={
  sector:string;
  calculatorSector:string;
  calculatorPage:string;
  codeLabel:string;
  intro:string;
  dataLabel:string;
};

export default function SectorProductLanding({sector,calculatorSector,calculatorPage,codeLabel,intro,dataLabel}:Props){
  const mainCalculator="/cbam-calculator?sector="+encodeURIComponent(calculatorSector);
  return <ContentPage
    eyebrow={sector.toUpperCase()}
    title={sector+" products under CBAM"}
    intro={intro}
  >
    <h2>Build the assessment from the product first</h2>
    <div className="info-grid">
      <div><b>Confirm the code</b><p>Start from the exact {codeLabel} used for the imported goods rather than the commercial product name alone.</p></div>
      <div><b>Organise origin data</b><p>Keep the country of origin and supplier or installation information together with the product record.</p></div>
      <div><b>Prepare {dataLabel}</b><p>Record the emissions input, source and supporting assumptions used for the assessment.</p></div>
      <div><b>Model the shipment</b><p>Carry the product, quantity, emissions and certificate-price inputs into one consistent calculator workflow.</p></div>
    </div>

    <h2>Continue with one consistent workflow</h2>
    <ol className="steps">
      <li><b>Screen the product</b><span>Check the code and resolve obvious classification questions first.</span></li>
      <li><b>Open the sector shortcut</b><span>Use the focused {sector.toLowerCase()} calculator entry page to continue.</span></li>
      <li><b>Complete the main calculator</b><span>Review emissions and price inputs before relying on the estimate.</span></li>
      <li><b>Create the report</b><span>Carry the supported inputs into a structured assessment preview.</span></li>
    </ol>

    <div className="related-links">
      <a href="/hs-code-checker">Check HS / CN code →</a>
      <a href={calculatorPage}>Open {sector} calculator →</a>
      <a href={mainCalculator}>Open main calculator →</a>
      <a href="/cbam-assessment-report">View report workflow →</a>
    </div>
  </ContentPage>;
}
