import React from "react";

function Post({ posts }) {
  return posts.map((post, index) => <div key={post.id}>{post.text}</div>);
}

export default Post;
