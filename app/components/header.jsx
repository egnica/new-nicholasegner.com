import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";

import React from "react";

function header() {
  return (
    <header style={{ height: 75, paddingLeft: 20 }}>
      <a href={"/"}>
        <Image
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/NE-blue.svg"
          width={120}
          height={120}
          alt="Nicholas Egner Logo"
        />
      </a>
    </header>
  );
}

export default header;
