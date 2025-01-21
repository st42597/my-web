import { useEffect, useState } from "react";
import "./posts.css";
import { Link } from "react-router-dom";
function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("/contents/postList.json")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error loading posts:", error));
  }, []);

  const postList = posts.map((post) => (
    <Link
      to={`${post.url}`}
      className="postlist-element-container"
      key={post.url}
    >
      <h1>{post.title}</h1>
      <h2>{post.subTitle}</h2>
    </Link>
  ));

  return <div className="postlist-container">{postList}</div>;
}

export default Posts;
