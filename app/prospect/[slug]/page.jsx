"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import newProspect from "../../../prospect.json";
import ProspectCarousel from "../../components/prospectCarousel";
import styles from "../../page.module.css";
import Image from "next/image";
import Link from "next/link";

function Prospect() {
  const params = useParams();
  const { slug } = params;
  const prospectObject = newProspect.find((obj) => obj.slug == slug);

  if (!prospectObject) return notFound();

  return (
    <>
      <div className={styles.mainBackColor2}></div>
      <div className={styles.prospectPage}>
        <div className={styles.companyPerson}>
          <div className={styles.logoName}>
            <div className={styles.companyNamePerson}>
              <h1>{prospectObject.company}</h1>
              <h2>{prospectObject.personName}</h2>
            </div>
            <Link className={styles.neLogo} href={"/"}>
              <Image
              className={styles.neLogo}
                style={{ margin: "auto" }}
                src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/ne-white.svg"
                width={140}
                height={140}
                alt="Nicholas Egner Logo"
              />
            </Link>
          </div>
        </div>
        <p
          className={styles.textIdea}
          dangerouslySetInnerHTML={{ __html: prospectObject.mainBody }}
        ></p>
        <ProspectCarousel prospectArray={prospectObject.ideas} />
      </div>
      <div style={{ padding: "50px" }}></div>
    </>
  );
}

export default Prospect;
