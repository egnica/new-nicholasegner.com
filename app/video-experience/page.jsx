import JsonLd from "../components/JsonLd/JsonLd";
import VideoExperienceClient from "./VideoExperienceClient";

import {
  SITE_URL,
  DEFAULT_IMAGE,
  getVideoExperienceSchema,
} from "@/app/lib/schema";

const pageUrl = `${SITE_URL}/video-experience`;

export const metadata = {
  title: "Interactive Video Experience | Nicholas Egner",
  description:
    "An interactive video experience from Nicholas Egner with sections covering past work, present focus, future direction, and creative digital strategy.",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    type: "website",
    url: pageUrl,
    title: "Interactive Video Experience | Nicholas Egner",
    description:
      "An interactive video experience from Nicholas Egner with sections covering past work, present focus, future direction, and creative digital strategy.",
    siteName: "Nicholas Egner",
    images: [
      {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: "Nicholas Egner Interactive Video Experience",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Interactive Video Experience | Nicholas Egner",
    description:
      "An interactive video experience from Nicholas Egner with sections covering past work, present focus, future direction, and creative digital strategy.",
    creator: "@NicholasEgner",
    images: [DEFAULT_IMAGE],
  },
};

export default function VideoExperiencePage() {
  return (
    <>
      <JsonLd data={getVideoExperienceSchema()} />
      <VideoExperienceClient />
    </>
  );
}
