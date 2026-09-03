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

export const skillGroups = stackData.stack.map((group) =>
  group.category === "Back End"
    ? {
        ...group,
        technologies: [...group.technologies, ...additionalBackEndSkills],
      }
    : group,
);

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
