"use client";

export default function AutomaticPaymentResult(){
  const subject=encodeURIComponent("CBAM Professional Report payment verification");
  const body=encodeURIComponent("Hello CBAMTools,\n\nI paid €49 using the CBAMTools PayPal Payment Link.\n\nPayPal transaction ID:\nPayPal payer email:\nReport delivery email:\nReport reference:\n");
  return <section className="payment-status-card">
    <span className="kicker">PAYMENT VERIFICATION</span>
    <h1>Send your PayPal transaction ID to verify the €49 Professional Report.</h1>
    <p>CBAMTools no longer uses an API-based automatic PayPal verification flow. After payment through the PayPal Payment Link, send the transaction ID and payer email for verification.</p>
    <a className="primary-status-action" href={`mailto:sales@cbamtools.com?subject=${subject}&body=${body}`}>Send payment verification</a>
    <a className="secondary-status-action" href="/checkout">Return to checkout</a>
  </section>;
}
