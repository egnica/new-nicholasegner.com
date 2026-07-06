export const opportunities = {
  "hazelden-marketing-content-producer": {
    company: "Hazelden Betty Ford Foundation",
    role: "Marketing Content Producer",

    eyebrow: "Marketing Content Producer Application",
    headline: "Video, SEO & Digital Storytelling",
    introduction:
      "A custom application experience created for the Marketing Content Producer role at the Hazelden Betty Ford Foundation.",

    videoUrl:
      "https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/Marketing_Content_Producer.mp4",
    posterUrl:
      "https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/Hasel-cover.webp",

    actions: [
      {
        id: "resume",
        title: "Resume",
        url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/Nicholas_Egner_Marketing_Content_Producer.pdf",
      },
    ],

    note: {
      eyebrow: "Why I Created This",
      headline: "A video application with the content system built around it.",
      body:
        "This page is meant to show how I think about content production: combining the message, the video, the web experience, and the proof points into one clear digital experience.",
    },

    metadata: {
      title: "Nicholas Egner | Marketing Content Producer Application",
      description:
        "A custom video application experience for the Marketing Content Producer role at the Hazelden Betty Ford Foundation, featuring video, SEO, storytelling, and digital content work.",
      socialDescription:
        "A custom video application experience built around video production, SEO, web strategy, and mission-driven storytelling.",
      imageAlt:
        "Nicholas Egner Marketing Content Producer application video cover image",
    },

    cues: [
      {
        id: "01",
        title: "About Nicholas",
        url: "/about",
        startTime: 1,
        endTime: 68,
      },
      {
        id: "02",
        title: "My Story",
        url: "/video-experience",
        startTime: 1.5,
        endTime: 68,
      },
      {
        id: "99",
        title: "My Blog",
        url: "/blog",
        startTime: 2,
        endTime: 68,
      },
      {
        id: "03",
        title: "Davis Defense Video Hub",
        url: "https://www.davisdefenselawyers.com/video",
        startTime: 67.5,
        endTime: 96,
      },
      {
        id: "04",
        title: "Davis Case Study",
        url: "https://nicholasegner.com/projects?project=davis-defense",
        startTime: 68,
        endTime: 96.5,
      },
      {
        id: "05",
        title: "Video SEO Notes",
        url: "https://docs.google.com/document/d/1DKUDjqn9KfHWh4lsZUzRlLlY0H90l2XhzBLTl1kqyW4/edit?usp=sharing",
        startTime: 95,
        endTime: 121,
      },
      {
        id: "06",
        title: "Video SEO Trifecta",
        url: "https://nicholasegner.com/blog/video-seo-trifecta",
        startTime: 108,
        endTime: 121,
      },
      {
        id: "07",
        title: "YWCA Event Content",
        url: "https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/YWCA-+Womans-Triathlon.mp4",
        startTime: 120,
        endTime: 145,
      },
      {
        id: "08",
        title: "Landscape Structures",
        url: "https://nicholasegner.com",
        startTime: 120,
        endTime: 145,
      },
      {
        id: "09",
        title: "Barlow Research Conference 2024",
        url: "https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/bbc.mp4",
        startTime: 120,
        endTime: 145,
      },
      {
        id: "10",
        title: "Your Gardens By Design",
        url: "https://nicholasegner.com/blog/your-gardens-by-design-video",
        startTime: 120,
        endTime: 145,
      },
      {
        id: "98",
        title: "Past Work Video Reel",
        url: "https://www.youtube.com/watch?v=7NM8T8zdUlU",
        startTime: 120,
        endTime: 145,
      },
      {
        id: "11",
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/nicholas-egner/",
        startTime: 145,
        endTime: 270,
      },
      {
        id: "12",
        title: "Github",
        url: "https://github.com/egnica",
        startTime: 145,
        endTime: 270,
      },
      {
        id: "13",
        title: "YouTube",
        url: "https://www.youtube.com/@NicholasEgner",
        startTime: 145,
        endTime: 270,
      },
      {
        id: "14",
        title: "Spotify",
        url: "https://open.spotify.com/user/1224553002?si=c3d54db378354cf5&nd=1&dlsi=ffb896dd3c424f82",
        startTime: 145,
        endTime: 270,
      },
    ],
  },
};

export function getOpportunityBySlug(slug) {
  return opportunities[slug] ?? null;
}
