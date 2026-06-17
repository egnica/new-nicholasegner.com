import { Inter, Manrope } from "next/font/google";
import Script from "next/script"; // Optimization for Next.js Script handling
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

  // 🌟 THE CANONICAL SHIELD: Locks down www. as the master copy
  alternates: {
    canonical: "https://www.nicholasegner.com",
  },

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
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.nicholasegner.com/#person",
        name: "Nicholas Egner",
        url: "https://www.nicholasegner.com",
        image:
          "https://www.nicholasegner.com/_next/image?url=https%3A%2F%2Fnciholasegner.s3.us-east-2.amazonaws.com%2Fimages%2Fnicholas-egner.jpg&w=384&q=75",
        jobTitle: "Creative Technologist",
        description:
          "Minneapolis-based web developer and SEO strategist helping small businesses and creators build fast, search-optimized websites and content.",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://www.nicholasegner.com/about",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Minneapolis",
          addressRegion: "MN",
          addressCountry: "US",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Dunwoody College of Technology",
        },
        knowsAbout: [
          "Web Development",
          "SEO",
          "Next.js",
          "React",
          "Content Strategy",
          "Video Production",
          "Digital Marketing",
        ],
        sameAs: [
          "https://www.linkedin.com/in/nicholas-egner",
          "https://github.com/egnica",
          "https://latestartdev.com",
          "https://www.youtube.com/@NicholasEgner",
          "https://x.com/NicholasEgner",
          "https://www.facebook.com/nicholas.egner",
          "https://www.google.com/maps?cid=3080126939981832486",
          "https://www.wikidata.org/wiki/Q140232047",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.nicholasegner.com/#website",
        url: "https://www.nicholasegner.com",
        name: "Nicholas Egner | Minneapolis Web Developer, SEO Specialist & Digital Content Creator",
        inLanguage: "en-US",
        publisher: {
          "@id": "https://www.nicholasegner.com/#person",
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
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
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-VDZJLKR85X');
        `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />

        <div className="siteFrame">
          <div className="siteContent">{children}</div>
        </div>
      </body>
    </html>
  );
}
