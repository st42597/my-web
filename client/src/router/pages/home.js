import "./home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App">
      <article className="profile-container">
        <img className="home-profile-img" src="/profile.png" alt="profile" />
        <div>
          <h1>조성현, Cho SeongHyeon - WillKi</h1>
          <p className="home-profile-description">
            웹 개발, 인공지능, Problem Solving(알고리즘)에 관심을 갖고 있는
            전대학생입니다. <br /> 새로운 문제를 찾고 해결하는 과정을 즐기며
            스스로를 발전시키는 과정을 좋아합니다.
          </p>
          <ul className="home-profile-links">
            <li>
              <Link to="https://github.com/st42597">Github</Link>
            </li>
            <li>
              <Link to="https://www.acmicpc.net/user/st42597">BOJ</Link>
            </li>
            <li>
              <Link to="https://disco-colony-7af.notion.site/SeongHyeon-Cho-59ebacbf20a646b0a4b804f98db018d0">
                CV
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
}

export default Home;
