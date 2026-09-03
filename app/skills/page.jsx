import Image from "next/image";
import Link from "next/link";
import Particles from "../components/particlesBackground";
import SiteHeader from "../components/SiteHeader/SiteHeader";
import SiteFooter from "../components/SiteFooter/SiteFooter";
import JsonLd from "../components/JsonLd/JsonLd";
import SkillsGrid from "./SkillsGrid";
import styles from "./skills.module.css";
import oldStyles from "../page.module.css";
import { skillGroups } from "../lib/techStack";
import { SITE_URL } from "../lib/schema";

const pageUrl = `${SITE_URL}/skills`;
const heroImage =
  "https://nciholasegner.s3.us-east-2.amazonaws.com/video-page-website/skills-hero.webp";

export const metadata = {
  title: "Skills & Capabilities | Nicholas Egner",
  description:
    "Explore the development, backend, deployment, SEO, video, design, and digital workflow tools Nicholas Egner uses across websites, applications, content systems, and client projects.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "Skills & Capabilities | Nicholas Egner",
    description:
      "A visual library of the development, visibility, deployment, video, and creative tools represented across Nicholas Egner's portfolio.",
    images: [
      {
        url: heroImage,
        alt: "Skills and capabilities represented across Nicholas Egner's digital portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills & Capabilities | Nicholas Egner",
    description:
      "Explore the tools and capabilities Nicholas Egner uses across development, SEO, video, and digital systems.",
    images: [heroImage],
  },
};

function namespaceSvgIds(svg, slug) {
  if (!svg) return "";

  const prefix = `skill-${slug}-`;

  return svg
    .replace(
      /\bid=(["'])([^"']+)\1/g,
      (_, quote, id) => `id=${quote}${prefix}${id}${quote}`,
    )
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`)
    .replace(
      /(href|xlink:href)=(["'])#([^"']+)\2/g,
      (_, attribute, quote, id) =>
        `${attribute}=${quote}#${prefix}${id}${quote}`,
    );
}

const skills = skillGroups.flatMap((group) =>
  group.technologies.map((tech) => ({
    ...tech,
    category: group.category,
    image: namespaceSvgIds(tech.image, tech.slug),
  })),
);

const categories = skillGroups.map((group) => ({
  name: group.category,
  count: group.technologies.length,
}));

const skillsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Skills & Capabilities | Nicholas Egner",
      description:
        "A visual library of development, backend, deployment, search visibility, video, and creative capabilities represented across Nicholas Egner's portfolio.",
      inLanguage: "en-US",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: skills.map((skill, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: skill.name,
          url: `${SITE_URL}/skills/${skill.slug}`,
        })),
      },
    },
  ],
};

export default function SkillsPage() {
  return (
    <>
      <JsonLd data={skillsSchema} />

      <div className={styles.page}>
        <Particles />
        <div className={oldStyles.mainBackColor} />
        <SiteHeader />

        <main className={styles.main} style={{ paddingTop: 0 }}>
          <header className={`${styles.hero} fullBleedHero`}>
            <div className={styles.heroMedia} aria-hidden="true">
              <img src={heroImage} alt="" />
            </div>

            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>Skills &amp; Capabilities</p>
              <h1>Tools I use to build the work.</h1>
              <p className={styles.heroLead}>
                <strong>{skills.length} tools and capabilities</strong> across
                development, backend systems, deployment, search visibility,
                video, design, and digital workflows. Browse the full library or
                narrow it by discipline, then open any skill to see how I use it
                in practice.
              </p>
            </div>

            <div className={styles.heroLogoWrap} aria-hidden="true">
              <Image
                src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/ne-white.svg"
                width={760}
                height={760}
                alt=""
              />
            </div>
          </header>

          <section className={styles.explorer} aria-label="Skills explorer">
            <SkillsGrid skills={skills} categories={categories} />
          </section>

          <div className={styles.footerNote}>
            <p>
              These skill pages connect back to the projects and video work
              where each capability is actually used, so the stack stays tied
              to real examples rather than a list of software names.
            </p>

            <Link href="/projects">
              Explore projects <span aria-hidden="true">→</span>
            </Link>
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
