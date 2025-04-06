"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import "katex/dist/katex.min.css";
import ViewCounter from "@/components/ViewCounter";

function Post(params) {
  const { id } = useParams("");
  const [post, setPost] = useState("");

  useEffect(() => {
    fetch(`/contents/${id}/content.md`)
      .then((response) => response.text())
      .then((text) => setPost(text))
      .catch((error) => console.error("Error loading markdown:", error));
  }, [id]);

  return (
    <div className={styles.postContainer}>
      <ViewCounter slug={id} />
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const language = className?.replace("language-", "");
            return !inline && language ? (
              <SyntaxHighlighter style={dracula} language={language} {...props}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {post}
      </Markdown>
    </div>
  );
}

export default Post;
