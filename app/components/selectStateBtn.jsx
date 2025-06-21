import React from "react";
import styles from "../page.module.css";

function SelectStateBtn({ title, clickFunc }) {
  return (
    <div onClick={clickFunc} className={styles.skillsBtn}>
      <p>{title}</p>
    </div>
  );
}

export default SelectStateBtn;
