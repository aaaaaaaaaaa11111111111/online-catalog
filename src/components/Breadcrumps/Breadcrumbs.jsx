import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({ items }) {
  return (
    <nav className={styles.breadcrumbs}>
      {items.map((item, idx) => (
        <span key={idx} className={styles.breadcrumbItem}>
          {item.href ? (
            <a href={item.href} className={styles.breadcrumbLink}>
              {item.label}
            </a>
          ) : (
            <span className={styles.breadcrumbCurrent}>{item.label}</span>
          )}
          {idx < items.length - 1 && (
            <span className={styles.breadcrumbSeparator}>›</span>
          )}
        </span>
      ))}
    </nav>
  );
}
