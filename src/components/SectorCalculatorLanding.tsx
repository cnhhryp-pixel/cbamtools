import ContentPage from "./ContentPage";

type Props={sector:string;calculatorSector:string;productPage:string;description:string};

export default function SectorCalculatorLanding({sector,calculatorSector,productPage,description}:Props){
  const calculatorHref="/cbam-calculator?sector="+encodeURIComponent(calculatorSector);
  return <ContentPage eyebrow={sector.toUpperCase()+" CALCULATOR"} title={sector+" CBAM calculator"} intro={description}>
    <h2>Start with a sector-specific shortcut</h2>
    <p>The main CBAM calculator supports the full assessment workflow. Open it with this sector already selected, then review product code, emissions source, quantity and price assumptions.</p>
    <div className="info-grid">
      <div><b>Product classification</b><p>Enter the CN / HS code used for the assessment and keep classification uncertainty visible.</p></div>
      <div><b>Emissions input</b><p>Choose the source used for embedded-emissions data and preserve the supporting reference.</p></div>
      <div><b>Import assumptions</b><p>Enter quantity and price assumptions used in the planning estimate.</p></div>
      <div><b>Assessment report</b><p>Carry the calculator values into a structured preview before upgrading.</p></div>
    </div>
    <h2>Suggested workflow</h2>
    <ol className="steps">
      <li><b>Open the calculator</b><span>Launch the calculator with {sector} selected.</span></li>
      <li><b>Check the code</b><span>Confirm the product code and origin used for the assessment.</span></li>
      <li><b>Review assumptions</b><span>Check emissions, quantity, price and advanced inputs.</span></li>
      <li><b>Create the report</b><span>Generate the assessment preview and preserve the assumptions.</span></li>
    </ol>
    <p><a className="section-link" href={calculatorHref}>Open {sector} calculator →</a></p>
    <p><a className="section-link" href={productPage}>View {sector} product guide →</a></p>
  </ContentPage>;
}
