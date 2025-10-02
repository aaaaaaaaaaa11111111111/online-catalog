// src/pages/ProductsPage/ProductsPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
        setFiltered(res.data.products);
        setError(null);
      })
      .catch(() => setError("Ошибка загрузки товаров"))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = () => {
    setQuery(queryInput.trim());
    if (!queryInput.trim()) {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter((p) =>
          p.title.toLowerCase().includes(queryInput.toLowerCase())
        )
      );
    }
  };

  const handleClear = () => {
    setQueryInput("");
    setQuery("");
    setFiltered(products);
  };

  if (loading) return <Loader />;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      {!query && (
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            className={styles.input}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button
            onClick={handleSearch}
            className={styles.searchButton}
          >
            Найти
          </button>
        </div>
      )}
      {query && (
        <div className={styles.searchResultWrapper}>
          {filtered.length > 0 ? (
            <div className={styles.searchResultHeader}>
              <h1 className={styles.searchTitle}>Результат поиска</h1>
              <p className={styles.searchQuery}>
                по запросу{" "}
                <span className={styles.queryWord}>{query}</span>
                <button className={styles.clearQuery} onClick={handleClear}>
                  ✕
                </button>
              </p>
            </div>
          ) : (
            <p className={styles.message}>
              Ничего не найдено
              <button className={styles.clearQuery} onClick={handleClear}>
                ✕
              </button>
            </p>
          )}
        </div>
      )}
      <div className={styles.grid}>
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
