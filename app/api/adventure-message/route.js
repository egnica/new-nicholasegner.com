import { resolveTrackedContact } from "../_shared/contactTracking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_ENDPOINT = "https://api.resend.com/emails";

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (body?.website) return Response.json({ ok: true });
    const trackingId = String(body?.trackingId || "").trim().toUpperCase();
    const message = String(body?.message || "").trim();
    if (!message || message.length > 500) {
      return Response.json({ error: "Enter a message of 500 characters or fewer." }, { status: 400 });
    }

    // Read-only identity lookup; do NOT create an adventure_win event.
    const contact = await resolveTrackedContact(trackingId);
    if (!contact) return Response.json({ error: "Your player link could not be verified." }, { status: 400 });

    const key = process.env.RESEND_API_KEY;
    if (!key) return Response.json({ error: "Messages are unavailable right now." }, { status: 500 });

    const name = contact.firstName || "Tracked player";
    const response = await fetch(EMAIL_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Nicholas Egner Website <nick@nicholasegner.com>",
        to: ["nick@nicholasegner.com"],
        subject: `Game Message from ${name}`,
        text: `Game message from ${name}\nTracking ID: ${contact.trackingId}\n\n${message}`,
        html: `<div style="font-family:Arial,sans-serif;background:#0d1020;color:#f5f7ff;padding:24px"><h2>Game Message from ${escapeHtml(name)}</h2><p style="color:#9ba9bc">Tracking ID: ${escapeHtml(contact.trackingId)}</p><div style="white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</div></div>`,
      }),
    });
    if (!response.ok) {
      console.error("Adventure note email failed", response.status);
      return Response.json({ error: "Message could not be sent right now." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Adventure note error", error);
    return Response.json({ error: "Message could not be sent right now." }, { status: 500 });
  }
}
