import "./Header.css";
import Link from "next/link";

function Header() {
  return (
    <header className="header-container">
      <nav className="header-nav sb">
        <Link href="/" className="header-title">
          WillKi.dev
        </Link>
        <div className="sb">
          <Link href="/posts" className="mr-24">
            Post
          </Link>
          <Link href="comment" className="mr-24">
            Comment
          </Link>
          <Link href="/about">About</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
