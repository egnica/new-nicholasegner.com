"use client";

import { useEffect, useState } from "react";

const TRACKING_ID_PATTERN = /^NE-[A-HJ-NP-Z2-9]{8}$/;

function sanitizeName(value) {
  if (!value) return "";

  return String(value)
    .normalize("NFKC")
    .replace(/[^\p{L}\p{M} .\'-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
}

function sanitizeTrackingId(value) {
  const trackingId = String(value || "").trim().toUpperCase();
  return TRACKING_ID_PATTERN.test(trackingId) ? trackingId : "";
}

export default function useTrackedContact(searchParams) {
  const trackingId = sanitizeTrackingId(searchParams.get("id"));
  const queryName = sanitizeName(searchParams.get("name"));
  const [trackedContact, setTrackedContact] = useState(null);
  const [resolving, setResolving] = useState(Boolean(trackingId));

  useEffect(() => {
    let active = true;

    if (!trackingId) {
      setTrackedContact(null);
      setResolving(false);
      return () => {
        active = false;
      };
    }

    setResolving(true);

    fetch(`/api/contact-tracking?id=${encodeURIComponent(trackingId)}`, {
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) return null;
        const data = await response.json();
        return data?.valid ? data : null;
      })
      .then((contact) => {
        if (active) {
          setTrackedContact(contact);
          setResolving(false);
        }
      })
      .catch(() => {
        if (active) {
          setTrackedContact(null);
          setResolving(false);
        }
      });

    return () => {
      active = false;
    };
  }, [trackingId]);

  return {
    trackingId,
    isKnownContact: Boolean(trackedContact?.valid),
    name: sanitizeName(trackedContact?.firstName) || queryName,
    resolving,
  };
}
