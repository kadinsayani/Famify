import React from "react";

function Post({ posts }) {
  if (!posts) {
    return null;
  }

  if (typeof posts === "object" && !Array.isArray(posts)) {
    posts = Object.entries(posts);
  }

  return posts.map((post) => (
    <div key={post.id || post.timestamp}>{post.content}</div>
  ));
}

export default Post;
