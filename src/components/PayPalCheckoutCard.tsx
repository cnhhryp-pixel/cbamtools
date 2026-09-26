"use client";

import {useState} from "react";
import {useSearchParams} from "next/navigation";
import {
  PAYMENT_API_BASE,
  PROFESSIONAL_REPORT_AMOUNT,
  PROFESSIONAL_REPORT_CURRENCY,
  PROFESSIONAL_REPORT_PRICE_LABEL
} from "../lib/commercial";

const PAYMENT_EMAIL="cnhhryp@gmail.com";
const SUPPORT_EMAIL="sales@cbamtools.com";
const PAYPAL_SEND_URL="https://www.paypal.com/myaccount/transfer/send";
const fmt=new Intl.NumberFormat("en-IE",{maximumFractionDigits:2});

export default function PayPalCheckoutCard(){
  const [copiedEmail,setCopiedEmail]=useState(false);
  const [copiedRef,setCopiedRef]=useState(false);
  const [autoBusy,setAutoBusy]=useState(false);
  const [autoError,setAutoError]=useState("");
  const q=useSearchParams();

  const sector=q.get("sector")||"";
  const code=q.get("code")||"";
  const country=q.get("country")||"";
  const quantity=q.get("quantity")||"";
  const emissions=q.get("emission")||"";
  const certificatePrice=q.get("price")||"";
  const cost=q.get("cost")||"";
  const reportRef=q.get("reportRef")||"";
  const paymentRef=reportRef||"CBAM-PRO-REPORT";

  const [company,setCompany]=useState(q.get("company")||"");
  const [contact,setContact]=useState(q.get("contact")||"");

  const hasAssessment=Boolean(sector||code||country||quantity||cost);
  const reportParams=new URLSearchParams(q.toString());
  if(company) reportParams.set("company",company); else reportParams.delete("company");
  if(contact) reportParams.set("contact",contact); else reportParams.delete("contact");
  const reportHref=hasAssessment?"/report?"+reportParams.toString():"/report";

  const purchasePayload={
    reportRef:paymentRef,
    company,
    contact,
    assessment:{sector,code,country,quantity,emissions,certificatePrice,cost}
  };

  const subject=encodeURIComponent("CBAM Professional Report payment confirmation");
  const summary=[
    sector&&`Sector: ${sector}`,
    code&&`CN / HS code: ${code}`,
    country&&`Origin: ${country}`,
    quantity&&`Quantity: ${quantity} tonnes`,
    cost&&`Estimated CBAM cost: €${fmt.format(Number(cost)||0)}`,
    company&&`Company: ${company}`,
    contact&&`Report delivery email: ${contact}`,
    `Payment reference: ${paymentRef}`,
    `Report price: ${PROFESSIONAL_REPORT_PRICE_LABEL}`
  ].filter(Boolean).join("\n");

  const body=encodeURIComponent(`Hello CBAMTools,

I paid ${PROFESSIONAL_REPORT_PRICE_LABEL} for the CBAM Professional Report.

PayPal transaction ID:
PayPal payer email:
Company: ${company}
Report delivery email: ${contact}
Payment reference: ${paymentRef}

Assessment details:
${summary||"No calculator details attached."}

Please verify the payment and provide report access.
`);

  async function startAutomaticCheckout(){
    setAutoError("");
    if(!contact || !contact.includes("@")){
      setAutoError("Enter a valid report delivery email before starting payment.");
      return;
    }
    setAutoBusy(true);
    try{
      sessionStorage.setItem("cbam:auto-purchase",JSON.stringify(purchasePayload));
      const response=await fetch(PAYMENT_API_BASE+"/v1/orders/create",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(purchasePayload)
      });
      const data=await response.json().catch(()=>({}));
      if(!response.ok || !data.approveUrl) throw new Error(data.error||"Automatic checkout is not available.");
      window.location.assign(data.approveUrl);
    }catch(error){
      setAutoError(error instanceof Error?error.message:"Automatic checkout is not available.");
      setAutoBusy(false);
    }
  }

  async function copyText(value:string,type:"email"|"ref"){
    try{
      await navigator.clipboard.writeText(value);
      if(type==="email"){setCopiedEmail(true);window.setTimeout(()=>setCopiedEmail(false),1800)}
      else{setCopiedRef(true);window.setTimeout(()=>setCopiedRef(false),1800)}
    }catch{
      if(type==="email") setCopiedEmail(false); else setCopiedRef(false);
    }
  }

  return <section className="checkout-card">
    <div className="checkout-summary">
      <span className="checkout-badge">PROFESSIONAL REPORT</span>
      <h2>CBAM Professional Report</h2>
      <p>One-time purchase with automatic PayPal verification and secure self-service PDF download when the payment API is available.</p>
      <div className="checkout-price"><strong>{PROFESSIONAL_REPORT_PRICE_LABEL}</strong><span>one-time payment</span></div>

      {hasAssessment&&<div className="checkout-assessment">
        <small>CURRENT ASSESSMENT</small>
        <div><span>Sector</span><b>{sector||"—"}</b></div>
        <div><span>CN / HS</span><b>{code||"—"}</b></div>
        <div><span>Origin</span><b>{country||"—"}</b></div>
        <div><span>Quantity</span><b>{quantity?quantity+" t":"—"}</b></div>
        <div><span>Payment ref</span><b>{paymentRef}</b></div>
        {company&&<div><span>Prepared for</span><b>{company}</b></div>}
        <div className="checkout-assessment-total"><span>Estimated CBAM cost</span><b>{cost?"€"+fmt.format(Number(cost)||0):"—"}</b></div>
        <a href={reportHref}>← Review report preview</a>
      </div>}

      <ul className="checkout-list">
        <li>Structured CBAM assessment summary</li>
        <li>Product, CN / HS code and origin details</li>
        <li>Emissions and certificate-cost calculation</li>
        <li>Automatic payment verification & secure PDF download</li>
      </ul>
    </div>

    <div className="checkout-pay">
      <span className="checkout-step">REPORT DELIVERY</span>
      <h3>Who should receive the Professional Report?</h3>
      <div className="checkout-buyer-fields">
        <label>Company / organisation<input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Company name"/></label>
        <label>Report delivery email<input type="email" value={contact} onChange={e=>setContact(e.target.value)} placeholder="name@company.com"/></label>
      </div>

      <div className="checkout-divider"/>
      <span className="checkout-step">AUTOMATIC CHECKOUT</span>
      <h3>Pay {PROFESSIONAL_REPORT_PRICE_LABEL} with PayPal</h3>
      <p className="checkout-muted">Creates a PayPal order for exactly {PROFESSIONAL_REPORT_AMOUNT} {PROFESSIONAL_REPORT_CURRENCY}. After approval, CBAMTools verifies the completed order and unlocks the PDF.</p>
      <button className="auto-paypal-btn" type="button" disabled={autoBusy} onClick={startAutomaticCheckout}>
        {autoBusy?"Opening PayPal…":`Pay ${PROFESSIONAL_REPORT_PRICE_LABEL} & unlock PDF →`}
      </button>
      {autoError&&<div className="auto-payment-error"><b>Automatic checkout unavailable</b><span>{autoError}</span><small>Use the manual PayPal fallback below while the secure payment API is unavailable.</small></div>}

      <div className="checkout-divider"/>
      <span className="checkout-step">MANUAL FALLBACK</span>
      <p className="checkout-muted">Send exactly <b>{PROFESSIONAL_REPORT_PRICE_LABEL}</b> to the PayPal account below, then email the transaction ID for manual verification.</p>
      <div className="recipient-box">
        <span>PAYPAL RECIPIENT</span>
        <b>{PAYMENT_EMAIL}</b>
        <button type="button" onClick={()=>copyText(PAYMENT_EMAIL,"email")}>{copiedEmail?"Copied":"Copy email"}</button>
      </div>
      <div className="payment-reference-box">
        <div><span>PAYMENT NOTE / REFERENCE</span><b>{paymentRef}</b><small>Add this reference in the PayPal note when available.</small></div>
        <button type="button" onClick={()=>copyText(paymentRef,"ref")}>{copiedRef?"Copied":"Copy reference"}</button>
      </div>
      <a className="paypal-open-btn" href={PAYPAL_SEND_URL} target="_blank" rel="noopener noreferrer">Open PayPal manually →</a>

      <div className="checkout-divider"/>
      <span className="checkout-step">MANUAL VERIFICATION</span>
      <a className="confirm-payment-btn" href={`mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`}>Email payment confirmation</a>
      <p className="checkout-small">Never email PayPal passwords or card details. For manual verification, only send the transaction ID and payer email.</p>
    </div>
  </section>;
}
