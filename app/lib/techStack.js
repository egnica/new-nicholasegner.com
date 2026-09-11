// app/lib/techStack.js

import stackData from "../../stack.json";

const additionalBackEndSkills = [
  {
    name: "Quo",
    slug: "quo",
    text: "I use Quo to connect business calling and SMS with application workflows. My work includes shared business numbers, customer texting, communication routing, webhook and API integrations, and tying phone activity into custom operational systems.",
    image:
      "<svg width='500' height='500' viewBox='0 0 96 96' xmlns='http://www.w3.org/2000/svg'><rect x='3' y='3' width='90' height='90' rx='22' fill='#5B4BFF'/><circle cx='47' cy='45' r='22' fill='none' stroke='#fff' stroke-width='8'/><path d='m61 60 14 14' stroke='#fff' stroke-width='8' stroke-linecap='round'/><path d='M34 45c4-5 8-7 13-7s9 2 13 7c-4 5-8 7-13 7s-9-2-13-7Z' fill='#9FE5FF'/></svg>",
    projects: [],
  },
  {
    name: "Lob",
    slug: "lob",
    text: "I use Lob to connect physical direct mail with custom application workflows. My work includes address handling, letter previews, test and live sends, delivery status, submission safeguards, and integrating direct mail into CRM-style outreach processes.",
    image:
      "<svg width='500' height='500' viewBox='0 0 96 96' xmlns='http://www.w3.org/2000/svg'><rect x='3' y='3' width='90' height='90' rx='22' fill='#2A45F9'/><rect x='19' y='27' width='58' height='42' rx='7' fill='none' stroke='#fff' stroke-width='6'/><path d='m22 32 26 20 26-20' fill='none' stroke='#fff' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/><path d='M63 61h12' stroke='#BBAAFF' stroke-width='6' stroke-linecap='round'/></svg>",
    projects: [],
  },
];

const websitePlatformSkills = [
  {
    name: "WordPress",
    slug: "wordpress",
    text: "I use WordPress for content-driven websites, existing-site support, page and theme customization, plugin configuration, maintenance, and SEO-focused updates. I am comfortable working within established WordPress builds and adapting them to improve content, presentation, and day-to-day usability.",
    image:
      "<svg width='500' height='500' viewBox='0 0 96 96' xmlns='http://www.w3.org/2000/svg'><rect x='3' y='3' width='90' height='90' rx='22' fill='#21759B'/><circle cx='48' cy='48' r='29' fill='none' stroke='#fff' stroke-width='5'/><path d='M27 34h13M56 34h12M33 34l11 34M62 34 52 68M42 34l10 34M68 34c3 7 2 15-2 23' fill='none' stroke='#fff' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/></svg>",
    projects: [],
  },
  {
    name: "Shopify",
    slug: "shopify",
    text: "I have hands-on experience working with Shopify storefronts, including products, content, theme settings, layout adjustments, and site presentation. I can work within an existing Shopify setup to make practical front-end and content changes while staying within the platform's ecommerce structure.",
    image:
      "<svg width='500' height='500' viewBox='0 0 96 96' xmlns='http://www.w3.org/2000/svg'><rect x='3' y='3' width='90' height='90' rx='22' fill='#95BF47'/><path d='M31 30h34l5 43H26l5-43Z' fill='#fff'/><path d='M38 32c1-10 5-16 11-16 5 0 9 5 10 16' fill='none' stroke='#fff' stroke-width='5' stroke-linecap='round'/><path d='M57 42c-3-2-6-3-9-3-5 0-8 2-8 6 0 8 17 5 17 16 0 7-6 11-14 11-4 0-8-1-11-3' fill='none' stroke='#5E8E3E' stroke-width='6' stroke-linecap='round'/></svg>",
    projects: [],
  },
  {
    name: "Wix",
    slug: "wix",
    text: "I have hands-on experience working in Wix to build and adjust pages, manage site content, refine layouts, and make responsive presentation changes. It is a useful platform when a project needs an approachable visual editing workflow and straightforward ongoing content management.",
    image:
      "<svg width='500' height='500' viewBox='0 0 96 96' xmlns='http://www.w3.org/2000/svg'><rect x='3' y='3' width='90' height='90' rx='22' fill='#111'/><path d='M18 34l8 29 8-20 8 20 8-29M57 34v29M65 34l13 29M78 34 65 63' fill='none' stroke='#fff' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/></svg>",
    projects: [],
  },
];

const baseSkillGroups = stackData.stack.map((group) =>
  group.category === "Back End"
    ? {
        ...group,
        technologies: [...group.technologies, ...additionalBackEndSkills],
      }
    : group,
);

export const skillGroups = [
  ...baseSkillGroups,
  {
    category: "CMS & Website Platforms",
    technologies: websitePlatformSkills,
  },
];

export const allTech = skillGroups.flatMap((group) =>
  group.technologies.map((tech) => ({
    ...tech,
    category: group.category,
  })),
);

export const techBySlug = Object.fromEntries(
  allTech.map((tech) => [tech.slug, tech]),
);

export function getTech(slug) {
  return techBySlug[slug];
}
