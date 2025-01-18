import "./home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [recommendedPost, setRecommendedPost] = useState([]);
  const [latestPost, setLatestPost] = useState([]);
  useEffect(() => {
    fetch("/contents/recommendedPostList.json")
      .then((response) => response.json())
      .then((data) => setRecommendedPost(data))
      .catch((error) => console.error("Error loading posts:", error));
  }, []);

  useEffect(() => {
    fetch("/contents/postList.json")
      .then((response) => response.json())
      .then((data) => {
        const tmp = [];
        for (let i = 0; i < Math.min(6, data.length); i++) {
          tmp.push(data[i]);
        }
        setLatestPost(tmp);
      })
      .catch((error) => console.error("Error loading posts:", error));
  }, []);

  const recommendedPostList = recommendedPost.map((post) => (
    <Link to={`/posts/${post.url}`} key={post}>
      <h1>{post.title}</h1>
      <h2>{post.subTitle}</h2>
    </Link>
  ));

  const latestPostList = latestPost.map((post) => (
    <Link to={`/posts/${post.url}`} key={post}>
      <h1>{post.title}</h1>
      <h2>{post.subTitle}</h2>
    </Link>
  ));

  return (
    <div className="home-container">
      <article className="profile-container">
        <img className="home-profile-img" src="/profile.png" alt="profile" />
        <div>
          <h1>조성현, Cho SeongHyeon - WillKi</h1>
          <p className="home-profile-description">
            웹 개발, 인공지능, Problem Solving(알고리즘)에 관심을 갖고 있는
            대학원생입니다. <br /> 새로운 문제를 찾고 해결하는 과정을 즐기며
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
      <div>
        <h1>추천 포스트</h1>
        <div className="home-postlist-container">{recommendedPostList}</div>
      </div>
      <div>
        <h1>최신 포스트</h1>
        <div className="home-postlist-container">{latestPostList}</div>
      </div>
    </div>
  );
}

export default Home;
