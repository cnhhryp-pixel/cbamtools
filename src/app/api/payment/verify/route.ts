export const runtime = "edge";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  return Response.json({
    message: "Payment verification endpoint ready",
    orderId: body.orderId || null,
    verified: false,
    note: "Connect PayPal API credentials to enable verification.",
  });
}
