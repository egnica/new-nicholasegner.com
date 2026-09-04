import { notFound } from "next/navigation";
import OpportunityPageClient from "./OpportunityPageClient";
import { getOpportunityBySlug, opportunities } from "./opportunities";

const SITE_URL = "https://www.nicholasegner.com";

export function generateStaticParams() {
  return Object.keys(opportunities).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const opportunity = getOpportunityBySlug(slug);

  if (!opportunity) {
    return {
      title: "Opportunity Not Found | Nicholas Egner",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageUrl = `${SITE_URL}/opportunities/${slug}`;
  const metadata = opportunity.metadata ?? {};
  const title =
    metadata.title ?? `Nicholas Egner | ${opportunity.role} Application`;
  const description =
    metadata.description ??
    `A custom application experience for the ${opportunity.role} role at ${opportunity.company}.`;
  const socialDescription = metadata.socialDescription ?? description;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title,
      description: socialDescription,
      url: pageUrl,
      siteName: "Nicholas Egner",
      type: "website",
      images: [
        {
          url: opportunity.posterUrl,
          width: 1920,
          height: 1080,
          alt:
            metadata.imageAlt ??
            `${opportunity.role} application by Nicholas Egner`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: socialDescription,
      images: [opportunity.posterUrl],
    },
  };
}

export default async function OpportunityPage({ params }) {
  const { slug } = await params;
  const opportunity = getOpportunityBySlug(slug);

  if (!opportunity) {
    notFound();
  }

  return <OpportunityPageClient key={slug} opportunity={opportunity} />;
}
