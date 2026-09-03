"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const CURRENT_PATH_KEY = "ne-current-internal-path";
export const PREVIOUS_PATH_KEY = "ne-previous-internal-path";

export default function RouteHistoryTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initializedRef = useRef(false);
  const search = searchParams.toString();

  useEffect(() => {
    const currentPath = `${pathname}${search ? `?${search}` : ""}`;

    if (!initializedRef.current) {
      initializedRef.current = true;

      let referrerIsInternal = false;

      try {
        referrerIsInternal =
          Boolean(document.referrer) &&
          new URL(document.referrer).origin === window.location.origin;
      } catch {
        referrerIsInternal = false;
      }

      if (!referrerIsInternal) {
        sessionStorage.removeItem(CURRENT_PATH_KEY);
        sessionStorage.removeItem(PREVIOUS_PATH_KEY);
      }
    }

    const storedCurrent = sessionStorage.getItem(CURRENT_PATH_KEY);

    if (storedCurrent && storedCurrent !== currentPath) {
      sessionStorage.setItem(PREVIOUS_PATH_KEY, storedCurrent);
    }

    sessionStorage.setItem(CURRENT_PATH_KEY, currentPath);
  }, [pathname, search]);

  return null;
}
