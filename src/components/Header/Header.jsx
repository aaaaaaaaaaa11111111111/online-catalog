import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import heartIcon from "../../assets/heart.svg";
import boxIcon from "../../assets/box.svg";
import cartIcon from "../../assets/cart.svg";
import arrowDown from "../../assets/chevron-down.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="Логотип" className={styles.logoImg} />
        </div>

        <div className={styles.catalogSearchbarContainer}>
          <button className={styles.catalogButton}>
            <span className={styles.hamburger}></span>
            Каталог
          </button>
          <div className={styles.searchField}>
            <input
              type="text"
              placeholder="Найти товар..."
              className={styles.input}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.searchIcon}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
        <div className={styles.profileControls}>
          <div className={styles.actions}>
            <button className={styles.actionButton}>
              <img src={heartIcon} alt="Избранное" className={styles.icon} />
              <span className={styles.label}>Избранное</span>
            </button>

            <button className={styles.actionButton}>
              <img src={boxIcon} alt="Заказы" className={styles.icon} />
              <span className={styles.label}>Заказы</span>
            </button>

            <button className={styles.actionButton}>
              <img src={cartIcon} alt="Корзина" className={styles.icon} />
              <span className={styles.label}>Корзина</span>
            </button>
          </div>
          <div className={styles.user}>
            <div className={styles.avatar}></div>
            <span className={styles.username}>Даниил</span>
            <img src={arrowDown} alt="chevron-down" className={styles.icon} />
          </div>
        </div>
      </div>
    </header>
  );
}
