import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Nicholas Egner</h1>
      <Link href={"./about"}>
        <div>About</div>
      </Link>
      <Link href={"./experience"}>
        <div>Experience</div>
      </Link>
    </div>
  );
}
