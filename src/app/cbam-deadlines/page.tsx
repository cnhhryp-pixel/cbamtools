import ContentPage from "../../components/ContentPage";

export const metadata={
  title:"CBAM Deadlines & 2026–2027 Timeline | CBAMTools",
  description:"Practical CBAM timeline for 2026 certificate pricing, 2027 purchasing and the first annual CBAM declaration."
};

export default function Page(){
  return <ContentPage
    eyebrow="CBAM TIMELINE"
    title="CBAM deadlines: the 2026–2027 implementation timeline"
    intro="Track the major milestones relevant to 2026 imports and the first annual CBAM declaration in 2027."
  >
    <h2>Key milestones</h2>
    <ol className="steps">
      <li><b>1 January 2026 — definitive regime</b><span>The definitive CBAM regime applies to 2026 imports under the current framework.</span></li>
      <li><b>2026 — quarterly certificate prices</b><span>The Commission publishes one CBAM certificate price for each calendar quarter in 2026.</span></li>
      <li><b>2026 — verification preparation</b><span>Where actual emissions are used, the verification framework relies on accredited CBAM verifiers and supporting emissions evidence.</span></li>
      <li><b>February 2027 — certificate purchasing</b><span>CBAM certificates are purchased through the common central platform from February 2027 onwards.</span></li>
      <li><b>30 September 2027 — first annual declaration and surrender</b><span>The first CBAM declaration covers 2026 imports, and the corresponding certificates are surrendered by the same date.</span></li>
    </ol>

    <h2>2026 certificate-price publication schedule</h2>
    <div className="info-grid">
      <div><b>Q1 2026</b><p>Published 7 April 2026: €75.36 per certificate.</p></div>
      <div><b>Q2 2026</b><p>Published 6 July 2026: €75.28 per certificate.</p></div>
      <div><b>Q3 2026</b><p>Scheduled publication: 5 October 2026.</p></div>
      <div><b>Q4 2026</b><p>Scheduled publication: 4 January 2027.</p></div>
    </div>

    <div className="callout">
      <b>Last reviewed: 26 September 2026</b>
      <p>Operational guidance can change. Verify filing, verification and purchasing steps against the current European Commission and EUR-Lex material before acting.</p>
    </div>

    <h2>Official references</h2>
    <div className="related-links">
      <a href="https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/price-cbam-certificates_en" target="_blank" rel="noopener noreferrer">European Commission — certificate prices →</a>
      <a href="https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-communication-and-news_en" target="_blank" rel="noopener noreferrer">European Commission — CBAM communication & news →</a>
      <a href="/cbam-compliance-checklist">Open compliance checklist →</a>
      <a href="/cbam-calculator">Estimate CBAM exposure →</a>
    </div>
  </ContentPage>;
}
