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
  alternates: {
    canonical: "https://nicholasegner.com",
  },
  metadataBase: new URL("https://nicholasegner.com"),
  openGraph: {
    title: "Nicholas Egner | Web Developer & SEO Specialist",
    description:
      "Explore the portfolio of Nicholas Egner, a Minneapolis-based developer and digital creator.",
    url: "https://nicholasegner.com",
    siteName: "Nicholas Egner",
    images: [
      {
        // Restored your exact S3 bucket name
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
      // Restored your exact S3 bucket name
      "https://nciholasegner.s3.us-east-2.amazonaws.com/images/digital-portfolio.jpg",
    ],
  },
  authors: [
    {
      name: "Nicholas Egner",
      url: "https://nicholasegner.com",
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
        "@id": "https://nicholasegner.com/#person",
        name: "Nicholas Egner",
        url: "https://nicholasegner.com",
        // Restored your exact S3 bucket name inside the Next.js optimized image path
        image:
          "https://nicholasegner.com/_next/image?url=https%3A%2F%2Fnciholasegner.s3.us-east-2.amazonaws.com%2Fimages%2Fnicholas-egner.jpg&w=384&q=75",
        jobTitle: "Creative Technologist",
        description:
          "Minneapolis-based web developer and SEO strategist helping small businesses and creators build fast, search-optimized websites and content.",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://nicholasegner.com/about",
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
          "https://www.youtube.com/@NickEgnerVideo",
          "https://x.com/NicholasEgner",
          "https://www.facebook.com/nicholas.egner",
          "https://www.google.com/maps?cid=3080126939981832486",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://nicholasegner.com/#website",
        url: "https://nicholasegner.com",
        name: "Nicholas Egner | Minneapolis Web Developer, SEO Specialist & Digital Content Creator",
        inLanguage: "en-US",
        publisher: {
          "@id": "https://nicholasegner.com/#person",
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable}`}>
        {/* Next.js Optimized Performance Scripts */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js"
          strategy="lazyOnload"
        />
        {/* Google Analytics via next/script */}
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
        {/* Linked Data Graph Structured Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
