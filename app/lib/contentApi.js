import "server-only";

const CONTENT_API_BASE_URL = (
  process.env.CONTENT_API_BASE_URL ||
  "https://main.d37c76h1ruhsqz.amplifyapp.com"
).replace(/\/$/, "");

export const CONTENT_REVALIDATE_SECONDS = 60;

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

async function requestContent(path, validate, fallback) {
  try {
    const response = await fetch(`${CONTENT_API_BASE_URL}${path}`, {
      next: { revalidate: CONTENT_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!validate(data)) {
      throw new Error("Unexpected response shape");
    }

    return data;
  } catch (error) {
    console.error(
      `Content Hub request failed for ${path}; using the local fallback.`,
      error,
    );

    return fallback();
  }
}

export async function getBlogData() {
  return requestContent(
    "/api/blog?site=nicholasegner",
    isRecord,
    async () => (await import("../../blog")).default,
  );
}

export async function getProjectsData() {
  return requestContent(
    "/api/projects?site=nicholasegner",
    isRecord,
    async () => {
      const { projects } = await import("./projects");
      return Object.fromEntries(projects.map((project) => [project.slug, project]));
    },
  );
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
    async () => {
      const { allTech, skillGroups } = await import("./techStack");

      return {
        categoryOrder: skillGroups.map((group) => group.category),
        technologies: Object.fromEntries(
          allTech.map((technology) => [technology.slug, technology]),
        ),
      };
    },
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
      Array.isArray(data.capabilities) &&
      Array.isArray(data.items) &&
      isRecord(data.assets),
    async () => {
      const {
        videoCapabilities,
        videoWork,
        videoHubAssets,
      } = await import("./videoWork");

      return {
        capabilities: videoCapabilities,
        items: videoWork,
        assets: videoHubAssets,
      };
    },
  );
}
