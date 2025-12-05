export const metadata = {
  title: "Photos of Nicholas Egner (Official Gallery)",
  description:
    "Downloadable headshots, portraits, and work images of Minneapolis-based developer Nicholas Egner.",
  alternates: { canonical: "https://nicholasegner.com/photos" },
  openGraph: {
    type: "website",
    url: "https://nicholasegner.com/photos",
    title: "Photos of Nicholas Egner",
    description: "Official photo gallery and press images of Nicholas Egner.",
    images: [
      {
        url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-portfolio.jpg",
        width: 1200,
        height: 630,
        alt: "Nicholas Egner - Official Headshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photos of Nicholas Egner",
    description: "Official photo gallery and press images of Nicholas Egner.",
    images: [
      "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner.jpg",
    ],
  },
};

export default function PhotosLayout({ children }) {
  return <>{children}</>;
}
