import React from "react";
import Image from "next/image";
import styles from '../../blog/blog.module.css'

function ImageG({ block }) {
  return (
    <div className={styles.hero}>
    <Image
      src={block.src}
      alt={block.alt}
      fill
      sizes="100vw"
      style={{ objectFit: "cover" }}
    /></div>
  );
}

export default ImageG;
