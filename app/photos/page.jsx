"use client";
import React from "react";
import styles from "../page.module.css";
import Particles from "../components/particlesBackground";
import SiteHeader from "../components/SiteHeader/SiteHeader";

const SITE_URL = "https://www.nicholasegner.com";
const PERSON_ID = `${SITE_URL}/#person`;

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
          "@id": `${SITE_URL}/photos#webpage`,
          url: `${SITE_URL}/photos`,
          name: "Photos of Nicholas Egner",
          description:
            "Official photo gallery and press images of Nicholas Egner.",
          about: { "@id": PERSON_ID },
          isPartOf: { "@id": `${SITE_URL}/#website` },
        },
        ...items.map((img, i) => ({
          "@type": "ImageObject",
          "@id": `${SITE_URL}/photos#img${i + 1}`,
          name: img.alt,
          caption: img.alt,
          contentUrl: img.url,
          thumbnailUrl: img.url,
          creator: { "@id": PERSON_ID },
          copyrightNotice: "© Nicholas Egner",
          representativeOfPage: i === 0,
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
      <SiteHeader />
      <h1 style={{ color: "white" }}>Photos of Nicholas Egner</h1>
      <p style={{ color: "white" }}>
        A collection of portraits, candid moments, and behind-the-scenes shots
        from my work in web development, video production, and creative content.
      </p>

      <div className={styles.photoGrid}>
        {photoObject.map((item, index) => (
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
