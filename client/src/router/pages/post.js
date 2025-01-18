import "./post.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

function Post() {
  const { id } = useParams("");
  const [post, setPost] = useState("");

  useEffect(() => {
    fetch(`/contents/${id}/content.md`)
      .then((response) => response.text())
      .then((text) => setPost(text))
      .catch((error) => console.error("Error loading markdown:", error));
  }, [id]);

  return (
    <div className="post-container">
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {post}
      </Markdown>
    </div>
  );
}

export default Post;
