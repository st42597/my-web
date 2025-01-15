import "./post.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Post() {
  const { id } = useParams("");
  const [post, setPost] = useState("");

  useEffect(() => {
    fetch(`/contents/${id}/content.md`)
      .then((response) => response.text())
      .then((text) => setPost(text))
      .catch((error) => console.error("Error loading markdown:", error));
  }, [id]);
  console.log(id);

  return (
    <div className="post-container">
      <Markdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
        {post}
      </Markdown>
    </div>
  );
}

export default Post;
