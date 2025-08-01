"use client";
import { notFound } from "next/navigation";
import { use } from "react";
import stackData from "../../../../stack.json";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../../page.module.css";
import Header from "../../../components/header";

function TechPage({ params }) {
  const { category, tech } = use(params);

  // Match the category (e.g., "frontend")
  const categoryData = stackData.stack.find(
    (item) => item.category.toLowerCase().replace(/\s+/g, "-") === category
  );

  if (!categoryData) return notFound();

  // Match the technology (e.g., "react")
  const techData = categoryData.technologies.find(
    (t) => t.name.toLowerCase().replace(/\s+/g, "-") === tech
  );

  if (!techData) return notFound();

  return (
    <div>
      <Header />
      <div className={styles.mainBackColor}></div>
      <video className={styles.starOverlay} autoPlay loop muted playsInline>
        <source
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/video/star-background.webm"
          type="video/webm"
        />
      </video>

      <div className={styles.objectCont}>
        <AnimatePresence mode="wait">
          <motion.div
            key={"keyfigure"}
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            style={{ overflow: "hidden" }}
            className={styles.svgWrap}
            dangerouslySetInnerHTML={{ __html: techData.image }}
          />

          <motion.div
            key={techData.name}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            style={{ overflow: "hidden" }}
            className={styles.objectContText}
          >
            <h2>{techData.name}</h2>
            <hr />
            <p>{techData.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
export default TechPage;
