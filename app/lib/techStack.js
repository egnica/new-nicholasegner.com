// app/lib/techStack.js

import stackData from "../../stack.json";

export const allTech = stackData.stack.flatMap((group) =>
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
