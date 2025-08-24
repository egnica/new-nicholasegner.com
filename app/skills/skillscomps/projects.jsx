import React from "react";
import styles from "../../page.module.css";
import StackJson from "../../../stack.json";
import Wrapper from "../../components/textContState";
import BtnWrap from "../../components/selectStateBtn";
import ImageCarousel from "../../components/carousel";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Projects() {
  const projects = Object.values(StackJson.projects);
  const [selectProject, setSelectProject] = useState("");
  const projectFind = Object.values(StackJson.projects).find(
    (item) => item.title == selectProject
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {!selectProject && (
          <motion.div
            key="buttons-default"
            initial={
              selectProject == ""
                ? { opacity: 0, y: -50 }
                : { opacity: 0, y: -50 }
            }
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.6 }}
            className={
              selectProject ? styles.btnCont2 : styles.btnCont2Unselected
            }
          >
            {projects.map((item) => (
              <BtnWrap
                key={item.title}
                title={item.title}
                clickFunc={() => setSelectProject(item.title)}
              >
                {item.title}
              </BtnWrap>
            ))}
          </motion.div>
        )}

        {selectProject && (
          <motion.div
            key="buttons-active"
            layout
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.btnCont2}
          >
            {projects.map((item) => (
              <BtnWrap
                key={item.title}
                title={item.title}
                clickFunc={() =>
                  setSelectProject((prev) =>
                    prev === item.title ? "" : item.title
                  )
                }
              >
                {item.title}
              </BtnWrap>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {selectProject && (
          <motion.div
            key={"content"}
            className={styles.projectOutputContain}
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.5 },
              y: { duration: 1.5 },
            }}
            layout
            style={{ overflow: "hidden" }}
          >
            <div className={styles.imageTextCont}>
              <ImageCarousel imageArray={projectFind.image} />
              <div className={styles.innerContain}>
                <h2>{projectFind.title}</h2>
                <hr />
                <p
                  className={styles.textDecrip}
                  dangerouslySetInnerHTML={{ __html: projectFind.description }}
                ></p>
                <div className={styles.linkSkillsSplit}>
                  <div>
                    <h4 className={styles.textDecrip}>Links</h4>
                    {projectFind.links.map((item, index) => (
                      <div
                        key={index}
                        style={{ lineHeight: "1.2", paddingLeft: "5%" }}
                      >
                        <a href={item.url} target="_blank">
                          <p style={{ color: "lightblue" }}>{item.title} </p>
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className={styles.techStackCont}>
                    <h4
                      style={{ textAlign: "center" }}
                      className={styles.textDecrip}
                    >
                      Technology
                    </h4>
                    <div className={styles.stackList}>
                      {projectFind.stack.map((item, index) => (
                        <p
                          key={index}
                          style={{
                            lineHeight: "1.1",
                            paddingLeft: "5%",
                            color: "lightblue",
                          }}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Projects;
