import type {Metadata} from "next";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata:Metadata={
  title:"Professional Report Delivery | CBAMTools",
  robots:{index:false,follow:false}
};

export default function DownloadReport(){
  return <>
    <SiteHeader/>
    <main className="payment-status-page">
      <section className="payment-status-card">
        <span className="kicker">PROFESSIONAL REPORT DELIVERY</span>
        <h1>Your verified report is delivered by email.</h1>
        <p>
          There is no public download link for paid reports. After we verify the PayPal transaction ID and payer email,
          the completed Professional Report is sent to the report delivery email supplied at checkout. If the file is too
          large for an attachment, we send a private delivery link by email instead.
        </p>
        <a className="primary-status-action" href="mailto:sales@cbamtools.com?subject=CBAM%20Professional%20Report%20payment%20verification">
          Send payment verification
        </a>
        <a className="secondary-status-action" href="/checkout">Return to checkout</a>
      </section>
    </main>
    <SiteFooter/>
  </>;
}
