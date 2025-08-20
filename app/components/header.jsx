import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";

import React from "react";

function header() {
  return (
    <header style={{ paddingLeft: 20, display: "flex" }}>
      <a href={"/"}>
        <Image
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/ne-white.svg"
          width={120}
          height={120}
          alt="Nicholas Egner Logo"
        />
      </a>
      <h1 className={styles.skillsH}></h1>
    </header>
  );
}

export default header;
