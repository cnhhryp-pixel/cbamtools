import ContentPage from "../../components/ContentPage";

export const metadata={
 title:"CBAM Enterprise Workflow | CBAMTools",
 description:"CBAM assessment workflows for importers, manufacturers, trading companies and supply chain teams managing multiple products and data inputs."
};

export default function Page(){return <ContentPage eyebrow="ENTERPRISE CBAM WORKFLOW" title="Organise CBAM assessments across products and teams" intro="CBAMTools helps companies structure product screening, emissions inputs, cost estimates and assessment documentation in one workflow.">
<h2>Built for business workflows</h2>
<p>Companies often need to connect product classification, supplier information, emissions assumptions and internal review. CBAMTools provides practical tools to organise these preparation steps.</p>
<div className="info-grid">
<div><b>EU Importers</b><p>Screen imported products and prepare potential CBAM exposure assessments before reporting workflows.</p></div>
<div><b>Manufacturers</b><p>Organise embedded emissions information and product-level assessment inputs.</p></div>
<div><b>Trading Companies</b><p>Review multiple product categories and keep assessment information structured.</p></div>
<div><b>Compliance Teams</b><p>Support internal review with visible assumptions and calculation records.</p></div>
</div>
<h2>Typical workflow</h2>
<ol className="steps">
<li><b>Screen</b><span>Check product scope and CN / HS classification.</span></li>
<li><b>Collect</b><span>Gather origin, quantity and supplier emissions information.</span></li>
<li><b>Model</b><span>Estimate potential CBAM certificate exposure.</span></li>
<li><b>Document</b><span>Create structured assessment records for review.</span></li>
</ol>
<div className="callout"><b>Enterprise access</b><p>Contact us for workflow requirements, reporting needs and future business solutions.</p></div>
</ContentPage>}