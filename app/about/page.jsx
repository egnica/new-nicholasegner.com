import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";

function About() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nicholas Egner",
              url: "https://nicholasegner.com",
              image:
                "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner.jpg",
              sameAs: [
                "https://www.linkedin.com/in/nicholas-egner",
                "https://github.com/egnica",
                "https://latestartdev.com",
                "https://www.wikidata.org/wiki/Q133818563",
              ],
              jobTitle: "Web Developer",
              worksFor: {
                "@type": "Organization",
                name: "GIGnnovate",
              },
              alumniOf: "Dunwoody College of Technology",
              description:
                "Nicholas Egner is a web developer and digital strategist specializing in online presence optimization, SEO, and custom website solutions for small businesses.",
              knowsAbout: [
                "React",
                "SEO",
                "Next.js",
                "Web Accessibility",
                "Content Strategy",
              ],
            }),
          }}
        />
      </Head>
      <div className={styles.aboutButtons}>
        <div className={styles.mainBtn}>LinkedIn</div>
        <div className={styles.mainBtn}>LinkedIn</div>
        <div className={styles.mainBtn}>LinkedIn</div>
        <div className={styles.mainBtn}>LinkedIn</div>
        <div className={styles.mainBtn}>LinkedIn</div>
      </div>
      <div className={styles.mainBackColor}></div>
      <video className={styles.starOverlay} autoPlay loop muted playsInline>
        <source
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/video/star-background.webm"
          type="video/webm"
        />
      </video>
      <div className={styles.aboutCont}>
        <div className={styles.imageCont}>
          <Image
            className={styles.aboutImage}
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner.jpg"
            height={542}
            width={361}
            alt="Portrait of Nicholas Egner, Minneapolis Web Developer"
          />
          <p style={{ color: "aliceblue" }}>
            <Link href={"../photos"}> More images of Nicholas Egner</Link>
          </p>
        </div>
        <div className={styles.aboutTextCont}>
          <h1>Nicholas Egner</h1>
          <p>
            <strong>Nicholas Egner</strong> is a Minneapolis-based web
            developer, SEO strategist, and content creator with a passion for
            building fast, modern, and user-focused websites. His work combines
            clean code with thoughtful design. Empowering small businesses,
            creators, and solo entrepreneurs to improve their digital presence
            and connect more effectively with their audience.
            <br />
            <br />
            With a background in media production and a technical education from
            Dunwoody College of Technology, Nicholas blends creative thinking
            with real-world engineering skills. He specializes in SEO
            implementation, React-based web apps, and storytelling-driven
            digital experiences.
            <br />
            <br />
            Nicholas also shares his insights and learnings on his blog,
            <a href="https://latestartdev.com/">Late Start Dev</a>, where he
            documents his path from career change to full-stack development.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
