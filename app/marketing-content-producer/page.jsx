import MarketingContentProducerClient from "./MarketingContentProducerClient";

const ogImage =
  "https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/Hasel-cover.webp";

export const metadata = {
  title: "Nicholas Egner | Marketing Content Producer Application",
  description:
    "A custom video application experience for the Marketing Content Producer role at the Hazelden Betty Ford Foundation, featuring video, SEO, storytelling, and digital content work.",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Nicholas Egner | Marketing Content Producer Application",
    description:
      "A custom video application experience built around video production, SEO, web strategy, and mission-driven storytelling.",
    url: "https://nicholasegner.com/marketing-content-producer",
    siteName: "Nicholas Egner",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1920,
        height: 1080,
        alt: "Nicholas Egner Marketing Content Producer application video cover image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicholas Egner | Marketing Content Producer Application",
    description:
      "A custom video application experience built around video production, SEO, web strategy, and mission-driven storytelling.",
    images: [ogImage],
  },
};

export default function MarketingContentProducerPage() {
  return <MarketingContentProducerClient />;
}
