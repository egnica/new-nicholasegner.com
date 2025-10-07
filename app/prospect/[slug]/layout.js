import Posts from "../../../prospect.json";

export async function generateMetadata(params) {
  const queryString = params.params.slug;
  const foundPost = Posts.find((item) => item.slug === queryString);

  if (!foundPost) {
    return {
      title: "Post Not Found",
      description: "This post could not be found.",
    };
  }

  const title = `${foundPost.company} - ${foundPost.personName}`;

  return {
    title: title,
    description: foundPost.mainBody,

    author: "Nicholas Egner",
    openGraph: {
      title: title,
      site_name: "nicholasegner.com",
      description: foundPost.mainBody,
      url: `https://latestartdev.com/posts/${foundPost.slug}`,
      type: "article",
      images: [
        {
          url: foundPost.linkImage,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@NicholasEgner",
      creator: "@NicholasEgner",
      title: title,
      description: foundPost.mainBody,
      image: foundPost.linkImage,
    },
    other: {
      canonical: `https://latestartdev.com/posts/${foundPost.slug}`,
      author: "Nicholas Egner",
      viewport: "width=device-width, initial-scale=1",
      robots: "index, follow",
    },
  };
}

export default function Layout({ children }) {
  return <>{children}</>;
}
