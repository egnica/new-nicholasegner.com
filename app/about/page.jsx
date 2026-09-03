import Image from "next/image";
import Link from "next/link";
import Particles from "../components/particlesBackground";
import SiteFooter from "../components/SiteFooter/SiteFooter";
import SiteHeader from "../components/SiteHeader/SiteHeader";
import JsonLd from "../components/JsonLd/JsonLd";
import styles from "./about.module.css";
import {
  DEFAULT_IMAGE,
  SITE_URL,
  getProfilePageSchema,
} from "../lib/schema";

const pageUrl = `${SITE_URL}/about`;

export const metadata = {
  title: "About Nicholas Egner | Minneapolis Web Developer & Digital Strategist",
  description:
    "Meet Nicholas Egner, a Minneapolis web developer, video producer, SEO strategist, and digital creator building custom websites, content systems, video experiences, and search-focused digital work for businesses and organizations.",
  keywords: [
    "Nicholas Egner",
    "Minneapolis web developer",
    "Minneapolis digital strategist",
    "Minneapolis video producer",
    "SEO strategist Minneapolis",
    "custom website developer Minneapolis",
    "video and web development",
    "digital content systems",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "profile",
    url: pageUrl,
    title: "About Nicholas Egner",
    description:
      "Web development, video, SEO, and digital systems built to help businesses become easier to find, understand, and trust.",
    siteName: "Nicholas Egner",
    images: [
      {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: "Nicholas Egner, Minneapolis web developer and digital creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Nicholas Egner",
    description:
      "Minneapolis web developer, video producer, SEO strategist, and digital creator.",
    images: [DEFAULT_IMAGE],
  },
};

const capabilities = [
  {
    number: "01",
    title: "Web Development",
    text: "Custom websites and web applications built around the actual business problem, not a pile of plugins or a generic template.",
    href: "/projects",
    linkLabel: "Explore projects",
  },
  {
    number: "02",
    title: "Video & Content",
    text: "Video production, editing, motion, storytelling, and content designed for websites, search, social channels, and long-term use.",
    href: "/video",
    linkLabel: "View video work",
  },
  {
    number: "03",
    title: "SEO & Digital Systems",
    text: "Technical structure, service content, structured data, internal linking, video SEO, and publishing systems that make a digital presence easier to understand and improve.",
    href: "/blog/video-seo-trifecta",
    linkLabel: "See the thinking",
  },
];

const professionalLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nicholas-egner/",
  },
  {
    label: "GitHub",
    href: "https://github.com/egnica",
  },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1rXOuyytJnn_lx3pYp6YXZvbIHRBPzszm/view?usp=sharing",
  },
  {
    label: "Google Business",
    href: "https://www.google.com/maps/place/Nicholas+Egner+-+Web+Development/@44.9693245,-93.1667435,12z/data=!3m1!4b1!4m6!3m5!1s0x33594afad20e52d:0x2abec985a953e126!8m2!3d44.9693245!4d-93.1667435!16s%2Fg%2F11m6kbgwyb",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@NickEgnerVideo",
  },
];

export default function About() {
  return (
    <>
      <JsonLd data={getProfilePageSchema()} />

      <main className={styles.page}>
        <Particles />
        <div className={styles.mainBackColor} />
        <SiteHeader />

        <section className={`${styles.hero} fullBleedHero`}>
          <div className={styles.heroMedia} aria-hidden="true">
            <img
              src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-profile.jpg"
              alt=""
            />
          </div>

          <div className={styles.heroLogo} aria-hidden="true">
            <Image
              src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/ne-white.svg"
              width={760}
              height={760}
              alt=""
            />
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              Minneapolis · Web Development · Video · SEO
            </p>
            <h1>Nicholas Egner</h1>
            <p className={styles.heroLead}>
              I build websites, video, and digital content systems that help
              businesses become easier to find, easier to understand, and
              easier to trust.
            </p>

            <div className={styles.heroActions}>
              <Link href="/projects" className={styles.primaryAction}>
                View Selected Work <span aria-hidden="true">→</span>
              </Link>
              <Link href="/video-experience" className={styles.secondaryAction}>
                Meet Me Through Video
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.introSection}>
          <div className={styles.sectionLabel}>
            <p className={styles.eyebrow}>What I Do</p>
            <h2>More than building a website.</h2>
          </div>

          <div className={styles.introCopy}>
            <p className={styles.introLead}>
              Most businesses already know they need to be online. The harder
              problem is making all of the pieces work together.
            </p>
            <p>
              A website can look good and still be difficult to update, unclear
              to customers, disconnected from search, or unsupported by useful
              content. Video can be produced and then disappear into a social
              feed. Service pages can exist without answering the questions
              people actually search for.
            </p>
            <p>
              My work sits between development, content, video production, and
              search strategy. I like building the site, but I also care about
              the system around it: the message, the content, the SEO
              structure, the video, the publishing workflow, and the trust
              signals that help the whole digital presence work harder.
            </p>
          </div>
        </section>

        <section className={styles.capabilitySection}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>How I Work</p>
            <h2>Development, media, and visibility in the same toolkit.</h2>
          </div>

          <div className={styles.capabilityGrid}>
            {capabilities.map((item) => (
              <article key={item.title} className={styles.capabilityCard}>
                <span className={styles.cardNumber}>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link href={item.href}>
                  {item.linkLabel} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.backgroundSection}>
          <div className={styles.portraitStack}>
            <div className={styles.portraitPrimary}>
              <Image
                src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner.jpg"
                width={722}
                height={1084}
                alt="Nicholas Egner, Minneapolis web developer, video producer, and digital strategist"
              />
            </div>

            <div className={styles.portraitAccent} aria-hidden="true">
              <Image
                src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-outline.webp"
                width={361}
                height={542}
                alt=""
              />
            </div>
          </div>

          <div className={styles.backgroundCopy}>
            <p className={styles.eyebrow}>Background</p>
            <h2>A creative background that became technical.</h2>
            <p>
              I came into web development through media production, design, and
              visual storytelling. That background still shapes how I build
              digital work. I tend to think about hierarchy, pacing, messaging,
              imagery, and the experience around the technology, not only the
              code underneath it.
            </p>
            <p>
              Over time, that expanded into React and Next.js development,
              custom applications, technical SEO, structured data, content
              architecture, and digital systems that connect websites with
              video and search. My technical training at Dunwoody College of
              Technology added a more formal development foundation to a career
              that had already been rooted in creative production.
            </p>
            <p>
              That combination is useful when a project does not fit neatly
              into one discipline. I can move from editing a video to building
              the page it lives on, writing the structured data around it,
              improving the content supporting it, and thinking through how a
              customer is supposed to discover the whole thing.
            </p>

            <Link href="/photos" className={styles.textLink}>
              View more photos <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className={styles.focusSection}>
          <div className={styles.focusCopy}>
            <p className={styles.eyebrow}>Current Focus</p>
            <h2>Building digital presence as a connected system.</h2>
            <p>
              I am especially interested in work where a business needs more
              than a brochure website: custom service experiences, video
              libraries, search-focused content, dashboards, publishing tools,
              local visibility, or a clearer way to bring several digital
              channels together.
            </p>
          </div>

          <div className={styles.focusLinks}>
            <Link href="/projects">
              <span>Selected Work</span>
              <strong>Websites, applications & digital systems</strong>
              <b aria-hidden="true">→</b>
            </Link>
            <Link href="/video">
              <span>Video Work</span>
              <strong>Production, editing & video experiences</strong>
              <b aria-hidden="true">→</b>
            </Link>
            <Link href="/blog">
              <span>Writing</span>
              <strong>SEO, web, video & what I am learning</strong>
              <b aria-hidden="true">→</b>
            </Link>
          </div>
        </section>

        <section className={styles.connectSection}>
          <div>
            <p className={styles.eyebrow}>Elsewhere</p>
            <h2>Find me around the web.</h2>
          </div>

          <div className={styles.professionalLinks}>
            {professionalLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection}>
          <p className={styles.eyebrow}>Work Together</p>
          <h2>Need a stronger digital presence?</h2>
          <p>
            If your website, video, content, or search presence feels
            disconnected, I can help think through the system and build the
            pieces that make it clearer.
          </p>
          <a href="mailto:nick@nicholasegner.com" className={styles.ctaButton}>
            Email Nicholas
          </a>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
