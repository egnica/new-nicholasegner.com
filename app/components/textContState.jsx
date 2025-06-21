import React from "react";
import styles from "../page.module.css";

function ContState({ children, title, btnText, clickFun }) {
  return (
    <div className={styles.textCont}>
      <h2>{title}</h2>
      <div className={styles.textCont2}>
        <div className={styles.transparentCont}>{children}</div>
      </div>
      <div className={styles.mainBtn} onClick={clickFun}>
        {btnText}
      </div>
    </div>
  );
}

export default ContState;
