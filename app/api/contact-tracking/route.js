import { resolveTrackedContact } from "../_shared/contactTracking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const contact = await resolveTrackedContact(url.searchParams.get("id"));

    if (!contact) {
      return Response.json({ valid: false }, { status: 404 });
    }

    const response = Response.json({
      valid: true,
      trackingId: contact.trackingId,
      firstName: contact.firstName,
    });

    response.headers.append(
      "Set-Cookie",
      `ne_tracking_id=${encodeURIComponent(contact.trackingId)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax; Secure; HttpOnly`,
    );

    return response;
  } catch (error) {
    console.error("Contact tracking proxy error:", error);
    return Response.json(
      { error: "Tracking lookup is unavailable." },
      { status: 503 },
    );
  }
}
