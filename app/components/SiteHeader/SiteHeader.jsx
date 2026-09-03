"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./SiteHeader.module.css";

const links = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Video Work", href: "/video" },
  { label: "Blog", href: "/blog" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 28);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <Link
            href="/"
            className={styles.logoLink}
            aria-label="Nicholas Egner home"
          >
            <Image
              src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/ne-white.svg"
              width={56}
              height={56}
              alt="Nicholas Egner Logo"
              priority
            />
          </Link>

          <nav className={styles.nav} aria-label="Primary navigation">
            {links.map((link) => {
              const active =
                pathname === link.href ||
                pathname?.startsWith(`${link.href}/`) ||
                (link.href === "/video" && pathname === "/video-experience");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={active ? styles.active : undefined}
                  aria-current={active ? "page" : undefined}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <div className={styles.spacer} aria-hidden="true" />
    </>
  );
}
