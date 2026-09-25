"use client";

import {useState} from "react";
import {useSearchParams} from "next/navigation";

const PAYMENT_EMAIL="cnhhryp@gmail.com";
const PRICE="$9.90 USD";
const PAYPAL_SEND_URL="https://www.paypal.com/myaccount/transfer/send";
const fmt=new Intl.NumberFormat("en-IE",{maximumFractionDigits:2});

export default function PayPalCheckoutCard(){
  const [copied,setCopied]=useState(false);
  const q=useSearchParams();
  const sector=q.get("sector")||"";
  const code=q.get("code")||"";
  const country=q.get("country")||"";
  const quantity=q.get("quantity")||"";
  const cost=q.get("cost")||"";
  const reportRef=q.get("reportRef")||"";
  const [company,setCompany]=useState(q.get("company")||"");
  const [contact,setContact]=useState(q.get("contact")||"");

  const hasAssessment=Boolean(sector||code||country||quantity||cost);
  const reportParams=new URLSearchParams(q.toString());
  if(company) reportParams.set("company",company); else reportParams.delete("company");
  if(contact) reportParams.set("contact",contact); else reportParams.delete("contact");
  const reportHref=hasAssessment?"/report?"+reportParams.toString():"/report";

  const subject=encodeURIComponent("CBAM Professional Report payment confirmation");
  const summary=[
    sector&&`Sector: ${sector}`,
    code&&`CN / HS code: ${code}`,
    country&&`Origin: ${country}`,
    quantity&&`Quantity: ${quantity} tonnes`,
    cost&&`Estimated CBAM cost: €${fmt.format(Number(cost)||0)}`,
    company&&`Company: ${company}`,
    contact&&`Contact: ${contact}`,
    reportRef&&`Report reference: ${reportRef}`
  ].filter(Boolean).join("\n");

  const body=encodeURIComponent(`Hello CBAMTools,

I paid for the CBAM Professional Report.

PayPal transaction ID:
PayPal payer email:
Company: ${company}
Contact: ${contact}
Report reference: ${reportRef}

Assessment details:
${summary||"No calculator details attached."}

Please verify the payment and provide professional report access.
`);

  async function copyRecipient(){
    try{
      await navigator.clipboard.writeText(PAYMENT_EMAIL);
      setCopied(true);
      window.setTimeout(()=>setCopied(false),1800);
    }catch{
      setCopied(false);
    }
  }

  return <section className="checkout-card">
    <div className="checkout-summary">
      <span className="checkout-badge">PROFESSIONAL REPORT</span>
      <h2>CBAM Professional Report</h2>
      <p>One-time purchase for a structured professional assessment report. Your calculator inputs and assumptions stay visible for review.</p>
      <div className="checkout-price"><strong>{PRICE}</strong><span>one-time payment</span></div>

      {hasAssessment&&<div className="checkout-assessment">
        <small>CURRENT ASSESSMENT</small>
        <div><span>Sector</span><b>{sector||"—"}</b></div>
        <div><span>CN / HS</span><b>{code||"—"}</b></div>
        <div><span>Origin</span><b>{country||"—"}</b></div>
        <div><span>Quantity</span><b>{quantity?quantity+" t":"—"}</b></div>
        {reportRef&&<div><span>Report ref</span><b>{reportRef}</b></div>}
        {company&&<div><span>Prepared for</span><b>{company}</b></div>}
        <div className="checkout-assessment-total"><span>Estimated cost</span><b>{cost?"€"+fmt.format(Number(cost)||0):"—"}</b></div>
        <a href={reportHref}>← Review report preview</a>
      </div>}

      <ul className="checkout-list">
        <li>Structured CBAM assessment summary</li>
        <li>Product, CN / HS code and origin details</li>
        <li>Emissions and certificate-cost calculation</li>
        <li>Assumptions and verification checklist</li>
      </ul>
    </div>

    <div className="checkout-pay">
      <span className="checkout-step">REPORT DETAILS</span>
      <h3>Who should the professional report be prepared for?</h3>
      <div className="checkout-buyer-fields">
        <label>Company / organisation<input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Company name"/></label>
        <label>Contact email<input type="email" value={contact} onChange={e=>setContact(e.target.value)} placeholder="name@company.com"/></label>
      </div>

      <div className="checkout-divider"/>
      <span className="checkout-step">STEP 1</span>
      <h3>Pay securely with PayPal</h3>
      <p className="checkout-muted">Send <b>{PRICE}</b> to the PayPal account below. For purchases, use the goods / services option when PayPal offers it.</p>
      <div className="recipient-box"><span>PAYPAL RECIPIENT</span><b>{PAYMENT_EMAIL}</b><button type="button" onClick={copyRecipient}>{copied?"Copied":"Copy email"}</button></div>
      <a className="paypal-open-btn" href={PAYPAL_SEND_URL} target="_blank" rel="noopener noreferrer">Open PayPal →</a>

      <div className="checkout-divider"/>
      <span className="checkout-step">STEP 2</span>
      <h3>Confirm your transaction</h3>
      <p className="checkout-muted">After payment, email the PayPal transaction ID so the purchase can be matched to this assessment and report access can be provided.</p>
      <a className="confirm-payment-btn" href={`mailto:${PAYMENT_EMAIL}?subject=${subject}&body=${body}`}>Email payment confirmation</a>
      <p className="checkout-small">Automatic transaction verification is not enabled yet. Do not send passwords or card details by email. Only send the PayPal transaction ID and payer email.</p>
    </div>
  </section>;
}
