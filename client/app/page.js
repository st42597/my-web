"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

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
    <Link href={`/posts/${post.url}`} key={"recommended-" + post.url}>
      <h1>{post.title}</h1>
      <h2>{post.subTitle}</h2>
    </Link>
  ));

  const latestPostList = latestPost.map((post) => (
    <Link href={`/posts/${post.url}`} key={"latest-" + post.url}>
      <h1>{post.title}</h1>
      <h2>{post.subTitle}</h2>
    </Link>
  ));

  return (
    <div className={styles.homeContainer}>
      <article className={styles.profileContainer}>
        <img className={styles.profileImg} src="/profile.webp" alt="profile" />
        <div>
          <h1>조성현, Cho SeongHyeon - WillKi</h1>
          <p className={styles.profileDescription}>
            웹 개발, 인공지능, Problem Solving(알고리즘)에 관심을 갖고 있는
            대학원생입니다. <br /> 새로운 문제를 찾고 해결하는 과정을 즐기며
            스스로를 발전시키는 과정을 좋아합니다.
          </p>
          <ul className={styles.profileLinks}>
            <li>
              <a href="https://github.com/st42597">GitHub</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/seonghyeon-cho-a2904024b/">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://www.acmicpc.net/user/st42597">BOJ</a>
            </li>
            <li>
              <a href="https://disco-colony-7af.notion.site/SeongHyeon-Cho-59ebacbf20a646b0a4b804f98db018d0">
                CV
              </a>
            </li>
          </ul>
        </div>
      </article>
      <div className={styles.postlistContainer}>
        <h1>추천 포스트</h1>
        <div className={styles.postElementContainer}>{recommendedPostList}</div>
      </div>
      <div className={styles.postlistContainer}>
        <h1>최신 포스트</h1>
        <div className={styles.postElementContainer}>{latestPostList}</div>
      </div>
    </div>
  );
}

export default Home;
