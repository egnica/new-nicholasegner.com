import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const Star = "https://wodniack.dev/images/asset-star.svg";
  const name = "nicholas egner";
  const front = "<<<<<<<<<<<<<<<";
  const back = ">>>>>>>>>>>>>>>>";

  return (
    <div className={styles.page}>
      <div className={styles.topPage}>
        <a href={"./about"}>
          <Image
            className={styles.logo}
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/NE-blue.svg"
            width={130}
            height={130}
            alt="Nicholas Egner Logo"
          />
        </a>
        <h1>Nicholas Egner - Minneapolis Web Developer</h1>
      </div>
      <div className={styles.mainCont}>
        <Image
          className={styles.mainImage}
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/placeholder.jpg"
          width={600}
          height={300}
          alt="Picture of Nicholas Egner"
        />
        <div className={styles.mainBtnCont}>
          <div className={styles.textCont}>
            <h2>My Story</h2>

            <p>
              This interactive video series walks you through my background,
              what drives me, and where I’m heading next. Click below to choose
              your path and watch the story unfold.
            </p>
            <Link className={styles.mainBtn} href={"./about-me"}>
              Watch the Story
            </Link>
          </div>
          <div className={styles.textCont}>
            <h2>Career Dashboard</h2>

            <p>
              This interactive dashboard lets you explore my skills, tools, and
              real-world projects. Along with the creative work and work history
              that shaped them. It’s part portfolio, part proof of concept.
            </p>
            <Link className={styles.mainBtn} href={"./skills"}>
              Explore the Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.nameTop}>
        <p>
          {front} || 1001000 100001 1100001 101011 || {back}
        </p>
      </div>
      <div className={styles.nameCont}>
        <h1>{name}</h1>
        <Image src={Star} width={50} height={50} alt="star divider" />
        <h1>web developer</h1>
      </div>
      <div className={styles.nameBottom}>
        {front} || 1001000 100001 1100001 101011 || {back}
      </div>
      <div className={styles.coverBottom}></div>
    </div>
  );
}
