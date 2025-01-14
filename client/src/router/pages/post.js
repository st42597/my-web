import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";

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
    <div>
      <Markdown>{post}</Markdown>
    </div>
  );
}

export default Post;
