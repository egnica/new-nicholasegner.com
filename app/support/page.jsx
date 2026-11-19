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
          <h1>Enjoyed my Work?</h1>
          <p>
            My content isn't monetized. If you’d like to support what I make,
            you can leave a tip here. Thanks for watching!
          </p>
        </div>
        <SupportForm />
      </section>
      <SiteFooter />
    </main>
  );
}
