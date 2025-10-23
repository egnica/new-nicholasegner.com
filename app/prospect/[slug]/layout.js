import Posts from "../../../prospect.json";

const SITE_URL = "https://nicholasegner.com";

function plainText(html = "", max = 200) {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const foundPost = Posts.find((item) => item.slug === slug);

  if (!foundPost) {
    return {
      title: "Post Not Found",
      description: "This post could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${foundPost.company} - ${foundPost.personName}`;
  const description = plainText(foundPost.mainBody);
  const url = `${SITE_URL}/posts/${foundPost.slug}`;
  const image = foundPost.linkImage; // Prefer JPG/PNG for social previews

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    authors: [{ name: "Nicholas Egner" }],
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    viewport: "width=device-width, initial-scale=1",

    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "nicholasegner.com",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@NicholasEgner",
      creator: "@NicholasEgner",
      title,
      description,
      images: [image],
    },

    // Any truly custom tags go in `other`
    other: {
      "og:image:width": "1200",
      "og:image:height": "630",
    },
  };
}

export default function Layout({ children }) {
  return <>{children}</>;
}
