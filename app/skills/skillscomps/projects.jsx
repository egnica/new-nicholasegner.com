import React from "react";
import styles from "../../page.module.css";
import StackJson from "../../../stack.json";
import Wrapper from "../../components/textContState";
import BtnWrap from "../../components/selectStateBtn";
import ImageCarousel from "../../components/carousel";
import { useState } from "react";

function Projects() {
  const projects = Object.values(StackJson.projects);
  const [selectProject, setSelectProject] = useState("");
  const projectFind = Object.values(StackJson.projects).find(
    (item) => item.title == selectProject
  );

  return (
    <>
      <div className={styles.btnCont2}>
        {projects.map((item, index) => (
          <BtnWrap
            key={index}
            title={item.title}
            clickFunc={() =>
              setSelectProject((prev) => (prev == item.title ? "" : item.title))
            }
          >
            {item.title}
          </BtnWrap>
        ))}
      </div>
      {selectProject && (
        <div className={styles.projectOutputContain}>
          <div className={styles.imageTextCont}>
            <ImageCarousel imageArray={projectFind.image} />
            <div className={styles.innerContain}>
              <h2>{projectFind.title}</h2>
              <p
                className={styles.textDecrip}
                dangerouslySetInnerHTML={{ __html: projectFind.description }}
              ></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Projects;
