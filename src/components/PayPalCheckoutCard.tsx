"use client";
import {useState} from "react";
const PAYMENT_EMAIL="cnhhryp@gmail.com";
const PRICE="$9.90 USD";
const PAYPAL_SEND_URL="https://www.paypal.com/myaccount/transfer/send";
export default function PayPalCheckoutCard(){
 const [copied,setCopied]=useState(false);
 const subject=encodeURIComponent("CBAM Professional Report payment confirmation");
 const body=encodeURIComponent("Hello CBAMTools,\n\nI paid for the CBAM Professional Report.\n\nPayPal transaction ID: \nPayPal payer email: \nCompany: \nReport / product reference: \n");
 async function copyRecipient(){try{await navigator.clipboard.writeText(PAYMENT_EMAIL);setCopied(true);window.setTimeout(()=>setCopied(false),1800)}catch{setCopied(false)}}
 return <section className="checkout-card">
  <div className="checkout-summary"><span className="checkout-badge">PROFESSIONAL REPORT</span><h2>CBAM Professional Report</h2><p>One-time purchase for a structured professional assessment report. Your calculator inputs and assumptions stay visible for review.</p><div className="checkout-price"><strong>{PRICE}</strong><span>one-time payment</span></div><ul className="checkout-list"><li>Structured CBAM assessment summary</li><li>Product, CN / HS code and origin details</li><li>Emissions and certificate-cost calculation</li><li>Assumptions and verification checklist</li></ul></div>
  <div className="checkout-pay"><span className="checkout-step">STEP 1</span><h3>Pay securely with PayPal</h3><p className="checkout-muted">Send <b>{PRICE}</b> to the PayPal account below. For purchases, use the goods / services option when PayPal offers it.</p><div className="recipient-box"><span>PAYPAL RECIPIENT</span><b>{PAYMENT_EMAIL}</b><button type="button" onClick={copyRecipient}>{copied?"Copied":"Copy email"}</button></div><a className="paypal-open-btn" href={PAYPAL_SEND_URL} target="_blank" rel="noopener noreferrer">Open PayPal →</a><div className="checkout-divider"/><span className="checkout-step">STEP 2</span><h3>Confirm your transaction</h3><p className="checkout-muted">After payment, email the PayPal transaction ID so the purchase can be verified and report access can be provided.</p><a className="confirm-payment-btn" href={`mailto:${PAYMENT_EMAIL}?subject=${subject}&body=${body}`}>Email payment confirmation</a><p className="checkout-small">Automatic transaction verification is not enabled yet. Do not send passwords or card details by email. Only send the PayPal transaction ID and payer email.</p></div>
 </section>
}