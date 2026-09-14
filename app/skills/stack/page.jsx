import Stack from "../skillscomps/stack";
import { getSkillGroups } from "../../lib/contentApi";

export default async function StackPage() {
  const skillGroups = await getSkillGroups();

  return <Stack skillGroups={skillGroups} />;
}
