import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header-container">
      <nav className="header-nav sb">
        <Link to="/" className="header-title text">
          WillKi's Blog
        </Link>
        <div className="sb">
          <Link to="/posts" className="mr-24 text">
            Post
          </Link>
          <Link to="/about" className="mr-24 text">
            About
          </Link>
          <img
            className="header-profile-img"
            src="/profile.png"
            alt="profile"
          ></img>
        </div>
      </nav>
    </header>
  );
}

export default Header;
