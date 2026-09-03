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
  const images = [...new Set(values.map(absoluteUrl).filter(Boolean))];
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
        "About Nicholas Egner, a Minneapolis web developer, video producer, SEO strategist, and digital creator building custom websites, content systems, video experiences, and search-focused digital work for businesses and organizations.",
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
  const postItems = toItemArray(posts)
    .filter(
      (post) => post.live !== false && post.published !== false,
    )
    .sort((a, b) => {
      const dateA = new Date(a.published_time || a.date || 0);
      const dateB = new Date(b.published_time || b.date || 0);

      return dateB - dateA;
    });

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
/* BLOG ARCHIVE                                                                  */
/* -------------------------------------------------------------------------- */

export function getBlogArchiveSchema(posts = []) {
  const pageUrl = `${SITE_URL}/blog/archive`;

  const postItems = toItemArray(posts)
    .filter((post) => post.live !== false)
    .sort((a, b) => {
      const dateA = new Date(a.published_time || a.date || 0);
      const dateB = new Date(b.published_time || b.date || 0);

      return dateB - dateA;
    });

  return createJsonLd([
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#collectionpage`,
      url: pageUrl,
      name: "Blog Archive",
      description:
        "A chronological archive of articles and notes from Nicholas Egner on web development, SEO, video, content strategy, and digital systems.",
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
        "@id": `${pageUrl}#blog-archive-list`,
        name: "Nicholas Egner Blog Archive",
        numberOfItems: postItems.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
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
        url: `${SITE_URL}/blog`,
      },
      {
        name: "Archive",
        url: pageUrl,
      },
    ]),
  ]);
}

/* -------------------------------------------------------------------------- */
/* BLOG POST                                                                  */
/* -------------------------------------------------------------------------- */

function personRef() {
  return {
    "@type": "Person",
    "@id": schemaIds.person,
    name: "Nicholas Egner",
    url: SITE_URL,
  };
}

function getCopyrightYear(dateValue) {
  if (!dateValue) return undefined;

  const year = new Date(dateValue).getFullYear();

  return Number.isFinite(year) ? year : undefined;
}

function toIsoDate(value) {
  if (!value) return undefined;

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) return undefined;

  return parsed.toISOString();
}

function getArticleSection(post) {
  const section =
    post.schema?.articleSection ||
    post.articleSection ||
    post.category ||
    post.practiceArea ||
    post.topic ||
    post.type;

  if (Array.isArray(section)) return section[0];

  return section;
}

function getAboutEntities(post) {
  if (Array.isArray(post.schema?.about) && post.schema.about.length) {
    return post.schema.about;
  }

  const section = getArticleSection(post);

  if (!section) return undefined;

  return [
    {
      "@type": "Thing",
      name: section,
    },
  ];
}

function getPostKeywords(post) {
  const keywords = post.schema?.keywords || post.keywords || post.tags;

  return Array.isArray(keywords) && keywords.length ? keywords : undefined;
}

function getVideoContentUrl(video) {
  return (
    video?.contentUrl ||
    video?.videoUrl ||
    (video?.type === "video" ? video?.url : undefined) ||
    video?.src?.mp4 ||
    video?.src?.webm
  );
}

function getVideoEncodingFormat(video) {
  if (video?.encodingFormat) return video.encodingFormat;

  const contentUrl = getVideoContentUrl(video);

  if (!contentUrl) return undefined;

  if (/\.mp4(?:$|\?)/i.test(contentUrl)) return "video/mp4";
  if (/\.webm(?:$|\?)/i.test(contentUrl)) return "video/webm";
  if (/\.mov(?:$|\?)/i.test(contentUrl)) return "video/quicktime";
  if (/\.m4v(?:$|\?)/i.test(contentUrl)) return "video/x-m4v";

  return undefined;
}

function getYouTubeId(url) {
  if (!url || typeof url !== "string") return undefined;

  const patterns = [
    /youtu\.be\/([^?&#/]+)/i,
    /youtube\.com\/watch\?(?:.*&)?v=([^&#]+)/i,
    /youtube\.com\/(?:embed|shorts|live)\/([^?&#/]+)/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return undefined;
}

function getVideoEmbedUrl(video) {
  if (video?.embedUrl) return video.embedUrl;
  if (video?.youtube?.embedUrl) return video.youtube.embedUrl;

  const youtubeId =
    video?.youtubeId || getYouTubeId(video?.youtube?.url);

  return youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}`
    : undefined;
}

function buildClipObjects(video, pageUrl) {
  if (!Array.isArray(video?.clips) || !video.clips.length) return undefined;

  return video.clips
    .filter(
      (clip) =>
        clip?.name &&
        clip?.url &&
        Number.isFinite(Number(clip.startOffset)),
    )
    .map((clip) => {
      const startOffset = Number(clip.startOffset);
      const endOffset = Number.isFinite(Number(clip.endOffset))
        ? Number(clip.endOffset)
        : undefined;

      return cleanSchema({
        "@type": "Clip",
        name: clip.name,
        startOffset,
        endOffset,
        url: clip.url,
      });
    });
}

function buildSeekToAction(video, pageUrl) {
  const target =
    video?.seekToAction?.target ||
    video?.seekTemplate ||
    (video?.enableSeekToAction
      ? `${pageUrl}?t={seek_to_second_number}`
      : undefined);

  if (!target) return undefined;

  return {
    "@type": "SeekToAction",
    target,
    "startOffset-input": "required name=seek_to_second_number",
  };
}

function buildInteractionStatistic(video) {
  const count =
    video?.interactionStatistic?.userInteractionCount ??
    video?.viewCount ??
    video?.interactionCount;

  if (!Number.isFinite(Number(count))) return undefined;

  return {
    "@type": "InteractionCounter",
    interactionType: {
      "@type": "WatchAction",
    },
    userInteractionCount: Number(count),
  };
}

function buildVideoObject({
  video,
  post,
  pageUrl,
  videoId,
  image,
  isPrimary = true,
}) {
  if (!video) return null;

  const contentUrl = getVideoContentUrl(video);
  const embedUrl = getVideoEmbedUrl(video);
  const youtubeUrl = video?.youtube?.url;
  const uploadDate = toIsoDate(
    video.uploadDate || post.published_time || post.date,
  );

  if (!contentUrl && !embedUrl && !youtubeUrl) {
    return null;
  }

  const clips = buildClipObjects(video, pageUrl);
  const potentialAction = buildSeekToAction(video, pageUrl);

  return cleanSchema({
    "@type": "VideoObject",
    "@id": videoId,

    name: video.title || post.title,
    description:
      video.videoDescription ||
      video.description ||
      post.description,

    thumbnailUrl: imageArray(
      video.thumbnail,
      video.poster,
      image,
      post.meta_image,
      post.hero_image,
      DEFAULT_IMAGE,
    ),

    uploadDate,
    datePublished: uploadDate,
    dateModified: toIsoDate(
      video.modifiedDate ||
        post.modified_time ||
        post.published_time ||
        post.date,
    ),
    duration: video.duration,

    contentUrl,
    embedUrl,
    encodingFormat: getVideoEncodingFormat(video),

    url: pageUrl,
    inLanguage: video.inLanguage || "en-US",

    width: video.width,
    height: video.height,

    isAccessibleForFree:
      typeof video.isAccessibleForFree === "boolean"
        ? video.isAccessibleForFree
        : true,

    isFamilyFriendly:
      typeof video.familyFriendly === "boolean"
        ? video.familyFriendly
        : undefined,

    sameAs: video.sameAs || youtubeUrl,

    keywords:
      Array.isArray(video.keywords) && video.keywords.length
        ? video.keywords
        : getPostKeywords(post),

    transcript: video.transcript || post.transcript,

    expires: video.expires,
    regionsAllowed: video.regionsAllowed,
    ineligibleRegion: video.ineligibleRegion,

    interactionStatistic: buildInteractionStatistic(video),
    hasPart: clips,
    potentialAction,

    mainEntityOfPage: isPrimary
      ? {
          "@id": `${pageUrl}#webpage`,
        }
      : undefined,

    isPartOf: !isPrimary
      ? {
          "@id": `${pageUrl}#webpage`,
        }
      : undefined,

    author: personRef(),
    creator: personRef(),
    publisher: personRef(),
  });
}

function getWordCount(post) {
  if (!Array.isArray(post.contentBlocks)) return undefined;

  const text = post.contentBlocks
    .filter((block) =>
      ["paragraph", "text", "quote", "callout", "heading"].includes(
        block.type,
      ),
    )
    .map((block) => block.text || "")
    .join(" ")
    .replace(/\[[^\]]+\]\([^\)]+\)/g, " ")
    .replace(/[`*_>#-]/g, " ")
    .trim();

  if (!text) return undefined;

  return text.split(/\s+/).filter(Boolean).length;
}

export function getBlogPostSchema({ post, slug }) {
  const pageUrl = `${SITE_URL}/blog/${slug}`;
  const image = post.meta_image || post.hero_image || DEFAULT_IMAGE;
  const imageId = `${pageUrl}#primaryimage`;
  const isWatchPage = Boolean(post.primaryVideo || post.isWatchPage);

  const primaryImage = {
    "@type": "ImageObject",
    "@id": imageId,
    url: image,
    contentUrl: image,
    caption: post.meta_image_alt || post.hero_image_alt || post.title,
  };

  const primaryVideo = buildVideoObject({
    video: post.primaryVideo,
    post,
    pageUrl,
    videoId: `${pageUrl}#primary-video`,
    image,
    isPrimary: isWatchPage,
  });

  const blockVideos = Array.isArray(post.contentBlocks)
    ? post.contentBlocks.filter(
        (block) =>
          block.type === "video" &&
          (block.src || block.contentUrl || block.embedUrl),
      )
    : [];

  const supportingVideos = blockVideos
    .map((block, index) =>
      buildVideoObject({
        video: block,
        post,
        pageUrl,
        videoId: `${pageUrl}#supporting-video-${index + 1}`,
        image,
        isPrimary: false,
      }),
    )
    .filter(Boolean);

  const mediaRefs = [primaryVideo, ...supportingVideos]
    .filter(Boolean)
    .map((video) => ({
      "@id": video["@id"],
    }));

  const articleId = `${pageUrl}#blogposting`;
  const mainEntityId =
    isWatchPage && primaryVideo
      ? primaryVideo["@id"]
      : articleId;

  const webPage = cleanSchema({
    "@type": isWatchPage ? ["WebPage", "ItemPage"] : "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: post.title,
    description: post.description,

    isPartOf: {
      "@id": schemaIds.website,
    },

    about: isWatchPage && primaryVideo
      ? {
          "@id": primaryVideo["@id"],
        }
      : getAboutEntities(post),

    mainEntity: {
      "@id": mainEntityId,
    },

    hasPart:
      isWatchPage
        ? [
            {
              "@id": articleId,
            },
            ...supportingVideos.map((video) => ({
              "@id": video["@id"],
            })),
          ]
        : mediaRefs.length
          ? mediaRefs
          : undefined,

    video:
      primaryVideo
        ? {
            "@id": primaryVideo["@id"],
          }
        : undefined,

    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },

    primaryImageOfPage: {
      "@id": imageId,
    },

    datePublished: toIsoDate(post.published_time || post.date),
    dateModified: toIsoDate(
      post.modified_time || post.published_time || post.date,
    ),

    author: personRef(),
    creator: personRef(),

    inLanguage: "en-US",
  });

  const blogPosting = cleanSchema({
    "@type": "BlogPosting",
    "@id": articleId,

    url: pageUrl,

    mainEntityOfPage: !isWatchPage
      ? {
          "@id": `${pageUrl}#webpage`,
        }
      : undefined,

    isPartOf: isWatchPage
      ? {
          "@id": `${pageUrl}#webpage`,
        }
      : {
          "@id": schemaIds.website,
        },

    headline: post.title,
    description: post.description,

    image: {
      "@id": imageId,
    },
    thumbnailUrl: image,

    datePublished: toIsoDate(post.published_time || post.date),
    dateModified: toIsoDate(
      post.modified_time || post.published_time || post.date,
    ),

    articleSection: getArticleSection(post),
    about:
      isWatchPage && primaryVideo
        ? [
            {
              "@id": primaryVideo["@id"],
            },
            ...(getAboutEntities(post) || []),
          ]
        : getAboutEntities(post),

    author: personRef(),
    creator: personRef(),
    publisher: personRef(),

    copyrightYear: getCopyrightYear(
      post.published_time || post.date,
    ),
    copyrightHolder: personRef(),

    isAccessibleForFree: true,

    keywords: getPostKeywords(post),
    wordCount: getWordCount(post),

    video:
      primaryVideo
        ? {
            "@id": primaryVideo["@id"],
          }
        : undefined,

    associatedMedia: mediaRefs.length ? mediaRefs : undefined,

    hasPart: supportingVideos.length
      ? supportingVideos.map((video) => ({
          "@id": video["@id"],
        }))
      : undefined,

    inLanguage: "en-US",
  });

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
      primaryImage,
      primaryVideo,
      blogPosting,
      ...supportingVideos,
      breadcrumbs,
    ].filter(Boolean),
  );
}

/* -------------------------------------------------------------------------- */
/* VIDEOS HUB                                                                 */
/* -------------------------------------------------------------------------- */

export function getVideosHubSchema(items = []) {
  const pageUrl = `${SITE_URL}/video`;

  const videoItems = (Array.isArray(items) ? items : toItemArray(items)).filter(
    (item) =>
      (item.type === "video" && item.slug) ||
      (item.type === "webpage" && item.url),
  );

  return createJsonLd([
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#collectionpage`,
      url: pageUrl,
      name: "Video Work",
      description:
        "Video production, editing, documentary storytelling, corporate event video, interactive video, and video SEO work from Nicholas Egner.",
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
        name: "Nicholas Egner Video Work",
        itemListElement: videoItems.map((item, index) => {
          const video = item.primaryVideo || item.video || item;

          return {
            "@type": "ListItem",
            position: index + 1,
            name: video.title || item.title,
            url:
              item.type === "video" && item.slug
                ? `${SITE_URL}/video/${item.slug}`
                : absoluteUrl(item.url),
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
        name: "Video",
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
  const pageUrl = `${SITE_URL}/video/${resolvedSlug}`;
  const image =
    videoSource.thumbnail ||
    videoSource.poster ||
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
    : source.relatedPages?.[0]?.url
      ? absoluteUrl(source.relatedPages[0].url)
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
      name: "Video",
      url: `${SITE_URL}/video`,
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

/* -------------------------------------------------------------------------- */
/* PROJECT DETAIL PAGE                                                        */
/* -------------------------------------------------------------------------- */

export function getVideoExperienceSchema() {
  const pageUrl = `${SITE_URL}/video-experience`;

  const webPage = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Interactive Video Experience",
    description:
      "An interactive video experience from Nicholas Egner with sections covering past work, present focus, future direction, and creative digital strategy.",
    isPartOf: {
      "@id": schemaIds.website,
    },
    mainEntity: {
      "@id": `${pageUrl}#experience`,
    },
    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      "@id": `${pageUrl}#primaryimage`,
      url: DEFAULT_IMAGE,
    },
    author: {
      "@id": schemaIds.person,
    },
    creator: {
      "@id": schemaIds.person,
    },
    inLanguage: "en-US",
  };

  const experience = {
    "@type": "CreativeWork",
    "@id": `${pageUrl}#experience`,
    name: "Interactive Video Experience",
    description:
      "An interactive video experience from Nicholas Egner organized into intro, past, present, future, and wrap-up sections.",
    url: pageUrl,
    image: DEFAULT_IMAGE,
    creator: {
      "@id": schemaIds.person,
    },
    author: {
      "@id": schemaIds.person,
    },
    isPartOf: {
      "@id": schemaIds.website,
    },
    hasPart: [
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#intro`,
        name: "Intro",
        position: 1,
      },
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#past`,
        name: "Past",
        position: 2,
      },
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#present`,
        name: "Present",
        position: 3,
      },
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#future`,
        name: "Future",
        position: 4,
      },
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#wrap`,
        name: "Wrap",
        position: 5,
      },
    ],
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
      name: "Interactive Video Experience",
      url: pageUrl,
    },
  ]);

  return createJsonLd([webPage, experience, breadcrumbs]);
}


/* -------------------------------------------------------------------------- */
/* SKILL PAGE                                                                 */
/* -------------------------------------------------------------------------- */

export function getSkillPageSchema({ tech }) {
  if (!tech?.slug) return undefined;

  const pageUrl = `${SITE_URL}/skills/${tech.slug}`;
  const breadcrumb = getBreadcrumbSchema([
    {
      name: "Home",
      url: SITE_URL,
    },
    {
      name: "Skills",
      url: `${SITE_URL}/skills`,
    },
    {
      name: tech.name,
      url: pageUrl,
    },
  ]);

  return createJsonLd([
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: `${tech.name} | Skills | Nicholas Egner`,
      description: tech.text,
      inLanguage: "en-US",
      isPartOf: {
        "@id": schemaIds.website,
      },
      about: {
        "@type": "Thing",
        name: tech.name,
        description: tech.text,
      },
      author: {
        "@id": schemaIds.person,
      },
      breadcrumb: {
        "@id": `${pageUrl}#breadcrumb`,
      },
    },
    breadcrumb,
  ]);
}
