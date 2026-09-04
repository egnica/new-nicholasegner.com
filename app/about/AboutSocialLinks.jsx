import styles from "./AboutSocialLinks.module.css";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nicholas-egner/",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/egnica",
    icon: "github",
  },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1rXOuyytJnn_lx3pYp6YXZvbIHRBPzszm/view?usp=sharing",
    icon: "resume",
  },
  {
    label: "Google Business",
    href: "https://www.google.com/maps/place/Nicholas+Egner+-+Web+Development/@44.9693245,-93.1667435,12z/data=!3m1!4b1!4m6!3m5!1s0x33594afad20e52d:0x2abec985a953e126!8m2!3d44.9693245!4d-93.1667435!16s%2Fg%2F11m6kbgwyb",
    icon: "business",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@NickEgnerVideo",
    icon: "youtube",
  },
  {
    label: "My Blog",
    href: "https://nicholasegner.com/blog",
    icon: "blog",
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/user/1224553002?si=c3d54db378354cf5&nd=1&dlsi=ffb896dd3c424f82",
    icon: "spotify",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/NicholasEgner",
    icon: "x",
  },
];

function SocialIcon({ icon }) {
  if (icon === "linkedin") {
    return (
      <svg viewBox="-1 -1 26 26" aria-hidden="true" focusable="false">
        <path d="M17.291 19.073h-3.007v-4.709c0-1.123-.02-2.568-1.564-2.568-1.566 0-1.806 1.223-1.806 2.487v4.79H7.908V9.389h2.887v1.323h.04a3.17 3.17 0 0 1 2.848-1.564c3.048 0 3.609 2.005 3.609 4.612zM4.515 8.065a1.745 1.745 0 1 1 0-3.49 1.745 1.745 0 0 1 0 3.49m1.503 11.008h-3.01V9.389h3.01zM18.79 1.783H1.497A1.48 1.48 0 0 0 0 3.246V20.61c.01.818.68 1.473 1.497 1.464H18.79a1.485 1.485 0 0 0 1.503-1.464V3.245a1.484 1.484 0 0 0-1.503-1.463" />
      </svg>
    );
  }

  if (icon === "github") {
    return (
      <svg viewBox="-1 -1 26 26" aria-hidden="true" focusable="false">
        <path d="M12 .296c-6.627 0-12 5.372-12 12 0 5.302 3.438 9.8 8.206 11.387.6.111.82-.26.82-.577 0-.286-.011-1.231-.016-2.234-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.332-1.756-1.332-1.756-1.089-.745.082-.729.082-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.419-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.469-2.381 1.237-3.221-.125-.303-.536-1.523.116-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 6.099c1.02.005 2.047.138 3.006.404 2.29-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.769.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.814 1.103.814 2.222 0 1.606-.014 2.898-.014 3.293 0 .319.216.694.824.576 4.766-1.589 8.2-6.085 8.2-11.385C24 5.669 18.627.296 12 .296" />
      </svg>
    );
  }

  if (icon === "resume") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 2h8.4L19 6.6V22H6V2Zm2 2v16h9V8h-4V4H8Zm7 .8V6h1.2L15 4.8ZM9 10h6v1.6H9V10Zm0 3.7h6v1.6H9v-1.6Zm0 3.7h4.5V19H9v-1.6Z" />
      </svg>
    );
  }

  if (icon === "business") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.1 7 13 7 13s7-7.9 7-13a7 7 0 0 0-7-7Zm0 2a5 5 0 0 1 5 5c0 3.2-3.3 7.9-5 10.1C10.3 16.9 7 12.2 7 9a5 5 0 0 1 5-5Zm-3 3h6v5H9V7Zm1.5 1.5v2h3v-2h-3Z" />
      </svg>
    );
  }

  if (icon === "youtube") {
    return (
      <svg viewBox="-1 -3 50 50" aria-hidden="true" focusable="false">
        <path d="M44.898 14.5c-.398-2.2-2.296-3.8-4.5-4.3C37.102 9.5 31 9 24.398 9c-6.597 0-12.796.5-16.097 1.2-2.2.5-4.102 2-4.5 4.3C3.398 17 3 20.5 3 25s.398 8 .898 10.5c.403 2.2 2.301 3.8 4.5 4.3 3.5.7 9.5 1.2 16.102 1.2s12.602-.5 16.102-1.2c2.199-.5 4.097-2 4.5-4.3.398-2.5.898-6.102 1-10.5-.204-4.5-.704-8-1.204-10.5M19 32V18l12.2 7Z" />
      </svg>
    );
  }

  if (icon === "blog") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 3h16v18H4V3Zm2 2v14h12V5H6Zm2 2h8v2H8V7Zm0 4h8v2H8v-2Zm0 4h5v2H8v-2Z" />
      </svg>
    );
  }

  if (icon === "spotify") {
    return (
      <svg viewBox="-1 -1 26 26" aria-hidden="true" focusable="false">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12m5.503 17.308a.747.747 0 0 1-1.028.249c-2.818-1.722-6.365-2.111-10.542-1.157a.748.748 0 1 1-.333-1.457c4.571-1.045 8.492-.595 11.655 1.338a.745.745 0 0 1 .248 1.027m1.469-3.267a.937.937 0 0 1-1.287.308c-3.225-1.982-8.142-2.557-11.958-1.398a.937.937 0 0 1-1.167-.624.937.937 0 0 1 .624-1.167c4.358-1.323 9.776-.682 13.48 1.594.44.271.578.847.308 1.287m.126-3.403C15.23 8.341 8.85 8.13 5.157 9.251a1.123 1.123 0 0 1-.652-2.148C8.744 5.816 15.79 6.065 20.243 8.708a1.123 1.123 0 0 1-1.145 1.93" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M18.9 1.153h3.682l-8.042 9.189L24 22.848h-7.405l-5.804-7.583-6.634 7.583H.469l8.6-9.831L0 1.153h7.593l5.241 6.931zm-1.293 19.494h2.039L6.482 3.239h-2.19z" />
    </svg>
  );
}

export default function AboutSocialLinks() {
  return (
    <nav className={styles.socialStrip} aria-label="Nicholas Egner around the web">
      <div className={styles.socialInner}>
        {socialLinks.map((item) => (
          <a
            key={item.label}
            className={styles.socialLink}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            data-label={item.label}
          >
            <span className={styles.iconWrap}>
              <SocialIcon icon={item.icon} />
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}
