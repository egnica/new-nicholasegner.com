import Link from "next/link";
import Particles from "../components/particlesBackground";
import SiteHeader from "../components/SiteHeader/SiteHeader";
import SiteFooter from "../components/SiteFooter/SiteFooter";
import { photoAssets } from "../lib/photoAssets";
import styles from "./photos.module.css";

const SITE_URL = "https://www.nicholasegner.com";
const PERSON_ID = `${SITE_URL}/#person`;

function PhotoJsonLd() {
  const pageUrl = `${SITE_URL}/photos`;

  const imageObjects = photoAssets.map((image, index) => ({
    "@type": "ImageObject",
    "@id": `${pageUrl}#image-${index + 1}`,
    name: image.title,
    description: image.caption,
    caption: image.caption,
    contentUrl: image.url,
    thumbnailUrl: image.url,
    about: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    creditText: "Nicholas Egner",
    copyrightNotice: "© Nicholas Egner",
    representativeOfPage: index === 0,
  }));

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["CollectionPage", "WebPage"],
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Photos of Nicholas Egner",
        description:
          "Official image gallery for Nicholas Egner, a Minneapolis web developer and digital strategist working across web development, SEO, video, content, and digital systems.",
        about: { "@id": PERSON_ID },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: { "@id": `${pageUrl}#image-1` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: imageObjects.map((image, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: { "@id": image["@id"] },
          })),
        },
      },
      ...imageObjects,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Photos() {
  return (
    <div className={styles.page}>
      <PhotoJsonLd />
      <div className={styles.mainBackColor} />
      <Particles />
      <SiteHeader />

      <main className={styles.main}>
        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Official Image Gallery</p>
            <h1>Photos of Nicholas Egner</h1>
            <p className={styles.heroLead}>
              Portraits, profile images, creative photos, and portfolio visuals
              associated with Nicholas Egner, a Minneapolis web developer and
              digital strategist working across web development, SEO, video,
              content, and digital systems.
            </p>
          </div>

          <div className={styles.heroNote}>
            <strong>About this gallery</strong>
            A central collection of public images and visual assets connected to
            Nicholas Egner, his professional work, and his personal portfolio.
          </div>
        </header>

        <section className={styles.grid} aria-label="Nicholas Egner image gallery">
          {photoAssets.map((item, index) => (
            <figure key={item.url} className={styles.figure}>
              <img
                src={item.url}
                alt={item.alt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index === 0 ? "high" : "auto"}
              />
              <figcaption className={styles.caption}>
                <span className={styles.category}>{item.category}</span>
                <strong>{item.title}</strong>
                <p>{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </section>

        <section className={styles.identityBlock} aria-labelledby="photo-identity-title">
          <div>
            <p className={styles.eyebrow}>Nicholas Egner</p>
            <h2 id="photo-identity-title">Web Developer &amp; Digital Strategist</h2>
          </div>

          <div className={styles.identityCopy}>
            <p>
              Nicholas Egner is a Minneapolis web developer and digital
              strategist who combines custom web development, SEO, video,
              content, and automation to build connected digital systems for
              businesses.
            </p>
            <p>
              These images support the broader Nicholas Egner profile across
              nicholasegner.com, including the About page, project case studies,
              video portfolio, skills library, and writing.
            </p>
            <Link href="/about">
              Read about Nicholas Egner <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
