import posts from "../../../blog";

export const dynamic = "force-static";

export async function GET() {
  const livePosts = Object.fromEntries(
    Object.entries(posts).filter(
      ([, post]) => post?.live !== false && post?.published !== false,
    ),
  );

  return Response.json(livePosts, {
    headers: {
      "Cache-Control":
        "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
