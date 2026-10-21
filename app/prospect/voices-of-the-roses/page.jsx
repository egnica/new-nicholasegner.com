import PresentationFrame from "./PresentationFrame";

export const metadata = {
  title: "Voices of the Roses | Proposal by Nicholas Egner",
  description: "A proposed website, media, and supporter communication program for Voices of the Roses.",
  openGraph: {
    title: "Voices of the Roses | Proposal by Nicholas Egner",
    description: "A proposed website, media, and supporter communication program for Voices of the Roses.",
    url: "https://www.nicholasegner.com/prospect/voices-of-the-roses",
    type: "website",
    images: [{
      url: "https://www.nicholasegner.com/voices-of-the-roses/og-roses.png",
      alt: "Voices of the Roses: Website, Media & Communication. A proposal by Nicholas Egner, framed by watercolor pink roses and a rose garden.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voices of the Roses | Proposal by Nicholas Egner",
    description: "A proposed website, media, and supporter communication program for Voices of the Roses.",
    images: ["https://www.nicholasegner.com/voices-of-the-roses/og-roses.png"],
  },
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.nicholasegner.com/prospect/voices-of-the-roses" },
};

export default function VoicesOfTheRosesPresentation() {
  return <PresentationFrame />;
}
