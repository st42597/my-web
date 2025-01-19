import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header-container">
      <nav className="header-nav sb">
        <Link to="/" className="header-title header-text">
          WillKi.dev
        </Link>
        <div className="sb">
          <Link to="/posts" className="mr-24 header-text">
            Post
          </Link>
          <Link to="/about" className="header-text">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
