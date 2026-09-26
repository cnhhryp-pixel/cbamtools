import type {Metadata} from "next";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";

export const metadata:Metadata={title:"Payment Verification | CBAMTools",robots:{index:false,follow:false}};

export default function PaymentSuccess(){
  const subject=encodeURIComponent("CBAM Professional Report payment verification");
  const body=encodeURIComponent("Hello CBAMTools,\n\nI paid €49 using the CBAMTools PayPal Payment Link.\n\nPayPal transaction ID:\nPayPal payer email:\nCompany:\nReport delivery email:\nReport reference:\n");
  return <>
    <SiteHeader/>
    <main className="payment-status-page">
      <section className="payment-status-card">
        <span className="status-icon">✓</span>
        <span className="kicker">PAYMENT VERIFICATION</span>
        <h1>Paid with PayPal? Send the transaction ID to verify your report.</h1>
        <p>CBAMTools uses PayPal transaction verification for the €49 Professional Report. After verification, the clean PDF is delivered by email or a private delivery link.</p>
        <a className="primary-status-action" href={`mailto:sales@cbamtools.com?subject=${subject}&body=${body}`}>Send payment verification</a>
        <a className="secondary-status-action" href="/checkout">Return to checkout</a>
      </section>
    </main>
    <SiteFooter/>
  </>;
}
