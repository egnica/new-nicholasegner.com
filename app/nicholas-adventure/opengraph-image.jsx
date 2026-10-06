import { ImageResponse } from "next/og";

export const alt = "Nicholas's Adventure retro browser game";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          background: "#05060b",
          color: "#f7f8ff",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 42,
            border: "18px solid #2d55ff",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 70,
            left: 82,
            right: 82,
            display: "flex",
            justifyContent: "center",
            fontFamily: "monospace",
            fontSize: 62,
            fontWeight: 900,
            letterSpacing: "5px",
            textTransform: "uppercase",
            textShadow: "5px 5px 0 #2d55ff",
          }}
        >
          NICHOLAS&apos;S ADVENTURE
        </div>

        <div
          style={{
            width: 340,
            height: 190,
            position: "relative",
            marginTop: 78,
            background: "#8f3518",
            border: "14px solid #241007",
            display: "flex",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 18,
              left: 24,
              right: 24,
              height: 22,
              background: "#bd5828",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 78,
              left: 24,
              right: 24,
              height: 28,
              background: "#bd5828",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 62,
              left: 0,
              right: 0,
              height: 14,
              background: "#321409",
              display: "flex",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: 136,
              top: 68,
              width: 68,
              height: 78,
              background: "#ffd43b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 18,
                height: 38,
                background: "#08090e",
                borderRadius: 9,
                display: "flex",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: 143,
              top: 42,
              width: 54,
              height: 42,
              border: "12px solid #ffd43b",
              borderBottom: "0",
              borderRadius: "30px 30px 0 0",
              display: "flex",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            left: 170,
            bottom: 122,
            width: 38,
            height: 38,
            background: "#4de06e",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: 150,
            bottom: 116,
            width: 88,
            height: 34,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              border: "9px solid #ffd43b",
              borderRadius: "50%",
              display: "flex",
            }}
          />
          <div
            style={{
              width: 52,
              height: 12,
              background: "#ffd43b",
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
