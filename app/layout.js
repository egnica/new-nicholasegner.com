import { Suspense } from "react";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import JsonLd from "./components/JsonLd/JsonLd";
import { getGlobalSchema } from "./lib/schema";
import RouteHistoryTracker from "./components/RouteHistoryTracker/RouteHistoryTracker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nicholas Egner | Minneapolis Web Developer & Digital Strategist",
  description:
    "Nicholas Egner is a Minneapolis web developer and digital strategist who combines custom web development, SEO, video, content, and automation to build connected digital systems for businesses.",
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Nicholas Egner",
    "Minneapolis web developer",
    "Minneapolis digital strategist",
    "custom website development Minneapolis",
    "web developer for small business Minneapolis",
    "technical SEO and structured data",
    "video SEO for business websites",
    "business video production Minneapolis",
    "custom web applications for business",
    "workflow automation for small business",
    "digital content systems",
    "connected digital systems",
  ],

  metadataBase: new URL("https://www.nicholasegner.com"),

  openGraph: {
    title: "Nicholas Egner | Web Developer & Digital Strategist",
    description:
      "Web development, SEO, video, content, and automation brought together into connected digital systems for businesses.",
    url: "https://www.nicholasegner.com",
    siteName: "Nicholas Egner",
    images: [
      {
        url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/digital-portfolio.jpg",
        width: 1200,
        height: 630,
        alt: "Nicholas Egner, Minneapolis web developer and digital strategist",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicholas Egner | Minneapolis Web Developer & Digital Strategist",
    description:
      "I combine web development, SEO, video, content, and automation to build connected digital systems for businesses.",
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

        <Suspense fallback={null}>
          <RouteHistoryTracker />
        </Suspense>

        <div className="siteFrame">
          <div className="siteContent">{children}</div>
        </div>
      </body>
    </html>
  );
}
