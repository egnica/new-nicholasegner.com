import { getBlogData } from "../../lib/contentApi";

export const revalidate = 60;

export async function GET() {
  const posts = await getBlogData();

  return Response.json(posts, {
    headers: {
      "Cache-Control":
        "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
