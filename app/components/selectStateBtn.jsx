import React from "react";
import styles from "../page.module.css";

function SelectStateBtn({ title, clickFunc }) {
  return (
    <div onClick={clickFunc} className={styles.skillsBtn2}>
      <p>{title}</p>
    </div>
  );
}

export default SelectStateBtn;
