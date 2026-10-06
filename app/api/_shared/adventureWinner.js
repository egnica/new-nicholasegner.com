const RESEND_EMAILS_ENDPOINT = "https://api.resend.com/emails";
const RESEND_CONTACTS_ENDPOINT = "https://api.resend.com/contacts";
const WINNER_SEGMENT_ID = "88329bc5-da9c-4813-90aa-16fd4dd08e37";
const CONTACT_TO = "nick@nicholasegner.com";
const CONTACT_FROM = "Nicholas Egner Website <nick@nicholasegner.com>";
const GAME_URL = "https://www.nicholasegner.com/nicholas-adventure";

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

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function saveOptInContact({ apiKey, name, email }) {
  const firstName = clean(name.split(/\s+/)[0], 50);
  const encodedEmail = encodeURIComponent(email);

  const createResponse = await fetch(RESEND_CONTACTS_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      first_name: firstName,
      unsubscribed: false,
      segments: [{ id: WINNER_SEGMENT_ID }],
    }),
  });

  if (createResponse.ok) return true;

  if (createResponse.status === 409) {
    const segmentResponse = await fetch(
      `${RESEND_CONTACTS_ENDPOINT}/${encodedEmail}/segments/${WINNER_SEGMENT_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (segmentResponse.ok || segmentResponse.status === 409) return true;

    const segmentError = await segmentResponse.json().catch(() => ({}));
    console.warn("Adventure winner segment add failed:", segmentError);
    return false;
  }

  const createError = await createResponse.json().catch(() => ({}));
  console.warn("Adventure winner contact save failed:", createError);
  return false;
}

export async function handleAdventureWinner(
  request,
  {
    sourcePath = "/nicholas-adventure",
    subjectLabel = "Nicholas's Adventure",
  } = {},
) {
  try {
    const body = await request.json();

    const name = clean(body?.name, 80);
    const email = clean(body?.email, 160).toLowerCase();
    const marketingOptIn = body?.marketingOptIn === true;
    const website = clean(body?.website, 250);
    const startedAt = Number(body?.startedAt || 0);
    const message =
      clean(body?.message, 500) ||
      `${name || "Someone"} beat the game! What a legend!`;

    const utmSource = clean(body?.utmSource, 100);
    const utmMedium = clean(body?.utmMedium, 100);
    const utmCampaign = clean(body?.utmCampaign, 160);
    const referrer = clean(body?.referrer, 500);
    const submittedPath = clean(body?.sourcePath, 200) || sourcePath;

    if (website) {
      return Response.json({ ok: true });
    }

    if (!name) {
      return Response.json(
        { error: "Add your name to claim the win." },
        { status: 400 },
      );
    }

    if (!email || !isValidEmail(email)) {
      return Response.json(
        { error: "Add a valid email to claim the win." },
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
      console.error(
        "Adventure winner error: RESEND_API_KEY is not configured.",
      );
      return Response.json(
        { error: "The victory could not be claimed right now." },
        { status: 500 },
      );
    }

    const sourceBits = [
      utmSource ? `utm_source: ${utmSource}` : "",
      utmMedium ? `utm_medium: ${utmMedium}` : "",
      utmCampaign ? `utm_campaign: ${utmCampaign}` : "",
      referrer ? `referrer: ${referrer}` : "",
      `path: ${submittedPath}`,
    ].filter(Boolean);

    const notificationHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#080914;padding:28px;color:#f5f7ff;">
        <div style="max-width:680px;margin:0 auto;background:#111320;border:1px solid #2a2f48;border-radius:16px;overflow:hidden;">
          <div style="padding:24px 28px;border-bottom:1px solid #2a2f48;">
            <div style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8f9abf;margin-bottom:8px;">nicholasegner.com${escapeHtml(sourcePath)}</div>
            <h1 style="font-size:24px;line-height:1.2;margin:0;color:#ffffff;">${escapeHtml(name)} beat the game!</h1>
          </div>
          <div style="padding:24px 28px;">
            <div style="margin-bottom:18px;">
              <strong>Email:</strong> ${escapeHtml(email)}<br />
              <strong>Future project updates:</strong> ${marketingOptIn ? "YES" : "NO"}
            </div>
            <div style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8f9abf;margin-bottom:8px;">Victory message</div>
            <div style="font-size:16px;line-height:1.7;color:#eef1ff;white-space:pre-wrap;">${escapeHtml(message)}</div>
            <div style="margin-top:20px;padding-top:16px;border-top:1px solid #2a2f48;font-size:12px;line-height:1.7;color:#8f9abf;">
              ${sourceBits.map((item) => escapeHtml(item)).join("<br />")}
            </div>
          </div>
        </div>
      </div>
    `;

    const notificationText = [
      `${name} beat ${subjectLabel}!`,
      `Email: ${email}`,
      `Future project updates: ${marketingOptIn ? "YES" : "NO"}`,
      "",
      message,
      "",
      ...sourceBits,
    ].join("\n");

    const notifyResponse = await fetch(RESEND_EMAILS_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        reply_to: email,
        subject: `${name} beat ${subjectLabel}`,
        html: notificationHtml,
        text: notificationText,
      }),
    });

    const notifyData = await notifyResponse.json().catch(() => ({}));

    if (!notifyResponse.ok) {
      console.error("Adventure winner notification failed:", notifyData);
      return Response.json(
        { error: "The victory could not be claimed right now." },
        { status: 502 },
      );
    }

    const winnerHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#080914;padding:28px;color:#f5f7ff;">
        <div style="max-width:620px;margin:0 auto;background:#111320;border:1px solid #2a2f48;border-radius:16px;padding:30px;text-align:center;">
          <div style="font-family:monospace;font-size:13px;font-weight:800;letter-spacing:.14em;color:#4de06e;margin-bottom:12px;">YOU WON!</div>
          <h1 style="font-size:30px;line-height:1.15;margin:0 0 12px;color:#ffffff;">${escapeHtml(name)} beat Nicholas&apos;s Adventure.</h1>
          <p style="font-size:16px;line-height:1.65;color:#c9cee2;margin:0 0 22px;">Officially recorded. You were here before this thing went global. What a legend.</p>
          <a href="${GAME_URL}" style="display:inline-block;padding:12px 18px;border:1px solid #4de06e;border-radius:7px;color:#4de06e;text-decoration:none;font-family:monospace;font-size:13px;font-weight:800;letter-spacing:.08em;">PLAY AGAIN ↻</a>
        </div>
      </div>
    `;

    const winnerResponse = await fetch(RESEND_EMAILS_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [email],
        subject: "YOU WON — Nicholas's Adventure",
        html: winnerHtml,
        text: `${name} beat Nicholas's Adventure. Officially recorded. You were here before this thing went global. What a legend.\n\nPlay again: ${GAME_URL}`,
      }),
    });

    if (!winnerResponse.ok) {
      const winnerError = await winnerResponse.json().catch(() => ({}));
      console.warn("Adventure winner confirmation failed:", winnerError);
    }

    let contactSaved = false;

    if (marketingOptIn) {
      const contactsApiKey =
        process.env.RESEND_CONTACTS_API_KEY || process.env.RESEND_API_KEY;

      if (contactsApiKey) {
        contactSaved = await saveOptInContact({
          apiKey: contactsApiKey,
          name,
          email,
        });
      }
    }

    return Response.json({
      ok: true,
      id: notifyData?.id || null,
      contactSaved,
    });
  } catch (error) {
    console.error("Adventure winner request error:", error);
    return Response.json(
      { error: "The victory could not be claimed right now." },
      { status: 500 },
    );
  }
}
