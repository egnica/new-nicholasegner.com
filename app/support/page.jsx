import SiteHeader from "../components/SiteHeader/SiteHeader";
import SiteFooter from "../components/SiteFooter/SiteFooter";
import SupportForm from "./SupportForm";
import styles from "./support.module.css";

export const metadata = {
  title: "Support My Videos | Nicholas Egner",
  description: "Enjoy Nicholas Egner's videos? Leave a one-time tip to support future videos.",
  alternates: { canonical: "https://www.nicholasegner.com/support" },
  robots: {
    index: Boolean(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
  },
};

export default function SupportPage() {
  return (
    <main className={styles.page}>
      <SiteHeader />
      <section className={styles.section}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>For the videos</p>
          <h1>Enjoyed a video?</h1>
          <p>
            I make videos about the movies and stories I can’t stop thinking about.
            If one made your day, you can help me make the next one.
          </p>
          <p className={styles.note}>Thanks for watching, whether or not you contribute.</p>
        </div>
        <SupportForm />
      </section>
      <SiteFooter />
    </main>
  );
}
