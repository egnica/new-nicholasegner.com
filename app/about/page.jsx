import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";
import Dots from "../components/particlesBackground";

function About() {
  const btnObject = [
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/nicholas-egner/",
    },
    {
      title: "Github",
      url: "https://github.com/egnica",
    },
    {
      title: "Resume",
      url: "https://drive.google.com/file/d/1QjkOJzqmSwCDG_cjf9PBCv6h5CkbJq1w/view?usp=drive_link",
    },
    {
      title: "Google Business",
      url: "https://www.google.com/maps/place/Nicholas+Egner+-+Web+Development/@44.9693245,-93.1667435,12z/data=!3m1!4b1!4m6!3m5!1s0x33594afad20e52d:0x2abec985a953e126!8m2!3d44.9693245!4d-93.1667435!16s%2Fg%2F11m6kbgwyb?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      title: "YouTube",
      url: "https://www.youtube.com/@NickEgnerVideo",
    },
    {
      title: "Late Start Dev - Blog",
      url: "https://latestartdev.com/",
    },
    {
      title: "Spotify",
      url: "https://open.spotify.com/user/1224553002?si=c3d54db378354cf5&nd=1&dlsi=ffb896dd3c424f82",
    },
    {
      title: "X - Twitter",
      url: "https://x.com/NicholasEgner",
    },
  ];

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
      <Dots />
      <div className={styles.aboutButtons}>
        {Object.values(btnObject).map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.mainBtn}>{item.title}</div>
          </a>
        ))}
      </div>
      <div className={styles.mainBackColor}></div>

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
      <div style={{ padding: "30px" }}></div>
    </>
  );
}

export default About;
