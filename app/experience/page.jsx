import React from "react";
import Link from "next/link";

function Experience() {
  return (
    <div>
      Experience
      <Link href={"./experience/about-me"}>
        <div>About-Me</div>
      </Link>
      <Link href={"./experience/skills"}>
        <div>Skills</div>
      </Link>
    </div>
  );
}

export default Experience;
