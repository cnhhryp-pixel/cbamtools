import ContentPage from "../../components/ContentPage";

export const metadata={
  title:"CBAM Enterprise Workflow | CBAMTools",
  description:"Assessment workflows for teams managing multiple products, suppliers and reporting inputs."
};

export default function Page(){
  return <ContentPage
    eyebrow="ENTERPRISE CBAM WORKFLOW"
    title="Organise CBAM assessments across products and teams"
    intro="CBAMTools helps companies structure product screening, emissions inputs, cost estimates and assessment documentation in one workflow."
  >
    <h2>Built for repeatable business workflows</h2>
    <p>Use one assessment path to organise product classification, supplier information, calculation assumptions and internal review across multiple products.</p>

    <div className="info-grid">
      <div><b>Import teams</b><p>Keep product, origin and assessment inputs organised across recurring reviews.</p></div>
      <div><b>Manufacturers</b><p>Structure product-level emissions inputs and supporting references for downstream assessment.</p></div>
      <div><b>Trading companies</b><p>Review multiple product categories while keeping the calculation workflow consistent.</p></div>
      <div><b>Compliance teams</b><p>Keep assumptions, open questions and assessment outputs visible for internal review.</p></div>
    </div>

    <h2>Typical workflow</h2>
    <ol className="steps">
      <li><b>Screen</b><span>Check the product code and scope before calculating.</span></li>
      <li><b>Collect</b><span>Gather origin, quantity and supplier emissions information.</span></li>
      <li><b>Model</b><span>Run a consistent calculation and preserve the assumptions.</span></li>
      <li><b>Document</b><span>Create structured assessment records for review.</span></li>
    </ol>

    <div className="callout">
      <b>Enterprise enquiries</b>
      <p>For multi-product workflows, report requirements or commercial questions, email <a href="mailto:sales@cbamtools.com">sales@cbamtools.com</a>.</p>
    </div>

    <p><a className="section-link" href="mailto:sales@cbamtools.com?subject=CBAMTools%20Enterprise%20Enquiry">Contact enterprise support →</a></p>
    <p><a className="section-link" href="/pricing">View report pricing →</a></p>
  </ContentPage>;
}
