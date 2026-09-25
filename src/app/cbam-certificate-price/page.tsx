import ContentPage from "../../components/ContentPage";

export const metadata={
  title:"CBAM Certificate Price 2026 | Quarterly Prices & Calculator Input",
  description:"Published 2026 CBAM certificate prices, publication schedule and guidance for using the applicable quarterly price in a planning estimate."
};

export default function Page(){
  return <ContentPage
    eyebrow="CERTIFICATE PRICE"
    title="CBAM certificate prices: 2026 published values"
    intro="Use the Commission-published price for the quarter that applies to the assessment. Avoid relying on a permanently fixed default price in the calculator."
  >
    <div className="source-status">
      <div><small>LAST REVIEWED</small><b>26 September 2026</b><span>European Commission price page checked</span></div>
      <div><small>CALCULATOR BEHAVIOUR</small><b>No fixed price is pre-filled</b><span>Enter the applicable published price for the assessment period</span></div>
    </div>

    <h2>Published and scheduled 2026 prices</h2>
    <div className="info-grid">
      <div><b>Q1 2026</b><p>Published 7 April 2026: <strong>€75.36</strong> per CBAM certificate.</p></div>
      <div><b>Q2 2026</b><p>Published 6 July 2026: <strong>€75.28</strong> per CBAM certificate.</p></div>
      <div><b>Q3 2026</b><p>Scheduled publication: <strong>5 October 2026</strong>. Do not substitute a previous-quarter price as an official Q3 value.</p></div>
      <div><b>Q4 2026</b><p>Scheduled publication: <strong>4 January 2027</strong>.</p></div>
    </div>

    <div className="callout">
      <b>Price methodology</b>
      <p>For 2026, the Commission publishes one CBAM certificate price for each calendar quarter. From 2027 onwards, the publication frequency changes to weekly.</p>
    </div>

    <h2>Use the correct price in an assessment</h2>
    <ol className="steps">
      <li><b>Identify the import period</b><span>Match the assessment to the relevant calendar quarter.</span></li>
      <li><b>Use the published Commission price</b><span>Enter the price published for that quarter rather than a generic or permanently cached value.</span></li>
      <li><b>Record the source and date</b><span>Keep the price source with the report so the estimate can be reviewed later.</span></li>
      <li><b>Recalculate when needed</b><span>If the relevant price was not yet published when a planning estimate was created, update the estimate once the official value is available.</span></li>
    </ol>

    <p>
      <a className="section-link" href="https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/price-cbam-certificates_en" target="_blank" rel="noopener noreferrer">
        European Commission — CBAM certificate prices →
      </a>
    </p>
    <p><a className="section-link" href="/cbam-calculator">Open calculator →</a></p>
  </ContentPage>;
}
