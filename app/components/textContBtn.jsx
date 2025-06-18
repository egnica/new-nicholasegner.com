import React from "react";
import Link from "next/link";
import styles from "../page.module.css";

function textContBtn({ children, title, btnText, path }) {
  return (
    <div className={styles.textCont}>
      <h2>{title}</h2>
      <div className={styles.textCont2}>
        <div className={styles.transparentCont}>{children}</div>
      </div>
      <Link className={styles.mainBtn} href={path}>
        {btnText}
      </Link>
    </div>
  );
}

export default textContBtn;
