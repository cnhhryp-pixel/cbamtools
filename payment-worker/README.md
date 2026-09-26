# CBAMTools automatic PayPal verification

The public site can remain static on GitHub Pages. This small serverless service handles secure payment creation, server-side verification, and protected Professional PDF downloads.

## Flow

1. `POST /v1/orders/create` creates a PayPal order for exactly **EUR 49.00**.
2. The buyer approves payment on PayPal.
3. PayPal returns to `https://cbamtools.com/payment/success`.
4. The site calls `POST /v1/orders/capture`.
5. The Worker captures/verifies the order server-side and checks amount, currency and report reference.
6. A signed 24-hour download entitlement is returned.
7. `GET /v1/reports/download` generates and returns the Professional PDF.

## Required secrets

Configure these as Worker secrets. Never commit them to GitHub:

- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `DOWNLOAD_SIGNING_SECRET`

Optional vars:

- `PAYPAL_MODE=sandbox` while testing, then `live`
- `ALLOWED_ORIGIN=https://cbamtools.com`

## Deployment

1. Create a PayPal Business REST app.
2. Obtain the Client ID and Secret.
3. Copy `wrangler.toml.example` to `wrangler.toml`.
4. Configure a Worker custom domain such as `pay.cbamtools.com`.
5. Add the three secrets in Cloudflare.
6. Run `npm install` inside `payment-worker`.
7. Test with PayPal Sandbox.
8. Switch `PAYPAL_MODE` to `live` and deploy.

The static checkout keeps the existing manual PayPal flow as a fallback until the secure API is live.
