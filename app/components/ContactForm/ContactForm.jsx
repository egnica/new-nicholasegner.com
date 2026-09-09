"use client";

import { useId, useRef, useState } from "react";
import styles from "./ContactForm.module.css";

const initialForm = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  message: "",
  website: "",
};

export default function ContactForm({ source = "contact-page" }) {
  const formId = useId();
  const startedAt = useRef(Date.now());
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source,
          startedAt: startedAt.current,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Your message could not be sent.");
      }

      setForm(initialForm);
      startedAt.current = Date.now();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error?.message || "Something went wrong. Please try again or email me directly.",
      );
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fieldGrid}>
        <div className={styles.field}>
          <label htmlFor={`${formId}-name`}>Name</label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={updateField}
            required
            maxLength={120}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor={`${formId}-email`}>Email</label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={updateField}
            required
            maxLength={320}
          />
        </div>
      </div>

      <div className={styles.fieldGrid}>
        <div className={styles.field}>
          <label htmlFor={`${formId}-company`}>
            Company <span>optional</span>
          </label>
          <input
            id={`${formId}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={updateField}
            maxLength={160}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor={`${formId}-projectType`}>What are you working on?</label>
          <select
            id={`${formId}-projectType`}
            name="projectType"
            value={form.projectType}
            onChange={updateField}
          >
            <option value="">Choose an area</option>
            <option value="Website or web application">Website or web application</option>
            <option value="Video or content">Video or content</option>
            <option value="SEO or search visibility">SEO or search visibility</option>
            <option value="Business tool or automation">Business tool or automation</option>
            <option value="Something else">Something else</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor={`${formId}-message`}>Tell me about it</label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={7}
          value={form.message}
          onChange={updateField}
          required
          maxLength={5000}
          placeholder="A little context is plenty: what you need, what is not working, or what you are hoping to build."
        />
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={updateField}
        />
      </div>

      <div className={styles.footerRow}>
        <p className={styles.note}>
          Your message goes directly to Nicholas Egner.
        </p>
        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send Message"}
          {status !== "submitting" && <span aria-hidden="true">→</span>}
        </button>
      </div>

      <div className={styles.statusArea} aria-live="polite">
        {status === "success" && (
          <p className={styles.success}>
            Message sent. Thanks for reaching out. I’ll get back to you soon.
          </p>
        )}
        {status === "error" && <p className={styles.error}>{errorMessage}</p>}
      </div>
    </form>
  );
}
