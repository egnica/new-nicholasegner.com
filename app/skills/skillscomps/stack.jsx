"use client";
import styles from "../../page.module.css";
import React, { useState, useEffect } from "react";
import StackJson from "../../../stack.json";
import Wrapper from "../../components/textContState";
import BtnWrap from "../../components/selectStateBtn";
import { motion, AnimatePresence } from "framer-motion";

function Stack({ stackSelect, onStackChange }) {
  const [selectedObject, setSelectedObject] = useState("");

  useEffect(() => {
    setSelectedObject(""); // Clear selected object when stack changes
  }, [stackSelect]);

  const clickHandler = (item) => {
    onStackChange(stackSelect === item ? "" : item);
  };

  const clickSingleObject = (item) => {
    setSelectedObject((prev) => (prev.name === item.name ? "" : item));
  };

  const stackObject = Object.values(StackJson.stack).find(
    (item) => stackSelect === item.category
  );

  return (
    <div>
      {stackSelect === "" && (
        <motion.div
          key={"stack-Cont"}
          layout
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className={styles.skillsBtnContain}
        >
          <Wrapper
            title={"FRONTEND & INTERACTION"}
            btnText={"Explore Frontend"}
            clickFun={() => clickHandler("Front End")}
          >
            <p>
              <strong>Where form meets function.</strong>
              <br />
              I build responsive, accessible interfaces with React, Next.js,
              modern JavaScript, CSS, motion, and performance in mind. The goal
              is an experience that feels polished while staying clear and
              usable.
            </p>
          </Wrapper>

          <Wrapper
            title={"BACKEND, DATA & AUTOMATION"}
            btnText={"Explore Backend"}
            clickFun={() => clickHandler("Back End")}
          >
            <p>
              <strong>Systems that do more than display content.</strong>
              <br />
              I work with databases, authentication, APIs, email workflows, and
              application logic to build tools that support real business
              processes and evolving data.
            </p>
          </Wrapper>

          <Wrapper
            title={"DEVOPS & HOSTING"}
            btnText={"View Deployment Tools"}
            clickFun={() => clickHandler("DevOps & Hosting")}
          >
            <p>
              <strong>From repository to live application.</strong>
              <br />
              I deploy and maintain projects using AWS services, DNS, media
              storage, GitHub workflows, environment configuration, and the
              infrastructure needed to keep web projects available and
              maintainable.
            </p>
          </Wrapper>

          <Wrapper
            title={"SEARCH & DIGITAL VISIBILITY"}
            btnText={"Explore Visibility"}
            clickFun={() => clickHandler("Search & Digital Visibility")}
          >
            <p>
              <strong>Building the site is only part of the job.</strong>
              <br />
              I work with technical SEO, structured data, local search, Google
              Business Profile, and video publishing so useful content is
              easier for people and search engines to find and understand.
            </p>
          </Wrapper>

          <Wrapper
            title={"VIDEO, DESIGN & MOTION"}
            btnText={"View Creative Tools"}
            clickFun={() => clickHandler("Creative / Design")}
          >
            <p>
              <strong>My development work is grounded in a creative background.</strong>
              <br />
              I use video editing, motion graphics, image design, vector work,
              and web animation to communicate ideas clearly and give digital
              experiences a stronger visual identity.
            </p>
          </Wrapper>
        </motion.div>
      )}

      {stackSelect && stackObject && (
        <motion.div
          key={"render" + selectedObject}
          initial={
            selectedObject == ""
              ? { opacity: 0, y: -100 }
              : { opacity: 0, y: 100 }
          }
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.6 }}
          className={
            selectedObject ? styles.btnCont2 : styles.btnCont2Unselected
          }
        >
          {Object.entries(stackObject.technologies).map(([_, item], index) => (
            <BtnWrap
              key={index}
              clickFunc={() => clickSingleObject(item)}
              title={item.name}
            />
          ))}
        </motion.div>
      )}

      {selectedObject && (
        <div className={styles.objectCont}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedObject.image}
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              style={{ overflow: "hidden" }}
              className={styles.svgWrap}
              dangerouslySetInnerHTML={{ __html: selectedObject.image }}
            />

            <motion.div
              key={selectedObject.name}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              style={{ overflow: "hidden" }}
              className={styles.objectContText}
            >
              <h2>{selectedObject.name}</h2>
              <hr />
              <p>{selectedObject.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default Stack;
