import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    if (
      e.target.tagName === "BUTTON" ||
      e.target.tagName === "svg" ||
      e.target.tagName === "path"
    )
      return;

    navigate(`/products/${product.id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <button
        onClick={() => setFavorite(!favorite)}
        className={styles.favoriteButton}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={favorite ? "#f63" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={favorite ? "#f63" : "gray"}
          className={styles.favoriteIcon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.676 0-3.163.926-3.938 2.293C11.851 4.676 10.364 3.75 8.688 3.75 6.099 3.75 4 5.765 4 8.25c0 7.22 8 11.25 8 11.25s8-4.03 8-11.25z"
          />
        </svg>
      </button>
      <div className={styles.discountWrapper}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.image}
      />
        <span className={styles.discountBadge}>-50%</span>
      </div>

      <div className={styles.content}>
        <div className={styles.productPriceContainer}>
          <div className={styles.cardPriceContainer}>
            <p className={styles.cardPrice}>
              <span className={styles.cardPriceValue}>
                {(product.price / 2).toFixed(2)}
              </span>
              <span className={styles.cardCurrency}>₽</span>
            </p>
            <p className={styles.underPrice}>С картой</p>
          </div>

          <div className={styles.currentPriceContainer}>
            <p className={styles.currentPrice}>
              <span className={styles.priceValue}>{product.price}</span>
              <span className={styles.currency}>₽</span>
            </p>
            <p className={styles.underPrice}>Обычная цена</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.title}>{product.title}</p>

          <div className={styles.rating}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={i < Math.round(product.rating) ? "#f63" : "none"}
                stroke="#f63"
                className={styles.star}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.498.04.701.664.321.988l-4.207 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L2.54 10.385a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            ))}
          </div>

          <button className={styles.button}>В корзину</button>
        </div>
      </div>
    </div>
  );
}
