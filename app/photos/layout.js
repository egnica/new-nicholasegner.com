export const metadata = {
  title: "Photos of Nicholas Egner | Official Image Gallery",
  description:
    "Official photos, profile images, portraits, and portfolio visuals of Nicholas Egner, a Minneapolis web developer and digital strategist.",
  keywords: [
    "Nicholas Egner photos",
    "Nicholas Egner images",
    "Nicholas Egner Minneapolis",
    "Nicholas Egner web developer",
    "Nicholas Egner digital strategist",
    "Nicholas Egner portrait",
    "Nicholas Egner profile photo",
  ],
  alternates: {
    canonical: "https://www.nicholasegner.com/photos",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.nicholasegner.com/photos",
    title: "Photos of Nicholas Egner | Official Image Gallery",
    description:
      "Official image gallery for Nicholas Egner, Minneapolis web developer and digital strategist.",
    images: [
      {
        url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-portfolio.jpg",
        alt: "Nicholas Egner, Minneapolis web developer and digital strategist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photos of Nicholas Egner",
    description:
      "Official images of Nicholas Egner, Minneapolis web developer and digital strategist.",
    images: [
      "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-portfolio.jpg",
    ],
  },
};

export default function PhotosLayout({ children }) {
  return <>{children}</>;
}
