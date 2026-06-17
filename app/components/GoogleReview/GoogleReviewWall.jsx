"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import styles from "./GoogleReviewWall.module.css";

const GOOGLE_REVIEW_IMAGE =
  "https://nciholasegner.s3.us-east-2.amazonaws.com/images/google-review.webp";

const LEAVE_REVIEW_URL = "https://g.page/r/CSbhU6mFyb4qEBM/review";

const READ_REVIEWS_URL =
  "https://www.google.com/maps/place/Nicholas+Egner+-+Web+Development/data=!4m2!3m1!1s0x0:0x2abec985a953e126?sa=X&ved=1t:2428&ictx=111";

function getReviewBatch(reviews, page, reviewsPerPage) {
  const start = page * reviewsPerPage;
  const batch = reviews.slice(start, start + reviewsPerPage);

  if (reviews.length <= reviewsPerPage || batch.length === reviewsPerPage) {
    return batch;
  }

  const remainingSlots = reviewsPerPage - batch.length;
  return [...batch, ...reviews.slice(0, remainingSlots)];
}

function Stars({ rating = 5 }) {
  return (
    <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} aria-hidden="true">
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default function GoogleReviewWall({ reviews = [] }) {
  const reviewsPerPage = 4;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const [page, setPage] = useState(0);

  const visibleReviews = useMemo(() => {
    return getReviewBatch(reviews, page, reviewsPerPage);
  }, [reviews, page]);

  function goToPreviousPage() {
    setPage((currentPage) =>
      currentPage === 0 ? totalPages - 1 : currentPage - 1,
    );
  }

  function goToNextPage() {
    setPage((currentPage) =>
      currentPage === totalPages - 1 ? 0 : currentPage + 1,
    );
  }

  if (!reviews.length) return null;

  return (
    <section className={styles.reviewSection} aria-labelledby="reviews-title">
      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>Google Reviews</p>
          <h2 id="reviews-title">
            Real feedback from clients and collaborators.
          </h2>
        </div>

        <div className={styles.googleBlock}>
          <Image
            width={300}
            height={163}
            alt="Google Reviews"
            src={GOOGLE_REVIEW_IMAGE}
            className={styles.googleImage}
          />

          <div className={styles.reviewActions}>
            <a
              href={LEAVE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionButton}
            >
              Leave Review
            </a>

            <a
              href={READ_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionButtonSecondary}
            >
              Read Reviews
            </a>
          </div>
        </div>
      </div>

      <div className={styles.wallShell}>
        {totalPages > 1 && (
          <button
            type="button"
            className={`${styles.navButton} ${styles.navButtonLeft}`}
            onClick={goToPreviousPage}
            aria-label="Show previous reviews"
          >
            <span aria-hidden="true">‹</span>
          </button>
        )}

        <div key={page} className={styles.reviewGrid}>
          {visibleReviews.map((review, index) => (
            <article
              key={`${review.name}-${index}-${page}`}
              className={styles.reviewCard}
            >
              <div className={styles.reviewTop}>
                {review.image && (
                  <img
                    src={review.image}
                    alt={`Google image of ${review.name}`}
                    className={styles.reviewerImage}
                    loading="lazy"
                  />
                )}

                <div>
                  <h3>{review.name}</h3>
                  <Stars rating={review.rating || 5} />
                </div>
              </div>

              <p className={styles.reviewText}>{review.text}</p>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <button
            type="button"
            className={`${styles.navButton} ${styles.navButtonRight}`}
            onClick={goToNextPage}
            aria-label="Show next reviews"
          >
            <span aria-hidden="true">›</span>
          </button>
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pageDots} aria-label="Review pages">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={
                index === page
                  ? `${styles.dot} ${styles.dotActive}`
                  : styles.dot
              }
              onClick={() => setPage(index)}
              aria-label={`Show review page ${index + 1}`}
              aria-current={index === page ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}
