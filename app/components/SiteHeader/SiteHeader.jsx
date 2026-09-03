"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteHeader.module.css";

const links = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Video", href: "/video" },
  { label: "Blog", href: "/blog" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink} aria-label="Nicholas Egner home">
          <Image
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/ne-white.svg"
            width={60}
            height={60}
            alt="Nicholas Egner Logo"
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label="Primary navigation">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname?.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? styles.active : undefined}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
