export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const CONTACT_TO = "nick@nicholasegner.com";
const CONTACT_FROM = "Nicholas Egner Website <nick@nicholasegner.com>";

function clean(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildEmailHtml({ name, email, company, projectType, message, source }) {
  const rows = [
    ["Name", name],
    ["Email", email],
    ["Company", company],
    ["Project", projectType],
    ["Source", source],
  ].filter(([, value]) => value);

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f5f6fa;padding:28px;color:#111827;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
        <div style="padding:24px 28px;border-bottom:1px solid #e5e7eb;">
          <div style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#64748b;margin-bottom:8px;">nicholasegner.com</div>
          <h1 style="font-size:24px;line-height:1.2;margin:0;color:#0f172a;">New website inquiry</h1>
        </div>
        <div style="padding:24px 28px;">
          ${rows
            .map(
              ([label, value]) => `
                <div style="margin-bottom:14px;">
                  <div style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:3px;">${escapeHtml(label)}</div>
                  <div style="font-size:15px;line-height:1.5;color:#1e293b;">${escapeHtml(value)}</div>
                </div>
              `,
            )
            .join("")}
          <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e5e7eb;">
            <div style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:8px;">Message</div>
            <div style="font-size:15px;line-height:1.7;color:#1e293b;white-space:pre-wrap;">${escapeHtml(message)}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildEmailText({ name, email, company, projectType, message, source }) {
  return [
    "New website inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    projectType ? `Project: ${projectType}` : null,
    source ? `Source: ${source}` : null,
    "",
    "Message:",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export async function POST(request) {
  try {
    const body = await request.json();

    const name = clean(body?.name, 120);
    const email = clean(body?.email, 320);
    const company = clean(body?.company, 160);
    const projectType = clean(body?.projectType, 180);
    const message = clean(body?.message, 5000);
    const source = clean(body?.source, 120) || "website";
    const website = clean(body?.website, 250);
    const startedAt = Number(body?.startedAt || 0);

    // Honeypot submissions get a quiet success response so bots receive no signal.
    if (website) {
      return Response.json({ ok: true });
    }

    if (!name || !email || !message) {
      return Response.json(
        { error: "Please add your name, email, and message." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (startedAt && Date.now() - startedAt < 900) {
      return Response.json(
        { error: "Please wait a moment and try again." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("Contact form error: RESEND_API_KEY is not configured.");
      return Response.json(
        { error: "The contact form is temporarily unavailable. Please email nick@nicholasegner.com." },
        { status: 500 },
      );
    }

    const resendResponse = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        reply_to: email,
        subject: `Website inquiry from ${name}`,
        html: buildEmailHtml({ name, email, company, projectType, message, source }),
        text: buildEmailText({ name, email, company, projectType, message, source }),
      }),
    });

    const resendData = await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      console.error("Resend contact form error:", resendData);
      return Response.json(
        { error: "Your message could not be sent. Please try again or email nick@nicholasegner.com." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true, id: resendData?.id || null });
  } catch (error) {
    console.error("Contact form request error:", error);
    return Response.json(
      { error: "Your message could not be sent. Please try again or email nick@nicholasegner.com." },
      { status: 500 },
    );
  }
}
