"use client";
import React from "react";
import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";
import Particles from "../components/particlesBackground";

function Photos() {
  const photoObject = [
    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-portfolio.jpg",
      alt: "Nicholas Egner - Digital Creator",
    },
    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-profile.jpg",
      alt: "Nicholas Egner - Digital Creator",
    },
    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/fiverr-cover-1.png",
      alt: "Picture of Nicholas Egner - Modern Business Website",
    },
    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-outline.webp",
      alt: "Nicholas Egner - Fun Color image",
    },
    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner.jpg",
      alt: "Portrait of Nicholas Egner - Minneapolis Web Developer",
    },
    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/digital-portfolio.jpg",
      alt: "Nicholas Egner - Digital portfolio",
    },
    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/NE-blue.svg",
      alt: "Nicholas Egner - Logo",
    },
    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-vikings.jpg",
      alt: "Picture of Nicholas Egner - Minnesota Vikings",
    },
    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-backtothefuture.png",
      alt: "Picture of Nicholas Egner - Back to the Future",
    },

    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/fiverr-devices.png",
      alt: "Picture of Nicholas Egner - Modern Responsive Website",
    },
  ];

  function JsonLd({ items }) {
    const data = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["CollectionPage", "WebPage"],
          "@id": "https://nicholasegner.com/photos",
          url: "https://nicholasegner.com/photos",
          name: "Photos of Nicholas Egner",
          description:
            "Official photo gallery and press images of Nicholas Egner.",
          about: { "@id": "https://nicholasegner.com/#nicholas-egner" },
        },
        {
          "@type": "Person",
          "@id": "https://nicholasegner.com/#nicholas-egner",
          name: "Nicholas Egner",
          url: "https://nicholasegner.com/",
          sameAs: [
            "https://www.linkedin.com/in/nicholas-egner",
            "https://latestartdev.com",
          ],
        },
        // map each image as an ImageObject
        ...items.map((img, i) => ({
          "@type": "ImageObject",
          "@id": `https://nicholasegner.com/photos#img${i + 1}`,
          name: img.alt,
          caption: img.alt,
          contentUrl: img.url,
          thumbnailUrl: img.url,
          creator: { "@id": "https://nicholasegner.com/#nicholas-egner" },
          copyrightNotice: "© Nicholas Egner",
          representativeOfPage: i === 0, // first image as lead
        })),
      ],
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    );
  }

  return (
    <div className={styles.photosPage}>
      <JsonLd items={photoObject} />
      <div className={styles.mainBackColor}></div>
      <Particles />
      <Link href={"../about"}>
        <h2 className={styles.skillsBtn}>Back</h2>
      </Link>
      <h1 style={{ color: "white" }}>Photos of Nicholas Egner</h1>
      <p style={{ color: "white" }}>
        A collection of portraits, candid moments, and behind-the-scenes shots
        from my work in web development, video production, and creative content.
      </p>

      <div className={styles.photoGrid}>
        {Object.values(photoObject).map((item, index) => (
          <div key={index}>
            <img src={item.url} alt={item.alt} />
            <p>{item.alt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photos;
