import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";
import styles from "./Header.module.css";
import Link from "next/link";

function Header() {
  return (
    <header className={styles.headerContainer}>
      <nav className={`${styles.headerNav} ${styles.sb}`}>
        <Link href="/" className={`${styles.headerTitle} ${styles.headerText}`}>
          WillKi.dev
        </Link>
        <div className={styles.sb}>
          <Link href="/posts" className={`${styles.headerText} ${styles.mr24}`}>
            Post
          </Link>
          <Link
            href="/comment"
            className={`${styles.headerText} ${styles.mr24}`}
          >
            Comment
          </Link>
          <Link href="/about" className={styles.headerText}>
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
