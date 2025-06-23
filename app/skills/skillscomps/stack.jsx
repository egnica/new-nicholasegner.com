"use client";
import styles from "../../page.module.css";
import React, { useState, useEffect } from "react";
import StackJson from "../../../stack.json";
import Wrapper from "../../components/textContState";
import BtnWrap from "../../components/selectStateBtn";

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
        <div className={styles.skillsBtnContain}>
          <Wrapper
            title={"FRONTEND"}
            btnText={"Explore Frontend"}
            clickFun={() => clickHandler("Front End")}
          >
            <p>
              <strong>Where form meets function.</strong> <br /> I specialize in
              building fast, accessible, and responsive interfaces that look
              great and perform even better. Using modern tools like React,
              Next.js, Framer Motion, and CSS Modules. Clean code meets
              thoughtful design.
            </p>
          </Wrapper>
          <Wrapper
            title={"BACKEND & DATABASE"}
            btnText={"Explore Backend"}
            clickFun={() => clickHandler("Back End")}
          >
            <p>
              <strong>
                This is where structure, speed, and security come together.
              </strong>
              <br />I design and build backend systems that power real
              applications. From API routing and database modeling to
              authentication and server-side logic. Whether it’s MongoDB,
              Supabase, or AWS, I’m focused on performance and reliability.
            </p>
          </Wrapper>
          <Wrapper
            title={"DEVOPS & HOSTING"}
            btnText={"View Deployment Tools"}
            clickFun={() => clickHandler("DevOps & Hosting")}
          >
            <p>
              <strong>From localhost to live site.</strong>
              <br />I don’t just build I deploy, monitor, and optimize. I’ve
              worked with platforms like AWS Amplify, Amazon S3, Route 53 and
              Supabase to get projects live, stable, and ready for real users.
            </p>
          </Wrapper>
          <Wrapper
            title={"DESIGN & VISUALS"}
            btnText={"View Visual Tools"}
            clickFun={() => clickHandler("Creative / Design")}
          >
            <p>
              <strong>I started as a creative and that still shows.</strong>
              <br />
              Before diving into code, I spent years editing video, designing
              graphics, and building brands. That creative muscle still shapes
              how I design interfaces, communicate ideas, and tell better
              stories.
            </p>
          </Wrapper>
        </div>
      )}

      <div className={styles.btnCont2}>
        {stackSelect &&
          stackObject &&
          Object.entries(stackObject.technologies).map(([_, item], index) => (
            <BtnWrap
              key={index}
              clickFunc={() => clickSingleObject(item)}
              title={item.name}
            />
          ))}
      </div>

      {selectedObject && (
        <div className={styles.objectCont}>
          <div
            className={styles.svgWrap}
            dangerouslySetInnerHTML={{ __html: selectedObject.image }}
          />
          <div className={styles.objectContText}>
            <h2>{selectedObject.name}</h2>
            <hr />
            <p>{selectedObject.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stack;
