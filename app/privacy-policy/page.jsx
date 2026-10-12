import Link from "next/link";
import SiteHeader from "../components/SiteHeader/SiteHeader";
import SiteFooter from "../components/SiteFooter/SiteFooter";
import styles from "./privacy-policy.module.css";

export const metadata = {
  title: "Privacy Policy | Nicholas Egner & Content Social Hub",
  description: "How Nicholas Egner and Content Social Hub handle website, contact, and connected social-account information.",
  alternates: { canonical: "https://www.nicholasegner.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <SiteHeader />
      <article className={styles.content}>
        <p className={styles.eyebrow}>Privacy & data</p>
        <h1>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: October 12, 2026</p>
        <p>
          This policy describes how Nicholas Egner handles information through
          nicholasegner.com and Content Social Hub, a tool for managing client
          social connections and content publishing. The practices described
          for Content Social Hub apply when those features are in use.
        </p>

        <h2>Information collected</h2>
        <p>
          When you contact me, I may receive your name, email address, and the
          information you choose to send. The website also uses analytics
          technologies, which may collect information about visits, devices,
          browser settings, and interactions.
        </p>
        <p>
          Content Social Hub may store client names and contact details,
          content and media submitted for publishing, account identifiers,
          connection status, publication records, and authorization credentials
          supplied by connected social platforms. The information available
          depends on the platform permissions you approve.
        </p>

        <h2>How information is used</h2>
        <p>
          I use information to respond to inquiries, operate and secure the
          website and Content Social Hub, manage authorized social connections,
          prepare and publish approved content, troubleshoot issues, and
          maintain records of publishing activity. Connected platform access
          is used for the features you authorize, not to sell account data.
        </p>

        <h2>Social-platform connections</h2>
        <p>
          If you authorize a connection to a service such as LinkedIn, Facebook,
          or Instagram, that service determines the permissions granted.
          Content Social Hub uses these permissions to access the account or
          Page selected for authorized publishing tasks. Authorization
          credentials are handled on the server side rather than intentionally
          exposed in the public website.
        </p>
        <p>
          You can revoke an app’s access through the applicable social
          platform’s account settings. To request removal of connection
          information held by Content Social Hub, email the address below.
          Revocation does not automatically erase content already published
          to a social network, which remains subject to that network’s controls
          and policies.
        </p>

        <h2>Service providers and sharing</h2>
        <p>
          Hosting, database, media storage, analytics, email delivery, and
          connected social platforms may process information as needed to
          operate these services. Those providers have their own applicable
          terms and privacy practices. Information may also be disclosed when
          required by law or necessary to protect the security of the services.
          I do not sell personal information.
        </p>

        <h2>Security and retention</h2>
        <p>
          I use access controls and other technical safeguards appropriate to
          the services, but no online system can guarantee absolute security.
          Information is retained as needed to provide services, maintain
          operational and publishing records, meet legal obligations, and
          resolve disputes. Retention periods can vary by information type.
        </p>

        <h2>Your choices and requests</h2>
        <p>
          You can contact me to ask about personal information, request a
          correction or deletion where applicable, or ask about a connected
          account. Some information may need to be retained for legitimate
          operational or legal reasons. You can also manage browser settings
          relating to cookies and analytics.
        </p>

        <h2>Updates</h2>
        <p>
          This policy may change as the website or Content Social Hub evolves.
          The date above will reflect material updates.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy questions or data requests, email{" "}
          <a href="mailto:nick@nicholasegner.com">nick@nicholasegner.com</a>.
          You can also use the <Link href="/contact">contact page</Link>.
        </p>
      </article>
      <SiteFooter />
    </main>
  );
}
