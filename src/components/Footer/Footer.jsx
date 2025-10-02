import styles from "./Footer.module.css";
import logo from "../../assets/footer-logo.svg";
import instagram from "../../assets/instagram.svg";
import vkontakte from "../../assets/vkontakte.svg";
import facebook from "../../assets/facebook.svg";
import ok from "../../assets/ok.svg";
import phone from "../../assets/phone.svg";
import logoZasovskiy from "../../assets/logoZasovskiy.svg"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLogoMenucontainer}>
          <div className={styles.logo}>
            <img src={logo} alt="Логотип" className={styles.logo} />
          </div>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>
              О компании
            </a>
            <a href="#" className={styles.footerLink}>
              Контакты
            </a>
            <a href="#" className={styles.footerLink}>
              Вакансии
            </a>
            <a href="#" className={styles.footerLink}>
              Статьи
            </a>
            <a href="#" className={styles.footerLink}>
              Политика обработки персональных данных
            </a>
          </div>
        </div>
        <div className={styles.contacts}>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink}>
              <img src={instagram} alt="Instagram" />
            </a>
            <a href="#" className={styles.socialLink}>
              <img src={vkontakte} alt="Vkontakte" />
            </a>
            <a href="#" className={styles.socialLink}>
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="#" className={styles.socialLink}>
              <img src={ok} alt="OK" />
            </a>
          </div>
          <div className={styles.number}>
            <img src={phone} alt="Phone" className={styles.phone} />
            <span className={styles.label}>8 800 777 33 33</span>
          </div>
        </div>
      </div>
      <div className={styles.designCredit}>
        <span>Дизайн</span>
        <img
          src={logoZasovskiy}
          alt="Design Studio"
          className={styles.designLogo}
        />
      </div>
    </footer>
  );
}
