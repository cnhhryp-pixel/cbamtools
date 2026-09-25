import ContentPage from "../../components/ContentPage";

export const metadata={
  title:"Disclaimer | CBAMTools",
  description:"Important limitations and intended use of CBAMTools calculators, reports and educational resources."
};

export default function DisclaimerPage(){
  return <ContentPage
    eyebrow="DISCLAIMER"
    title="Use CBAMTools as a planning and assessment aid"
    intro="CBAMTools helps structure calculations, product screening and assessment documentation. Outputs should be reviewed before compliance use."
    cta={false}
  >
    <h2>Planning estimates, not official declarations</h2>
    <p>Calculator and report outputs are intended to help organise business preparation and internal review. They do not replace official declarations, verified source data or professional advice where that is required.</p>

    <h2>Verify the underlying inputs</h2>
    <p>Users remain responsible for checking product classification, emissions inputs, applicable adjustments, price assumptions and other information used in an assessment.</p>

    <div className="callout">
      <b>Need help with a report purchase?</b>
      <p>Contact <a href="mailto:cnhhryp@gmail.com">cnhhryp@gmail.com</a> and include the report reference or PayPal transaction ID where relevant.</p>
    </div>

    <p><a className="section-link" href="/cbam-calculator">Open calculator →</a></p>
    <p><a className="section-link" href="/terms">Read terms of service →</a></p>
  </ContentPage>;
}
