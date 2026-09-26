import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata={title:"Refund Policy | CBAMTools"};

export default function RefundPolicyPage(){
  return <>
    <SiteHeader/>
    <main className="policy-page">
      <span className="kicker">PURCHASE POLICY</span>
      <h1>Refund Policy</h1>
      <p>
        Professional Reports are delivered by email after payment verification. If the file is too large for an attachment,
        a private delivery link may be sent instead. If you paid by mistake, were charged incorrectly, or have not received
        the purchased report, contact us at <a href="mailto:sales@cbamtools.com">sales@cbamtools.com</a> with the PayPal transaction ID.
      </p>
      <p>
        Refund eligibility can depend on whether the digital report has already been prepared or delivered and on the applicable
        PayPal and consumer-protection rules for the transaction.
      </p>
    </main>
    <SiteFooter/>
  </>;
}
