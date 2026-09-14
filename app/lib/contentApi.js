import "server-only";

const CONTENT_API_BASE_URL = (
  process.env.CONTENT_API_BASE_URL ||
  "https://main.d37c76h1ruhsqz.amplifyapp.com"
).replace(/\/$/, "");

export const CONTENT_REVALIDATE_SECONDS = 300;

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

async function requestContent(path, validate) {
  const response = await fetch(`${CONTENT_API_BASE_URL}${path}`, {
    next: { revalidate: CONTENT_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(
      `Content Hub request failed for ${path}: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

  if (!validate(data)) {
    throw new Error(`Content Hub returned an unexpected response for ${path}`);
  }

  return data;
}

export async function getBlogData() {
  return requestContent("/api/blog?site=nicholasegner", isRecord);
}

export async function getProjectsData() {
  return requestContent("/api/projects?site=nicholasegner", isRecord);
}

export async function getProjects() {
  return Object.values(await getProjectsData());
}

export async function getTechStackData() {
  return requestContent(
    "/api/tech-stack?site=nicholasegner",
    (data) =>
      isRecord(data) &&
      Array.isArray(data.categoryOrder) &&
      isRecord(data.technologies),
  );
}

export async function getTechnologies() {
  const { technologies } = await getTechStackData();
  return Object.values(technologies);
}

export async function getSkillGroups() {
  const { categoryOrder, technologies } = await getTechStackData();
  const all = Object.values(technologies);

  return categoryOrder.map((category) => ({
    category,
    technologies: all.filter((technology) => technology.category === category),
  }));
}

export async function getVideoWorkData() {
  return requestContent(
    "/api/video-work?site=nicholasegner",
    (data) =>
      isRecord(data) &&
      isRecord(data.capabilities) &&
      Array.isArray(data.items) &&
      isRecord(data.assets),
  );
}
