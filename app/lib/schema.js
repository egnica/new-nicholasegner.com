export const SITE_URL = "https://www.nicholasegner.com";
export const S3_ORIGIN = "https://nciholasegner.s3.us-east-2.amazonaws.com";

export const DEFAULT_IMAGE = `${S3_ORIGIN}/images/digital-portfolio.jpg`;
export const PERSON_IMAGE = `${S3_ORIGIN}/images/nicholas-egner.jpg`;

export const schemaIds = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  homepage: `${SITE_URL}/#webpage`,
  aboutPage: `${SITE_URL}/about#profilepage`,
};

function absoluteUrl(value) {
  if (!value || typeof value !== "string") return undefined;

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.startsWith("/")) {
    return `${SITE_URL}${value}`;
  }

  return `${SITE_URL}/${value}`;
}

function imageArray(...values) {
  const images = values.map(absoluteUrl).filter(Boolean);
  return images.length ? images : undefined;
}

function cleanSchema(value) {
  if (Array.isArray(value)) {
    return value
      .map(cleanSchema)
      .filter((item) => item !== undefined && item !== null);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, item]) => item !== undefined && item !== null)
        .map(([key, item]) => [key, cleanSchema(item)]),
    );
  }

  return value;
}

function createJsonLd(graph) {
  return cleanSchema({
    "@context": "https://schema.org",
    "@graph": Array.isArray(graph) ? graph : [graph],
  });
}

function toItemArray(items) {
  if (!items) return [];

  if (Array.isArray(items)) {
    return items.map((item, index) => ({
      ...item,
      slug: item.slug || item.id || String(index),
    }));
  }

  return Object.entries(items).map(([slug, item]) => ({
    ...item,
    slug: item.slug || slug,
  }));
}

export function getBreadcrumbSchema(items) {
  const currentPage = items[items.length - 1];

  return {
    "@type": "BreadcrumbList",
    "@id": `${currentPage.url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* -------------------------------------------------------------------------- */
/* GLOBAL SCHEMA                                                              */
/* -------------------------------------------------------------------------- */

export function getGlobalSchema() {
  const person = {
    "@type": "Person",
    "@id": schemaIds.person,
    name: "Nicholas Egner",
    url: SITE_URL,
    image: PERSON_IMAGE,
    jobTitle: "Creative Technologist",
    description:
      "Minneapolis-based web developer, SEO strategist, and digital content creator helping businesses build faster, clearer, search-optimized digital systems.",
    homeLocation: {
      "@type": "Place",
      name: "Minneapolis, Minnesota",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Minneapolis",
        addressRegion: "MN",
        addressCountry: "US",
      },
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Web Developer and SEO Strategist",
      occupationalCategory: "Web Developer",
    },
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "SEO",
      "Technical SEO",
      "Structured Data",
      "Video SEO",
      "Content Strategy",
      "Video Production",
      "Digital Marketing",
      "Local SEO",
      "Google Business Profile Optimization",
    ],
    sameAs: [
      "https://www.linkedin.com/in/nicholas-egner",
      "https://github.com/egnica",
      "https://www.youtube.com/@NicholasEgner",
      "https://x.com/NicholasEgner",
      "https://www.facebook.com/nicholas.egner",
      "https://www.google.com/maps?cid=3080126939981832486",
      "https://www.wikidata.org/wiki/Q140232047",
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": schemaIds.website,
    url: SITE_URL,
    name: "Nicholas Egner",
    alternateName: "nicholasegner.com",
    description:
      "Portfolio and digital presence of Nicholas Egner, a Minneapolis-based web developer, SEO strategist, and digital content creator.",
    inLanguage: "en-US",
    publisher: {
      "@id": schemaIds.person,
    },
    creator: {
      "@id": schemaIds.person,
    },
    copyrightHolder: {
      "@id": schemaIds.person,
    },
  };

  return createJsonLd([person, website]);
}

/* -------------------------------------------------------------------------- */
/* HOME PAGE                                                                  */
/* -------------------------------------------------------------------------- */

export function getHomePageSchema() {
  const pageUrl = SITE_URL;

  return createJsonLd([
    {
      "@type": "WebPage",
      "@id": schemaIds.homepage,
      url: pageUrl,
      name: "Nicholas Egner | Minneapolis Web Developer, SEO Specialist & Digital Content Creator",
      description:
        "Portfolio of Nicholas Egner, a Minneapolis-based web developer, content creator, and SEO strategist.",
      isPartOf: {
        "@id": schemaIds.website,
      },
      about: {
        "@id": schemaIds.person,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#primaryimage`,
        url: DEFAULT_IMAGE,
      },
      inLanguage: "en-US",
    },
  ]);
}

/* -------------------------------------------------------------------------- */
/* ABOUT PAGE                                                                 */
/* -------------------------------------------------------------------------- */

export function getProfilePageSchema() {
  const pageUrl = `${SITE_URL}/about`;

  return createJsonLd([
    {
      "@type": "ProfilePage",
      "@id": `${pageUrl}#profilepage`,
      url: pageUrl,
      name: "About Nicholas Egner",
      description:
        "Learn more about Nicholas Egner, a Minneapolis-based web developer, SEO strategist, and digital content creator.",
      isPartOf: {
        "@id": schemaIds.website,
      },
      mainEntity: {
        "@id": schemaIds.person,
      },
      breadcrumb: {
        "@id": `${pageUrl}#breadcrumb`,
      },
      inLanguage: "en-US",
    },
    getBreadcrumbSchema([
      {
        name: "Home",
        url: SITE_URL,
      },
      {
        name: "About",
        url: pageUrl,
      },
    ]),
  ]);
}

/* -------------------------------------------------------------------------- */
/* CONTACT PAGE                                                               */
/* -------------------------------------------------------------------------- */

export function getContactPageSchema() {
  const pageUrl = `${SITE_URL}/contact`;

  return createJsonLd([
    {
      "@type": "ContactPage",
      "@id": `${pageUrl}#contactpage`,
      url: pageUrl,
      name: "Contact Nicholas Egner",
      description:
        "Contact Nicholas Egner about web development, SEO, content strategy, video, and digital projects.",
      isPartOf: {
        "@id": schemaIds.website,
      },
      mainEntity: {
        "@id": schemaIds.person,
      },
      breadcrumb: {
        "@id": `${pageUrl}#breadcrumb`,
      },
      inLanguage: "en-US",
    },
    getBreadcrumbSchema([
      {
        name: "Home",
        url: SITE_URL,
      },
      {
        name: "Contact",
        url: pageUrl,
      },
    ]),
  ]);
}

/* -------------------------------------------------------------------------- */
/* BLOG HUB                                                                   */
/* -------------------------------------------------------------------------- */

export function getBlogHubSchema(posts = []) {
  const pageUrl = `${SITE_URL}/blog`;
  const postItems = toItemArray(posts);

  return createJsonLd([
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#collectionpage`,
      url: pageUrl,
      name: "Blog",
      description:
        "Articles and notes from Nicholas Egner on web development, SEO, content strategy, video, and digital systems.",
      isPartOf: {
        "@id": schemaIds.website,
      },
      about: {
        "@id": schemaIds.person,
      },
      breadcrumb: {
        "@id": `${pageUrl}#breadcrumb`,
      },
      mainEntity: {
        "@type": "ItemList",
        "@id": `${pageUrl}#blog-list`,
        name: "Nicholas Egner Blog Posts",
        itemListElement: postItems.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: post.title,
          url: `${SITE_URL}/blog/${post.slug}`,
        })),
      },
      inLanguage: "en-US",
    },
    getBreadcrumbSchema([
      {
        name: "Home",
        url: SITE_URL,
      },
      {
        name: "Blog",
        url: pageUrl,
      },
    ]),
  ]);
}

/* -------------------------------------------------------------------------- */
/* BLOG POST                                                                  */
/* -------------------------------------------------------------------------- */

function buildVideoObject({ video, post, pageUrl, videoId, image }) {
  if (!video) return null;

  const contentUrl =
    video.contentUrl || video.videoUrl || video?.src?.mp4 || video?.src?.webm;

  const embedUrl =
    video.embedUrl ||
    video?.youtube?.embedUrl ||
    (video.youtubeId
      ? `https://www.youtube.com/embed/${video.youtubeId}`
      : undefined);

  if (!contentUrl && !embedUrl && !video?.youtube?.url) {
    return null;
  }

  return cleanSchema({
    "@type": "VideoObject",
    "@id": videoId,
    name: video.title || post.title,
    description:
      video.videoDescription || video.description || post.description,
    thumbnailUrl: imageArray(video.thumbnail, image, DEFAULT_IMAGE),
    uploadDate: video.uploadDate || post.published_time,
    duration: video.duration,
    contentUrl,
    embedUrl,
    url: pageUrl,
    inLanguage: "en-US",
    isAccessibleForFree:
      typeof video.isAccessibleForFree === "boolean"
        ? video.isAccessibleForFree
        : true,
    isFamilyFriendly:
      typeof video.familyFriendly === "boolean"
        ? video.familyFriendly
        : undefined,
    sameAs: video.sameAs || video?.youtube?.url,
    transcript: video.transcript || post.transcript,
    mainEntityOfPage: {
      "@id": `${pageUrl}#webpage`,
    },
    author: {
      "@id": schemaIds.person,
    },
    creator: {
      "@id": schemaIds.person,
    },
    publisher: {
      "@id": schemaIds.person,
    },
  });
}

export function getBlogPostSchema({ post, slug }) {
  const pageUrl = `${SITE_URL}/blog/${slug}`;
  const image = post.meta_image || post.hero_image || DEFAULT_IMAGE;

  const primaryVideo = buildVideoObject({
    video: post.primaryVideo,
    post,
    pageUrl,
    videoId: `${pageUrl}#primary-video`,
    image,
  });

  const blockVideos = Array.isArray(post.contentBlocks)
    ? post.contentBlocks.filter((block) => block.type === "video" && block.src)
    : [];

  const supportingVideos = blockVideos
    .map((block, index) =>
      buildVideoObject({
        video: block,
        post,
        pageUrl,
        videoId: `${pageUrl}#supporting-video-${index + 1}`,
        image,
      }),
    )
    .filter(Boolean);

  const webPage = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: post.title,
    description: post.description,
    isPartOf: {
      "@id": schemaIds.website,
    },
    mainEntity: {
      "@id": `${pageUrl}#blogposting`,
    },
    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      "@id": `${pageUrl}#primaryimage`,
      url: image,
    },
    inLanguage: "en-US",
  };

  const blogPosting = {
    "@type": "BlogPosting",
    "@id": `${pageUrl}#blogposting`,
    mainEntityOfPage: {
      "@id": `${pageUrl}#webpage`,
    },
    headline: post.title,
    description: post.description,
    image: imageArray(image),
    datePublished: post.published_time,
    dateModified: post.modified_time || post.published_time,
    author: {
      "@id": schemaIds.person,
    },
    publisher: {
      "@id": schemaIds.person,
    },
    isPartOf: {
      "@id": schemaIds.website,
    },
    keywords: Array.isArray(post.keywords) ? post.keywords : undefined,

    // Blog-friendly: the article is the main thing.
    // The video supports the blog post.
    video: primaryVideo
      ? {
          "@id": primaryVideo["@id"],
        }
      : undefined,

    hasPart: supportingVideos.length
      ? supportingVideos.map((video) => ({
          "@id": video["@id"],
        }))
      : undefined,

    inLanguage: "en-US",
  };

  const breadcrumbs = getBreadcrumbSchema([
    {
      name: "Home",
      url: SITE_URL,
    },
    {
      name: "Blog",
      url: `${SITE_URL}/blog`,
    },
    {
      name: post.title,
      url: pageUrl,
    },
  ]);

  return createJsonLd(
    [
      webPage,
      blogPosting,
      primaryVideo,
      ...supportingVideos,
      breadcrumbs,
    ].filter(Boolean),
  );
}

/* -------------------------------------------------------------------------- */
/* VIDEOS HUB                                                                 */
/* -------------------------------------------------------------------------- */

export function getVideosHubSchema(items = []) {
  const pageUrl = `${SITE_URL}/videos`;

  const videoItems = toItemArray(items).filter(
    (item) => item.primaryVideo || item.video || item.type === "video",
  );

  return createJsonLd([
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#collectionpage`,
      url: pageUrl,
      name: "Videos",
      description:
        "Video explainers, walkthroughs, and digital strategy content from Nicholas Egner.",
      isPartOf: {
        "@id": schemaIds.website,
      },
      about: {
        "@id": schemaIds.person,
      },
      breadcrumb: {
        "@id": `${pageUrl}#breadcrumb`,
      },
      mainEntity: {
        "@type": "ItemList",
        "@id": `${pageUrl}#video-list`,
        name: "Nicholas Egner Videos",
        itemListElement: videoItems.map((item, index) => {
          const video = item.primaryVideo || item.video || item;

          return {
            "@type": "ListItem",
            position: index + 1,
            name: video.title || item.title,
            url: `${SITE_URL}/videos/${item.slug}`,
          };
        }),
      },
      inLanguage: "en-US",
    },
    getBreadcrumbSchema([
      {
        name: "Home",
        url: SITE_URL,
      },
      {
        name: "Videos",
        url: pageUrl,
      },
    ]),
  ]);
}

/* -------------------------------------------------------------------------- */
/* VIDEO WATCH PAGE                                                           */
/* -------------------------------------------------------------------------- */

export function getVideoPageSchema({ item, post, video, slug }) {
  const source = item || post || {};
  const videoSource = video || source.primaryVideo || source.video || source;

  const resolvedSlug = slug || source.slug || videoSource.slug;
  const pageUrl = `${SITE_URL}/videos/${resolvedSlug}`;
  const image =
    videoSource.thumbnail ||
    source.meta_image ||
    source.hero_image ||
    DEFAULT_IMAGE;

  const videoObject = buildVideoObject({
    video: videoSource,
    post: source,
    pageUrl,
    videoId: `${pageUrl}#video`,
    image,
  });

  const relatedBlogUrl = source.blogPath
    ? absoluteUrl(source.blogPath)
    : source.title
      ? `${SITE_URL}/blog/${resolvedSlug}`
      : undefined;

  const webPage = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: videoSource.title || source.title,
    description:
      videoSource.videoDescription ||
      videoSource.description ||
      source.description,
    isPartOf: {
      "@id": schemaIds.website,
    },
    mainEntity: videoObject
      ? {
          "@id": videoObject["@id"],
        }
      : undefined,
    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      "@id": `${pageUrl}#primaryimage`,
      url: image,
    },
    relatedLink: relatedBlogUrl,
    inLanguage: "en-US",
  };

  const breadcrumbs = getBreadcrumbSchema([
    {
      name: "Home",
      url: SITE_URL,
    },
    {
      name: "Videos",
      url: `${SITE_URL}/videos`,
    },
    {
      name: videoSource.title || source.title,
      url: pageUrl,
    },
  ]);

  return createJsonLd([webPage, videoObject, breadcrumbs].filter(Boolean));
}

/* -------------------------------------------------------------------------- */
/* PROJECTS HUB                                                               */
/* -------------------------------------------------------------------------- */

export function getProjectsHubSchema(projectItems = []) {
  const pageUrl = `${SITE_URL}/projects`;
  const projects = toItemArray(projectItems);

  return createJsonLd([
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#collectionpage`,
      url: pageUrl,
      name: "Projects",
      description:
        "Explore web development, SEO, video, and digital strategy projects by Nicholas Egner.",
      isPartOf: {
        "@id": schemaIds.website,
      },
      about: {
        "@id": schemaIds.person,
      },
      breadcrumb: {
        "@id": `${pageUrl}#breadcrumb`,
      },
      mainEntity: {
        "@type": "ItemList",
        "@id": `${pageUrl}#project-list`,
        name: "Nicholas Egner Projects",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.title,
          url: `${SITE_URL}/projects/${project.slug}`,
        })),
      },
      inLanguage: "en-US",
    },
    getBreadcrumbSchema([
      {
        name: "Home",
        url: SITE_URL,
      },
      {
        name: "Projects",
        url: pageUrl,
      },
    ]),
  ]);
}

/* -------------------------------------------------------------------------- */
/* PROJECT DETAIL PAGE                                                        */
/* -------------------------------------------------------------------------- */

export function getProjectPageSchema(projectOrArgs) {
  const project = projectOrArgs?.project || projectOrArgs;
  const slug = projectOrArgs?.slug || project?.slug;

  const pageUrl = `${SITE_URL}/projects/${slug}`;
  const image =
    project.image ||
    project.thumbnail ||
    project.heroImage ||
    project.hero_image ||
    DEFAULT_IMAGE;

  const webPage = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: project.title,
    description: project.description || project.summary,
    isPartOf: {
      "@id": schemaIds.website,
    },
    about: {
      "@id": `${pageUrl}#project`,
    },
    creator: {
      "@id": schemaIds.person,
    },
    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      "@id": `${pageUrl}#primaryimage`,
      url: image,
    },
    inLanguage: "en-US",
  };

  const creativeWork = {
    "@type": "CreativeWork",
    "@id": `${pageUrl}#project`,
    name: project.title,
    description: project.description || project.summary,
    image,
    url: pageUrl,
    creator: {
      "@id": schemaIds.person,
    },
    author: {
      "@id": schemaIds.person,
    },
    keywords: project.capabilities || project.tags || project.stack || [],
    mainEntityOfPage: {
      "@id": `${pageUrl}#webpage`,
    },
    inLanguage: "en-US",
  };

  const breadcrumbs = getBreadcrumbSchema([
    {
      name: "Home",
      url: SITE_URL,
    },
    {
      name: "Projects",
      url: `${SITE_URL}/projects`,
    },
    {
      name: project.title,
      url: pageUrl,
    },
  ]);

  return createJsonLd([webPage, creativeWork, breadcrumbs]);
}
