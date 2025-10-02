import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import Reviews from "../../components/Reviews/Reviews";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./ProductDetailsPage.module.css";
import Breadcrumbs from "../../components/Breadcrumps/Breadcrumbs";
import share from "../../assets/share.svg";
import heartIcon from "../../assets/heart.svg";
import infoImg from "../../assets/info.svg";
import cartImg from "../../assets/shopping-cart.svg";
import bonusImg from "../../assets/Vector.svg";
import bell from "../../assets/bell-off.svg";

const fakeReviews = [
  { author: "Иван", text: "Отличный товар, рекомендую!", rating: 5 },
  { author: "Мария", text: "Неплохо, но ожидала больше", rating: 3 },
  { author: "Алексей", text: "Цена не соответствует качеству", rating: 2 },
];

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [related, setRelated] = useState([]);
  const [randomRelated, setRandomRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setMainImage(res.data.images[0] || "");
        document.title = res.data.title; // мета данные

        return axios.get(
          `https://dummyjson.com/products/category/${res.data.category}`
        );
      })
      .then((res) => {
        const filtered = res.data.products.filter(
          (p) => p.id.toString() !== id
        );
        setRelated(filtered);
      })
      .catch((err) => {
        console.error(err);
        setError("Ошибка загрузки данных");
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (related.length > 0) {
      const shuffled = [...related].sort(() => 0.5 - Math.random());
      setRandomRelated(shuffled.slice(0, 4));
    }
  }, [related]);

  if (loading) return <Loader />;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!product) return <p className={styles.error}>Товар не найден</p>;

  const handleAddToCart = () => {
    alert("Товар добавлен в корзину!");
  };

  const handleNotify = () => {
    alert(`Вы будете уведомлены о снижении цены для "${product.title}"`);
  };

  return (
    <div className={styles.container}>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Категория", href: `/category/${product.category}` },
          { label: product.title },
        ]}
      />
      <h1 className={styles.title}>{product.title}</h1>
      <div className={styles.productActions}>
        <p className={styles.art}>Арт. {product.id}</p>
        <div className={styles.ratingWrapper}>
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
          <span className={styles.reviewCount}>
            {product.rating.toFixed(1)} ({product.reviews?.length || 0} отзыва)
          </span>
        </div>
        <button className={styles.actionButton}>
          <img src={share} alt="Поделиться" className={styles.icon} />
          <span className={styles.label}>Поделиться</span>
        </button>
        <button className={styles.actionButton}>
          <img src={heartIcon} alt="В избранное" className={styles.icon} />
          <span className={styles.label}>В избранное</span>
        </button>
      </div>

      <div className={styles.productMainInfoContainer}>
        <div className={styles.slider}>
          <div className={styles.thumbnails}>
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.title} ${idx + 1}`}
                className={styles.thumbnailImg}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          <div className={styles.mainImageWrapper}>
            <img
              src={mainImage}
              alt={product.title}
              className={styles.mainImage}
            />
            <span className={styles.discountBadge}>-50%</span>
          </div>
        </div>
        <div className={styles.productDetailsInfoContainer}>
          <div className={styles.productPriceContrainer}>
            <div className={styles.currentPriceContainer}>
              <p className={styles.currentPrice}>
                <span className={styles.priceValue}>{product.price}</span>
                <span className={styles.currency}>₽</span>
              </p>
              <p className={styles.underPrice}>Обычная цена</p>
            </div>
            <div className={styles.cardPriceContainer}>
              <p className={styles.cardPrice}>
                <span className={styles.cardPriceValue}>
                  {(product.price / 2).toFixed(2)}
                </span>
                <span className={styles.cardCurrency}>₽</span>
              </p>
              <p className={styles.underPrice}>
                С картой Северяночки
                <img src={infoImg} alt="Инфо" className={styles.icon} />
              </p>
            </div>
          </div>
          <button className={styles.buttonPrimary} onClick={handleAddToCart}>
            <img
              src={cartImg}
              alt="Положить в корзину"
              className={styles.buttonIcon}
            />
            В корзину
          </button>
          <p className={styles.productBonus}>
            <img src={bonusImg} alt="bonus" className={styles.bonusIcon} />
            Вы получаете
            <span className={styles.bonusQuantity}>10 бонусов</span>
          </p>
          <button className={styles.buttonSecondary} onClick={handleNotify}>
            <img src={bell} alt="bell" className={styles.bellIcon} />
            Уведомить о снижении цены
          </button>
          <div className={styles.productInfo}>
            <div className={styles.lineGray}>
              <p className={styles.productInfoLabel}>Бренд</p>
              <p className={styles.productInfoValue}>{product.brand}</p>
            </div>
            <div className={styles.lineClear}>
              <p className={styles.productInfoLabel}>Страна производителя</p>
              <p className={styles.productInfoValue}>Россия</p>
            </div>
            <div className={styles.lineGray}>
              <p className={styles.productInfoLabel}>Упаковка</p>
              <p className={styles.productInfoValue}>111 г</p>
            </div>
          </div>
        </div>
      </div>

       {randomRelated.length > 0 && (
        <div>
          <h2 className={styles.relatedTitle}>С этим товаром покупают</h2>
          <div className={styles.relatedGrid}>
            {randomRelated.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}

      <Reviews reviews={fakeReviews} />
    </div>
  );
}
