import type {Metadata} from "next";
import {Suspense} from "react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import PayPalCheckoutCard from "../../components/PayPalCheckoutCard";

export const metadata:Metadata={
  title:"Checkout | CBAM Professional Report",
  description:"Purchase a €49 CBAM Professional Report using the official CBAMTools PayPal payment link.",
  robots:{index:false,follow:false}
};

export default function CheckoutPage(){
  return <>
    <SiteHeader/>
    <main className="checkout-page">
      <section className="checkout-hero">
        <span className="kicker">PAYPAL CHECKOUT</span>
        <h1>Upgrade your assessment to a Professional Report.</h1>
        <p>Pay €49 through the CBAMTools PayPal payment link, send the transaction ID for verification, then receive the completed PDF by email or private delivery link.</p>
        <div className="checkout-flow">
          <div><b>01</b><span>Review assessment</span></div>
          <i>→</i>
          <div><b>02</b><span>Pay €49 in PayPal</span></div>
          <i>→</i>
          <div><b>03</b><span>Send transaction ID</span></div>
          <i>→</i>
          <div><b>04</b><span>Receive Professional PDF</span></div>
        </div>
      </section>

      <Suspense fallback={<section className="checkout-card"><div className="checkout-pay"><b>Preparing checkout…</b></div></section>}>
        <PayPalCheckoutCard/>
      </Suspense>

      <section className="checkout-trust">
        <div><small>PRICE</small><b>€49 one-time</b><span>No subscription is created by CBAMTools.</span></div>
        <div><small>PAYMENT</small><b>PayPal Payment Link</b><span>Payment is completed on PayPal. No PayPal password or card data is entered on CBAMTools.</span></div>
        <div><small>DELIVERY</small><b>Verified report delivery</b><span>After we match the transaction ID to the report reference, the clean PDF is delivered to your report email.</span></div>
      </section>

      <section className="checkout-help">
        <div><b>Payment or delivery question?</b><span>Contact <a href="mailto:sales@cbamtools.com">sales@cbamtools.com</a></span></div>
        <div><b>Purchase terms</b><span>Review the <a href="/refund-policy">refund policy</a> and <a href="/terms">terms of service</a>.</span></div>
      </section>
    </main>
    <SiteFooter/>
  </>;
}
