import React from "react";

import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";
import Dots from "../components/particlesBackground";
import { color } from "motion";

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
      url: "https://drive.google.com/file/d/1rXOuyytJnn_lx3pYp6YXZvbIHRBPzszm/view?usp=sharing",
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
      title: "My Blog",
      url: "https://nicholasegner.com/blog",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": "https://www.nicholasegner.com/about#webpage",
            url: "https://www.nicholasegner.com/about",
            name: "About Nicholas Egner",
            description:
              "Learn more about Minneapolis-based web developer, SEO strategist, and digital content creator Nicholas Egner.",
            mainEntity: {
              "@id": "https://www.nicholasegner.com/#person",
            },
            isPartOf: {
              "@id": "https://www.nicholasegner.com/#website",
            },
          }),
        }}
      />

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
          <br />
          <Image
            className={styles.aboutImage}
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-outline.webp"
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
            I’m a Minneapolis-based web developer, SEO strategist, and content
            creator who helps businesses build a stronger digital presence.
            <br />
            <br />
            My work sits at the intersection of websites, content, search, and
            storytelling. I build fast, modern websites, but I also think about
            the bigger system around them: how people find the business, how
            they understand what it offers, and what makes them feel confident
            enough to reach out.
            <br />
            <br />
            For many small businesses, creators, and solo entrepreneurs, the
            website is only one piece of the problem. The message may be
            unclear. The service pages may not explain enough. The content may
            not support search. The video and social presence may feel
            disconnected from the brand. I help bring those pieces together into
            a clearer, more useful digital experience.
            <br />
            <br />
            My background combines media production, design, web development,
            and technical training from Dunwoody College of Technology. That mix
            allows me to move between strategy and execution. I can help plan
            the message, build the site, create the content, and structure the
            pages in a way that supports visibility, trust, and growth.
            <br />
            <br />I also write about web development, SEO, content strategy, and
            career growth through my blog,
            <Link style={{ color: "#aeabfe" }} href="/blog">
              {" "}
              Late Start Dev
            </Link>
            , where I document what I’m learning and building along the way.
            <br />
            <br />
            At the center of my work is a practical goal: help businesses become
            easier to find, easier to understand, and easier to trust online.
          </p>
        </div>
      </div>
      <div style={{ padding: "30px" }}></div>
    </>
  );
}

export default About;
