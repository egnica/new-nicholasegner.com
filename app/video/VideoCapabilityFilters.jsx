"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./video.module.css";

export default function VideoCapabilityFilters({ capabilities = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("focus");

  function handleFilter(slug) {
    const params = new URLSearchParams(searchParams.toString());

    if (active === slug) {
      params.delete("focus");
    } else {
      params.set("focus", slug);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });

    window.setTimeout(() => {
      document
        .getElementById("capability-explorer")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  return (
    <div className={styles.heroTags} aria-label="Filter video work by capability">
      {capabilities.map((capability) => {
        const isActive = active === capability.slug;

        return (
          <button
            key={capability.slug}
            type="button"
            className={`${styles.capabilityButton} ${
              isActive ? styles.capabilityButtonActive : ""
            }`}
            aria-pressed={isActive}
            onClick={() => handleFilter(capability.slug)}
            title={
              isActive
                ? `Show all video work`
                : `Show ${capability.label} work`
            }
          >
            <span
              className={styles.capabilityIcon}
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: capability.image }}
            />
            <span>{capability.label}</span>
          </button>
        );
      })}
    </div>
  );
}
