"use client";
import styles from "../../page.module.css";
import React from "react";
import { useState, useEffect } from "react";
import StackJson from "../../../stack.json";

function Stack() {
  const [stackSelect, setStackSelect] = useState("");
  const [selectedObject, setSelectedObject] = useState("");
  useEffect(() => {
    setSelectedObject("");
  }, [stackSelect]);

  const stackObject = Object.values(StackJson.stack).find(
    (item) => stackSelect == item.category
  );

  const clickHandler = (item) => {
    setStackSelect((prev) => (prev === item ? "" : item));
  };

  const clickSingleObject = (item) => {
    setSelectedObject((prev) => (prev.name == item.name ? "" : item));
  };
  return (
    <div>
      <div className={styles.skillsBtnContain}>
        <div
          onClick={() => clickHandler("Front End")}
          className={styles.skillsBtn}
        >
          Frontend
        </div>
        <div
          onClick={() => clickHandler("Back End")}
          className={styles.skillsBtn}
        >
          Backend / Database
        </div>
        <div
          onClick={() => clickHandler("DevOps & Hosting")}
          className={styles.skillsBtn}
        >
          DevOps & Hosting
        </div>
        <div
          onClick={() => clickHandler("Creative / Design")}
          className={styles.skillsBtn}
        >
          Creative / Design
        </div>
      </div>
      <div>
        {stackSelect &&
          Object.entries(stackObject.technologies).map(([_, item], index) => {
            return (
              <p onClick={() => clickSingleObject(item)} key={index}>
                {item.name}
              </p>
            );
          })}
      </div>
      {selectedObject && (
        <div>
          <h3>{selectedObject.name}</h3>
          <p>{selectedObject.text}</p>
          <div
            style={{ border: "1px solid red" }}
            className={styles.svgWrap}
            dangerouslySetInnerHTML={{ __html: selectedObject.image }}
          />
        </div>
      )}
    </div>
  );
}

export default Stack;
