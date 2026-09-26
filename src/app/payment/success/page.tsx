import type {Metadata} from "next";
import {Suspense} from "react";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import AutomaticPaymentResult from "../../../components/AutomaticPaymentResult";

export const metadata:Metadata={title:"Payment Verification | CBAMTools",robots:{index:false,follow:false}};

export default function PaymentSuccess(){
  return <>
    <SiteHeader/>
    <main className="payment-status-page">
      <Suspense fallback={<section className="payment-status-card"><h1>Verifying payment…</h1></section>}>
        <AutomaticPaymentResult/>
      </Suspense>
    </main>
    <SiteFooter/>
  </>;
}
