const DEFAULT_CRM_TRACKING_API =
  "https://resend-webhook.dcjjjb8rwkdsk.amplifyapp.com/api/public/contact-tracking";
const TRACKING_ID_PATTERN = /^NE-[A-HJ-NP-Z2-9]{8}$/;

function cleanTrackingId(value) {
  const trackingId = String(value || "").trim().toUpperCase();
  return TRACKING_ID_PATTERN.test(trackingId) ? trackingId : "";
}

function trackingApiUrl() {
  return String(
    process.env.CRM_TRACKING_API_URL || DEFAULT_CRM_TRACKING_API,
  ).replace(/\/$/, "");
}

export async function resolveTrackedContact(value) {
  const trackingId = cleanTrackingId(value);
  if (!trackingId) return null;

  const response = await fetch(
    `${trackingApiUrl()}?id=${encodeURIComponent(trackingId)}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  if (response.status === 404 || response.status === 400) {
    return null;
  }

  if (!response.ok) {
    throw new Error("CRM tracking lookup failed.");
  }

  const data = await response.json();

  if (!data?.valid) return null;

  return {
    trackingId,
    firstName: String(data.firstName || "").trim().slice(0, 80),
  };
}

export async function recordTrackedContactEvent({
  trackingId: value,
  event,
  sourcePath = "",
  utmSource = "",
  utmMedium = "",
  utmCampaign = "",
  referrer = "",
}) {
  const trackingId = cleanTrackingId(value);
  if (!trackingId) return null;

  const response = await fetch(trackingApiUrl(), {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      trackingId,
      event,
      sourcePath,
      utmSource,
      utmMedium,
      utmCampaign,
      referrer,
    }),
  });

  if (response.status === 404 || response.status === 400) {
    return null;
  }

  if (!response.ok) {
    throw new Error("CRM tracking event failed.");
  }

  const data = await response.json();

  if (!data?.valid) return null;

  return {
    trackingId,
    firstName: String(data.firstName || "").trim().slice(0, 80),
    winCount: Number(data.winCount || 0),
  };
}
