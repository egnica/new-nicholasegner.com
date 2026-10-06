export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const CONTACT_TO = "nick@nicholasegner.com";
const CONTACT_FROM = "Nicholas Egner Website <nick@nicholasegner.com>";

function clean(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request) {
  try {
    const body = await request.json();

    const name = clean(body?.name, 80) || "Someone";
    const message = clean(body?.message, 500);
    const website = clean(body?.website, 250);
    const startedAt = Number(body?.startedAt || 0);

    if (website) {
      return Response.json({ ok: true });
    }

    if (!message) {
      return Response.json(
        { error: "Add a message before sending." },
        { status: 400 },
      );
    }

    if (startedAt && Date.now() - startedAt < 1500) {
      return Response.json(
        { error: "Give it a second and try again." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("Nicholas's Adventure game error: RESEND_API_KEY is not configured.");
      return Response.json(
        { error: "The message could not be sent right now." },
        { status: 500 },
      );
    }

    const subject = `${name} beat Nicholas's Adventure`;

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#080914;padding:28px;color:#f5f7ff;">
        <div style="max-width:680px;margin:0 auto;background:#111320;border:1px solid #2a2f48;border-radius:16px;overflow:hidden;">
          <div style="padding:24px 28px;border-bottom:1px solid #2a2f48;">
            <div style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8f9abf;margin-bottom:8px;">nicholasegner.com / nicholas-adventure</div>
            <h1 style="font-size:24px;line-height:1.2;margin:0;color:#ffffff;">${escapeHtml(name)} beat the game!</h1>
          </div>
          <div style="padding:24px 28px;">
            <div style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8f9abf;margin-bottom:8px;">Message</div>
            <div style="font-size:16px;line-height:1.7;color:#eef1ff;white-space:pre-wrap;">${escapeHtml(message)}</div>
          </div>
        </div>
      </div>
    `;

    const text = [
      `${name} beat Nicholas's Adventure!`,
      "",
      message,
      "",
      "Source: nicholasegner.com/nicholas-adventure",
    ].join("\n");

    const resendResponse = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        subject,
        html,
        text,
      }),
    });

    const resendData = await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      console.error("Resend Nicholas's Adventure game error:", resendData);
      return Response.json(
        { error: "The message could not be sent right now." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true, id: resendData?.id || null });
  } catch (error) {
    console.error("Nicholas's Adventure game request error:", error);
    return Response.json(
      { error: "The message could not be sent right now." },
      { status: 500 },
    );
  }
}
