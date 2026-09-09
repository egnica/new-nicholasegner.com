import Link from "next/link";
import ContactForm from "../components/ContactForm/ContactForm";
import JsonLd from "../components/JsonLd/JsonLd";
import Particles from "../components/particlesBackground";
import SiteFooter from "../components/SiteFooter/SiteFooter";
import SiteHeader from "../components/SiteHeader/SiteHeader";
import { SITE_URL, getContactPageSchema } from "../lib/schema";
import styles from "./contact.module.css";

const pageUrl = `${SITE_URL}/contact`;

export const metadata = {
  title: "Contact Nicholas Egner | Web, Video, SEO & Digital Projects",
  description:
    "Contact Nicholas Egner about web development, video production, SEO, content systems, automation, and digital projects in Minneapolis and beyond.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "Contact Nicholas Egner",
    description:
      "Start a conversation about web development, video, SEO, content, automation, or a digital project that needs a mix of technical and creative thinking.",
    siteName: "Nicholas Egner",
  },
};

const focusAreas = [
  "Websites & web applications",
  "Video & content",
  "SEO & search visibility",
  "Business tools & automation",
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={getContactPageSchema()} />

      <main className={styles.page}>
        <Particles />
        <div className={styles.mainBackColor} />
        <SiteHeader />

        <section className={styles.contactSection}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Start a Conversation</p>
            <h1>Tell me what you’re working on.</h1>
            <p className={styles.lead}>
              If you have a website that needs work, a video or content project,
              a search visibility problem, or a digital idea that does not fit
              neatly into one category, send me a note.
            </p>

            <div className={styles.focusList} aria-label="Areas I can help with">
              {focusAreas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>

            <div className={styles.directContact}>
              <p className={styles.eyebrow}>Prefer email?</p>
              <Link href="mailto:nick@nicholasegner.com">
                nick@nicholasegner.com <span aria-hidden="true">→</span>
              </Link>
              <p>Minneapolis, Minnesota</p>
            </div>
          </div>

          <div className={styles.formColumn}>
            <ContactForm />
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
