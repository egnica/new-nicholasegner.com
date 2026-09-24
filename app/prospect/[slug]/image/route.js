import { ImageResponse } from "next/og";
import { getProspect } from "../../../../prospects";

export const runtime = "edge";

const BACKGROUND =
  "https://nciholasegner.s3.us-east-2.amazonaws.com/images/ne_background.webp";

export async function GET(request, { params }) {
  const { slug } = await params;
  const prospect = getProspect(slug);

  if (!prospect) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "1200px",
          height: "630px",
          overflow: "hidden",
          background: "#080718",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <img
          src={BACKGROUND}
          alt=""
          width="1200"
          height="630"
          style={{
            position: "absolute",
            inset: 0,
            width: "1200px",
            height: "630px",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(8,7,24,.97) 0%, rgba(8,7,24,.86) 48%, rgba(8,7,24,.24) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "900px",
            padding: "72px 82px",
          }}
        >
          <div
            style={{
              display: "flex",
              marginBottom: "18px",
              color: "#76d7ff",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Prepared for
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: "900px",
              fontSize: prospect.company.length > 30 ? "68px" : "82px",
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: "-4px",
            }}
          >
            {prospect.company}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "24px",
              color: "rgba(255,255,255,.78)",
              fontSize: "32px",
              fontWeight: 500,
            }}
          >
            {prospect.personName}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "54px",
              color: "rgba(255,255,255,.5)",
              fontSize: "18px",
              letterSpacing: "1px",
            }}
          >
            NicholasEgner.com
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
