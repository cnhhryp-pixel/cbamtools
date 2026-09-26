import type {Metadata} from "next";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";

export const metadata:Metadata={title:"Payment Confirmation | CBAMTools",robots:{index:false,follow:false}};

export default function PaymentSuccess(){
  const subject=encodeURIComponent("CBAM Professional Report payment confirmation");
  const body=encodeURIComponent("Hello CBAMTools,\n\nI completed the PayPal payment.\nPayPal transaction ID: \nPayer email: \nCompany: \nReport delivery email: \nReport reference: \n");
  return <>
    <SiteHeader/>
    <main className="payment-status-page">
      <section className="payment-status-card">
        <span className="status-icon">✓</span>
        <span className="kicker">PAYMENT CONFIRMATION</span>
        <h1>Send the transaction ID, then receive your report by email.</h1>
        <p>
          Payment verification is handled manually. Email the PayPal transaction ID, payer email and report delivery email.
          After verification, the Professional Report is delivered by email. Do not send passwords or card details.
        </p>
        <a className="primary-status-action" href={`mailto:sales@cbamtools.com?subject=${subject}&body=${body}`}>
          Email transaction ID
        </a>
        <a className="secondary-status-action" href="/download-report">How report delivery works</a>
      </section>
    </main>
    <SiteFooter/>
  </>;
}
