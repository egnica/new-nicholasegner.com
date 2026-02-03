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
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://www.nicholasegner.com/#person",
                  name: "Nicholas Egner",
                  url: "https://www.nicholasegner.com",
                  image:
                    "https://YOUR-CORRECT-BUCKET/images/nicholas-egner.jpg",
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
                  ],
                  sameAs: [
                    "https://www.linkedin.com/in/nicholas-egner",
                    "https://github.com/egnica",
                    "https://latestartdev.com",
                    "https://www.youtube.com/@NickEgnerVideo",
                    "https://x.com/NicholasEgner",
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
