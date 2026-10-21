import PresentationFrame from "./PresentationFrame";

export const metadata = {
  title: "Voices of the Roses | Proposal by Nicholas Egner",
  description: "A proposed website, media, and supporter communication program for Voices of the Roses.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.nicholasegner.com/prospect/voices-of-the-roses" },
};

export default function VoicesOfTheRosesPresentation() {
  return <PresentationFrame />;
}
