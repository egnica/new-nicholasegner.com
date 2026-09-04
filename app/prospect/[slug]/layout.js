import Posts from "../../../prospect.json";

const SITE_URL = "https://www.nicholasegner.com";

function plainText(html = "", max = 200) {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const foundPost = Posts.find((item) => item.slug === slug);

  if (!foundPost) {
    return {
      title: "Prospect Not Found",
      description: "This prospect page could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${foundPost.company} - ${foundPost.personName}`;
  const description = plainText(foundPost.mainBody);
  const url = `${SITE_URL}/prospect/${foundPost.slug}`;
  const image = foundPost.linkImage;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    authors: [{ name: "Nicholas Egner" }],
    alternates: { canonical: url },
    robots: { index: false, follow: false },
    viewport: "width=device-width, initial-scale=1",

    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "Nicholas Egner",
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      site: "@NicholasEgner",
      creator: "@NicholasEgner",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default function Layout({ children }) {
  return <>{children}</>;
}
