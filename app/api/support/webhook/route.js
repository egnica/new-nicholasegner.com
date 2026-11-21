import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.STRIPE_SECRET_KEY) {
    return new Response("Webhook unavailable", { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type !== "payment_intent.succeeded") return Response.json({ received: true });

  const eventIntent = event.data.object;
  if (eventIntent.metadata?.source !== "nicholasegner.com/support") {
    return Response.json({ received: true });
  }

  const intent = await stripe.paymentIntents.retrieve(eventIntent.id);
  if (intent.status !== "succeeded" || intent.metadata.support_email_sent === "true") {
    return Response.json({ received: true });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Support notification: RESEND_API_KEY is missing.");
    return new Response("Email unavailable", { status: 500 });
  }

  const message = (intent.metadata.message || "").slice(0, 500);
  const amount = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(intent.amount_received / 100);
  const email = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `support-notice/${intent.id}`,
    },
    body: JSON.stringify({
      from: "Nicholas Egner Website <nick@nicholasegner.com>",
      to: ["nick@nicholasegner.com"],
      subject: `New ${amount} support payment`,
      text: `A support payment of ${amount} succeeded.\n\n${message ? `Message:\n${message}\n\n` : "No message was left.\n\n"}Stripe payment: ${intent.id}`,
    }),
  });

  if (!email.ok) {
    console.error("Support notification failed:", email.status);
    return new Response("Email failed", { status: 500 });
  }

  try {
    await stripe.paymentIntents.update(intent.id, { metadata: { support_email_sent: "true" } });
  } catch (error) {
    console.error("Support notification marker failed:", error);
    return new Response("Marker failed", { status: 500 });
  }

  return Response.json({ received: true });
}
