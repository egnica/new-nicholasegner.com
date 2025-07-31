import Link from "next/link";
import styles from "../page.module.css";
export const metadata = {
  title: "About Nicholas Egner",
  description:
    "Learn more about Nicholas Egner — a Minneapolis-based web developer, strategist",
  openGraph: {
    title: "About Nicholas Egner",
    description:
      "Web developer and digital strategist focused on SEO, online presence, and creative solutions.",
    url: "https://nicholasegner.com/about",
    type: "profile",
    images: [
      {
        url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner.jpg",
        width: 615,
        height: 923,
        alt: "Nicholas Egner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Nicholas Egner",
    description: "Web developer and digital strategist based in Minneapolis.",
    site: "@NicholasEgner", // replace if you use Twitter
  },
};

export default function Layout({ children }) {
  return (
    <>
      <Link href="./">
        <p className={styles.skillsBtn} style={{ margin: "2%" }}>
          HOME
        </p>
      </Link>
      <>{children}</>
    </>
  );
}
