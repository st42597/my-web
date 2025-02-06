import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <ul>
        <li> Willki.dev</li>
        <li>
          © 2025 조성현 <a href="https://github.com/st42597/my-web">my-web</a>{" "}
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
