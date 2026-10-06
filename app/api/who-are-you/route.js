import { handleAdventureWinner } from "../_shared/adventureWinner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  return handleAdventureWinner(request, {
    sourcePath: "/who-are-you",
    subjectLabel: "Who Are You game",
  });
}
