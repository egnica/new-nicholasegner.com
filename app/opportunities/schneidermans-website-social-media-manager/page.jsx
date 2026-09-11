import OpportunityPageClient from "../[slug]/OpportunityPageClient";

const SITE_URL = "https://www.nicholasegner.com";
const SLUG = "schneidermans-website-social-media-manager";

const opportunity = {
  company: "Schneiderman's Furniture",
  role: "Website & Social Media Manager",

  eyebrow: "Website & Social Media Manager Application",
  headline: "Web, Social, SEO & Digital Content",
  introduction:
    "A short introduction for the Website & Social Media Manager role at Schneiderman's Furniture, with relevant website, analytics, SEO, social, and video work linked alongside the video.",

  // Add the final S3 video URL here after the application video is uploaded.
  videoUrl: null,
  posterUrl:
    "https://nciholasegner.s3.us-east-2.amazonaws.com/video-page-website/Schneiderman_thumb.webp",

  actions: [
    {
      id: "resume",
      title: "Resume",
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/video-page-website/Nicholas_Egner_Schneiderman_resume.pdf",
    },
    {
      id: "cover",
      title: "Cover Letter",
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/video-page-website/Nicholas_Egner_Schneiderman_cover_letter.pdf",
    },
  ],

  note: {
    eyebrow: "Schneiderman's Furniture",
    headline: "A short introduction with the work behind it.",
    body: "As I mention different parts of my background, the links alongside the video provide a direct path to the related websites, analytics and SEO work, social experience, video portfolio, and selected client projects.",
  },

  metadata: {
    title: "Nicholas Egner | Website & Social Media Manager Application",
    description:
      "A custom application experience for the Website & Social Media Manager role at Schneiderman's Furniture, featuring website management, WordPress, Shopify, Wix, SEO, analytics, social media, and video content work.",
    socialDescription:
      "A short application introduction connecting Nicholas Egner's website management, social media, SEO, analytics, and content experience to the Website & Social Media Manager role at Schneiderman's Furniture.",
    imageAlt:
      "Nicholas Egner Website and Social Media Manager application video cover image",
  },

  cues: [
    {
      id: "01",
      title: "About Nicholas",
      url: "/about",
      startTime: 0.3,
      endTime: 10.9,
    },
    {
      id: "02",
      title: "Selected Projects",
      url: "/projects",
      startTime: 25.9,
      endTime: 29.8,
    },
    {
      id: "03",
      title: "WordPress",
      url: "/skills/wordpress",
      startTime: 29.8,
      endTime: 36.4,
    },
    {
      id: "04",
      title: "Shopify",
      url: "/skills/shopify",
      startTime: 30.1,
      endTime: 36.4,
    },
    {
      id: "05",
      title: "Wix",
      url: "/skills/wix",
      startTime: 30.4,
      endTime: 36.4,
    },
    {
      id: "06",
      title: "Selected Web Projects",
      url: "/projects",
      startTime: 33,
      endTime: 36.4,
    },
    {
      id: "07",
      title: "SEO",
      url: "/skills/seo",
      startTime: 36.5,
      endTime: 39.5,
    },
    {
      id: "08",
      title: "Video SEO Trifecta",
      url: "/blog/video-seo-trifecta",
      startTime: 36.8,
      endTime: 39.8,
    },
    {
      id: "09",
      title: "Google Analytics",
      url: "/skills/google-analytics",
      startTime: 38.3,
      endTime: 41.7,
    },
    {
      id: "10",
      title: "Search Console",
      url: "/skills/search-console",
      startTime: 38.6,
      endTime: 41.9,
    },
    {
      id: "11",
      title: "Meta Analytics",
      url: "/skills/meta-analytics",
      startTime: 39.1,
      endTime: 42.4,
    },
    {
      id: "12",
      title: "YouTube Analytics",
      url: "/skills/youtube-analytics",
      startTime: 39.4,
      endTime: 42.4,
    },
    {
      id: "13",
      title: "Davis Defense Website",
      url: "https://www.davisdefenselawyers.com/",
      startTime: 40.2,
      endTime: 45.3,
    },
    {
      id: "14",
      title: "Let Us Clean MN Website",
      url: "https://www.letuscleanmn.com/",
      startTime: 40.6,
      endTime: 45.3,
    },
    {
      id: "15",
      title: "Full Video Portfolio",
      url: "/video",
      startTime: 42.5,
      endTime: 49.7,
    },
    {
      id: "16",
      title: "Davis Defense Case Study",
      url: "/projects/davis-defense",
      startTime: 45.4,
      endTime: 49.7,
    },
    {
      id: "17",
      title: "Let Us Clean MN Case Study",
      url: "/projects/let-us-clean-mn",
      startTime: 45.7,
      endTime: 49.7,
    },
    {
      id: "18",
      title: "Full Portfolio",
      url: "/",
      startTime: 49.7,
      endTime: 58.5,
    },
    {
      id: "19",
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/nicholas-egner/",
      startTime: 50,
      endTime: 58.5,
    },
  ],
};

export const metadata = {
  title: opportunity.metadata.title,
  description: opportunity.metadata.description,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: opportunity.metadata.title,
    description: opportunity.metadata.socialDescription,
    url: `${SITE_URL}/opportunities/${SLUG}`,
    siteName: "Nicholas Egner",
    type: "website",
    images: [
      {
        url: opportunity.posterUrl,
        width: 1920,
        height: 1080,
        alt: opportunity.metadata.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: opportunity.metadata.title,
    description: opportunity.metadata.socialDescription,
    images: [opportunity.posterUrl],
  },
};

export default function SchneidermansOpportunityPage() {
  return <OpportunityPageClient opportunity={opportunity} />;
}
