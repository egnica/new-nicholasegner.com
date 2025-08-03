"use client";
import { notFound } from "next/navigation";
import stackData from "../../../stack.json";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../page.module.css";
import Header from "../../components/header";
import { useParams } from "next/navigation";
import Link from "next/link";

function TechPage() {
  const params = useParams();
  const { tech } = params;

  const techData = stackData.stack
    .flatMap((item) => item.technologies)
    .find((t) => t.slug === tech);

  if (!techData) return notFound();

  return (
    <div>
      <Header />
      <Link style={{ margin: "2%" }} className={styles.skillsBtn} href={"/"}>
        Home
      </Link>
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
