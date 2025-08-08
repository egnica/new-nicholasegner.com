import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "Nicholas Egner | Minneapolis Web Developer, SEO Specialist & Digital Content Creator",
  description:
    "Portfolio of Nicholas Egner — Minneapolis-based web developer, content creator, and SEO strategist. Explore interactive projects, videos, and digital experiences.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.nicholasegner.com/",
  },
  keywords: [
    "Nicholas Egner",
    "web developer",
    "Minneapolis",
    "SEO specialist",
    "content creator",
    "portfolio",
    "video producer",
    "digital experiences",
  ],
  metadataBase: new URL("https://www.nicholasegner.com"),
  openGraph: {
    title: "Nicholas Egner | Web Developer & SEO Specialist",
    description:
      "Explore the portfolio of Nicholas Egner, a Minneapolis-based developer and digital creator.",
    url: "https://www.nicholasegner.com",
    siteName: "Nicholas Egner",
    images: [
      {
        url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/digital-portfolio.jpg",
        width: 1200,
        height: 630,
        alt: "Nicholas Egner Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicholas Egner | Minneapolis Web Developer",
    description:
      "Portfolio of Nicholas Egner — developer, content creator, and SEO expert based in Minneapolis.",
    creator: "@NicholasEgner", // optional
    images: [
      "https://nciholasegner.s3.us-east-2.amazonaws.com/images/digital-portfolio.jpg",
    ],
  },
  authors: [
    {
      name: "Nicholas Egner",
      url: "https://www.nicholasegner.com",
    },
  ],
  creator: "Nicholas Egner",
  publisher: "Nicholas Egner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
          defer
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js"
          defer
        ></script>

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VDZJLKR85X"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VDZJLKR85X');
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nicholas Egner",
              url: "https://www.nicholasegner.com",
              image:
                "https://nciholasegner.s3.us-east-2.amazonaws.com/images/digital-portfolio.jpg",
              jobTitle: "Web Developer, SEO Specialist, Content Creator",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Minneapolis",
                addressRegion: "MN",
                addressCountry: "USA",
              },
              sameAs: [
                "https://www.linkedin.com/in/nicholas-egner",
                "https://github.com/nicholasegner",
                "https://latestartdev.com",
                "https://www.google.com/maps/place/Nicholas+Egner+-+Web+Development/@44.9693245,-93.1667435,12z/data=!3m1!4b1!4m6!3m5!1s0x33594afad20e52d:0x2abec985a953e126!8m2!3d44.9693245!4d-93.1667435!16s%2Fg%2F11m6kbgwyb?entry=ttu",
                "https://www.youtube.com/@NickEgnerVideo",
                "https://x.com/NicholasEgner",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
