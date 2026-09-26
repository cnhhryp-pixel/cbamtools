import type {Metadata} from "next";
import {Suspense} from "react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import PayPalCheckoutCard from "../../components/PayPalCheckoutCard";

export const metadata:Metadata={
  title:"Checkout | CBAM Professional Report",
  description:"Purchase a CBAM Professional Report using PayPal.",
  robots:{index:false,follow:false}
};

export default function CheckoutPage(){
  return <>
    <SiteHeader/>
    <main className="checkout-page">
      <section className="checkout-hero">
        <span className="kicker">SECURE CHECKOUT</span>
        <h1>Upgrade your assessment to a professional report.</h1>
        <p>Review the assessment, pay with PayPal, return for automatic verification, then download the Professional PDF.</p>
        <div className="checkout-flow">
          <div><b>01</b><span>Review assessment</span></div>
          <i>→</i>
          <div><b>02</b><span>Pay in PayPal</span></div>
          <i>→</i>
          <div><b>03</b><span>Automatic verification</span></div>
          <i>→</i>
          <div><b>04</b><span>Download PDF</span></div>
        </div>
      </section>

      <Suspense fallback={<section className="checkout-card"><div className="checkout-pay"><b>Preparing checkout…</b></div></section>}>
        <PayPalCheckoutCard/>
      </Suspense>

      <section className="checkout-trust">
        <div><small>PRICE</small><b>€49 one-time</b><span>No subscription is created by CBAMTools.</span></div>
        <div><small>PAYMENT</small><b>Completed on PayPal</b><span>Your PayPal login stays on PayPal.</span></div>
        <div><small>DELIVERY</small><b>Secure self-service download</b><span>After PayPal approval, CBAMTools verifies the completed order and unlocks the Professional PDF. Manual email verification remains available as a fallback.</span></div>
      </section>

      <section className="checkout-help">
        <div><b>Need help before paying?</b><span>Contact <a href="mailto:sales@cbamtools.com">sales@cbamtools.com</a></span></div>
        <div><b>Purchase terms</b><span>Review the <a href="/refund-policy">refund policy</a> and <a href="/terms">terms of service</a>.</span></div>
      </section>
    </main>
    <SiteFooter/>
  </>;
}
