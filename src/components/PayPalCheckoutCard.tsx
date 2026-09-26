"use client";

import {useState} from "react";
import {useSearchParams} from "next/navigation";
import {PROFESSIONAL_REPORT_PRICE_LABEL,PAYPAL_PAYMENT_LINK} from "../lib/commercial";

const SUPPORT_EMAIL="sales@cbamtools.com";
const fmt=new Intl.NumberFormat("en-IE",{maximumFractionDigits:2});

export default function PayPalCheckoutCard(){
  const [copiedRef,setCopiedRef]=useState(false);
  const [copiedVerification,setCopiedVerification]=useState(false);
  const [flowError,setFlowError]=useState("");
  const [emailTouched,setEmailTouched]=useState(false);
  const q=useSearchParams();

  const sector=q.get("sector")||"";
  const code=q.get("code")||"";
  const country=q.get("country")||"";
  const quantity=q.get("quantity")||"";
  const cost=q.get("cost")||"";
  const reportRef=q.get("reportRef")||"";
  const paymentRef=reportRef||"CBAM-PRO-REPORT";

  const [company,setCompany]=useState(q.get("company")||"");
  const [contact,setContact]=useState(q.get("contact")||"");

  const hasAssessment=Boolean(sector||code||country||quantity||cost);
  const hasFullAssessment=Boolean(reportRef&&sector&&code&&country&&quantity&&cost);
  const normalizedContact=contact.trim();
  const hasValidContact=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedContact);
  const emailError=!normalizedContact?"Enter the report delivery email.":!hasValidContact?"Check the email format, for example name@company.com.":"";
  const canStartPayment=hasFullAssessment&&hasValidContact;
  const reportParams=new URLSearchParams(q.toString());
  if(company) reportParams.set("company",company); else reportParams.delete("company");
  if(contact) reportParams.set("contact",contact); else reportParams.delete("contact");
  const reportHref=hasAssessment?"/report?"+reportParams.toString():"/cbam-assessment-report";

  const subject=encodeURIComponent("CBAM Professional Report payment verification");
  const summary=[
    `Report price: ${PROFESSIONAL_REPORT_PRICE_LABEL}`,
    `Report reference: ${paymentRef}`,
    company&&`Company: ${company}`,
    contact&&`Report delivery email: ${contact}`,
    sector&&`Sector: ${sector}`,
    code&&`CN / HS code: ${code}`,
    country&&`Origin: ${country}`,
    quantity&&`Quantity: ${quantity} tonnes`,
    cost&&`Estimated CBAM cost: €${fmt.format(Number(cost)||0)}`
  ].filter(Boolean).join("\n");

  const verificationText=`Hello CBAMTools,

I paid ${PROFESSIONAL_REPORT_PRICE_LABEL} using the CBAMTools PayPal Payment Link.

PayPal transaction ID:
PayPal payer email:
Company: ${company}
Report delivery email: ${contact}
Report reference: ${paymentRef}

Assessment details:
${summary}

Please verify the payment and deliver the Professional Report.
`;
  const body=encodeURIComponent(verificationText);

  async function copyReference(){
    try{
      await navigator.clipboard.writeText(paymentRef);
      setCopiedRef(true);
      window.setTimeout(()=>setCopiedRef(false),1800);
    }catch{
      setCopiedRef(false);
    }
  }

  async function copyVerification(){
    try{
      await navigator.clipboard.writeText(verificationText);
      setCopiedVerification(true);
      window.setTimeout(()=>setCopiedVerification(false),1800);
    }catch{
      setCopiedVerification(false);
    }
  }

  function guardPayment(event:React.MouseEvent<HTMLAnchorElement>){
    if(canStartPayment){
      setFlowError("");
      return;
    }
    event.preventDefault();
    setEmailTouched(true);
    setFlowError(!hasFullAssessment
      ?"Create the assessment report first so the €49 purchase can be matched to the correct report."
      :emailError);
  }

  return <section className="checkout-card">
    <div className="checkout-summary">
      <span className="checkout-badge">PROFESSIONAL REPORT</span>
      <h2>CBAM Professional Report</h2>
      <p>One-time €49 purchase through the CBAMTools PayPal Payment Link.</p>
      <div className="checkout-price"><strong>{PROFESSIONAL_REPORT_PRICE_LABEL}</strong><span>one-time payment</span></div>

      {hasAssessment&&<div className="checkout-assessment">
        <small>CURRENT ASSESSMENT</small>
        <div><span>Sector</span><b>{sector||"—"}</b></div>
        <div><span>CN / HS</span><b>{code||"—"}</b></div>
        <div><span>Origin</span><b>{country||"—"}</b></div>
        <div><span>Quantity</span><b>{quantity?quantity+" t":"—"}</b></div>
        <div><span>Report ref</span><b>{paymentRef}</b></div>
        {company&&<div><span>Prepared for</span><b>{company}</b></div>}
        <div className="checkout-assessment-total"><span>Estimated CBAM cost</span><b>{cost?"€"+fmt.format(Number(cost)||0):"—"}</b></div>
        <a href={reportHref}>← Review report preview</a>
      </div>}

      <ul className="checkout-list">
        <li>Clean Professional Report without the free-preview watermark</li>
        <li>Calculation inputs and assessment summary</li>
        <li>Assumptions, source references and verification checklist</li>
        <li>PDF delivery after PayPal transaction verification</li>
      </ul>
    </div>

    <div className="checkout-pay">
      <span className="checkout-step">REPORT DELIVERY</span>
      <h3>Where should we send the Professional Report?</h3>
      <div className="checkout-buyer-fields">
        <label>Company / organisation<input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Company name"/></label>
        <label>Report delivery email<input type="email" inputMode="email" autoComplete="email" spellCheck={false} value={contact} onChange={e=>{setContact(e.target.value);setFlowError("");}} onBlur={()=>{setEmailTouched(true);setContact(contact.trim());}} aria-invalid={emailTouched&&!hasValidContact} placeholder="name@company.com"/><small className="checkout-email-help">Used to deliver the verified Professional Report.</small></label>
      </div>
      {!hasFullAssessment&&<div className="checkout-requirement"><b>Assessment required before payment</b><span>The Professional Report is generated from a completed CBAM assessment. Create the report preview first, then return to checkout.</span><a href="/cbam-calculator">Start CBAM calculation →</a></div>}
      {emailTouched&&emailError&&<div className="checkout-field-error">{emailError}</div>}

      <div className="checkout-divider"/>
      <span className="checkout-step">STEP 1</span>
      <h3>Pay {PROFESSIONAL_REPORT_PRICE_LABEL} on PayPal</h3>
      <p className="checkout-muted">Open the CBAMTools PayPal Payment Link in a new tab and complete the payment on PayPal.</p>
      <a className={"auto-paypal-btn"+(!canStartPayment?" is-disabled":"")} href={canStartPayment?PAYPAL_PAYMENT_LINK:"#"} target={canStartPayment?"_blank":undefined} rel={canStartPayment?"noopener noreferrer":undefined} aria-disabled={!canStartPayment} onClick={guardPayment}>Pay {PROFESSIONAL_REPORT_PRICE_LABEL} with PayPal →</a>
      {flowError&&<div className="checkout-flow-error">{flowError}</div>}

      <div className="payment-reference-box">
        <div>
          <span>REPORT REFERENCE</span>
          <b>{paymentRef}</b>
          <small>Keep this reference with your payment confirmation so we can match the purchase to the correct assessment.</small>
        </div>
        <button type="button" onClick={copyReference}>{copiedRef?"Copied":"Copy reference"}</button>
      </div>

      <div className="checkout-divider"/>
      <span className="checkout-step">STEP 2</span>
      <h3>Already paid?</h3>
      <p className="checkout-muted">Send the PayPal transaction ID and payer email. The email is pre-filled with your report reference and delivery details.</p>
      <a className="confirm-payment-btn" href={`mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`}>I have paid — send verification details</a>
      <button className="copy-verification-btn" type="button" onClick={copyVerification}>{copiedVerification?"Copied verification details":"Copy verification details"}</button>
      <p className="checkout-small">Never send a PayPal password or card details. Only the transaction ID and payer email are needed for verification.</p>
    </div>
  </section>;
}
