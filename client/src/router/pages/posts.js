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
    <Link to={`${post}`} className="post-container" key={post}>
      <h1>{post}</h1>
      <h2>subtitle</h2>
    </Link>
  ));

  return <div className="posts-container">{postList}</div>;
}

export default Posts;
