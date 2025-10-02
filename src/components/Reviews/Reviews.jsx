import styles from './Reviews.module.css';

export default function Reviews({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p className={styles.noReviews}>Пока нет отзывов</p>;
  }

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Отзывы</h2>

      <div className={styles.content}>
        <div className={styles.stats}>
          <div className={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={i < Math.round(averageRating) ? styles.starFilled : styles.starEmpty}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.157c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.068 9.384c-.783-.57-.38-1.81.588-1.81h4.157a1 1 0 00.95-.69l1.286-3.957z" />
              </svg>
            ))}
          </div>
          <p className={styles.average}>{averageRating.toFixed(1)}</p>
          <p className={styles.reviewCount}>({reviews.length} отзывов)</p>
        </div>
        <div className={styles.list}>
          {reviews.map((r, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.row}>
                <div className={styles.avatar}></div>
                <p className={styles.author}>{r.author}</p>
              </div>
              <div className={styles.row}>
                <div className={styles.starsSmall}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={i < r.rating ? styles.starFilledSmall : styles.starEmptySmall}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.157c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.068 9.384c-.783-.57-.38-1.81.588-1.81h4.157a1 1 0 00.95-.69l1.286-3.957z" />
                    </svg>
                  ))}
                </div>
                <span className={styles.date}>{r.date || '01.10.2025'}</span>
              </div>
              <p className={styles.text}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
