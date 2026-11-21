import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function amountInCents(value) {
  if (typeof value !== "string" || !/^(?:[1-9]\d{0,2})(?:\.\d{1,2})?$/.test(value)) {
    return null;
  }

  const [dollars, cents = ""] = value.split(".");
  const amount = Number(dollars) * 100 + Number(cents.padEnd(2, "0"));
  return amount >= 100 && amount <= 50000 ? amount : null;
}

export async function POST(request) {
  const origin = request.headers.get("origin");
  if ((origin && origin !== new URL(request.url).origin) || request.headers.get("sec-fetch-site") === "cross-site") {
    return Response.json({ error: "This request is not allowed." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const amount = amountInCents(body?.amount);
  if (!amount) {
    return Response.json({ error: "Enter an amount between $1 and $500." }, { status: 400 });
  }

  if (body?.message != null && (typeof body.message !== "string" || body.message.length > 500)) {
    return Response.json({ error: "Your message must be 500 characters or fewer." }, { status: 400 });
  }
  const message = (body?.message || "").trim();

  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json({ error: "Support payments are temporarily unavailable." }, { status: 503 });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      description: "Tip for Nicholas Egner's videos",
      metadata: { source: "nicholasegner.com/support", ...(message ? { message } : {}) },
    });

    return Response.json({ clientSecret: intent.client_secret });
  } catch (error) {
    console.error("Support payment setup failed:", error);
    return Response.json({ error: "Payment could not be started. Please try again." }, { status: 502 });
  }
}
