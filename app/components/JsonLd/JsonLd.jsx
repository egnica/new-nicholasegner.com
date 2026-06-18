function removeUndefined(value) {
  if (Array.isArray(value)) {
    return value
      .map(removeUndefined)
      .filter((item) => item !== undefined && item !== null);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, item]) => item !== undefined && item !== null)
        .map(([key, item]) => [key, removeUndefined(item)])
    );
  }

  return value;
}

export default function JsonLd({ data }) {
  const cleanData = removeUndefined(data);
  const safeJson = JSON.stringify(cleanData).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}