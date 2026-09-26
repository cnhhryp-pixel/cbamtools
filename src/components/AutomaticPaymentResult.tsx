"use client";

import {useEffect,useState} from "react";
import {useSearchParams} from "next/navigation";
import {PAYMENT_API_BASE,PROFESSIONAL_REPORT_PRICE_LABEL} from "../lib/commercial";

type Status="idle"|"verifying"|"verified"|"error";

export default function AutomaticPaymentResult(){
  const q=useSearchParams();
  const orderId=q.get("token")||q.get("order_id")||"";
  const [status,setStatus]=useState<Status>(orderId?"verifying":"idle");
  const [message,setMessage]=useState("");
  const [downloadToken,setDownloadToken]=useState("");

  useEffect(()=>{
    if(!orderId) return;
    let cancelled=false;

    async function verify(){
      try{
        const raw=sessionStorage.getItem("cbam:auto-purchase");
        const purchase=raw?JSON.parse(raw):{};
        const response=await fetch(PAYMENT_API_BASE+"/v1/orders/capture",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            orderId,
            reportRef:purchase.reportRef||q.get("reportRef")||"",
            reportData:purchase
          })
        });
        const data=await response.json().catch(()=>({}));
        if(!response.ok || !data.downloadToken) throw new Error(data.error||"Payment could not be verified.");
        if(cancelled) return;
        setDownloadToken(data.downloadToken);
        setStatus("verified");
        setMessage("Payment verified. Your Professional Report is ready to download.");
      }catch(error){
        if(cancelled) return;
        setStatus("error");
        setMessage(error instanceof Error?error.message:"Payment verification failed.");
      }
    }

    verify();
    return ()=>{cancelled=true};
  },[orderId,q]);

  async function download(){
    if(!downloadToken) return;
    setMessage("Preparing your PDF…");
    try{
      const response=await fetch(PAYMENT_API_BASE+"/v1/reports/download",{
        headers:{Authorization:"Bearer "+downloadToken}
      });
      if(!response.ok) throw new Error("The secure download could not be generated.");
      const blob=await response.blob();
      const url=URL.createObjectURL(blob);
      const a=document.createElement("a");
      a.href=url;
      a.download="CBAMTools-Professional-Report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setMessage("Download started. This secure session remains valid for additional downloads until it expires.");
    }catch(error){
      setMessage(error instanceof Error?error.message:"Download failed.");
    }
  }

  if(status==="idle"){
    return <section className="payment-status-card">
      <span className="kicker">PAYMENT CONFIRMATION</span>
      <h1>Complete payment through the secure checkout.</h1>
      <p>If you used the manual PayPal fallback, email the transaction ID and payer email to sales@cbamtools.com for verification.</p>
      <a className="primary-status-action" href="/checkout">Return to checkout</a>
    </section>;
  }

  if(status==="verifying"){
    return <section className="payment-status-card">
      <span className="status-icon">…</span>
      <span className="kicker">AUTOMATIC VERIFICATION</span>
      <h1>Verifying your {PROFESSIONAL_REPORT_PRICE_LABEL} PayPal payment.</h1>
      <p>Please keep this page open while CBAMTools confirms the completed order.</p>
    </section>;
  }

  if(status==="verified"){
    return <section className="payment-status-card">
      <span className="status-icon">✓</span>
      <span className="kicker">PAYMENT VERIFIED</span>
      <h1>Your Professional Report is ready.</h1>
      <p>{message}</p>
      <button className="primary-status-action status-download-button" type="button" onClick={download}>Download Professional PDF</button>
      <a className="secondary-status-action" href="/cbam-calculator">Start another assessment</a>
    </section>;
  }

  return <section className="payment-status-card">
    <span className="status-icon status-muted">!</span>
    <span className="kicker">VERIFICATION NEEDS REVIEW</span>
    <h1>We could not automatically verify this payment.</h1>
    <p>{message}</p>
    <a className="primary-status-action" href="mailto:sales@cbamtools.com?subject=CBAM%20Professional%20Report%20payment%20verification">Contact payment support</a>
    <a className="secondary-status-action" href="/checkout">Return to checkout</a>
  </section>;
}
