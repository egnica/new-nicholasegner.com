import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import ContactForm from "../../components/ContactForm/ContactForm";
import SiteHeader from "../../components/SiteHeader/SiteHeader";
import SiteFooter from "../../components/SiteFooter/SiteFooter";
import { getProspect } from "../../../prospects";
import styles from "./prospect.module.css";

const SITE_URL = "https://www.nicholasegner.com";

function plainText(markdown = "", max = 180) {
  const text = markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#*_>~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const prospect = getProspect(slug);

  if (!prospect) {
    return {
      title: "Prospect Not Found",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_URL}/prospect/${prospect.slug}`;
  const image = `${url}/image`;
  const title = `${prospect.company} | Prepared for ${prospect.personName}`;
  const description = plainText(prospect.body);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: url },
    robots: { index: false, follow: false },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "Nicholas Egner",
      images: [{ url: image, width: 1200, height: 630, alt: `${prospect.company} — ${prospect.personName}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProspectPage({ params }) {
  const { slug } = await params;
  const prospect = getProspect(slug);

  if (!prospect) notFound();

  return (
    <div className={styles.page}>
      <SiteHeader />

      <main className={styles.main}>
        <header className={styles.hero}>
          <div className={styles.heroMedia} aria-hidden="true">
            <Image
              src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/ne_background.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 1500px) 100vw, 1500px"
            />
          </div>

          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Prepared for</p>
            <h1>{prospect.company}</h1>
            <p className={styles.heroPerson}>{prospect.personName}</p>
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

        <article className={styles.content}>
          <ReactMarkdown
            components={{
              a: ({ href, children }) => (
                <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noreferrer" : undefined}>
                  {children}
                </a>
              ),
              img: ({ src, alt }) => (
                <span className={styles.markdownImage}>
                  <img src={src} alt={alt || ""} />
                </span>
              ),
            }}
          >
            {prospect.body}
          </ReactMarkdown>
        </article>

        <section className={styles.contact} aria-labelledby="prospect-contact-title">
          <div className={styles.contactIntro}>
            <p className={styles.eyebrow}>Start a Conversation</p>
            <h2 id="prospect-contact-title">Want to talk?</h2>
            <p>
              If any of this feels worth exploring, reach out however is easiest.
            </p>
            <div className={styles.actions}>
              <Link href="mailto:nick@nicholasegner.com">Email me <span aria-hidden="true">→</span></Link>
              <Link href="tel:+16309656187">Call me <span aria-hidden="true">→</span></Link>
            </div>
          </div>

          <div className={styles.form}>
            <ContactForm source={`prospect-${prospect.slug}`} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
