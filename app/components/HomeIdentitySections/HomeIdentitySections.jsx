import Link from "next/link";
import styles from "./HomeIdentitySections.module.css";

const capabilities = [
  {
    eyebrow: "Custom Web Development",
    title: "Websites and web applications built around the business problem.",
    text: "I build custom websites, service pages, dashboards, and web applications for businesses that need more control than a generic theme or plugin stack can provide.",
    href: "/projects",
    label: "Explore web projects",
  },
  {
    eyebrow: "SEO & Search Visibility",
    title: "Technical SEO, structured data, and content that make the business easier to find.",
    text: "I work on technical SEO, local search visibility, structured data, service-page architecture, internal linking, Google Business Profile support, and search-focused content systems.",
    href: "/skills",
    label: "Explore SEO capabilities",
  },
  {
    eyebrow: "Video & Content",
    title: "Video production and editing designed to keep working after it is published.",
    text: "I create and edit business video, then think about the full publishing system around it: dedicated watch pages, YouTube, supporting content, metadata, video SEO, and social-ready assets.",
    href: "/video",
    label: "View video work",
  },
  {
    eyebrow: "Digital Systems & Automation",
    title: "Custom tools that replace disconnected or manual workflows.",
    text: "When the problem goes beyond the public website, I build dashboards, integrations, workflow automation, and custom business tools that connect data, communication, and day-to-day operations.",
    href: "/projects",
    label: "See digital systems",
  },
];

const questions = [
  {
    question: "Can one person handle a website, SEO, video, and digital content together?",
    answer:
      "That is where my background is most useful. I can move between development, search strategy, video production, editing, content, and the technical systems that connect them, so the work does not have to be split into unrelated pieces.",
  },
  {
    question: "How can a small business make its website easier to find and trust?",
    answer:
      "A stronger digital presence usually combines clear service pages, sound technical SEO, structured data, useful content, local search signals, reviews, and media that helps people understand the business before they reach out.",
  },
  {
    question: "How do you turn business videos into search-friendly website content?",
    answer:
      "I treat the video as part of a publishing system. A video can live on YouTube and on a dedicated website watch page with supporting copy, internal links, metadata, structured data, and related content that gives people and search platforms more context.",
  },
  {
    question: "Can a custom web application replace a manual business workflow?",
    answer:
      "Often, yes. If a process depends on spreadsheets, repeated data entry, disconnected tools, or manual follow-up, a focused web application or automation can bring those steps into a clearer workflow built around how the business actually operates.",
  },
];

export default function HomeIdentitySections() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.capabilitySection} aria-labelledby="connected-capabilities-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>One Connected Toolkit</p>
          <h2 id="connected-capabilities-title">
            Web development, search, video, and business systems working together.
          </h2>
          <p>
            My work tends to cross disciplines because real business problems do.
            I use the right mix of technical development, creative production,
            search strategy, and automation rather than forcing every project into
            one narrow service.
          </p>
        </div>

        <div className={styles.capabilityGrid}>
          {capabilities.map((item) => (
            <article key={item.eyebrow} className={styles.card}>
              <p className={styles.cardEyebrow}>{item.eyebrow}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link href={item.href}>
                {item.label} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.questionSection} aria-labelledby="business-questions-title">
        <div className={styles.questionHeading}>
          <p className={styles.eyebrow}>Common Business Questions</p>
          <h2 id="business-questions-title">
            The work usually starts with a problem, not a piece of software.
          </h2>
          <p>
            These are the kinds of questions that often lead to the websites,
            content systems, video workflows, search improvements, and custom
            applications I build.
          </p>
        </div>

        <div className={styles.questionList}>
          {questions.map((item) => (
            <article key={item.question} className={styles.questionItem}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
