"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewCounter({ slug }, enableCount = true) {
  const [viewCount, setViewCount] = useState();

  useEffect(() => {
    if (enableCount) {
      const fetchViewCount = async () => {
        try {
          const response = await axios.post(`/api/posts/${slug}/views`);
          setViewCount(response.data.viewCount);
        } catch (error) {
          console.error("Error count view:", error);
        }
      };
      fetchViewCount();
    } else {
    }
  }, []);

  return (
    <p>
      <span>조회수: {viewCount}</span>
    </p>
  );
}

export default ViewCounter;
