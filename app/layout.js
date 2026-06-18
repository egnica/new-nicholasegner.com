import { Inter, Manrope } from "next/font/google";
import Script from "next/script"; // Optimization for Next.js Script handling
import "./globals.css";
import JsonLd from "./components/JsonLd/JsonLd";
import { getGlobalSchema } from "./lib/schema";

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

  // 🌟 Set metadataBase to match Google's indexed version
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
    creator: "@NicholasEgner",
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
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://nciholasegner.s3.us-east-2.amazonaws.com"
        />

        <link
          rel="dns-prefetch"
          href="https://nciholasegner.s3.us-east-2.amazonaws.com"
        />

        <link
          rel="preload"
          as="image"
          href="https://nciholasegner.s3.us-east-2.amazonaws.com/images/computer-back.webp"
          fetchPriority="high"
        />
      </head>

      <body className={`${inter.variable} ${manrope.variable}`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VDZJLKR85X"
          strategy="lazyOnload"
        />

        <Script id="google-analytics" strategy="lazyOnload">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-VDZJLKR85X');
        `}
        </Script>

        <JsonLd data={getGlobalSchema()} />

        <div className="siteFrame">
          <div className="siteContent">{children}</div>
        </div>
      </body>
    </html>
  );
}
